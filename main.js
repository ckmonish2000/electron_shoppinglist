const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu } = electron;

let mainwindow;
let addWindow;

app.on("ready", () => {
  mainwindow = new BrowserWindow();
  mainwindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/screens/index.htm"),
      protocol: "file:",
      slashes: true,
    })
  );

  const mainmenu = Menu.buildFromTemplate(MainmenuTemplate);

  Menu.setApplicationMenu(mainmenu);
});

function createAddScreen() {
  addWindow = new BrowserWindow({ width: 200, height: 200 });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/screens/add.htm"),
      protocol: "file:",
      slashes: true,
    })
  );
}

const MainmenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Items",
        click() {
          createAddScreen();
        },
      },
      {
        label: "Clear Items",
      },
      {
        label: "quit",
        click() {
          app.quit();
        },
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
      },
    ],
  },
];

app.on("close", () => {
  mainwindow = null;
  addWindow = null;
});
