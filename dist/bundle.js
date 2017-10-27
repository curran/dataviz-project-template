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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stacked_area__ = __webpack_require__(1);


const xValue = "date";
const xLabel = 'Time';
const yValue = "prod_count";
const yLabel = 'Complaint Count';
const colorValue = "product";
const colorLabel = 'product';
const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const svg = visualization.select('svg');

const row = d => {
d.date = new Date(d.date);
d.product = +d.product;
d.prod_count = +d.prod_count;
return d;
};

d3.csv('data/cfpb_complaints2.csv', row, data => {

  const render = () => {

    data = d3.nest()
      .key(function(d) {return d.date;})
      .key(function(d) {return d.product;})
      .rollup(function(v) {return {"prod_count": d3.sum(v,function(d) {return d.count;})}})
      .entries(data);

    // Extract the width and height that was computed by CSS.
    svg
      .attr('width', visualizationDiv.clientWidth)
      .attr('height', visualizationDiv.clientHeight);

    // Render the scatter plot.
    Object(__WEBPACK_IMPORTED_MODULE_0__stacked_area__["a" /* default */])(svg, {
      data,
      xValue,
      xLabel,
      yValue,
      yLabel,
      colorValue,
      colorLabel,
      margin
    });
  }

  // Draw for the first time to initialize.
  render();

  // Redraw based on the new size whenever the browser window is resized.
  //window.addEventListener('resize', render);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var xScale = d3.scaleTime().range([0, innerWidth]);
var yScale = d3.scaleLinear().range([innerHeight, 0]);
var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom()
.scale(xScale)
.tickPadding(15)

var yAxis = d3.axisLeft()
.scale(yScale)
.ticks(5)
.tickPadding(15)

var colorLegend = d3.legendColor()
.scale(colorScale)
.shapePadding(3)
.shapeWidth(15)
.shapeHeight(15)
.labelOffset(4)
.ascending(true);

var xAxisLabelOffset = 48;
var yAxisLabelOffset = 60;

/* harmony default export */ __webpack_exports__["a"] = (function (svg, props) {
  const { 
    data,
    xValue,
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
    margin
  } = props;

  var areaColumn = colorValue;

  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  var svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);
  var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")")
  var xAxisLabel = xAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
  .attr("class", "label")
  .text(xLabel);

  var yAxisG = g.append("g")
  .attr("class", "y axis");
  var yAxisLabel = yAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
  .attr("class", "label")
  .text(yLabel);

  var colorLegendG = g.append("g")
  .attr("class", "color-legend")
  .attr("transform", "translate(16, 2)");

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);

  var stack = d3.stack()
  .y(function (d){ return d[yValue]; })
  .values(function (d){ return d.values; });

  var area = d3.area()
  .x(function(d) { return xScale(d[xValue]); })
  .y0(function(d) { return yScale(d.y0); })
  .y1(function(d) { return yScale(d.y0 + d.y); });

  var nested = d3.nest()
    .key(function (d){ return d[areaColumn]; })
    .entries(data);

  var layers = stack(nested);

  xScale.domain(d3.extent(data, function (d){ return d[xValue]; }));
  yScale.domain([
    0,
    d3.max(layers, function (layer){
      return d3.max(layer.values, function (d){
        return d.y0 + d.y;
      });
    })
  ]);

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  colorScale.domain(nested.map(function (d){ return d.key; }));

  var paths = g.selectAll(".chart-area").data(layers);
  paths.enter().append("path").attr("class", "chart-line");
  paths.exit().remove();
  paths
    .attr("d", function (d){ return area(d.values); })
    .attr("fill", function (d){ return colorScale(d.key); });

  colorLegendG.call(colorLegend);
});




/***/ })
/******/ ]);