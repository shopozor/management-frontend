import {
  connectWithUserCredentialsViaGui,
  getTokenCookie,
  login
} from '../../common/cypress/Authentication/Helpers'
import TokenHandler from '../../common/cypress/Authentication/TokenHandler'
import { navigateTo, checkIfLinkIsActive } from '../../common/cypress/Authentication/Helpers'
import types from '../../common/types'

describe('Staff authentication', function () {

  context('Staff login', function () {

    const email = 'test@example.com'
    const password = 'password'

    beforeEach(() => getTokenCookie().should('not.exist'))

    // TODO: the same test needs to be run on the management-frontend side; maybe we could just 
    // TODO: put this test into the common repo and import it somehow
    it('redirects to home page if identified staff member browses /login', function () {
      /*
      * Beaucoup d'événements peuvent se passer au moment de l'identification et de la déconnexion d'un utilisateur, 
      * notamment certaines opérations de nettoyage de données. Si un utilisateur peut s'identifier alors qu'il est 
      * déjà identifié, il est probable que les données relatives à son compte se retrouvent dans un état indéfini. 
      * C'est pourquoi il faut empêcher à un utilisateur identifié d'accéder à l'interface d'identification. 
      */
      // Given
      cy.stubServer(`Authentication/LogConsumerIn/Producteur`)
      login(email, password)

      // When
      cy.visit('/login')

      // Then
      cy.url().should('not.include', '/login')
    })

    it('denies an unregistered user access to the admin panel', function () {
      // Given
      cy.stubServer('Authentication/LogStaffIn/WrongCredentials')

      // When
      cy.visit('/')
      connectWithUserCredentialsViaGui(email, password)

      // Then
      cy.get('@graphql').then(() => {
        cy.get('.incorrectIdentifiers')
          .should('be.visible')
      })
    })

    it('denies a registered user with invalid password access to the admin panel', function () {
      // Given
      cy.stubServer('Authentication/LogStaffIn/WrongCredentials')

      // When
      cy.visit('/')
      connectWithUserCredentialsViaGui(email, password)

      // Then
      cy.get('@graphql').then(() => {
        cy.get('.incorrectIdentifiers')
          .should('be.visible')
      })
    })

    it('grants a registered user with valid credentials access to the admin panel', function () {
      // Given
      cy.stubServer('Authentication/LogStaffIn/Producteur')

      // When
      cy.visit('/')
      connectWithUserCredentialsViaGui(email, password)

      //Then
      cy.get('@graphql').then(() => {
        getTokenCookie().should('exist')
      })
    })
  })

  context('Staff logout', function () {

    const email = 'test@example.com'
    const password = 'password'

    beforeEach(() => getTokenCookie().should('not.exist'))

    it('forgets about the token and redirects to /login', function () {
      // Given
      cy.stubServer('Authentication/LogStaffIn/Producteur')
      login(email, password)

      // When
      navigateTo(types.links.LOGOUT)

      // Then
      const tokenHandler = new TokenHandler
      tokenHandler.getNullToken().then(() => {
        getTokenCookie().should('not.exist')
      })
      cy.location('pathname').should('eq', '/')
      checkIfLinkIsActive(types.links.LOGIN)
    })
  })
})