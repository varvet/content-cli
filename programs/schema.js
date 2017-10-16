const columnify = require('columnify');
const inquirer = require('inquirer');
const { login } = require('../helpers');
const { fetchSchema } = require('../fetches/schema');

module.exports = (program) => {
  program
    .command('schema <space>')
    .description('Show schema')
    .action(space => {
      login().then(token => {
        fetchSchema(token, space).then(schema => {
          console.log(
            JSON.stringify(schema.data.attributes.schema, null, 2)
          );
        });
      });
    });

  program
    .command('schema:update <space> <schema>')
    .description('Update schema')
    .action(() => {
      console.log('Not yet implemented');
    });
}
