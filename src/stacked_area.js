
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

var areaColumn = colorValue;

var xAxisLabelOffset = 48;
var yAxisLabelOffset = 60;

export default function (svg, props) {
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
}


