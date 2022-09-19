import { faker } from '@faker-js/faker';

it('deve cadastrar um novo usuário', () => {
  const name = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  cy.visit('/signup');

  cy.get('input[placeholder="Nome"]').type(name);
  cy.get('input[placeholder="E-mail"]').type(email);
  cy.get('input[placeholder="Senha"]').type(password);

  cy.contains('button', 'Cadastrar').click();

  cy.get('.toast')
    .should('be.visible')
    .find('p')
    .should(
      'have.text',
      'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!'
    );
});
