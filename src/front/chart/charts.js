const { lightningChart, SolidLine, SolidFill, ColorHEX, AxisScrollStrategies } = require('@arction/lcjs')
const lcjs = lightningChart({
  // If you have a license, supply it here. Otherwise, the arguments can be left blank, which results in automatically using Community License.
  // license: 'my-license-number'
})

const chart = lcjs.ChartXY();


chart.getDefaultAxisY()
    .setTitle('USD')
    .setInterval(0, 1000)
    .setScrollStrategy(AxisScrollStrategies.expansion)

chart.getDefaultAxisX()
    .setTitle('milliseconds')
    .setInterval(0, 2500)
    .setScrollStrategy(AxisScrollStrategies.progressive)


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
      .setMaxPointCount(10000)
  
  // Style the series
  series
      .setStrokeStyle(new SolidLine({
          thickness: 2,
          fillStyle: new SolidFill({ color: ColorHEX('#5aafc7') })
      }))
      .setMouseInteractions(false)

  series.add([
    { y: 5035.50, x: 200 },
    { y: 5035.50, x: 250 },
    { y: 5036.00, x: 300 },
    { y: 5034.00, x: 350 },
    { y: 5035.55, x: 400 },
    { y: 5035.55, x: 450 },
    { y: 5034.00, x: 500 },
    { y: 5035.50, x: 550 }
  ]);