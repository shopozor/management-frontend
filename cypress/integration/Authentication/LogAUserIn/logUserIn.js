import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
const moment = require( 'moment' )

import { connectWithUserCredentials, personaToUserData } from './Helpers'
import './SessionDurationType'
import './PersonaType'

before(() => {
  cy.log(
    'Will this run before all LogAUserIn.feature test, but NEVER for other feature files?'
  )
})

beforeEach(() => {
  cy.log('This will run before every scenario of LogAUserIn.feature test, but NEVER for other feature files')
})

Given('un utilisateur non identifié', () => {
  cy.getCookie('user_session').should('not.exist')
})

When(
  "un utilisateur s'identifie avec un e-mail et un mot de passe invalides",
  function () {
    cy.fakeServer(({ operationName, variables }) => {
      return { 
        data:  {
          tokenCreate: {
            token: null,
            user: null,
            errors: {
              field: null,
              message: "Please, enter valid credentials"
            } 
          }
        }
      }
    })
    cy.visit('/login')
    const user = {
      email: 'invalid@shopozor.ch',
      password: 'password'
    }
    connectWithUserCredentials(user.email, user.password)
  }
)

When(
  "un {Persona} s'identifie avec un e-mail et un mot de passe valides",
  function (persona) {
    const user = personaToUserData(this.users, persona)
    connectWithUserCredentials(user.email, user.password)
    loginMoment = moment()
  }
)

When(
  "un {Persona} s'identifie avec un e-mail valide et un mot de passe invalide",
  function (persona) {
    const user = personaToUserData(this.users, persona)
    connectWithUserCredentials(user.email, user.password + 'a')
  }
)

Then("sa session s'ouvre", () => {
  const cookie = cy.getCookie('user_session')
  console.log('cookie = ', cookie.expiry)
  cookie
    .should('exist')
    .and('have.property', 'expiry')
  if (cookie.expiry !== undefined) {
    const expiryDate = moment(cookie.expiry)
    expect(
      moment.duration(expiryDate.diff(loginMoment)).asSeconds()
    ).to.be.closeTo(duration.asSeconds(), 60)
  }
})

Then(
  "il obtient un message d'erreur stipulant que ses identifiants sont incorrects",
  () => {
    cy.get('.incorrectIdentifiers')
      .should('exist')
      .and('be.visible')
  }
)

Then("il ne peut plus accéder à l'interface d'identification", () => {
  cy.visit('/login')
  cy.url().should('not.match', '/login')
})
