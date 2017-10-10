const {ipcRenderer: ipc} = require('electron');

ipc.send('request-username');

ipc.on('username', (evt, username) => {
  document.getElementById('username').innerHTML = username;
});

document.getElementById('btn-logout').addEventListener('click', () => {
  ipc.send('logout');
});
