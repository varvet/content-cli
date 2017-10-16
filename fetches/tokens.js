const fetch = require('node-fetch');

module.exports.fetchToken = (email, password) => {
  return fetch('http://localhost:3000/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(response => {
    if (response.token) {
      return response.token;
    } else {
      throw 'Incorrect credentials';
    }
  })
  .catch(error => { console.error(error); process.exit(1); });
}
