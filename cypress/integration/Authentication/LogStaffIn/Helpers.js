const jwtDecode = require('jwt-decode')
import { duration } from 'moment'

export function connectWithUserCredentials(email, password) {
  cy.get('input[type=email]').clear().type(email)
  cy.get('input[type=password]').clear().type(password)
  cy.get('button[type=button]')
    .contains('se connecter')
    .click()
}

export function getTokenDuration(token) {
  const decodedToken = jwtDecode(token)
  return duration(decodedToken.exp - decodedToken.origIat, 'seconds')
}

export function getTokenFromLocalStorage() {
  const token = undefined
  // TODO: get the token from the local storage
  return token
}

export function assertSessionIsNotOpen() {
  cy.getCookie('user_session').should('not.exist')
  // TODO: verify that the local storage doesn't contain the token
}