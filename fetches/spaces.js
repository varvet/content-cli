const fetch = require('node-fetch');

module.exports.fetchSpaces = (token) => {
  return fetch('http://localhost:3000/cma/spaces', {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  })
  .then(response => response.json())
  .catch(error => { console.error(error); process.exit(1); });
}

module.exports.createSpace = (token, title) => {
  return fetch('http://localhost:3000/cma/spaces', {
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
          title: title
        }
      }
    })
  })
  .then(response => response.json())
  .catch(error => { console.error(error); process.exit(1); });
}
