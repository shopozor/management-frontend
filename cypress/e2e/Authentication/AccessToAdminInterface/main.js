import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  connectWithUserCredentialsViaGui,
  getTokenCookie
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import '../../../../common/cypress/integration/Authentication/common/SessionDurationType'
import types from '../../../../common/types'

Given('un utilisateur non identifié', () => {
  getTokenCookie().should('not.exist')
})

When("un utilisateur accède à l'interface admin", function () {
  cy.visit('/')
})

When(
  "un Consommateur s'identifie avec un e-mail et un mot de passe valides",
  function () {
    cy.visit('/')
    cy.fixture(`Authentication/Credentials/Consommateur`)
      .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
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
  cy.url().should('not.include', types.links.SIGNUP)
})

Then(
  "il obtient un message d'erreur stipulant que son compte n'a pas les droits d'administrateur",
  () => {
    cy.get('@graphql').then(() => {
      cy.get('.userIsNotStaff')
        .should('be.visible')
    })
  }
)
