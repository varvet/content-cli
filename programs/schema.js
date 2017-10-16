const columnify = require('columnify');
const inquirer = require('inquirer');
const fs = require('fs');
const { login } = require('../helpers');
const { getSchema, updateSchema } = require('../fetches/schema');

module.exports = (program) => {
  program
    .command('schema <space>')
    .description('Show schema')
    .action(space => {
      login().then(token => {
        getSchema(token, space).then(response => {
          const schema = JSON.stringify(
            response.data.attributes.schema, null, 2
          );
          console.log(schema);
        });
      }).catch(error => { console.error(error); process.exit(1); });
    });

  program
    .command('schema:update <space> <path>')
    .description('Update schema')
    .action((space, path) => {
      login().then(token => {
        const schema = JSON.parse(
          fs.readFileSync(path)
        );

        updateSchema(token, space, schema).then(response => {
          if (response.data) {
            console.log('Schema updated');
          } else {
            console.error('Something went wrong'); process.exit(1);
          }
        });
      }).catch(error => { console.error(error); process.exit(1); });
    });
}
