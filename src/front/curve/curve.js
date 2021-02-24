// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// A little helper tool to wrap your functions if you want to build same app on web and electron.
// Use this function to use electron apis only when running inside electron.
// const isRunningInElectron = () => {
//   const userAgent = navigator.userAgent.toLowerCase();
//   return userAgent.indexOf(" electron/") > -1;
// };


const superagent = require('superagent');

//-----------CURV-----------
const spotv = document.getElementById('spotv');
const euscv = document.getElementById('euscv');
const dolfutv = document.getElementById('dolfutv');
const curv = document.getElementById('curv');
const justv = document.getElementById('justv');
const spreadv = document.getElementById('spreadv');
const overv = document.getElementById('overv');


const sixth = document.getElementById('sixth');
const fifth = document.getElementById('fifth');
const forth = document.getElementById('forth');
const third = document.getElementById('third');
const second = document.getElementById('second');
const first = document.getElementById('first');

const ref = document.getElementById('ref');

const negFirst = document.getElementById('negFirst');
const negSecond = document.getElementById('negSecond');
const negThird = document.getElementById('negThird');
const negForth = document.getElementById('negForth');
const negFifth = document.getElementById('negFifth');
const negSixth = document.getElementById('negSixth');

//----------------------------------------------------



  var values = ''
  var market_values = ''
  var dolCurve = ''
  var points = ''
  var refPoints = ''

  setInterval(() => {
    superagent
      .get('https://fast-plains-96418.herokuapp.com/sendvalues')
      .end( (err, res) => {
        values = res.body.values;
        market_values = values["MARKET WATCH"];
        dolCurve = values["CURVA"];
        points = values["PONTOS"];
        refPoints = values["REF BLACK&SCHOLES"];

       
        //["CURVA"]
        spotv.innerHTML = dolCurve.SPOT;
        euscv.innerHTML = dolCurve.EUSCASADO;
        dolfutv.innerHTML =  dolCurve.DOL1;
        curv.innerHTML = dolCurve.CURVA;
        justv.innerHTML = dolCurve.JUSTO;
        spreadv.innerHTML = dolCurve["SPREAD CURVA/DOL"];
        overv.innerHTML = dolCurve.OVER;


        // CURVA.EUSCASADO
        // CURVA.OVER
        // CURVA.SPOT

        //["PONTOS"] ["REF PONTOS"]       
      
        sixth.innerHTML = refPoints[6];
        fifth.innerHTML = refPoints[5];
        forth.innerHTML = refPoints[4];
        third.innerHTML = refPoints[3];
        second.innerHTML = refPoints[2];
        first.innerHTML = refPoints[1];
      
        ref.innerHTML = refPoints.REF;
      
        negFirst.innerHTML = refPoints["-1"];
        negSecond.innerHTML = refPoints["-2"];
        negThird.innerHTML = refPoints["-3"];
        negForth.innerHTML = refPoints["-4"];
        negFifth.innerHTML = refPoints["-5"];
        negSixth.innerHTML = refPoints["-6"];

      })
  }, 100);
