const fetch = require('../fetch.js');

module.exports.getSpaces = (token) => {
  return fetch('cma/spaces', {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  });
}

module.exports.createSpace = (token, name) => {
  return fetch('cma/spaces', {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        type: 'spaces',
        attributes: {
          name: name
        }
      }
    })
  });
}

module.exports.renameSpace = (token, space, name) => {
  return fetch(`cma/spaces/${space}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        id: space,
        type: 'spaces',
        attributes: {
          name: name
        }
      }
    })
  });
}
