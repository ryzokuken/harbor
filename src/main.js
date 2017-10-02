const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  const menuTemplate = [{
    label: app.getName(),
    submenu: [{
      label: `About ${app.getName()}`
    }, {
      label: 'Quit',
      click: () => { app.quit() },
      accelerator: 'Cmd+Q'
    }]
  }];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
