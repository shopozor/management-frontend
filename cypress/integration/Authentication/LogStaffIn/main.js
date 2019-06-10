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
import types from '../../../../common/types'

before(() => {
  cy.log(
    'Will this run before all LogAUserIn.feature test, but NEVER for other feature files?'
  )
})

beforeEach(() => {
  cy.log('This will run before every scenario of LogAUserIn.feature test, but NEVER for other feature files')
})

Given('un utilisateur non identifié', () => {
  getTokenCookie().should('not.exist')
})

When("un utilisateur accède à l'interface admin", function () {
  cy.visit('/')
})

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  function () {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/')
    cy.fixture('Authentication/Credentials/NewCustomer')
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
  }
)

When(
  "un {PersonaType} s'identifie avec un e-mail et un mot de passe valides",
  function (persona) {
    injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
    cy.visit('/')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
  }
)

When(
  "un {PersonaType} s'identifie avec un e-mail valide et un mot de passe invalide",
  function (persona) {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password + 'a'))
  }
)

Then("il doit s'identifier", function () {
  cy.get('input[type=email]').should('exist')
  cy.get('input[type=password]').should('exist')
  cy.get('button[id="loginButton"]').should('exist')
})

Then("n'a pas accès à un menu utilisateur", function () {
  cy.get('.burger-menu').should('have.class', 'disabled')
  cy.get('.q-layout-drawer').should('not.be.visible')
})

Then("n'a pas accès à un lien pour s'enregistrer", function () {
  cy.visit(`/${types.links.SIGNUP}`)
  cy.url().should("not.include", types.links.SIGNUP)
})

Then("sa session s'ouvre pour {SessionDurationType}", expectedDuration => {
  cy.get('@graphql').then(() => {
    const handler = new TokenHandler
    handler.getToken().then(token => {
      const tokenDuration = getTokenDuration(token)
      expect(tokenDuration.asSeconds()).to.equal(expectedDuration.asSeconds())
    })
  })
})

Then(
  "il obtient un message d'erreur stipulant que ses identifiants sont incorrects",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.incorrectIdentifiers')
        .should('be.visible')
    })
  }
)

Then(
  "il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.userIsNotStaff')
        .should('be.visible')
    })
  }
)
