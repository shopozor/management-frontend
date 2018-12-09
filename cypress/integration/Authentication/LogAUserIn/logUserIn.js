import { Given, When } from 'cypress-cucumber-preprocessor/steps'

import checkUserUndefined from './UserDefinitionHelpers'

before(() => {
  cy.log(
    'Will this run before all LogAUserIn.feature test, but NEVER for other feature files?'
  )
})

beforeEach(() => {
  cy.log(
    'This will run before every scenario of LogAUserIn.feature test, but NEVER for other feature files'
  )
  cy.fixture('remoteFixtures.json').then(data =>
    cy.request(data.users).then(json => {
      cy.writeFile('cypress/fixtures/users.json', json.body)
    })
  )
})

Given("un utilisateur non identifié sur l'interface d'identification", () => {
  cy.visit('/login')
  cy.getCookie('user_session').should('not.exist')
})

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  () => {
    cy.fixture('users.json').then(data => {
      checkUserUndefined(data.users, data.invalidUser)
      cy.get('input[type=email]').type(data.invalidUser.email)
      cy.get('input[type=password]').type(data.invalidUser.password)
      cy.get('button[type=button]')
        .contains('se connecter')
        .click()
    })
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
