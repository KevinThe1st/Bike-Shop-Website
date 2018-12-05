// https://docs.cypress.io/api/introduction/api.html

describe('Navigation Bar', () => {
  it('Shop Button', () => {
    cy.visit('/');
    cy.get('#NavbarShop').click();
    cy.location('pathname').should('eq', '/shop');
  });

  it('Service Button', () => {
    cy.visit('/');
    cy.contains('Services').click();
    cy.location('pathname').should('eq', '/services');
  });

  it('About Button', () => {
    cy.visit('/');
    cy.contains('About').click();
    cy.location('pathname').should('eq', '/about');
  });

  it('Register', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.contains('Register').click();
    cy.get('#username-box').type('username1');
    cy.get('#createUserPasswordInput').type('password');
    cy.get('#createUserFirstNameInput').type('e2e-customer-first');
    cy.get('#createUserLastNameInput').type('e2e-customer-last');
    cy.get('#button').click();
  });

  it('Login', () => {
    cy.contains('Login').click();
    cy.get('#loginUsernameInput').type('username1');
    cy.get('#loginPasswordInput').type('password');
    cy.get('#loginButton').click();
  });
});