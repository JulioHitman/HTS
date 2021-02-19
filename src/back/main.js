const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const updater = require('./updater');

const isMac = process.platform === "darwin";

let MainPage, LoginPage

function createWindow () {
  setTimeout( updater, 1500 )

  LoginPage = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false
  })

  MainPage = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false
    },
    show: false
  })


  // win.webContents.openDevTools();
  LoginPage.loadFile('./src/front/login/login.html');
  MainPage.loadFile('./src/front/curve/curve.html');  
}



//C:\Users\Atendimento\Documents\projects\HTS\src\front\index.html


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

ipcMain.on('Login-channel', (e, acess) => {

  if (acess.cpf === '123456789' && acess.password === '123456') {
    LoginPage.on('close', () => {
      LoginPage = null      
    });

    LoginPage.close()

    e.sender.send('channel-reponse', 'Message received')
    
    setTimeout(() => {
      MainPage.show();
    }, 1000);
  }
})
 
const template = [{
  label: "File",
  submenu: [isMac ? { role: "close" } : { role: "quit" }]
}]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);