const electron = require("electron");
const url = require("url");
const path = require("path");
const { platform } = require("os");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainwindow;
let addWindow;

app.on("ready", () => {
  mainwindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
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
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/screens/add.htm"),
      protocol: "file:",
      slashes: true,
    })
  );
  addWindow.on("close", () => {
    addWindow = null;
  });
}

ipcMain.on("item:add", (e, item) => {
  console.log(item);
  mainwindow.webContents.send("item:add", item);
  addWindow.close();
});

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
        click() {
          mainwindow.webContents.send("clear");
        },
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
  app.quit();
});

if (process.platform == "darwin") {
  MainmenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production ") {
  MainmenuTemplate.push({
    label: "view",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator:
          (process.platform == platform.platform) !== "darwin"
            ? "Ctrl+I"
            : "Command+I",
        click(error, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
