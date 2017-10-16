const inquirer = require('inquirer');
const { fetchSpaces } = require('./fetches/spaces');
const { fetchToken } = require('./fetches/tokens');

module.exports.login = () => {
  return inquirer.prompt([
    { type: 'input', name: 'email', message: 'E-mail' },
    { type: 'password', name: 'password', message: 'Password' }
  ]).then(answers => {
    return fetchToken(answers['email'], answers['password']);
  });
}
