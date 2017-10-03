var request = require('request');

const login = (username, password) => {
  var options = {
    method: 'POST',
    url: 'http://172.16.68.6:8090/login.xml',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {mode: '191', username, password}
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        throw new Error(error);
      }

      if (body.includes('You have successfully logged into JIIT Internet Server.')) {
        resolve(body);
      } else {
        reject(body);
      }
    });
  });
}

const logout = (username) => {
  var options = {
    method: 'POST',
    url: 'http://172.16.68.6:8090/login.xml',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {mode: '193', username}
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        throw new Error(error);
      }

      if (body.includes('You have successfully logged off from JIIT Internet Server.')) {
        resolve(body);
      } else {
        reject(body);
      }
    });
  });
};

module.exports = {login, logout};
