export function connectWithUserCredentials(email, password) {
  cy.get('input[type=email]').clear().type(email)
  cy.get('input[type=password]').clear().type(password)
  cy.get('button[type=button]')
    .contains('se connecter')
    .click()
}