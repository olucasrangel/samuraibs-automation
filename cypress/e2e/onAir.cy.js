it('deve iniciar o webapp', () => {
  cy.visit('/');

  cy.title().should('eq', 'Samurai Barbershop by QAninja');
});
