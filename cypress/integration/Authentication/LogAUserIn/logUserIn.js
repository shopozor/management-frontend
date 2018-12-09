import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import { connectWithUserCredentials } from './Helpers'

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
    })
  )
})

Given("un utilisateur non identifié sur l'interface d'identification", () => {
  cy.visit('/login')
  cy.getCookie('user_session').should('not.exist')
})

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  () => {
    cy.fixture('users.json').then(data => {
      const user = data.invalidUser
      connectWithUserCredentials(user.email, user.password)
    })
  }
)

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe valides",
  () => {
    cy.fixture('users.json').then(data => {
      const user = data.users[0]
      connectWithUserCredentials(user.email, user.password)
    })
  }
)

When(
  "un utilisateur s'identifie avec un e-mail valide et un mot de passe invalide",
  () => {
    cy.fixture('users.json').then(data => {
      let user = data.users[0]
      connectWithUserCredentials(user.email, user.password + 'a')
    })
  }
)

// TODO: use the custom types for this duration:
Then("sa session s'ouvre pour {string}", duration => {
  cy.log(`durée = ${duration}`)
  cy.getCookie('user_session').should('exist')
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
