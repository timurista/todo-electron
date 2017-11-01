const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const {buildTemplate} = require('./menu/menuTemplate');
const {onMac} = require('./menu/getOS');

let mainWindow;
let menuTemplate = buildTemplate(app, {createAddWindow, clearTodos});

// macosx config
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: onMac ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}

// add window
let addWindow;

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  addWindow.on('close', () => addWindow = null);
}

function clearTodos() {
  mainWindow.webContents.send('todo:clear');
};

// app
app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

});

// recieve messages
ipcMain.on('todo:add', (evt, todo) => {
  mainWindow.webContents.send('todo:add', todo);
  addWindow.close(); // reference to add window
});
