import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import { login, navigateTo, getTokenCookie } from '../../../../common/cypress/integration/Authentication/common/Helpers'

import '../../../../common/cypress/integration/Authentication/common/PersonaType'

import types from '../../../../common/src/types'

const WAITING_MS_AFTER_ENTERING_LOGOUT = 100
const WAITING_MS_AFTER_FINISHING_LOGOUT = 100

Given('un {PersonaType} connecté au Shopozor', function (persona) {
  login(persona)
})

When('il se déconnecte', function () {
  // 1. click the disconnect button
  navigateTo(types.links.LOGOUT)
})

Then('sa session se ferme', function () {
  // 1. double-check that the authentication token is not present anymore in the cookies
  cy.wait(WAITING_MS_AFTER_ENTERING_LOGOUT).then(() => {
    getTokenCookie().should('to.be', null)
  })
})

Then("il est redirigé vers l'interface d'identification", function (string) {
    // 1. double-check that the user is routed to the login page
  cy.wait(WAITING_MS_AFTER_FINISHING_LOGOUT).then(() => {
    cy.url().should('include', '/login')
  })
})
