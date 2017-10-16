const inquirer = require('inquirer');
const { getSpaces } = require('./fetches/spaces');
const { getToken } = require('./fetches/tokens');

module.exports.login = () => {
  return inquirer.prompt([
    { type: 'input', name: 'email', message: 'E-mail' },
    { type: 'password', name: 'password', message: 'Password' }
  ]).then(answers => {
    return getToken(answers['email'], answers['password']);
  });
}
