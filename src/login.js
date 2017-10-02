const {ipcRenderer: ipc} = require('electron');

document.getElementById('btn-login').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  ipc.send('login', {username, password});
});
