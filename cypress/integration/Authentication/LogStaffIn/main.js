import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { duration } from 'moment'

import {
  connectWithUserCredentialsViaGui,
  getTokenDuration
} from './Helpers'
import { getTokenCookie } from '../common/Helpers'
import './SessionDurationType'
import '../common/PersonaType'
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
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
  }
)

When(
  "un {PersonaType} s'identifie avec un e-mail et un mot de passe valides",
  function (persona) {
    injectResponseFixtureIfFaked(`Authentication/LogStaffIn/Responses/${persona}`)
    cy.visit('/login')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
  }
)

When(
  "un {PersonaType} s'identifie avec un e-mail valide et un mot de passe invalide",
  function (persona) {
    injectResponseFixtureIfFaked('Authentication/LogStaffIn/Responses/WrongCredentials')
    cy.visit('/login')
    cy.fixture(`Authentication/Credentials/${persona}`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password + 'a'))
  }
)

Then("sa session s'ouvre pour {SessionDurationType}", expectedDuration => {
  cy.get('@graphql').then(() => {
    // TODO: peut-on s'affranchir du "should" qui ne sert qu'à accéder au cookie ?
    cy.getCookie('token').should('exist').then(cookie => {
      console.log(cookie)
      const tokenDuration = getTokenDuration(cookie.value)
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
      // TODO: need to double-check that the contained message corresponds to WRONG_CREDENTIALS
    })
  }
)

Then(
  "il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.userIsNotStaff')
        .should('be.visible')
      // TODO: need to double-check that the contained message corresponds to USER_NOT_ADMIN
    })
  }
)
