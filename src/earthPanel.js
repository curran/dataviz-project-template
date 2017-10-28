import slider from './Slider'
import scatterPlot from './ScatterPlot'

export default function () {

    scatterPlot("China");
    slider("China");

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

    var sens = 0.3, focused;
    var projection = d3.geoOrthographic()
        .scale(280)
        .rotate([300, -20])
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

    queue()
        .defer(d3.json, "data/world-110m.json")
        .defer(d3.tsv, "data/world-110m-country-names.tsv")
        .await(ready);

    function ready(error, world, countryData) {

        var countryById = {},
            countries = topojson.feature(world, world.objects.countries).features;

        countryData.forEach(function (d) {
            countryById[d.id] = d.name;
        });

        //Drawing countries on the globe

        svg_earth.selectAll("path.land")
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
                scatterPlot(countryById[d.id]);
                slider(countryById[d.id]);
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

    }
}

