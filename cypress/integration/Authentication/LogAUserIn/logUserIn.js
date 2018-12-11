import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
const moment = require('moment')

import { connectWithUserCredentials } from './Helpers'
import './SessionDurationType'

before(() => {
  cy.log(
    'Will this run before all LogAUserIn.feature test, but NEVER for other feature files?'
  )
})

beforeEach(() => {
  cy.log(
    'This will run before every scenario of LogAUserIn.feature test, but NEVER for other feature files'
  )
  cy.fixture('remoteFixtures.json').then(data =>
    cy.request(data.users).then(json => {
      cy.writeFile('cypress/fixtures/users.json', json.body)
      cy.fixture('users.json').as('users')
    })
  )
})

let loginMoment

Given("un utilisateur non identifié sur l'interface d'identification", () => {
  cy.visit('/login')
  cy.getCookie('user_session').should('not.exist')
})

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  function() {
    const user = this.users.invalidUser
    connectWithUserCredentials(user.email, user.password)
  }
)

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe valides",
  function() {
    const user = this.users.producers[0]
    connectWithUserCredentials(user.email, user.password)
    loginMoment = moment()
  }
)

When(
  "un utilisateur s'identifie avec un e-mail valide et un mot de passe invalide",
  function() {
    const user = this.users.producers[0]
    connectWithUserCredentials(user.email, user.password + 'a')
  }
)

Then("sa session sécurisée s'ouvre pour {SessionDuration}", duration => {
  const cookie = cy.getCookie('user_session')
  console.log('cookie = ', cookie.expiry)
  cookie
    .should('exist')
    .and('have.property', 'httpOnly', true)
    .and('have.property', 'secure', true)
    .and('have.property', 'expiry')
  if (cookie.expiry !== undefined) {
    const expiryDate = moment(cookie.expiry)
    expect(
      moment.duration(expiryDate.diff(loginMoment)).asSeconds()
    ).to.be.closeTo(duration.asSeconds(), 60)
  }
})

Then(
  "il obtient un message d'erreur stipulant que ses identifiants sont incorrects",
  () => {
    cy.get('.incorrectIdentifiers')
      .should('exist')
      .and('be.visible')
  }
)

Then("il ne peut plus accéder à l'interface d'identification", () => {
  cy.visit('/login')
  cy.url().should('not.match', '/login')
})
