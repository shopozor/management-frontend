export function login(responseFixture) {
  cy.setCookie('user_session', responseFixture.data.login.token)
}