const electron = require("electron");

const { ipcRenderer } = electron;

var ip = document.getElementById("ip");
var frm = document.getElementById("frm");

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  ipcRenderer.send("item:add", ip.value);
});
