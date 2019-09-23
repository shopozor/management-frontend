import {
  login,
  navigateTo,
  getTokenCookie
} from '../../common/cypress/Authentication/Helpers'
import types from '../../common/types'

describe('Log staff member out', function(){
  context('Logout functionality', function() {

    const email = 'test@example.com'
    const password = 'password'

    it('closes the session with the server', function () {
      // Given
      cy.stubServer('Authentication/LogStaffIn/Producteur')
      login(email, password)

      // When
      navigateTo(types.links.LOGOUT)

      // Then
      getTokenCookie().should('not.exist')
    }) 

    it('redirects to the login page', function () {
      // Given
      cy.stubServer(`Authentication/LogStaffIn/Producteur`)
      login(email, password)

      // When
      navigateTo(types.links.LOGOUT)
      
      // Then
      cy.url().should('include', '/login')
    })
  })
})