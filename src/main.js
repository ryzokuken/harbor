const {app, BrowserWindow, Menu, ipcMain: ipc, Notification} = require('electron');
const cyberoam = require('./cyberoam');

let mainWindow;
let state = {};

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/login.html`);
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

function login(username, password, onSuccess) {
  cyberoam.login(username, password)
    .then(() => {
      mainWindow.loadURL(`file://${__dirname}/logout.html`);
      state.lastErrorMessage = undefined;
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(errorMessage => {
      mainWindow.loadURL(`file://${__dirname}/login.html`);
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
      mainWindow.loadURL(`file://${__dirname}/login.html`);
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
