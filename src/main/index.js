import { app, BrowserWindow, ipcMain as ipc, Menu, shell } from 'electron'; // eslint-disable-line
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

app.on('ready', () => {
  createWindow();

  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    });

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
      },
    );

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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
