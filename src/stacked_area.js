
const xScale = d3.scaleTime().range([0, innerWidth]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const xAxis = d3.axisBottom()
.scale(xScale)
.tickPadding(15)

const yAxis = d3.axisLeft()
.scale(yScale)
.ticks(5)
.tickPadding(15)

const colorLegend = d3.legendColor()
.scale(colorScale)
.shapePadding(3)
.shapeWidth(15)
.shapeHeight(15)
.labelOffset(4)
.ascending(true);

const xAxisLabelOffset = 48;
const yAxisLabelOffset = 60;

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

  const areaColumn = colorValue;

  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);
  const g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")")
  const xAxisLabel = xAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
  .attr("class", "label")
  .text(xLabel);

  const yAxisG = g.append("g")
  .attr("class", "y axis");
  const yAxisLabel = yAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
  .attr("class", "label")
  .text(yLabel);

  const colorLegendG = g.append("g")
  .attr("class", "color-legend")
  .attr("transform", "translate(16, 2)");

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);

  const stack = d3.stack()
  .y(function (d){ return d[yValue]; })
  .values(function (d){ return d.values; });

  const area = d3.area()
  .x(function(d) { return xScale(d[xValue]); })
  .y0(function(d) { return yScale(d.y0); })
  .y1(function(d) { return yScale(d.y0 + d.y); });

  const nested = d3.nest()
    .key(function (d){ return d[areaColumn]; })
    .entries(data);

  const layers = stack(nested);

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

  const paths = g.selectAll(".chart-area").data(layers);
  paths.enter().append("path").attr("class", "chart-line");
  paths.exit().remove();
  paths
    .attr("d", function (d){ return area(d.values); })
    .attr("fill", function (d){ return colorScale(d.key); });

  colorLegendG.call(colorLegend);
}


