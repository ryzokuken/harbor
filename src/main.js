const {app, BrowserWindow, Menu, ipcMain: ipc} = require('electron');

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

ipc.on('login', (evt, data) => {
  console.log(data);
});
