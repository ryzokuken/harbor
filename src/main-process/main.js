const { app, BrowserWindow, Menu } = require('electron');
const authIpc = require('./ipc/auth');

let mainWindow;

const LOGIN_FILE_PATH = `file://${__dirname}/../public/login/index.html`;

function init() {
  mainWindow = new BrowserWindow({ width: 800, height: 600, backgroundColor: '#fff' });
  mainWindow.loadURL(LOGIN_FILE_PATH);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuTemplate = [{
    label: app.getName(),
    submenu: [{
      label: `About ${app.getName()}`,
    }, {
      label: 'Debug',
      click: () => { mainWindow.toggleDevTools(); },
      accelerator: 'CommandOrControl+Alt+I',
    }, {
      label: 'Quit',
      click: () => { app.quit(); },
      accelerator: 'CommandOrControl+Q',
    }],
  }];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  authIpc(mainWindow);
}

app.on('ready', init);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', init);
