/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scatterPlot__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linePlot__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__radialPlot__ = __webpack_require__(3);




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
      const xLabel4 = 'Date';
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
    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div1, {
      data:data,
      xValue:xValue1,
      yValue:yValue1,
      xLabel:xLabel1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div2, {
      data:data,
      xValue:xValue2,
      yValue:yValue1,
      xLabel:xLabel2,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div3, {
      data:data,
      xValue:xValue3,
      yValue:yValue1,
      xLabel:xLabel3,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div4, {
      data:data,
      xValue:xValue1,
      yValue:yValue1,
      xLabel:xLabel1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin
    });

    //second row of grid
    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div5, {
      data:data,
      xValue:xValue1,
      yValue:yValue2,
      xLabel:xLabel1,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div6, {
      data:data,
      xValue:xValue2,
      yValue:yValue2,
      xLabel:xLabel2,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div7, {
      data:data,
      xValue:xValue3,
      yValue:yValue2,
      xLabel:xLabel3,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div8, {
      data:data,
      xValue:xValue1,
      yValue:yValue2,
      xLabel:xLabel1,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });

    Object(__WEBPACK_IMPORTED_MODULE_1__linePlot__["a" /* default */])(div9, {
      data:data,
      xValue:xValue4,
      yValue:yValue3,
      xLabel:xLabel4,
      yLabel:"Users",
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin
    });


  }

  console.log('now render');

  render();

  console.log('resized and rendered...');

  window.addEventListener('resize',render);

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);


const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(10)
  .tickFormat(d3.format('0'))
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .tickFormat(d3.format('.2s'))
  .tickPadding(10)
  .tickSize(-innerWidth);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shape('circle');

/* harmony default export */ __webpack_exports__["a"] = (function (div, props) {
  const {
    data,
    xValue,
    yValue,
    xLabel,
    yLabel,
    colorValue,
    pointSize,
    margin
  } = props;


  var vizDiv = document.getElementById(div);
  var svg = d3.select(vizDiv)
    .selectAll('svg')
    .data([null]);

  const width = vizDiv.offsetWidth;
  const height = vizDiv.offsetHeight;

  //maintain 1:1 aspect ration for scatter plot
  const minDimension = d3.min([width, height]);

  var svgEnter = svg
    .enter()
    .append('svg');

  //set svg size to window
  svg = svgEnter
    .merge(svg)
    .attr('width',minDimension)
    .attr('height',minDimension);


  console.log(width, height, minDimension);
  console.log(svg.attr('width'), svg.attr('height'));

  const innerHeight = minDimension - margin.top - margin.bottom;
  const innerWidth = minDimension - margin.left - margin.right;


  xScale
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  yScale
    .domain(d3.extent(data, yValue)) //d3.extent(data, yValue
    .range([innerHeight, 0])
    .nice();

  var g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  var xAxisG = g.selectAll('#x-axis-g').data([null]);

  xAxisG = xAxisG.enter().append('g').merge(xAxisG)
    .attr('id','x-axis-g')
    .attr('transform', `translate(0, ${innerHeight})`);

  var yAxisG = g.selectAll('#y-axis-g').data([null]);

  yAxisG = yAxisG.enter().append('g').merge(yAxisG)
    .attr('id','y-axis-g');

  var xAxisText = g.selectAll('#x-axis-label').data([null]);

  xAxisText = xAxisText.enter().append('text').merge(xAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'x-axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight+margin.bottom/2)
    .style('text-anchor', 'middle')
    .text(xLabel);

  var yAxisText = g.selectAll('#y-axis-label').data([null]);

  yAxisText = yAxisText.enter().append('text').merge(yAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'y-axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y',  -margin.left/2)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);


  //data join
  var circles = g.selectAll('circle').data(data);

  //Add new elements
  var circlesEnter = circles.enter().append('circle');

  var t = d3.transition().duration(500);

  var circlesExit = circles.exit()
    .attr('class','exit')
    .remove();

  //UPDATE old elements present (change class)
  circles
    .attr('class','update');

  //merge new and existing ell
  circlesEnter
    .attr('class','enter')
    .attr('fill', colorValue)
    .attr('fill-opacity', .1)
    .attr('r', pointSize)
    .merge(circles)
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)));

  //remove elements for which there is no data
  circlesExit

  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  // colorLegendG.call(colorLegend)
  //   .selectAll('.cell text')
  //   .attr('dy', '0.1em');


    });;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const xScale = d3.scaleLinear();
const yScaleLeft = d3.scaleLinear();
const yScaleRight = d3.scaleLinear();
const minDate = new Date(2011-1-1)
const maxDate = new Date(2012-12-31)


const yTicksLeft = 5
const yTicksRight = 5




const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);


const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(10)
  .tickFormat(d3.timeFormat("%Y-%m-%d"))
  .tickSize(-innerHeight);

const yAxisLeft = d3.axisLeft()
  .scale(yScaleLeft)
  .ticks(yTicksLeft)
  .tickFormat(d3.format('.2s'))
  .tickPadding(10)
  .tickSize(-innerWidth);

const yAxisRight = d3.axisRight()
  .scale(yScaleRight)
  .ticks(yTicksRight)
  .tickFormat(d3.format('0'))
  .tickPadding(10)
  .tickSize(-innerWidth);



const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shape('circle');

/* harmony default export */ __webpack_exports__["a"] = (function (div, props) {
  const {
    data,
    xValue,
    yValue, //registered  Left Y Axis
    xLabel,
    yLabelLeft,
    yLabelRight,
    colorValue,
    pointSize,
    margin
  } = props;

  var vizDiv = document.getElementById(div);
  var svg = d3.select(vizDiv)
    .selectAll('svg')
    .data([null]);

  const width = vizDiv.offsetWidth;
  const height = vizDiv.offsetHeight;

  var svgEnter = svg
    .enter()
    .append('svg');

  //set svg size to window
  svg = svgEnter
    .merge(svg)
    .attr('width',width)
    .attr('height',height);


  console.log(width, height);
  console.log(svg.attr('width'), svg.attr('height'));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  xScale
    .domain([minDate,maxDate])
    .range([0, innerWidth])
    .nice();

  yScaleLeft
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice(yTicksLeft);

  yScaleRight
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice(yTicksRight);

  var g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  var xAxisG = g.selectAll('#x-axis-g').data([null]);

  xAxisG = xAxisG.enter().append('g').merge(xAxisG)
    .attr('id','x-axis-g')
    .attr('transform', `translate(0, ${innerHeight})`);

  var yAxisLeftG = g.selectAll('#y-axis-g').data([null]);

  yAxisLeftG = yAxisLeftG
    .enter()
      .append('g')
    .merge(yAxisLeftG)
    .attr('id','y-axis-g');

  //var yAxisRightG = g.selectAll('#y-axis-g').data([null]);

  //yAxisRightG = yAxisRightG.enter().append('g').merge(yAxisRightG)
  //    .attr('id','y-axis-g');

  var xAxisText = g.selectAll('#x-axis-label').data([null]);

  xAxisText = xAxisText.enter().append('text').merge(xAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'x-axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight+margin.bottom/2)
    .style('text-anchor', 'middle')
    .text(xLabel);

  var yAxisText = g.selectAll('#y-axis-label').data([null]);
  var yAxisTextLeft = g.selectAll('#y-axis-label').data([null]);

  yAxisText = yAxisText.enter().append('text').merge(yAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'y-axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y',  -margin.left/2)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabelLeft);

  // yAxisTextLeft = yAxisTextLeft.enter().append('text').merge(yAxisTextLeft)
  //    .attr('class', 'axis-label')
  //    .attr('id', 'y-axis-label')
  //    .attr('x', -innerHeight / 2)
  //    .attr('y',  innerWidth-margin.right/2)
  //    .attr('transform', `rotate(90)`)
  //    .style('text-anchor', 'middle')
  //    .text(yLabelRight);

// var line2 = d3.line()
//   .x(d => xScale(xValue(d)))
//   .y(d => yScaleLeft(y2Value(d)))
//   .curve(d3.curveBasis);

var line1 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(yValue(d)))
  .curve(d3.curveBasis)

// var line3 = d3.line()
//   .x(d => xScale(xValue(d)))
//   .y(d => yScaleRight(y3Value(d)))
//   .curve(d3.curveBasis)

  //data join
  const line = g.selectAll('path').data(data);

  //Add new elements
  const lineEnter = line.enter().append('path');

  const t = d3.transition().duration(500);

  const lineExit = line.exit().remove();

  //UPDATE old elements present (change class)
  line
    .attr('class','update');

  //merge new and existing ell
  lineEnter
    .attr('class','enter')
    .attr('fill','none')
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('d', line1(data));

  //remove elements for which there is no data
  lineExit

  //call X and Y axis
  xAxisG.call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-15)");;
  yAxisLeftG.call(yAxisLeft);
  // yAxisRightG.call(yAxisRight);


    });;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);



/* unused harmony default export */ var _unused_webpack_default_export = (function (div, props) {
  const {
    data,
    xValue,
    yValue,
    xLabel,
    yLabel,
    colorValue,
    pointSize,
    margin
  } = props;


  var vizDiv = document.getElementById(div);
  var svg = d3.select(vizDiv)
    .selectAll('svg')
    .data([null]);

  const width = vizDiv.offsetWidth;
  const height = vizDiv.offsetHeight;

  //maintain 1:1 aspect ration for scatter plot
  const minDimension = d3.min([width, height]);

  var svgEnter = svg
    .enter()
    .append('svg');

  //set svg size to window
  svg = svgEnter
    .merge(svg)
    .attr('width',minDimension)
    .attr('height',minDimension);


  console.log(width, height, minDimension);
  console.log(svg.attr('width'), svg.attr('height'));

  const innerHeight = minDimension - margin.top - margin.bottom;
  const innerWidth = minDimension - margin.left - margin.right;


  xScale
    .domain(d3.extent(data, xValue))
    .range([0, 2*Math.pi]);

  yScale
    .domain([0,1000]) //d3.extent(data, yValue
    .range([0,innerHeight/2])
    .nice();

  var g = svg.selectAll('g').data([null]);

  // translate origin to center of inner svg
  g = g.enter().append('g')
    .merge(g)
    .attr('transform', `translate( ${innerWidth/2+margin.left},${innerHeight/2+margin.top})`);

  //draw ticklines
  const yMax = 1000;
  const yScaleMax = innerHeight/2;
  const numXTicks =24;
  const numYTicks =4;
  const yScaleradialScaleFactor = (innerHeight/2*yScaleMax);

  const drawYTicks = function(yScaleMax, numYTicks) {
    for (i=0; i<numYTicks; i++){
      g.append('circle')
        .attr('cx',0)
        .attr('cy',0)
        .attr('fill', 'none')
        .attr('stroke', 'lightgrey')
        .attr('stroke-width', 1)
        .attr('r', yScaleMax * (i+1)/numYTicks)
      };
    };

  const drawXTicks = function (numXTicks){

  const tickEndPoint = function(angle,radius){
    x = radius * Math.cos(angle)
    y = radius * Math.sin(angle)
    return [x,y]};

  const tickAngles = function(numberOfTicks){
    let tickAngles = []
    for(i=0; i<numberOfTicks; i++){
      angle = Math.PI *2 * i/numberOfTicks
      tickAngles.push(angle)
      };
      return tickAngles
    };

  const tickCoordinates = function(numberOfTicks,tickRadius){
    let tickAngle = tickAngles(numberOfTicks)
    let xTickArray =[]
    for (i = 0; i <tickAngle.length; i++){
      xy = tickEndPoint(tickAngle[i],tickRadius);
      xTickArray.push(xy);
      };
      return xTickArray
    };

  let t = tickAngles(numXTicks);
  let xTickLength = yScaleMax *1.05;
  let xTickArray = tickCoordinates (numTicks,xTickLength);

  for (i in xTickArray){
    g.append('line')
  		.attr('x1',0)
  		.attr('y1',0)
      .attr('x2',xTickArray[i][0])
  		.attr('y2',xTickArray[i][1])
      .attr('fill', 'none')
      .attr('stroke', 'lightgrey')
      .attr('stroke-width', 1);

    g.append('text')
    	.attr('class', "tick text")
    	.text("xtick")
      .attr('text-anchor', 'middle')
      .attr("x", xTickArray[i][0])
      .attr("y",xTickArray[i][1])
  .attr('transform',`rotate(${90+(t[i])*360/(2*Math.PI)},${xTickArray[i][0]},${xTickArray[i][1]})`)
      .attr('font-family', 'sans-serif')
      .attr('fill',"grey")
    	.attr('font-size', 11)
      .text(`${i/numTicks*2400}`)
  };
}

      //draw x abd y tick marks and labels
  drawXTicks(numXTicks);
  drawYTicks(yScaleMax, numYTicks);

  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('x', +innerHeight / 4+5)
      .attr('y', -5)
      .attr('transform', `rotate(0)`)
      .style('text-anchor', 'middle')
      .text(yLabel);

  const xScale = d3.scaleTime();
  const yScaleLeft = d3.scaleLinear()
    .domain([0,yMax])
    .range([0,yScaleMax]);

  const colorUser = {Total:"grey", Casual:"red",  Registered:"green"}

  const minDate = new Date(2012,1,1)
  const centerOffset = innerHeight/2;
  const radialOffset = 0 //.25*Math.PI

  const angleHours = d => (xValue(d)/24 *Math.PI*2+ radialOffset);
  var plotColor = colorUser.Registered



  const radialTimeSeriesLine = d3.lineRadial()
    .angle(d => angleHours(d))
    .radius(d => yValue(d)*radialScaleFactor)
    .curve(d3.curveLinear);

  //data join
  const radialPath = g.selectAll('path').data(data);

  //Add new elements
  var radialPathEnter = radialPath.enter().append('path');

  var radialPathExit = radialPath.exit()
      .attr('class','exit')
      .remove();

  //UPDATE old elements present (change class)
  radialPath
      .attr('class','update');

  //merge new and existing ell
  radialPathEnter
    .attr('class','enter')
    .merge(radialPath)
    .attr('fill', 'none')
    .attr('stroke', colorValue)
    .attr('stroke-opacity', 0.7)
    .attr('stroke-width', .1)
    .attr('d', radialTimeSeriesLine(data));

//remove elements for which there is no data
radialPathExit
});;


/***/ })
/******/ ]);