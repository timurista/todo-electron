const {COMMAND} = require('./getOS');
const {BrowserWindow} = require('electron');

const buildTemplate = (app, options) => 
[
  {
    label: "File",
    submenu: [
      {
        label: "Add a Todo",
        click() { options.createAddWindow(); }
      },
      {
        label: "Clear Todos",
        click() { options.clearTodos(); }
      },
      {
        "label": "Quit",
        accelerator: `${COMMAND}+Q`,
        click() {
          app.quit();
        }
      }
    ]
  }
];

module.exports = {buildTemplate};
