const fetch = require('../fetch.js');

module.exports.getSchema = (token, space) => {
  return fetch(`cma/spaces/${space}/schema`, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  })
  .then(response => response.json());
}

module.exports.updateSchema = (token, space, schema) => {
  return fetch(`cma/spaces/${space}/schema`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        id: 'schema',
        type: 'schemas',
        attributes: {
          schema: schema
        }
      }
    })
  })
  .then(response => response.json());
}
