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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__earthPanel__ = __webpack_require__(1);


var width = 1000, height = 800;
Object(__WEBPACK_IMPORTED_MODULE_0__earthPanel__["a" /* default */])(width, height);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScatterPlot__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = (function () {

    Object(__WEBPACK_IMPORTED_MODULE_1__ScatterPlot__["a" /* default */])("China");
    Object(__WEBPACK_IMPORTED_MODULE_0__Slider__["a" /* default */])("China");

    function getRatio(side) {
        return (( margin[side] / width ) * 100 + 1) + "%";
    }

    var margin = {left: 5, top: 5, right: 5, bottom: 5},
        width = 750,
        height = 800,
        marginRatio = {
            left: getRatio("left"),
            top: getRatio("top"),
            right: getRatio("right"),
            bottom: getRatio("bottom")
        };

    var sens = 0.3,
        focused;
    var projection = d3.geoOrthographic()
        .scale(280)
        .rotate([0, 0])
        .translate([281.25, 400])
        .clipAngle(90);

    var path = d3.geoPath()
        .projection(projection);

    var svg_earth = d3.select("div#earthPanel")
        .append("div")
        .attr("id", "svg-container")
        .append("svg")
        .style("padding", marginRatio.top + " " + marginRatio.right + " " + marginRatio.bottom + " " + 120)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + ( width + margin.left + margin.right  ) + " " + ( height + margin.top + margin.bottom ))
        .attr("id", "svg-content-responsive");

    svg_earth.append("path")
        .datum({type: "Sphere"})
        .attr("class", "water")
        .attr("d", path);

    var countryTooltip = d3.select("div#earthPanel").append("div").attr("class", "countryTooltip");
    var countryList = d3.select("div#selectPanel")
        .append("select").attr("name", "countries");

    queue()
        .defer(d3.json, "data/world-110m.json")
        .defer(d3.tsv, "data/world-110m-country-names.tsv")
        .await(ready);

    function ready(error, world, countryData) {

        var countryById = {},
            countries = topojson.feature(world, world.objects.countries).features;

        countryData.forEach(function (d) {
            countryById[d.id] = d.name;
            var option = countryList.append("option");
            option.text(d.name);
            option.property("value", d.id);
        });

        //Drawing countries on the globe

        var world = svg_earth.selectAll("path.land")
            .data(countries)
            .enter().append("path")
            .attr("class", "land")
            .attr("d", path)

            //Drag event
            .call(d3.drag()
                .subject(function () {
                    var r = projection.rotate();
                    return {x: r[0] / sens, y: -r[1] / sens};
                })
                .on("drag", function () {
                    var rotate = projection.rotate();
                    projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
                    svg_earth.selectAll("path.land").attr("d", path);
                    svg_earth.selectAll(".focused").classed("focused", focused = false);
                }))

            //Mouse events
            .on("dblclick", function (d) {
                document.getElementById("titleContent").innerHTML
                    = "Internet User and Mobile Subscriptions of " + countryById[d.id];
                Object(__WEBPACK_IMPORTED_MODULE_1__ScatterPlot__["a" /* default */])(countryById[d.id]);
                Object(__WEBPACK_IMPORTED_MODULE_0__Slider__["a" /* default */])(countryById[d.id]);
            })

            .on("mouseover", function (d) {
                countryTooltip.text(countryById[d.id])
                    .style("left", (d3.event.pageX + 7) + "px")
                    .style("top", (d3.event.pageY - 15) + "px")
                    .style("display", "block")
                    .style("opacity", 1);
            })
            .on("mouseout", function (d) {
                countryTooltip.style("opacity", 0)
                    .style("display", "none");
            })
            .on("mousemove", function (d) {
                countryTooltip.style("left", (d3.event.pageX + 7) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");
            });


        //Country focus on option select

        d3.select("select").on("change", function() {
            var rotate = projection.rotate(),
                focusedCountry = country(countries, this),
                p = d3.geoCentroid(focusedCountry);

            svg_earth.selectAll(".focused").classed("focused", focused = false);

            //Globe rotating

            (function transition() {
                d3.transition()
                    .duration(2500)
                    .tween("rotate", function() {
                        var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                        return function(t) {
                            projection.rotate(r(t));
                            svg_earth.selectAll("path").attr("d", path)
                                .classed("focused", function(d, i) { return d.id == focusedCountry.id ? focused = d : false; });
                        };
                    })
            })();
        });

        function country(cnt, sel) {
            for(var i = 0, l = cnt.length; i < l; i++) {
                if(cnt[i].id == sel.value) {return cnt[i];}
            }
        };

    }
});



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (function (countryName) {

    updateBarChart(countryName, 2010);
    const margin = { left: 60, right: 60, top: 0, bottom: 120 };

    d3.select("div#svg_chart2_container").remove();
    var svg_chart2 = d3.select("div#detailChart2")
        .append("div")
        .attr("id", "svg_chart2_container")
        .append("svg")
        .attr("width", 500)
        .attr("height", 80)
        .attr('transform', `translate(${margin.left},${margin.top})`);

    var x = d3.scaleLinear()
        .domain([1990, 2013])
        .range([0, 500 - margin.left - margin.right])
        .clamp(true);

    var slider = svg_chart2.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + 400 / 20 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { handler(x.invert(d3.event.x)); }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    function handler(h) {
        h = Math.round(h);
        handle.attr("cx", x(h));
        updateBarChart(countryName, h);
    }


    function updateBarChart(selectedCountryName, selectedYear){

        d3.select("div#svg_chart3_container").remove();

        var margin = {top: 20, right: 60, bottom: 10, left: 60},
            padding = {top: 0, right: 20, bottom: 40, left: 70},
            innerWidth = 500 - margin.left - margin.right,
            innerHeight = 400 - margin.top - margin.bottom,
            width = innerWidth - padding.left - padding.right,
            height = innerHeight - padding.top - padding.bottom;

        var svg_chart3 = d3.select("div#detailChart3")
            .append("div")
            .attr("id", "svg_chart3_container")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 " + 700 + " " + 400)
            .attr("id", "svg-content-responsive")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0Scale = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.3);

        var x1Scale = d3.scaleBand()
            .padding(0.4);

        var yScale = d3.scaleLinear()
            .rangeRound([height, 0]);

        var zScale = d3.scaleOrdinal()
            .range(["#7b6888", "#ff8c00"]);

        var g = svg_chart3.append("g")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

        var row = d => {
            if(d['Entity'] === selectedCountryName && d.Year == selectedYear){
                d['Internet Users'] = +d['Internet Users'];
                d['Mobile subscriptions'] = +d['Mobile subscriptions'];
                return d;
            }
        };

        d3.csv('data/combined2.csv', row, data => {
            var keys = data.columns.slice(3);
            x0Scale.domain(data.map(function(d) { return d.Entity; }));
            x1Scale.domain(keys).rangeRound([0, x0Scale.bandwidth()]);
            //yScale.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
            yScale.domain([0, 120]).nice();
            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0Scale(d.lead) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter()
                .append("rect")
                .attr("class", function(d) { return d.key; })
                .attr("x", function(d) { return x1Scale(d.key) * 1.6; })
                .attr("y", function(d) { return yScale(d.value); })
                .attr("width", x1Scale.bandwidth())
                .attr("height", function(d) { return height - yScale(d.value); })
                .attr("fill", function(d) { return zScale(d.key); });

            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0Scale));

            g.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(yScale).ticks(null, "s").tickFormat(d3.format("")))
                .append("text")
                .attr("x", 10)
                .attr("y", yScale(yScale.ticks().pop()) + 0.5)
                .attr("dy", "0.33em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("%");

            // Legend
            var legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys)
                .enter().append("g")
                .attr("class", "lgd")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("class", function(d, i) { return "lgd_" + data.columns.slice(1)[i]; })
                .attr("x", width + 80)
                .attr("y", -15)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", zScale);

            legend.append("text")
                .attr("x", width + 75)
                .attr("y", -5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
        })

    }
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (function (countryName) {
    const margin = { left: 100, right: 60, top: 40, bottom: 120 };
    const innerWidth = 500 - margin.left - margin.right;
    const innerHeight = 400 - margin.top - margin.bottom;
    var radius = 4;
    d3.select("div#svg_chart1_container").remove();
    var svg_chart1 = d3.select("div#detailChart1")
        .append("div")
        .attr("id", "svg_chart1_container")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + 700 + " " + 400)
        .attr("id", "svg-content-responsive")
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xValue = d => d['Percentage of Individuals using the Internet (ICT)'];
    // const xLabel = 'Percentage of Individuals using the Internet (ICT)';
    const xLabel = 'Internet Users per 100 people';
    const yValue = d => d['GDP per capita'];
    const yLabel = 'GDP per capita ($)';
    const colorValue = d => d['Entity'];
    const colorLabel = 'Countries';

    const g = svg_chart1.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    const xAxisG = g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);
    const yAxisG = g.append('g');

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', 50)
        .text(xLabel);

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerHeight / 2)
        .attr('y', -80)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();
    const colorScale = d3.scaleOrdinal()
        .range(d3.schemeCategory10);

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickPadding(15)
        .tickSize(-innerHeight)
    //.tickFormat(d3.format("d"));
    var yTicks = 5;
    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(yTicks)
        .tickPadding(15)
        .tickSize(-innerWidth);

    const row = d => {
        if((d['Year'] < 2014 && d['Year'] > 1990) && (d['Entity'] === countryName)){
            d['Year'] = +d['Year'];
            d['Percentage of Individuals using the Internet (ICT)'] = +d['Percentage of Individuals using the Internet (ICT)'];
            d['GDP per capita'] = +d['GDP per capita'];
            d['Total population (Gapminder)'] = +d['Total population (Gapminder)'];
            return d;
        }
    };

    d3.csv('data/correlation-between-internet-users-as-a-share-of-the-population-and-gdp-per-capita-since-1980.csv', row, data => {

        xScale
            .domain(d3.extent(data, xValue))
            .range([0, innerWidth])
            .nice();

        yScale
            .domain(d3.extent(data, yValue))
            .range([innerHeight, 0])
            .nice(yTicks);

        g.selectAll('circle').data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(xValue(d)))
            .attr('cy', d => yScale(yValue(d)))
            .attr('fill', d => colorScale(colorValue(d)))
            .attr('fill-opacity', 0.8)
            .attr('r', radius)
            .on("mouseover", handleMouseOver)
            .on("mouseout",handleMouseOut);

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    });


    function handleMouseOver(d, i){

        d3.select(this).attrs({
            r: radius * 3
        });

        // Specify where to put label of text
        g.append("text").attrs({
            id: "id" +
            d['Year'] +
            "-" +
            Math.round(d['GDP per capita']) +
            "-" +
            i,
            x: function() { return xScale(d['Percentage of Individuals using the Internet (ICT)']) - 50; },
            y: function() { return yScale(d['GDP per capita']) - 15; },
            fill: colorScale('#008000')
        })
            .text(function() {
                return ['Year: ' + d['Year']];
            });
    }

    function handleMouseOut(d, i) {
        d3.select(this).attrs({
            r: radius
        });

        d3.select("#id" +
            d['Year'] +
            "-" +
            Math.round(d['GDP per capita']) +
            "-" +
            i)
            .remove();
    }

});


/***/ })
/******/ ]);