const fetch = require('node-fetch');

module.exports.fetchSchema = (token, space) => {
  return fetch(`http://localhost:3000/cma/spaces/${space}/schema`, {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  })
  .then(response => response.json())
  .catch(error => { console.error(error); process.exit(1); });
}
