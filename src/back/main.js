const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const updater = require('./updater');

const superagent = require('superagent');

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


  LoginPage.webContents.openDevTools();
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

// request to login acess
ipcMain.on('Login-channel', (e, acess) => {

  // needed to disabled
  superagent.post('https://ht.coelhodev.com.br/hts/v1/login')
            .disableTLSCerts()
            .send({ user: acess.cpf, password: acess.password })
            .end((err, res ) => {
              const response = res.body
              console.log(response);
              var errors_text, arry_text

              if ( response.hasOwnProperty("error") === true ) {
                
                
                if (response.error.hasOwnProperty("password") === true) {
                  errors_text = "Senha inválida"
                }                  
                
                if (response.error.hasOwnProperty("user") === true) {
                  arry_text = response.error.user
                  // TODO change the hardcoded text from an api response
                  if (Array.isArray(arry_text) === true) {                    
                    errors_text = "CPF inválido"
                  }else{                  
                    errors_text = "CPF não cadastrado"
                  }
                }
                  
                    
                dialog.showMessageBox({
                  type: 'info',
                  message: errors_text,
                })               
                
                // e.sender.send('Login-channel', errors_text)

              } else {

                if (response.payment.status === 'paid' && response.payment.active === true) {
                  goToLogin();
                } else {
                  dialog.showMessageBox({
                    type: 'info',
                    message: errors_text,
                  })
                }         
              }                  
            })

  // user: 368.515.298-07
  // password: ht123

  // if (acess.cpf === '123456789' && acess.password === '123456') {
  //   LoginPage.on('close', () => {
  //     LoginPage = null      
  //   });

  //   LoginPage.close()

  //   e.sender.send('channel-reponse', 'Message received')
    
  //   setTimeout(() => {
  //     MainPage.show();
  //   }, 2000);
  // }

  const goToLogin = () => {
    LoginPage.on('close', () => {
      LoginPage = null      
    });

    LoginPage.close()

    e.sender.send('channel-reponse', 'Message received')
    
    setTimeout(() => {
      MainPage.show();
    }, 2000);
  }
})
 
const template = [{
  label: "File",
  submenu: [isMac ? { role: "close" } : { role: "quit" }]
}]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);