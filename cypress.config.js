const { defineConfig } = require('cypress');
const { Pool } = require('pg');

module.exports = defineConfig({
  e2e: {
    // theme: 'dark',
    // darkMediaQuery: true,
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: 'jelani.db.elephantsql.com',
        user: 'lnmbeugf',
        password: 'WdSmgCdJgPWTpHnmC325kosxkcTBF-5W',
        database: 'lnmbeugf',
        port: 5432,
      });
      on('before:browser:launch', (browser = {}, args) => {
        console.log('browser', browser);

        if (browser.family === 'chrome') {
          console.log('adding dark mode browser flags');
          args.push('--force-dark-mode=true');

          return args;
        }
      });
      on('task', {
        removeUser(email) {
          return new Promise((resolve) => {
            pool.query(
              'DELETE FROM public.users WHERE email = $1',
              [email],
              (error, result) => {
                if (error) {
                  throw error;
                }
                resolve({ success: result });
              }
            );
          });
        },
      });
    },
  },
});
