
var outerWidth = 960;
var outerHeight = 500;
var margin = { left: 86, top: 5, right: 5, bottom: 56 };

var xColumn = "date";
var yColumn = "Count";
var colorColumn = "Product";
var areaColumn = colorColumn;

var xAxisLabelText = "Time";
var xAxisLabelOffset = 48;

var yAxisLabelText = "Population";
var yAxisLabelOffset = 60;

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

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
.text(xAxisLabelText);

var yAxisG = g.append("g")
.attr("class", "y axis");
var yAxisLabel = yAxisG.append("text")
.style("text-anchor", "middle")
.attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
.attr("class", "label")
.text(yAxisLabelText);

var colorLegendG = g.append("g")
.attr("class", "color-legend")
.attr("transform", "translate(16, 2)");

var xScale = d3.time.scale().range([0, innerWidth]);
var yScale = d3.scale.linear().range([innerHeight, 0]);
var colorScale = d3.scale.category10();

var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
.ticks(10)
.outerTickSize(0);
var yAxis = d3.svg.axis().scale(yScale).orient("left")
.ticks(13)
.outerTickSize(0);

var stack = d3.layout.stack()
.y(function (d){ return d[yColumn]; })
.values(function (d){ return d.values; });

var area = d3.svg.area()
.x(function(d) { return xScale(d[xColumn]); })
.y0(function(d) { return yScale(d.y0); })
.y1(function(d) { return yScale(d.y0 + d.y); });

var colorLegend = d3.legend.color()
.scale(colorScale)
.shapePadding(3)
.shapeWidth(15)
.shapeHeight(15)
.labelOffset(4)
.ascending(true);

function render(data){

var format = d3.time.format("%m/%Y");

data = dl
  .groupby([
    {name: 'date', get: d => format.parse(d['Date_recieved'])},
    'Product'
    ])
  .count()
  .execute(data);

console.log(data)

var nested = d3.nest()
  .key(function (d){ return d[areaColumn]; })
  .entries(data);

var layers = stack(nested);

xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
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
}

function type(d){
d.year = new Date(d.year);
d.population = +d.population;
return d;
}

d3.csv("cfpb_complaints.csv", type, render);