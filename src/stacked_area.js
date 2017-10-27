
const xScale = d3.scaleTime();
const yScale = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

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
.labelOffset(4);

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

  svg.append("svg")

  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  const xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${innerHeight})`)
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 100)
    .text(xLabel);

  const yAxisG = g.append("g")
  .attr("class", "y axis");
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

  const colorLegendG = g.append("g")
  .attr("class", "color-legend")
  .attr('transform', `translate(${innerWidth + 60}, 150)`);

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);

  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan","Virtual currency"];

  const stack = d3.stack()
  .keys(keys);

  const area = d3.area()
  .x(function(d) { return xScale(xValue); })
  .y0(function(d) { return yScale(d[0]); })
  .y1(function(d) { return yScale(d[1]); });

  const nested = d3.nest()
    .key(areaColumn)
    .entries(data);

  console.log(nested)

  const layers = stack(nested);

  console.log(keys);
  console.log(layers);

  xScale
    .domain(d3.extent(data,xValue))
    .range([0, innerWidth]);

  yScale.domain([
    d3.min(layers, function (series) {
              return d3.min(series, function (d) { return d[0]; });
            }),
            d3.max(layers, function (series) {
              return d3.max(series, function (d) { return d[1]; });
            })
          ])
    .range([innerHeight, 0]);

  colorScale.domain(d3.range(keys.length));

  var paths = g.selectAll(".chart-area").data(layers);
  paths.enter().append("path").attr("class", "chart-line");
  paths.exit().remove();
  paths
    .attr("d", function (d){ return area(d.values); })
    .attr("fill", function (d){ return colorScale(d.key); });

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  colorLegendG.call(colorLegend);
}


