import {
  login,
  navigateTo,
  getTokenCookie
} from '../../common/cypress/integration/Authentication/Helpers'
import types from '../../common/types'

describe('Log staff member out', function(){
  context('Logout functionality', function() {
    it('closes the session with the server', function () {
      // Given
      injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
      login(persona)

      // When
      navigateTo(types.links.LOGOUT)

      // Then
      getTokenCookie().should('not.exist')
    }) 

    it('redirects to the login page', function () {
      // Given
      injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
      login(persona)

      // When
      navigateTo(types.links.LOGOUT)
      
      // Then
      cy.url().should('include', '/login')
    })
  })
})