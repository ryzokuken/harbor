const request = require('request');
const {parseString} = require('xml2js');

const login = (username, password) => {
  const options = {
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
        parseString(body, (err, result) => {
          reject(result.requestresponse.message[0]);
        });
      }
    });
  });
};

const logout = (username) => {
  const options = {
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

const checkLiveStatus = (username) => {
  const options = {
    method: 'GET',
    url: 'http://172.16.68.6:8090/live',
    qs: {mode: '192', username}
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      if (body.includes('ack')) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

module.exports = {login, logout, checkLiveStatus};
