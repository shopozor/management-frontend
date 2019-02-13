import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import { login } from '../common/Helpers'

import '../common/PersonaType'

Given('un {PersonaType} connecté au Shopozor', function (persona) {
  login(persona)
})

When('il se déconnecte', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('sa session se ferme', function () {
  // 1. double-check that the authentication token is not present anymore in the cookies
  // 2. double-check that the "me" query returns failure
  return 'pending'
})

Then("il est redirigé vers l'interface d'identification", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
