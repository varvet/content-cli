const fetch = require('node-fetch');

const baseUrl = process.env.URL || 'https://content.varvet.com';

module.exports = (url, options) => {
  return fetch(`${baseUrl}/${url}`, options)
  .then(response => response.json())
  .catch(error => { console.error(error); process.exit(1); });
}
