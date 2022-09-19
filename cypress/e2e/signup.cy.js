import signupPages from '../support/pages/signup';

describe('cadastro', () => {
  context('quando o usuário é novato', () => {
    const user = {
      name: 'Ellie',
      email: 'ellie@tlou.com',
      password: 'qwerty@123',
    };

    before(() => {
      cy.task('removeUser', user.email).then((result) => {
        console.log(result);
      });
    });
    it('deve cadastrar um novo usuário', () => {
      signupPages.go();
      signupPages.form(user);
      signupPages.submit();
      signupPages.toast.shouldHaveText(
        'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!'
      );
    });
  });

  context('quando o email já existe', () => {
    const user = {
      name: 'Joel',
      email: 'joel@tlou.com',
      password: 'qwerty@123',
      is_provider: true,
    };

    before(() => {
      cy.task('removeUser', user.email).then((result) => {
        console.log(result);
      });

      cy.request('POST', 'http://localhost:3333/users', user).then(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
    });
    it('não deve cadastrar o usuário', () => {
      signupPages.go();
      signupPages.form(user);
      signupPages.submit();
      signupPages.toast.shouldHaveText(
        'Email já cadastrado para outro usuário.'
      );
    });
  });

  context('quando o email é incorreto', () => {
    const user = {
      name: 'Abby',
      email: 'abby.tlou.com',
      password: 'qwerty@123',
    };
    it('deve exibir mensagem de alerta', () => {
      signupPages.go();
      signupPages.form(user);
      signupPages.submit();
      signupPages.alerthaveText('Informe um email válido');
    });
  });

  context('quando a senha não atende ao caracteres necessários', () => {
    const passwords = ['1', '12', '123', '1234', '12345', '12345'];

    beforeEach(() => {
      signupPages.go();
    });

    passwords.forEach((p) => {
      it('não deve cadastrar com a senha: ' + p, () => {
        const user = {
          name: 'Tommy',
          email: 'tommy@tlou.com',
          password: p,
        };
        signupPages.form(user);
        signupPages.submit();
      });
    });
    afterEach(() => {
      signupPages.alerthaveText('Pelo menos 6 caracteres');
    });
  });

  context('quando não preencho nenhum dos campos', () => {
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ];

    before(() => {
      signupPages.go();
      signupPages.submit();
    });

    alertMessages.forEach((alert) => {
      it('deve exibir' + alert.toLowerCase(), () => {
        signupPages.alerthaveText(alert);
      });
    });
  });
});
