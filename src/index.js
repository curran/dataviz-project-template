//import detailHandler from './detailHandler'

var width = 1600,
    height = 500,
    sens = 0.25,
    focused;

//Setting projection

var projection = d3.geo.orthographic()
    .scale(245)
    .rotate([0, 0])
    .translate([width * 1/5, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

//SVG container
var earthPanel = document.getElementById("earthPanel");

var svg = d3.select(earthPanel).append("svg")
    .attr("width", width)
    .attr("height", height);

//Adding water

svg.append("g").attr("class", "group0")
    .append("path")
    .datum({type: "Sphere"})
    .attr("class", "water")
    .attr("d", path);

var countryTooltip = d3.select(earthPanel).append("div").attr("class", "countryTooltip");
var countrySelector = document.getElementById("countrySelector");
var countryList = d3.select(countrySelector).append("select").attr("name", "countries");


queue()
    .defer(d3.json, "/data/world-110m.json")
    .defer(d3.tsv, "/data/world-110m-country-names.tsv")
    .await(ready);

//Main function

function ready(error, world, countryData) {

    var countryById = {},
        countries = topojson.feature(world, world.objects.countries).features;

    //Adding countries to select

    countryData.forEach(function (d) {
        countryById[d.id] = d.name;
        option = countryList.append("option");
        option.text(d.name);
        option.property("value", d.id);
    });

    //Drawing countries on the globe

    var world = svg.selectAll("path.land")
        .data(countries)
        .enter().append("path")
        .attr("class", "land")
        .attr("d", path)

        //Drag event

        .call(d3.behavior.drag()
            .origin(function () {
                var r = projection.rotate();
                return {x: r[0] / sens, y: -r[1] / sens};
            })
            .on("drag", function () {
                var rotate = projection.rotate();
                projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
                svg.selectAll("path.land").attr("d", path);
                svg.selectAll(".focused").classed("focused", focused = false);
            }))

        //Mouse events
        .on("dblclick", function (d) {
            document.getElementById("detailsTitle").innerHTML = "Detailed Information of " + countryById[d.id];
            updateDetail(countryById[d.id]);
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

    d3.select("select").on("change", function () {
        var rotate = projection.rotate(),
            focusedCountry = country(countries, this),
            p = d3.geo.centroid(focusedCountry);

        svg.selectAll(".focused").classed("focused", focused = false);

        //Globe rotating

        (function transition() {
            d3.transition()
                .duration(2500)
                .tween("rotate", function () {
                    var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                    return function (t) {
                        projection.rotate(r(t));
                        svg.selectAll("path").attr("d", path)
                            .classed("focused", function (d, i) {
                                return d.id == focusedCountry.id ? focused = d : false;
                            });
                    };
                })
        })();
    });

    function country(cnt, sel) {
        for (var i = 0, l = cnt.length; i < l; i++) {
            if (cnt[i].id == sel.value) {
                return cnt[i];
            }
        }
    };
};


function updateDetail(countryName){

    const xValue = d => d['Year'];
    const xLabel = 'Year';
    const yValue = d => d['Mobile cellular subscriptions'];
    const yLabel = 'Subscription per 100 people';
    const margin = { left: 120, right: 60, top: 20, bottom: 120 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    var g = svg.select("#old").remove();
    g = svg.append("g")
        .attr("id", "old")
        .attr('transform', `translate(${margin.left},${margin.top})`);
    const xAxisG = g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);
    const yAxisG = g.append('g');

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth * 3/4)
        .attr('y', 80)
        .text(xLabel);

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerHeight/2)
        .attr('y', innerWidth * 1.9/4)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

    const xScale = d3.scale.linear();
    const yScale = d3.scale.linear();

    const xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickPadding(15)
        .tickSize(-innerHeight)
        .tickFormat(d3.format("d"));

    const yTicks = 5;
    const yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("right")
        .ticks(yTicks)
        .tickPadding(15)
        .tickSize(innerWidth)
        .tickFormat(d3.format("d"));

    const line = d3.svg.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .interpolate("basis");

    const row = d => {
        if(d['Entity'] === countryName){
            d['Year'] = +d['Year'];
            d['Mobile cellular subscriptions'] = +d['Mobile cellular subscriptions'];
            return d;
        }
    };

    d3.csv('/data/mobile-cellular-subscriptions-by-country.csv', row, data => {
        xScale
            .domain(d3.extent(data, xValue))
            .range([innerWidth/2, innerWidth]);

        yScale
            .domain(d3.extent(data, yValue))
            .range([innerHeight, 0]);

        g.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', 4)
            .attr('d', line(data));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    });
}


