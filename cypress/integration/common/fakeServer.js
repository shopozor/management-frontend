export const injectResponseFixtureIfFaked = fixture => {
  if (Cypress.env('fakeGraphql')) {
    cy.fakeGraphqlResponseWithFixture(fixture)
  }
}