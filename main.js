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
});

app.on("close", () => {
  mainwindow = null;
});
