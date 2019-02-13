import { injectResponseFixtureIfFaked } from '../../common/fakeServer'

export function getTokenCookie() {
  return cy.getCookie('user_session')
}

export function login(persona) {
  // TODO: the following code needs to be replaced with a programmatic login 
  // i.e. a direct call to store.dispatch('login', { email, password, stayLoggedIn })
  injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
  cy.visit('/login')
  cy.fixture(`Authentication/Credentials/${persona}`)
    .then(user => {
      cy.get('input[type=email]').clear().type(user.email)
      cy.get('input[type=password]').clear().type(user.password)
      cy.get('button[type=button]')
        .contains('se connecter')
        .click()
    })

  cy.get('@graphql').then(() => {
    const token = getTokenCookie().value
    expect(token).to.not.be.null
  })
}