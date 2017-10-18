const columnify = require('columnify');
const inquirer = require('inquirer');
const { login } = require('../helpers');
const { getSpaces, createSpace } = require('../fetches/spaces');

module.exports = (program) => {
  program
    .command('spaces')
    .description('List spaces')
    .action(() => {
      login().then(token => {
        getSpaces(token).then(response => {
          const data = response.data.map(space => {
            return {
              id: space.id,
              name: space.attributes.name,
              token: space.attributes.cdaToken
            }
          });
          console.log(columnify(data));
        });
      }).catch(error => { console.error(error); process.exit(1); });
    });

  program
    .command('spaces:create')
    .description('Create a space')
    .action(() => {
      console.log('Not yet implemented');
    });

  program
    .command('spaces:rename <space>')
    .description('Rename a space')
    .action(() => {
      console.log('Not yet implemented');
    });

  program
    .command('spaces:destroy <space>')
    .description('Destroy a space')
    .action(() => {
      console.log('Not yet implemented');
    });
}
