import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { duration } from 'moment'

import {
  connectWithUserCredentials,
  getTokenDuration,
  getTokenCookie
} from './Helpers'
import './SessionDurationType'
import './PersonaType'
import { injectResponseFixtureIfFaked } from '../../common/fakeServer'

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

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  function () {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/login')
    cy.fixture('Authentication/Credentials/InvalidEmailAndPassword')
      .then(user => connectWithUserCredentials(user.email, user.password))
  }
)

When(
  "un {PersonaType} s'identifie avec un e-mail et un mot de passe valides",
  function (persona) {
    injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
    cy.visit('/login')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentials(user.email, user.password))
  }
)

When(
  "un {PersonaType} s'identifie avec un e-mail valide et un mot de passe invalide",
  function (persona) {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/login')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentials(user.email, user.password + 'a'))
  }
)

Then("sa session s'ouvre pour {SessionDurationType}", expectedDuration => {
  cy.get('@graphql').then(() => {
    const token = getTokenCookie().value
    const tokenDuration = getTokenDuration(token)
    expect(duration(tokenDuration.diff(expectedDuration)).asSeconds()).to.be.closeTo(0, 10)
  })
})

Then(
  "il obtient un message d'erreur stipulant que ses identifiants sont incorrects",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.incorrectIdentifiers')
        .should('be.visible')
      // TODO: need to double-check that the contained message corresponds to WRONG_CREDENTIALS
    })
  }
)

Then(
  "il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.incorrectIdentifiers')
        .should('be.visible')
      // TODO: need to double-check that the contained message corresponds to USER_NOT_ADMIN
    })
  }
)
