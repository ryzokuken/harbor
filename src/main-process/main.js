const {app, BrowserWindow, Menu, ipcMain: ipc, Notification} = require('electron');
const cyberoam = require('../utils/cyberoam');

const state = {};
let mainWindow;

const LOGIN_FILE_PATH = `file://${__dirname}/../public/login/index.html`;
const LOGOUT_FILE_PATH = `file://${__dirname}/../public/logout/index.html`;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(LOGIN_FILE_PATH);
  if (process.env.NODE_ENV === 'dev') {
	  mainWindow.webContents.openDevTools();
  }
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
      accelerator: 'CommandOrControl+Alt+I'
    }, {
      label: 'Quit',
      click: () => { app.quit() },
      accelerator: 'CommandOrControl+Q'
    }]
  }];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function login(username, password, onSuccess) {
  cyberoam.login(username, password)
    .then(() => {
      mainWindow.loadURL(LOGOUT_FILE_PATH);
      state.lastErrorMessage = undefined;
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(errorMessage => {
      mainWindow.loadURL(LOGIN_FILE_PATH);
      state.lastErrorMessage = errorMessage;
    });
}

ipc.on('login', (evt, {username, password}) => {
  state.username = username;
  login(username, password, () => {
    if (Notification.isSupported()) {
      const notification = new Notification({
        title: 'Success',
        body: `Successfully logged into cyberoam as ${username}`,
      });
      notification.show();
    }
    state.interval = setInterval(() => {
      cyberoam.checkLiveStatus(username).catch(() => {
        login(username, password);
      });
    }, 180 * 1000);
  });
});

ipc.on('request-username', () => {
  mainWindow.webContents.send('username', state.username);
});

ipc.on('logout', () => {
  clearInterval(state.interval);
  cyberoam.logout(state.username)
    .then(() => {
      mainWindow.loadURL(LOGIN_FILE_PATH);
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    });
});

ipc.on('request-error', () => {
  if (state.lastErrorMessage) {
    mainWindow.webContents.send('error', state.lastErrorMessage);
  }
});
