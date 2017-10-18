import scatterPlot from './scatterPlot'
import linePlot from './linePlot'
import radialPlot from './radialPlot'

     const div1 = "viz1";
     const div2 = "viz2";
     const div3 = "viz3";
     const div4 = "viz4";
     const div5 = "viz5";
     const div6 = "viz6";
     const div7 = "viz7";
     const div8 = "viz8";
     const div9 = "viz9";

      const localFile = 'data/day.csv'
      const blocksFile = 'day.csv'
      var datafile = localFile


      //set x and y value pointers and axis labels
      const xValue1 = d => d.temp;
      const xValue2 = d => d.hum;
      const xValue3 = d => d.windspeed;
      const xValue4 = d => d.dteday;
      const xLabel1 = 'Temperature';
      const xLabel2 = 'Humidity';
      const xLabel3 = 'Windspeed';
      const xLabel3 = 'Date';
      const yValue2 = d => d.casual;
      const yValue1 = d => d.registered;
      const yValue3 = d => d.cnt;
      const yLabel1 = 'Registered Users';
      const yLabel2 = 'Casual Users';
      const yLabel3 = 'Users';
      const yLabel4 = xLabel1;
      const pointSize = 2;
      const pointColor1 = "green";
      const pointColor2 = "blue";
      const pointColor3 = "grey";

      const margin = { left: 75, right: 10, top: 10, bottom: 75 };

      //row function to parse daily csv
      const row = d => {
          d.instant = +d.instant;
          d.dteday = new Date(d.dteday); //need to parse date
          d.season = +d.season;
          d.yr = +d.yr;
          d.mnth = +d.mnth;
          d.holiday = +d.holiday; //flag
          d.weekday = +d.weekday; //integer day of week (0-6)
          d.workingday = +d.workingday; //flag
          d.weathersit = +d.weathersit; //(1-4)
          d.temp = +d.temp;
          d.atemp = +d.atemp;
          d.hum = +d.hum;
          d.windspeed = +d.windspeed;
          d.casual = +d.casual;
          d.registered = +d.registered;
          d.cnt = +d.cnt;
          return d;
      };

      const dataDaily = null;
      const dataHourly = null;


d3.csv('data/day.csv', row, data => {

  const dataDaily = data;
  const dataHourly = data;

  const render =() => {

    //data = data.filter( d => d.yr == 0)

    //first row of grids
    scatterPlot(div1, {
      data:data,
      xValue:xValue1,
      yValue:yValue1,
      xLabel:xLabel1,
      yLabel:yLabel1,
      pointColor:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    scatterPlot(div2, {
      data:data,
      xValue:xValue2,
      yValue:yValue1,
      xLabel:xLabel2,
      yLabel:yLabel1,
      pointColor:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    scatterPlot(div3, {
      data:data,
      xValue:xValue3,
      yValue:yValue1,
      xLabel:xLabel3,
      yLabel:yLabel1,
      pointColor:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    scatterPlot(div4, {
      data:data,
      xValue:xValue1,
      yValue:yValue1,
      xLabel:xLabel1,
      yLabel:yLabel1,
      pointColor:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    //second row of grid
    scatterPlot(div5, {
      data:data,
      xValue:xValue1,
      yValue:yValue2,
      xLabel:xLabel1,
      yLabel:yLabel2,
      pointColor:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    scatterPlot(div6, {
      data:data,
      xValue:xValue2,
      yValue:yValue2,
      xLabel:xLabel2,
      yLabel:yLabel2,
      pointColor:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    scatterPlot(div7, {
      data:data,
      xValue:xValue3,
      yValue:yValue2,
      xLabel:xLabel3,
      yLabel:yLabel2,
      pointColor:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    scatterPlot(div8, {
      data:data,
      xValue:xValue1,
      yValue:yValue2,
      xLabel:xLabel1,
      yLabel:yLabel2,
      pointColor:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    linePlot(div9, {
      data:data,
      xValue:xValue4,
      yValue:yValue3,
      xLabel:xLabel4,
      yLabel:"Users",
      pointColor:pointColor3,
      pointSize:pointSize,
      margin:margin
    });


  }

  console.log('now render');

  render();

  console.log('resized and rendered...');

  window.addEventListener('resize',render);

});
