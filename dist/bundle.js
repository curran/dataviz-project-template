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
    yValue1, //registered  Left Y Axis
    yValue2, //casual      Left Y Axis
    yValue3, //temp        Right Y Axis
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
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  yScaleLeft
    .domain(d3.extent(data, yValue1))
    .range([innerHeight, 0])
    .nice(yTicksLeft);

  yScaleRight
    .domain(d3.extent(data, yValue3))
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

var line2 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(y2Value(d)))
  .curve(d3.curveBasis);

var line1 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(y1Value(d)))
  .curve(d3.curveBasis)

var line3 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleRight(y3Value(d)))
  .curve(d3.curveBasis)

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
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
    .attr('d', line1);

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
    .attr('fill-opacity', .2)
    .attr('r', pointSize)
   .merge(circles)
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)));

  //remove elements for which there is no data
  circlesExit

  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  colorLegendG.call(colorLegend)
    .selectAll('.cell text')
    .attr('dy', '0.1em');


// TODO adapt radial time series code to
// const xValue = d => d.dteday;



//       function deltaDays(date1, date2){
//         const dayms = 1000 * 60 * 60 * 24;
//         var date1ms = date1.geTime();
//         var date2ms = date2.getTime();
//         var deltams = date1ms-date2ms
//         return (deltams/dayms)
//         };

//       const yMax = d3.max(yValue)
//       const colorUser = {Total:"grey", Casual:"red",  Registered:"green"}

//       const minDate = new Date(2012,1,1)
//       const centerOffset = innerHeight/2;
//       const radialOffset = .25*Math.PI
//       //getting a
//       //const days = d => deltaDays(d.dteday,minDate);
//       //days calc is a hack since pi is a periodic function
//       //calculating days since 1/1/1970 and dividing by 365 gets data on the screen..
//       const days = d =>(d.dteday.getTime()/(1000*60*60*24))
//       const theta = d => (d.hr/24 *Math.PI*2+ radialOffset);

//       const radialScale = d => (innerHeight/2* yValue/yMax);
//       const radialX = d => (radialScale(d) * Math.cos(theta(d))+centerOffset);
//       const radialY = d => (radialScale(d) * Math.sin(theta(d))+centerOffset);
//       var plotColor = colorUser.Registered
//
//       const radialPath = d3.line()
//         .x(d => radialX(d))
//         .y(d => radialY(d))
//         .curve(d3.curveBasis);

//         g.append('path')
//             .attr('fill', 'none')
//             .attr('stroke', plotColor)
//             .attr('stroke-opacity', 0.7)
//             .attr('stroke-width', .1)
//             .attr('d', radialPath(data));

//         g.append('circle')
//             .attr('cx',centerOffset)
//             .attr('cy',centerOffset)
//             .attr('fill', 'none')
//             .attr('stroke', 'grey')
//             .attr('stroke-width', 2)
//             .attr('r', centerOffset);






    });;


/***/ })
/******/ ]);