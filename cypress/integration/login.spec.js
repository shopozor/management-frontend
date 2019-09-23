import {
  connectWithUserCredentialsViaGui,
  getTokenDuration,
  getTokenCookie
} from '../../common/cypress/Authentication/Helpers'
import TokenHandler from '../../common/cypress/Authentication/TokenHandler'

describe('Log staff member in', function(){
  context('Login functionality', function() {

    // TODO: the same test needs to be run on the management-frontend side; maybe we could just 
    // TODO: put this test into the common repo and import it somehow
    // TODO: do that for all personas (Consommateur, Producteur, Responsable, Rex, Softozor)! 
    // TODO:  --> try to use jest-each for that purpose
    it('redirects to home page if identified staff member browses /login', function () {
      // TODO: before all:
      getTokenCookie().should('not.exist')
      /*
      * Beaucoup d'événements peuvent se passer au moment de l'identification et de la déconnexion d'un utilisateur, 
      * notamment certaines opérations de nettoyage de données. Si un utilisateur peut s'identifier alors qu'il est 
      * déjà identifié, il est probable que les données relatives à son compte se retrouvent dans un état indéfini. 
      * C'est pourquoi il faut empêcher à un utilisateur identifié d'accéder à l'interface d'identification. 
      */
      // Given
      cy.stubServer(`Authentication/LogConsumerIn/Responses/${persona}`)
      login(persona)

      // When
      cy.visit('/login')

      // Then
      cy.url().should('not.include', '/login')
    })

    it('denies an unregistered user access to the admin panel', function () {
      // TODO: before all:
      getTokenCookie().should('not.exist')
      
      // Given
      cy.stubServer(`Authentication/LogStaffIn/Responses/${persona}`)

      // When
      cy.visit('/')
      cy.fixture(`Authentication/Credentials/${persona}`)
        .then(user => connectWithUserCredentialsViaGui(user.email, user.password))

      // Then
      cy.get('@graphql').then(() => {
        cy.get('.incorrectIdentifiers')
          .should('be.visible')
      })
    })

    it('denies a registered user with invalid password access to the admin panel', function () {
      // TODO: before all:
      getTokenCookie().should('not.exist')
      
      // Given
      cy.stubServer('Authentication/LogStaffIn/Responses/WrongCredentials')

      // When
      cy.visit('/')
      cy.fixture(`Authentication/Credentials/${persona}`)
        .then(user => connectWithUserCredentialsViaGui(user.email, user.password + 'a'))

      // Then
      cy.get('@graphql').then(() => {
        cy.get('.incorrectIdentifiers')
          .should('be.visible')
      })
    })

    it('grants a registered user with valid credentials access to the admin panel', function () {
      // TODO: before all:
      getTokenCookie().should('not.exist')
      
      // Given
      cy.stubServer(`Authentication/LogStaffIn/Responses/${persona}`)

      // When
      cy.visit('/')
      cy.fixture(`Authentication/Credentials/${persona}`)
        .then(user => connectWithUserCredentialsViaGui(user.email, user.password))

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