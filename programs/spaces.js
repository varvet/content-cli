const columnify = require('columnify');
const inquirer = require('inquirer');
const { login } = require('../helpers');
const { fetchSpaces, createSpace } = require('../fetches/spaces');

module.exports = (program) => {
  program
    .command('spaces')
    .description('List spaces')
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
}
