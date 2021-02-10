//Electron Updater Module
const { autoUpdater } = require("electron-updater")

//Configure Log Debbugin

autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"


// Check for updates (GH Releseases)
module.exports = () => {
  // checking  for updates
  autoUpdater.checkForUpdates();
}