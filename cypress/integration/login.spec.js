import {
  connectWithUserCredentialsViaGui,
  getTokenDuration,
  getTokenCookie,
  login
} from '../../common/cypress/Authentication/Helpers'
import TokenHandler from '../../common/cypress/Authentication/TokenHandler'

describe('Log staff member in', function(){
  context('Login functionality', function() {

    const email = 'test@example.com'
    const password = 'password'

    beforeEach(() => getTokenCookie().should('not.exist'))

    // TODO: the same test needs to be run on the management-frontend side; maybe we could just 
    // TODO: put this test into the common repo and import it somehow
    // TODO: do that for all personas (Consommateur, Producteur, Responsable, Rex, Softozor)! 
    // TODO:  --> try to use jest-each for that purpose
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
      cy.stubServer('Authentication/LogStaffIn/Producteur')

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
      // TODO: we don't need these credentials here, because we fake the server response anyway!
      connectWithUserCredentialsViaGui(email, password)

      //Then
      cy.get('@graphql').then(() => {
        const handler = new TokenHandler
        handler.getToken().then(token => {
          // TODO: it is sufficient to check that a token is received; 
          // TODO: no need to check the session duration
          const tokenDuration = getTokenDuration(token)
          expect(tokenDuration.asSeconds()).to.equal(expectedDuration.asSeconds())
        })
      })
    })
  })
})