// TODO: try to use the background for loading the data?
// double-check this: https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/issues/25

import { Given, When } from 'cypress-cucumber-preprocessor/steps'

beforeEach(() => {
  cy.log(
    'This will run before every scenario of LogAUserIn.feature test, but NEVER for other feature files'
  )
})

// before(() => {
// cy.server()
// // cy.fixture('users').as('usersJSON')
// cy.route(
//   'GET',
//   'https://raw.githubusercontent.com/softozor/shopozor-configuration/master/apis/saleor-api/testing/user-data.json'
// ).then(resp => console.log('resp = ', resp))
// cy.wait('@usersJSON')
// console.log('users = ', cy.get('@usersJSON'))
// cy.fixture('users').then(json => {
//   cy.route(
//     'GET',
//     'https://raw.githubusercontent.com/softozor/shopozor-configuration/master/apis/saleor-api/testing/user-data.json',
//     json
//   )
//   console.log('users = ', json)
// })
// cy.get('@usersJSON').then(json => {
//   console.log('users = ', json)
// })
// this.usersJSON.then(json => {
//   console.log('users = ', json)
// })
// cy.request(
//   'https://raw.githubusercontent.com/softozor/shopozor-configuration/master/apis/saleor-api/testing/user-data.json'
// ).then(json => console.log('users = ', json))
// })

Given("un utilisateur non identifié sur l'interface d'identification", () => {
  // cy.fixture()

  cy.visit('/login')
  cy.getCookie('user_session').should('not.exist')
})

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  () => {
    cy.get('input[type=email]').type('test@test.com')
    cy.get('input[type=password]').type('password')
    cy.get('button[type=button]')
      .contains('se connecter')
      .click()
    // TODO: get users' list and double-check that the user isn't in that list!
  }
)

/*
when(
  "un utilisateur s'identifie avec un e-mail et un mot de passe valides",
  () => {
    // Write code here that turns the phrase above into concrete actions
    pending()
  }
)

when(
  "un utilisateur s'identifie avec un e-mail valide et un mot de passe invalide",
  function() {
    // Write code here that turns the phrase above into concrete actions
    pending()
  }
)

then("sa session s'ouvre", () => {
  // Write code here that turns the phrase above into concrete actions
  pending()
})

then(
  "il obtient un message d'erreur stipulant que ses identifiants sont incorrects",
  () => {
    // Write code here that turns the phrase above into concrete actions
    pending()
  }
)*/
