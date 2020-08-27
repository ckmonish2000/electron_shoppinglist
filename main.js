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

const MainmenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Items",
        click() {
          console.log("fucker");
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
      },
    ],
  },
];

app.on("close", () => {
  mainwindow = null;
});
