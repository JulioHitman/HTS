const ipcRenderer = require('electron').ipcRenderer

const cpf = document.getElementById('cpf');
const password = document.getElementById('password')

document.getElementById('login').addEventListener('click', event => {
  let access = {
    'cpf': cpf.value,
    'password': password.value
  }
  ipcRenderer.send( 'Login-channel', access )
})

ipcRenderer.on('Login-channel', (e, args) => {
})