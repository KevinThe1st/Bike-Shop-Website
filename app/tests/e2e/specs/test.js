// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', function() {
  it('Does not do much!', function() {
    expect(true).to.equal(true)
  })
})

describe('Home Page', () => {
  it('Title', () => {
    cy.visit('/');
    cy.contains('Foxycle Cyclery');
  });
});
