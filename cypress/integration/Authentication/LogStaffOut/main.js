import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import { login, navigateTo, getTokenCookie, wait } from '../../../../common/cypress/integration/Authentication/common/Helpers'

import '../../../../common/cypress/integration/Authentication/common/PersonaType'

import types from '../../../../common/src/types'

Given('un {PersonaType} connecté au Shopozor', function (persona) {
  login(persona)
})

When('il se déconnecte', function () {
  getTokenCookie().then(token => console.log('sa session est ouverte', token))
  // 1. click the disconnect button
  navigateTo(types.links.LOGOUT)
})

Then('sa session se ferme', function () {
  // 1. double-check that the authentication token is not present anymore in the cookies
  console.log('avant')
  getTokenCookie().then(token => console.log('sa session se ferme', token))
})

Then("il est redirigé vers l'interface d'identification", function (string) {
    // 1. double-check that the user is routed to the login page
  return 'pending'
})
