import loginPage from '../support/pages/login';
import dashPage from '../support/pages/dash';

describe('login', () => {
  context('quando o usuário é muito bom', () => {
    const user = {
      name: 'Ellie',
      email: 'ellie@tlou.com',
      password: 'qwerty@123',
      is_provider: true,
    };

    before(() => {
      cy.postUser(user);
    });
    it('deve logar com sucesso', () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      dashPage.header.userLoggedIn(user.name);
    });
  });

  context('quando o usuário é bom mas a senha está incorreta', () => {
    let user = {
      name: 'Ellie',
      email: 'ellie@tlou.com',
      password: 'pwd123',
      is_provider: true,
    };

    before(() => {
      cy.postUser(user).then(() => {
        user.password = 'abc123';
      });
    });

    it('deve notificar erro de credenciais', () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      const message =
        'Ocorreu um erro ao fazer login, verifique suas credenciais.';
      loginPage.toast.shouldHaveText(message);
    });
  });
});
