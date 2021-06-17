const ipcRenderer = require('electron').ipcRenderer;
const Store = require('electron-store');
const VMasker = require('vanilla-masker');
const cpf = document.getElementById('cpf');
const password = document.getElementById('password');
const checkBox = document.getElementById("remember-checkbox");

const store = new Store();

if(typeof(store.get('rememberCkd')) !== 'undefined') {
  checkBox.checked = store.get('rememberCkd');
}

if( checkBox.checked === true) { 

  if (cpf !== null && cpf.value === "") {
    cpf.value = store.get('cpf');
  }

  if (password !== null && password.value === "") {
    password.value = store.get('password');
  }

}

VMasker(cpf).maskPattern("999.999.999-99");


document.getElementById('login').addEventListener('click', event => {  

  // If the checkbox is checked, display values
  checkboxListener();

  let access = {
    'cpf': cpf.value,
    'password': password.value,
    'saved': checkBox.checked
  }

  ipcRenderer.send( 'Login-channel', access )
});

// ipcRenderer.on('Login-channel', (e, args) => {
 
// });



checkBox.addEventListener('click', event => {
  checkboxListener();
});
 
function checkboxListener() {
  if (checkBox.checked == true){
    store.set('cpf', cpf.value);
    store.set('password', password.value);
    store.set('rememberCkd', true);
  } else {
    store.set('rememberCkd', false);
  }
}
