const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainwindow;
let addWindow;

app.on("ready", () => {
  mainwindow = new BrowserWindow();
  mainwindow.loadURL();
});

app.on("close", () => {
  mainwindow = null;
});
