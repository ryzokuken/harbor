const { ipcRenderer: ipc } = require('electron');
const toastr = require('toastr');

const spinnerHTML = '<div class="spinner"><div class="cube1"></div><div class="cube2"></div></div>';

document.getElementById('btn-login').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  ipc.send('login', { username, password });
  document.getElementsByClassName('container')[0].innerHTML = spinnerHTML;
});

ipc.send('request-error');

ipc.on('error', (evt, msg) => {
  toastr.error(msg);
});
