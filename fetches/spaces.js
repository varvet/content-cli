const fetch = require('../client.js');

module.exports.getSpaces = (token) => {
  return fetch('/cma/spaces', {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  });
}
