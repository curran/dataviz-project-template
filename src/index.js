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
      const xValue5 = d => d.hr;
      const xLabel1 = 'Temperature';
      const xLabel2 = 'Humidity';
      const xLabel3 = 'Windspeed';
      const xLabel4 = 'Date';
      const yValue2 = d => d.casual;
      const yValue1 = d => d.registered;
      const yValue3 = d => d.cnt;
      const yValue4 = xValue1;
      const yLabel1 = 'Users';
      const yLabel2 = 'Users';
      const yLabel3 = 'Users';
      const yLabel4 = xLabel1;
      const pointSize = 2;
      const pointColor1 = "green";
      const pointColor2 = "blue";
      const pointColor3 = "grey";


      const margin = { left: 60, right: 10, top: 10, bottom: 60 };

      //row function to parse daily csv
      const row1 = d => {
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

      const row2 = d => {
          d.instant = +d.instant;
          d.dteday = new Date(d.dteday); //need to parse date
          d.hr = +d.hr;
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


d3.csv('data/hour.csv', row1, data => {
  var dataHour = data
  var nestbyday = d3.nest()
    			.key(d => d.dteday)
        	.rollup(function(d) {
            return{
              'dteday': new Date(d3.mean(d, e=>+e.dteday)),
              'season': d3.mean(d, e=>+e.season),
              'yr': d3.mean(d, e=>+e.yr),
              'mnth': d3.mean(d, e=>+e.mnth),
              'holiday': d3.mean(d, e=>+e.holiday),
              'weekday': d3.mean(d, e=>+e.weekday),
              'workingday': d3.mean(d, e=>+e.workingday),
              'weathersit': d3.max(d, e=>+e.weathersit),
              'temp': d3.mean(d, e=>+e.temp),
              'atemp': d3.mean(d, e=>+e.atemp),
              'hum': d3.mean(d, e=>+e.hum),
              'windspeed':d3.mean(d, e=>+e.windspeed),
              'casual': d3.sum(d, e=>+e.casual),
              'registered': d3.sum(d, e=>+e.registered),
              'cnt':  d3.sum(d, e=>+e.cnt)
            };
          })
         	.entries(data);
        console.log(nestbyday);
        //unnest from 		      //https://bl.ocks.org/SpaceActuary/723b26e187e6bbc2608f

      function unnest(data, children){
          var output=[];
          data.forEach((d,i)=>{
            output.push(d[children]);
            })
				return output;
        };

      var dataDay = unnest(nestbyday, "value");
      console.log(dataDay);

  const render =() => {

    //data = data.filter( d => d.yr == 0)

    //first row of grids
    scatterPlot(div1, {
      data:dataDay,
      xValue:xValue1,
      yValue:yValue1,
      xLabel:xLabel1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div1")

    scatterPlot(div2, {
      data:dataDay,
      xValue:xValue2,
      yValue:yValue1,
      xLabel:xLabel2,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div2")

    scatterPlot(div3, {
      data:dataDay,
      xValue:xValue3,
      yValue:yValue1,
      xLabel:xLabel3,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div3")

    radialPlot(div4, {
      data:dataHour,
      hour:xValue4,
      yValue:yValue1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      margin:margin
    });

    console.log("div4")

    //second row of grid
    scatterPlot(div5, {
      data:dataDay,
      xValue:xValue1,
      yValue:yValue2,
      xLabel:xLabel1,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div5")

    scatterPlot(div6, {
      data:dataDay,
      xValue:xValue2,
      yValue:yValue2,
      xLabel:xLabel2,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div6")

    scatterPlot(div7, {
      data:dataDay,
      xValue:xValue3,
      yValue:yValue2,
      xLabel:xLabel3,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div7")

    radialPlot(div8, {
      data:dataHour,
      hour:xValue4,
      yValue:yValue2,
      yLabel:yLabel2,
      colorValue:pointColor2,
      margin:margin
    });

    console.log("div8")

    linePlot(div9, {
      data:dataDay,
      xValue:xValue4,
      yValue1:yValue1,
      yValue2:yValue2,
      xLabel:xLabel4,
      yLabel:"Users",
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    console.log("div9")

  }

  console.log('now render');

  render();

  console.log('resized and rendered...');

  window.addEventListener('resize',render);

});
