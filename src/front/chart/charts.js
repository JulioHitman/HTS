const { lightningChart, SolidLine, SolidFill, ColorHEX, AxisScrollStrategies, AxisTickStrategies } = require('@arction/lcjs')
const lcjs = lightningChart({
  // If you have a license, supply it here. Otherwise, the arguments can be left blank, which results in automatically using Community License.
  // license: 'my-license-number'
})

const chart = lcjs.ChartXY();
const dClass = new Date();
const today = dClass.getDate();
const month = dClass.getMonth();
const year = dClass.getFullYear()
const todayMinutes = dClass.getMinutes();

const dateOrigin = new Date();


chart.getDefaultAxisY()
    .setTitle('USD')    
    .setScrollStrategy(AxisScrollStrategies.expansion)

chart.getDefaultAxisX()
    .setScrollStrategy(AxisScrollStrategies.progressive)
    .setTickStrategy(
      AxisTickStrategies.DateTime,
      (tickStrategy) => tickStrategy.setDateOrigin(dateOrigin)
    )


    const series = chart.addLineSeries({
      dataPattern: {
          // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
          pattern: 'ProgressiveX',
          // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
          regularProgressiveStep: true,
      }
   })
      // Destroy automatically outscrolled data (old data becoming out of scrolling axis range).
      // Actual data cleaning can happen at any convenient time (not necessarily immediately when data goes out of range).
      .setMaxPointCount(2000)
  
  // Style the series
  series
    .setStrokeStyle(new SolidLine({
        thickness: 2,
        fillStyle: new SolidFill({ color: ColorHEX('#5aafc7') })
    }))
    .setMouseInteractions(false)
  
  // series.add([
  //   { y: 5035.50, x: 200 },
  //   { y: 5035.50, x: 250 },
  //   { y: 5036.00, x: 300 },
  //   { y: 5034.00, x: 350 },
  //   { y: 5035.55, x: 400 },
  //   { y: 5035.55, x: 450 },
  //   { y: 5034.00, x: 500 },
  //   { y: 5035.50, x: 550 }
  // ]);

  

  randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  } 
  

  setInterval(() => {
    // x = time ; y = usd 
    series.add([
      { x:  todayMinutes, y: randomIntFromInterval(5000, 5100) }    
    ]);
  }, 300);
