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
      const yValue2 = d => d.casual;
      const yValue1 = d => d.registered;
      const yLabel1 = 'Registered Users';
      const yLabel2 = 'Casual Users';
      const yLabel3 = xLabel1;
      const pointSize = 2;
      const pointColor1 = "green";
      const pointColor2 = "blue";

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
      

d3.csv(datafile, row, data => {
        
  const dataDaily = data;
  const dataHourly = data;

  const render =() => {

    data = data.filter( d => d.yr == 0)

    //first row of grids
    radialPlot(div1, {
      data, 
      xValue1, 
      yValue1, 
      xLabel1, 
      yLabel1, 
      pointColor1, 
      margin
    });

    scatterPlot(div2, {
      data, 
      xValue2, 
      yValue1,  
      xLabel2, 
      yLabel1,
      pointColor1, 
      margin
    });
          
    scatterPlot(div3, {
      data, 
      xValue3, 
      yValue1,  
      xLabel3, 
      yLabel1,
      pointColor1, 
      margin
    });
          
    scatterPlot(div4, {
      data, 
      xValue1, 
      yValue1,  
      xLabel1, 
      yLabel1,
      pointColor1, 
      margin
    });

    //second row of grid
    radialPlot(div5, {
      data, 
      xValue1, 
      yValue2,  
      xLabel1, 
      yLabel2,
      pointColor2, 
      margin
    });

    scatterPlot(div6, {
      data, 
      xValue2, 
      yValue2,  
      xLabel2, 
      yLabel2,
      pointColor2,
      margin
    });
          
    scatterPlot(div7, {
      data, 
      xValue3, 
      yValue2,  
      xLabel3, 
      yLabel2,
      pointColor2, 
      margin
    });
          
    scatterPlot(div8, {
      data, 
      xValue1, 
      yValue2,  
      xLabel1, 
      yLabel2,
      pointColor2, 
      margin
    });
          
    linePlot(div9, {
      data, 
      xValue3, 
      yValue1,  
      xLabel1, 
      yLabel3,
      pointColor2, 
      margin
    });
      

  }
          
  console.log('now render');

  render();

  console.log('resized and rendered...');

  window.addEventListener('resize',render);
        
});


