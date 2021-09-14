const { app, BrowserWindow, ipcMain, Menu, dialog, shell } = require('electron');
const updater = require('./updater');

const superagent = require('superagent');

const isMac = process.platform === "darwin";

const windowsStateKeeper = require('electron-window-state');

const Store = require('electron-store');

const store = new Store();


let MainPage, LoginPage, setState, Tools

function createWindow () {
  setTimeout( updater, 1500 )

  setState = windowsStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

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
    width: setState.width,
    height: setState.height,
    x: setState.x,
    y: setState.y,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false
    },
    show: false
  });

  Tools = new BrowserWindow({
    width: setState.width,
    height: setState.height,
    x: setState.x,
    y: setState.y,
    backgroundColor: '#FFF',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    show: false    
  });

  LoginPage.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });


  // LoginPage.webContents.openDevTools();
  // MainPage.webContents.openDevTools();
  // Tools.webContents.openDevTools();


  LoginPage.loadFile('./src/front/login/login.html');
  MainPage.loadFile('./src/front/curve/curve.html');
  Tools.loadFile('./src/front/tools/tools.html');

  setState.manage(MainPage);
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
  const freeAcess = true ;
  let acessCpf, acessPassword;

  if (acess.saved == true){
    acessCpf = store.get('cpf');
    acessPassword = store.get('password');


  } else {
    acessCpf = acess.cpf;
    acessPassword = acess.password;
  }

  // needed to disabled
  superagent.post('https://hightrading.com.br/hts/v1/login')
            .disableTLSCerts()
            .send({ user: acessCpf, password: acessPassword })
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
                let perfilName = response.perfil.name.toString().toLowerCase()
                if ( response.payment.active === true  || response.perfil.name === 'admin' || response.perfil.name === 'vip') {
                  goToLogin();
                } else if (response.payment.active === false ) {
                  errors_text = 'Conta não ativa para HTS'

                  dialog.showMessageBox({
                    type: 'info',
                    message: errors_text,
                  })
                }
              }
            }) 

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
      // ChartsPage.show();
    }, 2000);
  }
})

const template = [{
  label: "Ferramentas", // Tools
  submenu: [
    {
      label: "Breve..."
    }
  ]
  }
]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);