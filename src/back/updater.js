//Electron Updater Module
const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

//Configure Log Debbugin

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

//Disable auto Download of updates

autoUpdater.autoDownload = false

// Check for updates (GH Releseases)
module.exports = () => {
  // checking  for updates
  autoUpdater.checkForUpdates();

  // listening  for update  found
  autoUpdater.on('update-available', () => {
    //Prompt User to start Downloading

    // EN
    // dialog.showMessageBox({
    //   type: 'info',
    //   title: 'Update available',
    //   message: 'A new version of HTS is available. Do you want to update now?',
    //   buttons: ['Update', 'NO']
    // })

    //BR
    
    dialog.showMessageBox({
      type: 'info',
      title: 'Atualização Disponível',
      message: 'Uma nova versão do HTS esta disponível, deseja atualizar agora ?',
      buttons: ['Update', 'NO']
    }).then( result =>  {
      let buttonIndex = result.response

      //If button 0 (update), start downloading the update

      if ( buttonIndex === 0 ) autoUpdater.downloadUpdate()
    })

  })

  autoUpdater.on('update-downloaded', () => {
    
    dialog.showMessageBox({
      type: 'info',
      title: 'Atualização Pronta',
      message: 'Instalar e Reiniciar ?',
      buttons: ['Sim', 'Mais Tarde']
    }).then( result =>  {
      let buttonIndex = result.response

      //If button 0 (update), start downloading the update

      if ( buttonIndex === 0 ) autoUpdater.quitAndInstall(false, true)
    })

  })
}