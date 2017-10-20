const columnify = require('columnify');
const inquirer = require('inquirer');
const { loggedInCommand, loggedInSpaceScopedCommand } = require('../helpers');
const { getSpaces, createSpace, renameSpace, destroySpace } = require('../fetches/spaces');

module.exports = (program) => {
  program
    .command('spaces')
    .description('List spaces')
    .action(() => {
      loggedInCommand().then(token => {
        getSpaces(token).then(response => {
          const data = response.data.map(space => {
            return {
              name: space.attributes.name,
              token: space.attributes.cdaToken
            }
          });
          console.log(columnify(data));
        });
      });
    });

  program
    .command('spaces:create <name>')
    .description('Create a space')
    .action(name => {
      loggedInCommand().then(token => {
        createSpace(token, name).then(response => {
          if (response.data) {
            console.log('Space created');
          } else {
            console.error('Something went wrong'); process.exit(1);
          }
        });
      });
    });

  program
    .command('spaces:rename <name>')
    .description('Rename a space')
    .option('-s, --space <space>', 'Which space')
    .action((name, options) => {
      loggedInSpaceScopedCommand(options.space).then(({token, spaceId}) => {
        renameSpace(token, spaceId, name).then(response => {
          if (response.data) {
            console.log('Space renamed');
          } else {
            console.error('Something went wrong'); process.exit(1);
          }
        });
      });
    });

  program
    .command('spaces:destroy')
    .description('Destroy a space')
    .option('-s, --space <space>', 'Which space')
    .action(options => {
      loggedInSpaceScopedCommand(options.space).then(({token, spaceId}) => {
        destroySpace(token, spaceId).then(response => {
          console.log('Space destroyed');
        });
      });
    });
}
