import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import { login } from '../common/Helpers'

import '../common/PersonaType'

Given('un {PersonaType} connect� au Shopozor', function (persona) {
  login(persona)
})

When('il se d�connecte', function () {
  // 1. click the disconnect button
  return 'pending'
})

Then('sa session se ferme', function () {
  // 1. double-check that the authentication token is not present anymore in the cookies
  // 2. double-check that the user can access the login interface again
  return 'pending'
})

Then("il est redirig� vers l'interface d'identification", function (string) {
    // 1. double-check that the user is routed to the login page
  return 'pending'
})
