import { app, BrowserWindow, ipcMain as ipc, Menu, shell } from 'electron'; // eslint-disable-line
import Cyberoam from 'cyberoam';

import template from './menu';

// HANDLING ELECTRON

let mainWindow;
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 400,
    useContentSize: true,
    width: 600,
    titleBarStyle: 'hiddenInset',
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  Menu.setApplicationMenu(Menu.buildFromTemplate(template(app, shell)));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// HANDLING CYBEROAM

let liveInterval;
const cyberoam = new Cyberoam();

async function live(username, callback) {
  try {
    await cyberoam.checkLiveStatus(username);
  } catch (err) {
    if (err.includes('Could not reach')) {
      mainWindow.webContents.send('disconnected');
      clearInterval(liveInterval);
      liveInterval = undefined;
    } else {
      callback();
    }
  }
}

async function login(username, password) {
  try {
    await cyberoam.login(username, password);
    liveInterval = setInterval(() => {
      live(username, () => {
        login(username, password);
      });
    }, 180 * 1000);
    mainWindow.webContents.send('logged-in', username);
  } catch (err) {
    mainWindow.webContents.send('login-failure', err);
  }
}

async function logout(username) {
  try {
    await cyberoam.logout(username);
    if (liveInterval !== undefined) {
      clearInterval(liveInterval);
      liveInterval = undefined;
      mainWindow.webContents.send('logged-out');
    } else {
      throw Error('Live interval not properly set');
    }
  } catch (err) {
    mainWindow.webContents.send('logout-failure', err);
    if (err.includes('Could not reach')) {
      mainWindow.webContents.send('disconnected');
    }
  }
}

ipc.on('login', (event, { username, password }) => login(username, password));

ipc.on('logout', (event, username) => logout(username));

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
