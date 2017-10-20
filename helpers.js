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

const loggedInSpaceScopedCommand = (spaceName) => {
  return loggedInCommand().then(token => {
    return getSpaces(token).then(response => {
      const spaces = response.data.map(space => {
        return {
          id: space.id,
          name: space.attributes.name,
          token: space.attributes.cdaToken
        }
      });

      if (spaceName) {
        const space = spaces.find(space => {
          return space.name === spaceName;
        });
        return Promise.resolve({ token: token, spaceId: space.id });
      } else {
        return inquirer.prompt([
          { type: 'list', name: 'space', message: 'Select space', choices: spaces.map(space => {
            return {
              name: space.name,
              value: space.id
            }
          }) }
        ]).then(answers => {
          return Promise.resolve({ token: token, spaceId: answers.space });
        })
      }
    });
  })
  .catch(error => { console.error(error); process.exit(1); });
}

module.exports.loggedInSpaceScopedCommand = loggedInSpaceScopedCommand;
