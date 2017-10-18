const fetch = require('../fetch.js');

module.exports.getToken = (email, password) => {
  return fetch('tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.token) {
      return response.token;
    } else {
      throw 'Incorrect credentials';
    }
  });
}
