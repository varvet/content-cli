const columnify = require('columnify');
const inquirer = require('inquirer');
const fs = require('fs');
const { loggedInSpaceScopedCommand } = require('../helpers');
const { getSchema, updateSchema } = require('../fetches/schema');

module.exports = (program) => {
  program
    .command('schema <space>')
    .description('Show schema')
    .action(space => {
      loggedInSpaceScopedCommand(space).then(({token, spaceId}) => {
        getSchema(token, spaceId).then(response => {
          const schema = JSON.stringify(
            response.data.attributes.schema, null, 2
          );
          console.log(schema);
        });
      });
    });

  program
    .command('schema:update <space> <path>')
    .description('Update schema')
    .action((space, path) => {
      loggedInSpaceScopedCommand(space).then(({token, spaceId}) => {
        const schema = JSON.parse(
          fs.readFileSync(path)
        );

        updateSchema(token, spaceId, schema).then(response => {
          if (response.data) {
            console.log('Schema updated');
          } else {
            console.error('Something went wrong'); process.exit(1);
          }
        });
      });
    });
}
