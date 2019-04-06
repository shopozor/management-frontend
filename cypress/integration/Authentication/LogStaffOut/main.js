import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  login,
  navigateTo,
  getTokenCookie
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import types from '../../../../common/src/types'

Given('un {PersonaType} connecté au Shopozor', function (persona) {
  login(persona)
})

When('il se déconnecte', function () {
  navigateTo(types.links.LOGOUT)
})

Then('sa session se ferme', function () {
  getTokenCookie().should('not.exist')
})

Then("il est redirigé vers l'interface d'identification", function () {
  cy.url().should('include', '/login')
})
