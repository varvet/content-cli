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
              id: space.id,
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
    .command('spaces:rename <space> <name>')
    .description('Rename a space')
    .action((space, name) => {
      loggedInSpaceScopedCommand(space).then(({token, spaceId}) => {
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
    .command('spaces:destroy <space>')
    .description('Destroy a space')
    .action(space => {
      loggedInSpaceScopedCommand(space).then(({token, spaceId}) => {
        destroySpace(token, spaceId).then(response => {
          console.log('Space destroyed');
        });
      });
    });
}
