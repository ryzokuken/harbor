const {app, BrowserWindow, Menu, ipcMain: ipc} = require('electron');
const cyberoam = require('./cyberoam');

let mainWindow;
let state = {};

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/login.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuTemplate = [{
    label: app.getName(),
    submenu: [{
      label: `About ${app.getName()}`
    }, {
      label: 'Debug',
      click: () => { mainWindow.toggleDevTools() },
      accelerator: 'Cmd+Alt+I'
    }, {
      label: 'Quit',
      click: () => { app.quit() },
      accelerator: 'Cmd+Q'
    }]
  }];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

ipc.on('login', (evt, {username, password}) => {
  state.username = username;
  cyberoam.login(username, password)
    .then(() => {
      mainWindow.loadURL(`file://${__dirname}/logout.html`);
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
});

ipc.on('request-username', () => {
  mainWindow.webContents.send('username', state.username);
});

ipc.on('logout', () => {
  cyberoam.logout(state.username)
    .then(() => {
      mainWindow.loadURL(`file://${__dirname}/login.html`);
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
});
