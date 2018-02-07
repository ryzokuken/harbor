import { app, BrowserWindow, ipcMain as ipc } from 'electron'; // eslint-disable-line
import Cyberoam from 'cyberoam';

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
    height: 563,
    useContentSize: true,
    width: 1000,
    titleBarStyle: 'hiddenInset',
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

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

function live(username, callback) {
  cyberoam.checkLiveStatus(username).catch(callback);
}

function login(username, password) {
  cyberoam
    .login(username, password)
    .then(() => {
      liveInterval = setInterval(() => {
        live(username, () => {
          login(username, password);
        });
      }, 180 * 1000);
      console.log(liveInterval);
      mainWindow.webContents.send('logged-in', username);
    })
    .catch((err) => {
      console.error(err);
    });
}

ipc.on('login', (event, { username, password }) => login(username, password));

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
