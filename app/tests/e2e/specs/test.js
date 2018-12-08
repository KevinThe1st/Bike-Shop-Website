// https://docs.cypress.io/api/introduction/api.html

describe('Navigation Bar', () => {
  it('Shop Button', () => {
    cy.visit('/');
    cy.get('#NavbarShop').click();
    cy.location('pathname').should('eq', '/shop');
  });

  it('Service Button', () => {
    cy.contains('Services').click();
    cy.location('pathname').should('eq', '/services');
  });

  it('About Button', () => {
    cy.contains('About').click();
    cy.location('pathname').should('eq', '/about');
  });
});

describe('Purchase an item', () => {
  it('Login as admin', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('#loginUsernameInput').type('admin');
    cy.get('#loginPasswordInput').type('password');
    cy.get('#loginButton').click();
  });

  it('Visit shop and add item', () => {
    cy.get('#NavbarShop').click();
    cy.location('pathname').should('eq', '/shop');
    cy.contains('Add to Cart').click();
  });
    
  it('View cart and checkout', () => {
    cy.contains('Profile').click();
    cy.contains('Cart').click();
    cy.contains('Proceed to Checkout').click();
    cy.contains('Place your order').click();
  });
});

describe('Edit account information', () => {
  it('Change account name', () => {
    // Login as admin
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('#loginUsernameInput').type('admin');
    cy.get('#loginPasswordInput').type('password');
    cy.get('#loginButton').click();

    // Visit acooount page
    cy.contains('Profile').click();
    cy.contains('Account').click();
    cy.location('pathname').should('eq', '/account');

    // Change name
    cy.contains('Update').click();
    cy.get('#exampleInputFirstName1').type('LeBron');
    cy.get('#exampleInputLastName1').type('Sprite Cranberry');
    cy.get('#saveProfileChanges').click();
  });
});