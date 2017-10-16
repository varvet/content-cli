const columnify = require('columnify');
const inquirer = require('inquirer');
const { login } = require('../helpers');
const { fetchSpaces, createSpace } = require('../fetches/spaces');

module.exports = (program) => {
  program
    .command('spaces')
    .description('List your spaces')
    .action(() => {
      login().then(token => {
        fetchSpaces(token).then(spaces => {
          const data = spaces.data.map(space => {
            return {
              id: space.id,
              title: space.attributes.title,
              token: space.attributes.cdaToken
            }
          });
          console.log(columnify(data));
        });
      });
    });

  program
    .command('spaces:create <title>')
    .description('Creates a new space')
    .action(title => {
      login().then(token => {
        createSpace(token, title).then(response => {
          if (response.data) {
            console.log('Space created');
          } else {
            console.error('Something went wrong'); process.exit(1);
          }
        });
      });
    });
}
