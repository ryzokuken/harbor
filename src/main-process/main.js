const { app, BrowserWindow, Menu } = require('electron');

const state = {};
let mainWindow;

const LOGIN_FILE_PATH = `file://${__dirname}/../public/login/index.html`;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(LOGIN_FILE_PATH);
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
  require('./ipc/auth')(mainWindow, state);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


