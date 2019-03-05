import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  connectWithUserCredentialsViaGui,
  getTokenDuration,
  getTokenCookie
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import '../../../../common/cypress/integration/Authentication/common/SessionDurationType'
import TokenHandler from '../../../../common/cypress/integration/Authentication/common/TokenHandler'
import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'
import { Promise } from 'bluebird';

before(() => {
  cy.log(
    'Will this run before all LogAUserIn.feature test, but NEVER for other feature files?'
  )
})

beforeEach(() => {
  cy.log('This will run before every scenario of LogAUserIn.feature test, but NEVER for other feature files')
})

Given('^un utilisateur non identifié$', () => {
  getTokenCookie().should('not.exist')
})

When(
  "^un utilisateur s'identifie avec un e-mail et un mot de passe invalides$",
  function () {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/login')
    cy.fixture('Authentication/Credentials/InvalidEmailAndPassword')
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
  }
)

When(
  "^un {PersonaType} s'identifie avec un e-mail et un mot de passe valides$",
  function (persona) {
    injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
    cy.visit('/login')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
  }
)

When(
  "^un {PersonaType} s'identifie avec un e-mail valide et un mot de passe invalide$",
  function (persona) {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/login')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password + 'a'))
  }
)

Then("^sa session s'ouvre pour {SessionDurationType}$", expectedDuration => {
  cy.get('@graphql').then(() => {
    const handler = new TokenHandler
    handler.getToken().then(token => {
      const tokenDuration = getTokenDuration(token)
      expect(tokenDuration.asSeconds()).to.equal(expectedDuration.asSeconds())
    })
  })
})

Then(
  "^il obtient un message d'erreur stipulant que ses identifiants sont incorrects$",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.incorrectIdentifiers')
        .should('be.visible')
    })
  }
)

Then(
  "^il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur$",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.userIsNotStaff')
        .should('be.visible')
    })
  }
)
