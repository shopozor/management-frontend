export function connectWithUserCredentials(email, password) {
  cy.get('input[type=email]').type(email)
  cy.get('input[type=password]').type(password)
  cy.get('button[type=button]')
    .contains('se connecter')
    .click()
}
