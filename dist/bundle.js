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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__radialPlot2__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__applyFilter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__filterData__ = __webpack_require__(6);








     const div1 = "viz1";
     const div2 = "viz2";
     const div3 = "viz3";
     const div4 = "viz4";
     const div5 = "viz5";
     const div6 = "viz6";
     const div7 = "viz7";
     const div8 = "viz8";
     const div9 = "viz9";

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
      const pointSize = 5;
      const pointColor1 = "green";
      const pointColor2 = "blue";
      const pointColor3 = "grey";
      const filterValue = d => d.filterOpacity;


      const minDate = new Date(2011,0,1);
      const maxDate = new Date(2012,11,31);

      // initialize filter variables
      var startDate = new Date(2011,0,1);
      var endDate = new Date(2012,11,31);
      var year2011Filter=true;
      var year2012Filter=true;
      var dayTypeWorkingFilter=true;
      var dayTypeNonWorkingFilter=true;
      var weatherSit1Filter=true;
      var weatherSit2Filter=true;
      var weatherSit3Filter=true;


      const margin = { left: 60, right: 10, top: 10, bottom: 60 };

      //initialize these variables in the Global Scope
      //so they can be accessed by any function

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
          d.filterOpacity=1;
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
          d.filterOpacity=.25;
          return d;
      };

var dataHour =[],dataDay = [];  //initialize dataHour outside of function

d3.csv('data/hour.csv', row1, data => {

  dataHour = data
  //use nest to groupby day and rollup based on
  //parameter specific rollup parameters
  //(i.e., mean, max or sum)
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
      //console.log(nestbyday);

      //unnest creates an array of objects from the
      //array of key:valueObject pairs generated by
      //d3.nest

      //unnest adapted from 		      //https://bl.ocks.org/SpaceActuary/723b26e187e6bbc2608f

      function unnest(data, children){
          var output=[];
          data.forEach((d,i)=>{
            output.push(d[children]);
            })
				return output;
        };

      dataDay = unnest(nestbyday, "value");
      //console.log(dataDay);

      // startDate = d3.min(dataDay, d=>d.dteDay);
      // endDate = d3.max(dataDay, d=>d.dteDay);
      console.log(dataHour)
      console.log(dataDay)

//render function for all visualizations
  function render(){
    console.log("update filter and echo to console")

    var dateRange = d3.extent(dataDay, d=>d.dteday);
    console.log('date range: '+ dateRange[0] +" to "+dateRange[1]);

    //set defaultOpacity
    let unfilteredOpacity = .25;

    const dataHourFiltered = Object(__WEBPACK_IMPORTED_MODULE_5__filterData__["a" /* default */])(dataHour,{
      dateRange,
      year2011Filter,
      year2012Filter,
      dayTypeWorkingFilter,
      dayTypeNonWorkingFilter,
      weatherSit1Filter,
      weatherSit2Filter,
      weatherSit3Filter,
      unfilteredOpacity
    });
    console.log(dataHour);

    const dataDayFiltered =Object(__WEBPACK_IMPORTED_MODULE_5__filterData__["a" /* default */])(dataDay,{
      dateRange,
      year2011Filter,
      year2012Filter,
      dayTypeWorkingFilter,
      dayTypeNonWorkingFilter,
      weatherSit1Filter,
      weatherSit2Filter,
      weatherSit3Filter,
      unfilteredOpacity
    });
    console.log(dataDay);


    //first row of grids

    //note that div1 labels do not correspond to
    //final sequence of charts
    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div1, {
      data:dataDayFiltered,
      xValue:xValue1,
      yValue:yValue1,
      xLabel:xLabel1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin,
      filterValue:filterValue
    });

    console.log("div1")

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div2, {
      data:dataDayFiltered,
      xValue:xValue2,
      yValue:yValue1,
      xLabel:xLabel2,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin,
      filterValue:filterValue
    });

    console.log("div2")

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div3, {
      data:dataDayFiltered,
      xValue:xValue3,
      yValue:yValue1,
      xLabel:xLabel3,
      yLabel:yLabel1,
      colorValue:pointColor1,
      pointSize:pointSize,
      margin:margin,
      filterValue:filterValue
    });

    console.log("div3")

    Object(__WEBPACK_IMPORTED_MODULE_3__radialPlot2__["a" /* default */])(div4, {
      data:dataHourFiltered,
      hour:xValue5,
      yValue:yValue1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      margin:margin
    });

    console.log("div4")

    //second row of grid
    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div5, {
      data:dataDayFiltered,
      xValue:xValue1,
      yValue:yValue2,
      xLabel:xLabel1,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin,
      filterValue:filterValue
    });

    console.log("div5")

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div6, {
      data:dataDayFiltered,
      xValue:xValue2,
      yValue:yValue2,
      xLabel:xLabel2,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin,
      filterValue:filterValue
    });

    console.log("div6")

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div7, {
      data:dataDayFiltered,
      xValue:xValue3,
      yValue:yValue2,
      xLabel:xLabel3,
      yLabel:yLabel2,
      colorValue:pointColor2,
      pointSize:pointSize,
      margin:margin,
      filterValue:filterValue
    });

    console.log("div7")

    Object(__WEBPACK_IMPORTED_MODULE_2__radialPlot__["a" /* default */])(div8, {
      data:dataHourFiltered,
      hour:xValue5,
      yValue:yValue2,
      yLabel:yLabel2,
      colorValue:pointColor2,
      margin:margin
    });

    console.log("div8")

    Object(__WEBPACK_IMPORTED_MODULE_1__linePlot__["a" /* default */])(div9, {
      data:dataDay,
      xValue:xValue4,
      yValue1:yValue1,
      yValue2:yValue2,
      xLabel:xLabel4,
      yLabel:"Users",
      colorValue:pointColor2,
      pointSizeß:pointSize,
      margin:margin
    });


  };




  render();

  //evenet listeners
  window.addEventListener('resize',render);



//event handler for bootstrap toggle switch UI elements
$(function() {

  	$('#year2011').change(function() {
      year2011Filter = $(this).prop('checked');
      console.log(year2011Filter);
      render()
    });

    $('#year2012').change(function() {
      year2012Filter = $(this).prop('checked');
      console.log(year2012Filter);
      render()
		});

    $('#dayTypeWorking').change(function() {
      dayTypeWorkingFilter = $(this).prop('checked');
      console.log(dayTypeWorkingFilter);
      render()
    });


    $('#dayTypeNonWorking').change(function() {
      dayTypeNonWorkingFilter = $(this).prop('checked');
      console.log(dayTypeNonWorkingFilter);
      render()
    });

    $('#weatherSit1').change(function() {
      weatherSit1Filter = $(this).prop('checked');
      console.log(weatherSit1Filter);
      render()
    });

     $('#weatherSit2').change(function() {
      weatherSit2Filter = $(this).prop('checked') ;
      console.log(weatherSit2Filter);
      render()
    });

      $('#weatherSit3').change(function() {
      weatherSit3Filter = $(this).prop('checked');
      console.log(weatherSit1Filter);
      render()
    });
});
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
    margin,
    filterValue
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


  // console.log(width, height, minDimension);
  // console.log(svg.attr('width'), svg.attr('height'));

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


  var circlesExit = circles.exit()
    .attr('class','exit')
    .attr('fill-opacity',0)
    .remove();

  //UPDATE old elements present (change class)
  circles
    .attr('class','update');

  //merge new and existing ell
  circlesEnter
    .attr('class','enter')
    .attr('fill', colorValue)
    .attr('fill-opacity', d =>filterValue(d))
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
const yScale = d3.scaleLinear();
const minDate = new Date(2011,0,1)
const maxDate = new Date(2012,11,31)


const xTicks = 24
const yTicks = 5

const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(10)
  .tickFormat(d3.timeFormat("%Y-%m-%d"))
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(yTicks)
  .tickFormat(d3.format('.2s'))
  .tickPadding(10)
  .tickSize(-innerWidth);


/* harmony default export */ __webpack_exports__["a"] = (function (div, props) {
  const {
    data,
    xValue,
    yValue1,
    yValue2,
    xLabel,
    yLabelLeft,
    yLabelRight,
    colorValue,
    pointSize,
    margin
  } = props;

  console.log(minDate, maxDate, d3.extent(data, xValue))

  var vizDiv = document.getElementById(div);
  var svg = d3.select(vizDiv)
    .selectAll('svg')
    .data([null]);

  const width = vizDiv.offsetWidth;
  const height = vizDiv.offsetHeight;

  var brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on("brush end", brushed);

  function brushed() {
      var s = d3.event.selection || xScale.range();
      var dateRange=s.map(xScale.invert, xScale);
      //startDate and endDate appear to be undeclared in this function
      //- even though they are desclared in index.js
      // startDate = dateRange[0];
      // endDate = dateRange[1];
      //xScale.domain(s.map(xScale.invert, x2));
      console.log(dateRange)
      // console.log(startDate);
      // console.log(endDate);
      };

  var svgEnter = svg
    .enter()
    .append('svg');

  //set svg size to window
  svg = svgEnter
    .merge(svg)
    .attr('width',width)
    .attr('height',height);

//following code works - only one set of axes, but
//new line added to dom each time it resizes
  // var g = svg.selectAll('g').data([null]);
  // g = g.enter().append('g')
  //     .merge(g)
  //     .attr('transform', `translate(${margin.left},${margin.top})`);


  var g = svg.selectAll('.lineChartGroup').data([null]);
  g = g.enter().append('g')
      .attr('class','lineChartGroup')
      .merge(g)
      .attr('transform', `translate(${margin.left},${margin.top})`);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right*4;

  xScale
    .domain([minDate,maxDate]) //[minDate,maxDate] or d3.extent(data, xValue)
    .range([0, innerWidth])
    .nice(xTicks);

  yScale
    .domain(d3.extent(data, yValue1))
    .range([innerHeight, 0])
    .nice(yTicks);


  // var g = svg.selectAll('.lineChartGroup').data([null]);
  //g.enter().append('g').attr('class','.lineChartGroup');
  // var g = svg.selectAll('g').data([null]);
  // var gExit = svg.selectAll('.lineChartGroup').exit().remove();


  var xAxisG = g.selectAll('#x-axis-g').data([null]);

  xAxisG = xAxisG.enter().append('g').merge(xAxisG)
    .attr('id','x-axis-g')
    .attr('transform', `translate(0, ${innerHeight})`);

  var yAxisG = g.selectAll('#y-axis-g').data([null]);

  yAxisG = yAxisG
    .enter()
      .append('g')
    .merge(yAxisG)
    .attr('id','y-axis-g');

  var xAxisText = g.selectAll('#x-axis-label').data([null]);
  // var xAxisTextExit = g.selectAll('#x-axis-label').exit().remove();

  xAxisText = xAxisText.enter().append('text').merge(xAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'x-axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight+margin.bottom/2)
    .style('text-anchor', 'middle')
    .text(xLabel);

  var yAxisText = g.selectAll('#y-axis-label').data([null]);
  // var yAxisTextExit = g.selectAll('#y-axis-label').exit().remove();

  yAxisText = yAxisText.enter().append('text').merge(yAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'y-axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y',  -margin.left/2)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabelLeft);

//add brush to line chart
    g.append("g")
         .attr("class", "brush")
         .call(brush)
         .call(brush.move, xScale.range())

const curveFunction = d3.curveCatmullRom

const lineRegistered = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScale(yValue1(d)))
  .curve(curveFunction);

  //data join
  var userLines = g.selectAll('.linePath').data([null]);
  var userLinesEnter = userLines
      .enter()
      .append('path')
      .attr('class','linePath');
  var userLinesExit = userLines.remove();

  //UPDATE old elements present (change class)
userLinesExit

userLines;

  //merge new and existing elements
  userLinesEnter
    .attr('fill','none')
    .attr('stroke', 'green')
    .attr('stroke-width', 1)
    .merge(userLines)
    .attr('d', lineRegistered(data));


  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);


    });;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);

const radialOffset = 0 //.25*Math.PI

/* harmony default export */ __webpack_exports__["a"] = (function (div, props) {
  const {
    data,
    hour,
    yValue,
    yLabel,
    colorValue,
    margin
  } = props;

var vizDiv = document.getElementById(div);
var svg = d3.select(vizDiv)
  .selectAll('svg')
  .data([null]);

const width = vizDiv.offsetWidth;
const height = vizDiv.offsetHeight;

console.log(`radial plot ${width}, ${height}`)
//maintain 1:1 aspect ration for scatter plot
const minDimension = d3.min([width, height]);
console.log(`radial plot- min dimension ${width}, ${height}`)
var svgEnter = svg
  .enter()
  .append('svg');

//set svg size to window
svg = svgEnter
  .merge(svg)
  .attr('width',minDimension)
  .attr('height',minDimension);


//console.log(width, height, minDimension);
//console.log(svg.attr('width'), svg.attr('height'));

const innerHeight = minDimension - margin.top - margin.bottom;
const innerWidth = minDimension - margin.left - margin.right;
const rScaleMax = innerHeight/2
const rMax = 1000
console.log(`radial plot iH/iW/rSM/rM${innerWidth}, ${innerHeight},${rScaleMax},${rMax}`)
// g object for main plot
let g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

 // angular and radial tick marks need to be tied to different g
 //objects. If same g object used for both, if you have r radial
 //tick lines and a angular tick lines, only a-r angular tick
 //lines will plot. first five will be undefined

//g object for radial tick lines and labels
let gr = svg.selectAll('g').data([null]);

 gr = gr.enter().append('g')
   .merge(gr)
   .attr('transform',
  				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

const grExit = gr.exit().remove();
//g object for angular tick lines and labels

let ga = svg.selectAll('g').data([null]);


ga = ga.enter().append('g')
    .merge(ga)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
 										 ${innerHeight/2+margin.top})`);

const gaExit = ga.exit().remove();

//set up to draw ticklines
const xTickLength = rScaleMax;
const numTicks =8;
const xTickAngle =360/numTicks;
const xTickLabelMultiplier = 2400/numTicks
const rScale = d3.scaleLinear()
const aScale = d3.scaleLinear()
console.log(`xTickLength ${xTickLength}, numTicks${numTicks},xTickAngle ${xTickAngle}, xTickLabelMultiplier ${xTickLabelMultiplier}`)
rScale
  .domain([0,rMax])
  .range([0,rScaleMax]);

const rScaleTicks = rScale.ticks(5).slice(1);

console.log(`rScaleTicks ${rScaleTicks}`)
//drawing radial tick lines

var rAxisG = gr.selectAll('r-axis-g').data([null]);

// var rAxisGExit = gr.selectAll('r-axis-g').exit().remove();

// following code creates 5 objects
// does not appear to do anything useful
// tried with code commented out and result did not change
// may be because I am tying circles and text to gr
//
rAxisG = rAxisG
  .data(rScale.ticks(5).slice(1))
  .enter().append('g').merge(rAxisG)
	.attr('class','r-axis-g')
  .data(rScale.ticks(5).slice(1))
  .enter().append('g');

// rAxisGExit;

var rAxisTicks = gr.selectAll('#r-axis-ticks').data([null]);
var rAxisTickExit = gr.selectAll('#r-axis-ticks').exit().remove();

console.log(`gr`)

//these are created in dom (and update properly based on browser
// window size, but they are not visible
// is this an  issue with the class?

rAxisTicks=rAxisTicks
  .data(rScale.ticks(5).slice(1))
  .enter().append('circle').merge(rAxisTicks)
  .attr('class','r-axis-g')
  .attr('class','axis circle')
  .attr('id', 'r-axis-tick')
  .append('circle')
	.attr("r",rScale);

// rAxisTickExit;

var rAxisText = gr.selectAll('#r-axis-text').data([null]);
var rAxisTextExit = gr.selectAll('#r-axis-text').exit().remove();
// these are create but 'ghosts' of previously drawn labels
// remain on chart. Their angular position relative to the origin // stays the same, but the radius varies
rAxisText =rAxisText
  .data(rScale.ticks(5).slice(1))
  .enter().append('text').merge(rAxisText)
  .attr('class','r-axis-g')
  .attr('class','tick')
  .attr('id', 'r-axis-text')
  .attr("y", function(d) { return -rScale(d) + 10; })
  .attr("transform", "rotate(22.5)")
  .style("text-anchor", "middle")
  .text(function(d) { return d; });

//tried exit pattern, old tick labels did not go away
grExit;
console.log(`grExit`)



//draw angular tick lines
var aAxisG = gr.selectAll('#a-axis-g').data([null]);
// these appear to function as intended - they exist in the dom,
//and they are visible

aAxisG = aAxisG
    .data(d3.range(0, 360, xTickAngle))
    .enter().append("g").merge(aAxisG)
    .attr('id', 'a-axis-g')
    .attr('class', 'axis tick')
    .attr("transform", function(d) { return "rotate(" + d + ")"; });

aAxisG
    .append("line")
    .attr("x2", rScaleMax);



var aAxisText = gr.selectAll('#a-axis-text').data([null]);
// these do no appear in the dom at all
aAxisText = aAxisG
    .data(d3.range(0, 360, xTickAngle))
    .enter().append("text").merge(aAxisText)
    .attr('id','a-axis-text')
    .attr("x", rScaleMax + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (rScaleMax + 6) + ",0)" : null; })
    .text(function(d,i) { return i*xTickLabelMultiplier + "h"; });

gaExit;
console.log(`gaExit`)


//d.hr variable is hardcoded for time being
// waiting until other issues debugged
const angleHours = d => (d.hr/24 *Math.PI*2+ radialOffset);
console.log(`angleHours ${angleHours}`)

// CatmullRom curve selected because it
// it passes through all points and
// has less overshoot that others
const curveFunction = d3.curveCatmullRom


//refactored code for aScale
// aScale
//   .domain(d3.extent(data,hour))
//   .range([0,Math.PI*2]);

const radialPath = d3.lineRadial()
  .angle(d => angleHours(d))
  .radius(d => rScale(yValue(d)))
  .curve(curveFunction);


var radialLines = g.selectAll('path').data([null]);
var radialLinesEnter = radialLines.enter().append('path');
var radialLinesExit = radialLines.exit().remove();

//UPDATE old elements present (change class)
radialLines
  .attr('class','update');

//merge new and existing ell
radialLinesEnter
  .attr('class','enter')
  .attr('fill', 'none')
  .attr('stroke', colorValue)
  .attr('stroke-opacity', 0.7)
  .attr('stroke-width', .25)
  .merge(radialLines)
  .attr('d', radialPath(data));

//remove elements for which there is no data
radialLinesExit;
console.log('radialLinesExit')
});;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);

const radialOffset = 0 //.25*Math.PI

/* harmony default export */ __webpack_exports__["a"] = (function (div, props) {
  const {
    data,
    hour,
    yValue,
    yLabel,
    colorValue,
    margin
  } = props;

var vizDiv = document.getElementById(div);
var svg = d3.select(vizDiv)
  .selectAll('svg')
  .data([null]);

const width = vizDiv.offsetWidth;
const height = vizDiv.offsetHeight;

// console.log(`radial plot ${width}, ${height}`)

//maintain 1:1 aspect ration for scatter plot
const minDimension = d3.min([width, height]);

// console.log(`radial plot- min dimension ${width}, ${height}`)

var svgEnter = svg
  .enter()
  .append('svg');

//set svg size to window
svg = svgEnter
  .merge(svg)
  .attr('width',minDimension)
  .attr('height',minDimension);


//console.log(width, height, minDimension);
//console.log(svg.attr('width'), svg.attr('height'));

const innerHeight = minDimension - margin.top - margin.bottom;
const innerWidth = minDimension - margin.left - margin.right;
const rScaleMax = innerHeight/2
const rMax = 1000

// console.log(`radial plot iH/iW/rSM/rM${innerWidth}, ${innerHeight},${rScaleMax},${rMax}`)

// g object for main plot
let g = svg.selectAll('.radialChartGroup').data([null]);

  g = g.enter().append('g')
    .attr('class', 'radialChartGroup')
    .merge(g)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

 // angular and radial tick marks need to be tied to different g
 //objects. If same g object used for both, if you have r radial
 //tick lines and a angular tick lines, only a-r angular tick
 //lines will plot. first five will be undefined

//g object for radial tick lines and labels
let gr = svg.selectAll('g').data([null]);

 gr = gr.enter().append('g')
   .merge(gr)
   .attr('transform',
  				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

const grExit = gr.exit().remove();
//g object for angular tick lines and labels

let ga = svg.selectAll('#a-axis-g').data([null]);


ga = ga.enter().append('g')
    .merge(ga)
    .attr('id','a-axis-g')
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
 										 ${innerHeight/2+margin.top})`);

//set up to draw ticklines
const xTickLength = rScaleMax;
const numTicks =8;
const xTickAngle =360/numTicks;
const xTickLabelMultiplier = 2400/numTicks
const rScale = d3.scaleLinear()
const aScale = d3.scaleLinear()

// console.log(`xTickLength ${xTickLength}, numTicks${numTicks},xTickAngle ${xTickAngle}, xTickLabelMultiplier ${xTickLabelMultiplier}`)

rScale
  .domain([0,rMax])
  .range([0,rScaleMax]);

const rScaleTicks = rScale.ticks(5).slice(1);

// console.log(`rScaleTicks ${rScaleTicks}`)
//drawing radial tick lines

var rAxisG = gr.selectAll('#r-axis-g').data([null]);

rAxisG = rAxisG
  .data(rScale.ticks(5).slice(1))
  .enter().append('g').merge(rAxisG)
	.attr('id','#r-axis-g');

// rAxisGExit;

var rAxisTicks = gr.selectAll('#r-axis-ticks').data([null]);

rAxisTicks=rAxisTicks
  .data(rScale.ticks(5).slice(1))
  .enter().append('circle').merge(rAxisTicks)
  .attr('class','r-axis-g axis circle')
  .attr('id', 'r-axis-tick')
  .append('circle')
	.attr("r",rScale);

var rAxisText = gr.selectAll('#r-axis-text').data([null]);

rAxisText =rAxisText
  .data(rScale.ticks(5).slice(1))
  .enter().append('text').merge(rAxisText)
  .attr('class','r-axis-g tick')
  .attr('id', 'r-axis-text')
  .attr("y", function(d) { return -rScale(d) + 10; })
  .attr("transform", "rotate(22.5)")
  .style("text-anchor", "middle")
  .text(function(d) { return d; });

var aAxisG = gr.selectAll('#a-axis-g').data([null]);

aAxisG = aAxisG
    .data(d3.range(0, 360, xTickAngle))
    .enter().append("g").merge(aAxisG)
    .attr('id', 'a-axis-g')
    .attr('class', 'axis tick')
    .attr("transform", function(d) { return "rotate(" + d + ")"; });

aAxisG
    .append("line")
    .attr("x2", rScaleMax);


var aAxisText = gr.selectAll('#a-axis-text').data([null]);
// these do no appear in the dom at all
aAxisText = aAxisG
    .data(d3.range(0, 360, xTickAngle))
    .enter().append("text").merge(aAxisText)
    .attr('id','a-axis-text')
    .attr("x", rScaleMax + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (rScaleMax + 6) + ",0)" : null; })
    .text(function(d,i) { return i*xTickLabelMultiplier + "h"; });



//d.hr variable is hardcoded for time being
// waiting until other issues debugged
const angleHours = d => (d.hr/24 *Math.PI*2+ radialOffset);
//
console.log(`angleHours ${angleHours}`)

// CatmullRom curve selected because it
// it passes through all points and
// has less overshoot that others
const curveFunction = d3.curveCatmullRom


//refactored code for aScale
// aScale
//   .domain(d3.extent(data,hour))
//   .range([0,Math.PI*2]);

const radialPath = d3.lineRadial()
  .angle(d => angleHours(d))
  .radius(d => rScale(yValue(d)))
  .curve(curveFunction);


var radialLines = g.selectAll('path').data([null]);
var radialLinesEnter = radialLines.enter().append('path');
var radialLinesExit = radialLines.exit().remove();

//UPDATE old elements present (change class)
radialLines
  .attr('class','update');

//merge new and existing ell
radialLinesEnter
  .attr('class','enter')
  .attr('fill', 'none')
  .attr('stroke', colorValue)
  .attr('stroke-opacity', 0.7)
  .attr('stroke-width', .25)
  .merge(radialLines)
  .attr('d', radialPath(data));

//remove elements for which there is no data
radialLinesExit;
// console.log('radialLinesExit')
});;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* unused harmony default export */ var _unused_webpack_default_export = (function (data, props) {
  const {
    dateRange,
    year2011Filter,
    year2012Filter,
    dayTypeWorkingFilter,
    dayTypeNonWorkingFilter,
    weatherSit1Filter,
    weatherSit2Filter,
    weatherSit3Filter,
    unfilteredOpacity
  } = props;

  console.log("applyFilter")
  console.log(dateRange,
    year2011Filter,year2012Filter,
    dayTypeWorkingFilter,dayTypeNonWorkingFilter,
    weatherSit1Filter,weatherSit2Filter,weatherSit3Filter, unfilteredOpacity)

  //reset filters
  data.forEach(d=>d.filterOpacity=unfilteredOpacity);

  //apply filters to data set based on state of toggle buttons on screen
  data.forEach(d =>{
      //if(d.dteday<dateRange[0] || d.dteday>dateRange[1]) {d.filterOpacity=0.0}
      if(d.yr==0 && year2011Filter==false) {d.filterOpacity=0.0}
      else if(d.yr==1 && year2012Filter==false) {d.filterOpacity=0.0}
      else if(d.workingday==1 && dayTypeWorkingFilter==false) {d.filterOpacity=0.0}
      else if(d.workingday==0 && dayTypeNonWorkingFilter==false) {d.filterOpacity=0.0}
      else if(d.weathersit==1 && weatherSit1Filter==false) {d.filterOpacity=0.0}
      else if(d.weathersit==2 && weatherSit2Filter==false) {d.filterOpacity=0.0}
      else if(d.weathersit==3 && weatherSit3Filter==false) {d.filterOpacity=0.0}
      });
  //console.log(data);
});;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = (function (data, props) {
  const {
    dateRange,
    year2011Filter,
    year2012Filter,
    dayTypeWorkingFilter,
    dayTypeNonWorkingFilter,
    weatherSit1Filter,
    weatherSit2Filter,
    weatherSit3Filter,
    unfilteredOpacity
  } = props;

  console.log("filterData executing...")


    //apply filters to data set based on state of toggle buttons on screen
  let filteredData = [];
  data.forEach(d =>{
      //if(d.dteday<dateRange[0] || d.dteday>dateRange[1]) {d.filterOpacity=0.0}
      if(d.yr==0 && year2011Filter==false) {return}
      else if(d.yr==1 && year2012Filter==false) {return}
      else if(d.workingday==1 && dayTypeWorkingFilter==false) {return}
      else if(d.workingday==0 && dayTypeNonWorkingFilter==false) {return}
      else if(d.weathersit==1 && weatherSit1Filter==false) {return}
      else if(d.weathersit==2 && weatherSit2Filter==false) {return}
      else if(d.weathersit==3 && weatherSit3Filter==false) {return}
      else filteredData.push(d);
    });
  //console.log(data);
return filteredData});;


/***/ })
/******/ ]);