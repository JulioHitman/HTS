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
const spotvUlt = document.getElementById('spotvUlt');
const spotvMax = document.getElementById('spotvMax');
const spotvMin = document.getElementById('spotvMin');

const frpUlt = document.getElementById('frpUlt');
const frpMAX = document.getElementById('frpMAX');
const frpMin = document.getElementById('frpMin');

const dolfutvUlt = document.getElementById('dolfutvUlt');
const dolfutvMax = document.getElementById('dolfutvMax');
const dolfutvMin = document.getElementById('dolfutvMin');

const curvUlt = document.getElementById('curvUlt');
const curvMax = document.getElementById('curvMax');
const curvMin = document.getElementById('curvMin');

const justvUlt = document.getElementById('justvUlt');
const justvMax = document.getElementById('justvMax');
const justvMin = document.getElementById('justvMin');

const spreadv = document.getElementById('spreadv');

const overvUlt = document.getElementById('overvUlt');
const overvMax = document.getElementById('overvMax');
const overvMin = document.getElementById('overvMin');

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
      .get('https://calm-stream-02692.herokuapp.com/sendvalues')
      .end( (err, res) => {
        values = res.body.values;
        // console.log(values);
        // market_values = values["MARKET WATCH"];
        dolCurve = values["CURVA"];
        points = values["PONTOS"];
        refPoints = values["REF BLACK&SCHOLES"];

        // console.log(dolCurve.CURVA[0]);
        
        //["CURVA"]
        spotvUlt.innerHTML = dolCurve.SPOT[0];
        spotvMax.innerHTML = dolCurve.SPOT[1];
        spotvMin.innerHTML = dolCurve.SPOT[2];

        frpUlt.innerHTML = dolCurve.FRP0[0];
        frpMAX.innerHTML = dolCurve.FRP0[1];
        frpMin.innerHTML = dolCurve.FRP0[2];

        dolfutvUlt.innerHTML =  dolCurve.DOL1[0];
        dolfutvMax.innerHTML =  dolCurve.DOL1[1];
        dolfutvMin.innerHTML =  dolCurve.DOL1[2];

        curvUlt.innerHTML = dolCurve.CURVA[0];
        curvMax.innerHTML = dolCurve.CURVA[1];
        curvMin.innerHTML = dolCurve.CURVA[2];

        justvUlt.innerHTML = dolCurve.JUSTO[0];
        justvMax.innerHTML = dolCurve.JUSTO[1];
        justvMin.innerHTML = dolCurve.JUSTO[2];

        spreadv.innerHTML = dolCurve["SPREAD CURVA/DOL"];

        overvUlt.innerHTML = dolCurve.OVER[0];
        overvMax.innerHTML = dolCurve.OVER[1];
        overvMin.innerHTML = dolCurve.OVER[2];


        // CURVA.EUSCASADO
        // CURVA.OVER
        // CURVA.SPOT

        //["PONTOS"] ["REF PONTOS"]  
        // PONTOS["VOL IMP"]     
      
        sixth.innerHTML = refPoints[6];
        fifth.innerHTML = refPoints[5];
        forth.innerHTML = refPoints[4];
        third.innerHTML = refPoints[3];
        second.innerHTML = refPoints[2];
        first.innerHTML = refPoints[1];
      
        // ref.innerHTML = refPoints.REF;

        // ref.innerHTML = refPoints.REF;
        ref.innerHTML = points["FREQUENCIA"]; 

        negFirst.innerHTML = refPoints["-1"];
        negSecond.innerHTML = refPoints["-2"];
        negThird.innerHTML = refPoints["-3"];
        negForth.innerHTML = refPoints["-4"];
        negFifth.innerHTML = refPoints["-5"];
        negSixth.innerHTML = refPoints["-6"];

      })
  }, 300);
