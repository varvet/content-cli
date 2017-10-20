const inquirer = require('inquirer');
const { getSpaces } = require('./fetches/spaces');
const { getToken } = require('./fetches/tokens');

const loggedInCommand = () => {
  return inquirer.prompt([
    { type: 'input', name: 'email', message: 'E-mail' },
    { type: 'password', name: 'password', message: 'Password' }
  ]).then(answers => {
    return getToken(answers['email'], answers['password']);
  })
  .catch(error => { console.error(error); process.exit(1); });
}

module.exports.loggedInCommand = loggedInCommand;

const loggedInSpaceScopedCommand = (spaceId) => {
  return loggedInCommand().then(token => {
    return Promise.resolve({ token: token, spaceId: spaceId });
  })
  .catch(error => { console.error(error); process.exit(1); });
}

module.exports.loggedInSpaceScopedCommand = loggedInSpaceScopedCommand;
