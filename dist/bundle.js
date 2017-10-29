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
    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div1, {
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

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div2, {
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

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div3, {
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

    Object(__WEBPACK_IMPORTED_MODULE_2__radialPlot__["a" /* default */])(div4, {
      data:dataHour,
      hour:xValue5,
      yValue:yValue1,
      yLabel:yLabel1,
      colorValue:pointColor1,
      margin:margin
    });

    console.log("div4")

    //second row of grid
    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div5, {
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

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div6, {
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

    Object(__WEBPACK_IMPORTED_MODULE_0__scatterPlot__["a" /* default */])(div7, {
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

    Object(__WEBPACK_IMPORTED_MODULE_2__radialPlot__["a" /* default */])(div8, {
      data:dataHour,
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
const minDate = new Date(2011,-1,1)
const maxDate = new Date(2012,11,31)


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
    yValue2,
    xLabel,
    yLabelLeft,
    yLabelRight,
    colorValue,
    pointSize,
    margin
  } = props;

  console.log(minDate, maxDate, d3.extent(xValue))

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
  const innerWidth = width - margin.left - margin.right*4;


  xScale
    .domain([minDate,maxDate]) //[minDate,maxDate] or d3.extent(data, xValue)
    .range([0, innerWidth])
    .nice();

  yScaleLeft
    .domain(d3.extent(data, yValue1))
    .range([innerHeight, 0])
    .nice(yTicksLeft);

  yScaleRight
    .domain(d3.extent(data, yValue1))
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
//   .x(d => xScalße(xValue(d)))
//   .y(d => yScaleLeft(y2Value(d)))
//   .curve(d3.curveBasis);

const line1 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(yValue1(d)))
  .curve(d3.curveBasis);

console.log(line1);
  // var line2 = d3.line()
  //   .x(d => xScale(xValue(d)))
  //   .y(d => yScaleLeft(yValue2(d)))
  //   .curve(d3.curveCatmullRom);

// var line3 = d3.line()
//   .x(d => xScale(xValue(d)))
//   .y(d => yScaleRight(y3Value(d)))
//   .curve(d3.curveBasis)

  //data join
  var userLines = g.selectAll('path').data([null]);
  var userLinesEnter = userLines
      .enter()
      .append('path')
      .attr('id','line1');
  var userLinesExit = userLines.exit().remove();

  // var userLines2 = g.selectAll('path').data([null]);
  // var userLines2Enter = userLines2
  //     .enter()
  //     .append('path')
  //     .attr('id','line2');

  //UPDATE old elements present (change class)
  userLines
    .attr('class','update');

  //merge new and existing ell
  userLinesEnter
    .attr('fill','none')
    .attr('stroke', 'purple')
    .attr('stroke-width', 1)
    .merge(userLines)
    .attr('d', line1(data));

  // userLines2Enter
  //     .selectAll('#line2')
  //     .attr('id','#line2')
  //     .attr('class','enter')
  //     .attr('fill','none')
  //     .attr('stroke', 'red')
  //     .attr('stroke-width', 1)
  //     .attr('d', line2(data))
  //     .merge(userLines2);

  //remove elements for which there is no data

  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisLeftG.call(yAxisLeft);
  // yAxisRightG.call(yAxisRight);


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


//console.log(width, height, minDimension);
//console.log(svg.attr('width'), svg.attr('height'));

const innerHeight = minDimension - margin.top - margin.bottom;
const innerWidth = minDimension - margin.left - margin.right;
const rScaleMax = innerHeight/2
const rMax = 1000


let g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

// let gr = svg.selectAll('g').data([null]);
//
//  gr = gr.enter().append('g')
//    .merge(gr)
//    .attr('transform',
//   				`translate(${innerWidth/2+margin.left},
// 										 ${innerHeight/2+margin.top})`);
//

// let ga = svg.selectAll('g').data([null]);
//
//  ga = ga.enter().append('g')
//    .merge(ga)
//    .attr('transform',
//   				`translate(${innerWidth/2+margin.left},
// 										 ${innerHeight/2+margin.top})`);

//draw ticklines
//draw ticklines
const xTickLength = rScaleMax;
const numTicks =8;
const xTickAngle =360/numTicks;
const xTickLabelMultiplier = 2400/numTicks
const rScale = d3.scaleLinear()
const aScale = d3.scaleLinear()

rScale
  .domain([0,rMax])
  .range([0,rScaleMax]);

const rScaleTicks = rScale.ticks(5).slice(1);

var rAxisG = g
	.attr('class', 'r axis tick')
  .selectAll('ga')
  .data(rScale.ticks(5).slice(1))
  .enter().append('g');

rAxisG
  .append('circle')
	.attr("r",rScale);

rAxisG
  .append('text')
	.attr("y", function(d) { return -rScale(d) + 10; })
  .attr("transform", "rotate(22.5)")
  .style("text-anchor", "middle")
  .text(function(d) { return d; });

var aAxisG = svg.append('g')
   .attr('transform',
  				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`)
  .attr("class", "a axis tick")
    .data(d3.range(0, 360, xTickAngle))
  .selectAll('g')
  .enter().append("g")
    .attr("transform", function(d) { return "rotate(" + d + ")"; });


aAxisG
    .append("line")
    .attr("x2", rScaleMax);

aAxisG
    .append("text")
    .attr("x", rScaleMax + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (rScaleMax + 6) + ",0)" : null; })
    .text(function(d,i) { return i*xTickLabelMultiplier + "h"; });





const angleHours = d => (d.hr/24 *Math.PI*2+ radialOffset);
const curveFunction = d3.curveCatmullRom
//
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
  .attr('d', radialPath(data));;

//remove elements for which there is no data
radialLinesExit;
});;


/***/ })
/******/ ]);