import { UnsupportedPersona } from './Exceptions'

export function connectWithUserCredentials( email, password ) {
  cy.get( 'input[type=email]' ).type( email )
  cy.get( 'input[type=password]' ).type( password )
  cy.get( 'button[type=button]' )
    .contains( 'se connecter' )
    .click()
}

export function personaToUserData( users, persona ) {
  if ( persona === 'Producteur' ) {
    return users.producers[0]
  } else if ( persona === 'Responsable' ) {
    return users.managers[0]
  } else if ( persona === 'Rex' ) {
    return users.rex[0]
  } else if ( persona === 'Softozor' ) {
    return users.softozor[0]
  }
  throw UnsupportedPersona( `Persona ${persona} not supported` )
}