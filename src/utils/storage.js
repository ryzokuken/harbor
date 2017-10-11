const Store = require('electron-store');
const store = new Store();

function setLastUsedCredentials({ username, password }) {
  store.set('last-used', { username, password });
}

function getLastUsedCredentials() {
  return store.get('last-used');
}

function addCredentials({ username, password, label }) {
  label = label || username;
  if(!store.has('credentials-array')) {
    store.set('credentials-array', { label: { username, password } });
  } else {
    const credentials = store.get('credentials-array');
    credentials[label] = { username, password };
    store.set('credentials-array');
  }
}

function getAllCredentials() {
  return store.get('credentials-array');
}

function deleteCredential(label) {
  if(!store.has('credentials-array'))
    return;
  const credentials = store.get('credentials-array');
  credentials[label] = undefined;
  return store.set('credentials-array', credentials);
}


module.exports = {
  setLastUsedCredentials,
  getLastUsedCredentials,
  addCredentials,
  getAllCredentials,
  deleteCredential,
};
