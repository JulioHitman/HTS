const { app, BrowserWindow } = require('electron')
const updater = require('./updater');

function createWindow () {
   setTimeout( updater, 3000 )

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false
  })

  // win.webContents.openDevTools();


  win.loadFile('./src/front/login/login.html')
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
