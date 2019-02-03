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

export function getTokenCookie() {
  return cy.getCookie('user_session')
}