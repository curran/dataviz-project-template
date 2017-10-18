
const xScale = d3.scaleLinear();
const yScaleLeft = d3.scaleLinear();
const yScaleRight = d3.scaleLinear();

const yTicksLeft = 5
const yTicksRight = 5




const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);


const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(10)
  .tickFormat(d3.format('0'))
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

export default function (div, props) {
  const {
    data,
    xValue,
    yValue1, //registered  Left Y Axis
    yValue2, //casual      Left Y Axis
    yValue3, //temp        Right Y Axis
    xLabel,
    yLabelLeft,
    yLabelRight,
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
  //const minDimension = d3.min([width, height]);

  var svgEnter = svg
    .enter()
    .append('svg');

  //set svg size to window
  svg = svgEnter
    .merge(svg)
    .attr('width',width)
    .attr('height',height);


  console.log(width, height, minDimension);
  console.log(svg.attr('width'), svg.attr('height'));

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  xScale
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  yScaleLeft
    .domain(d3.extent(data, yValue1))
    .range([innerHeight, 0])
    .nice(yTicksLeft);

  yScaleRight
    .domain(d3.extent(data, yValue3))
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
    .text(yLabel1);

//TODO right Y axis text code
// yAxisText = yAxisText.enter().append('text').merge(yAxisText)
//     .attr('class', 'axis-label')
//     .attr('id', 'y-axis-label')
//     .attr('x', -innerHeight / 2)
//     .attr('y',  -margin.right/2)
//     .attr('transform', `rotate(-90)`)
//     .style('text-anchor', 'middle')
//     .text(yLabel3);

const line2 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(y2Value(d)))
  .curve(d3.curveBasis);

const line1 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(y1Value(d)))
  .curve(d3.curveBasis)

const line3 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleRight(y3Value(d)))
  .curve(d3.curveBasis)

  //data join
  var lines = g.selectAll('path').data(data);

  //Add new elements
  var linesEnter = lines.enter().append('path');

  var t = d3.transition().duration(500);

  var linesExit = lines.exit()
    .attr('class','exit')
    .remove();

  //UPDATE old elements present (change class)
  lines
    .attr('class','update');

  //merge new and existing ell
  linesEnter
    .attr('class','enter')
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .attr('d', line1);

  linesEnter
    .attr('class','enter')
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .attr('d', line2);

  linesEnter
    .attr('class','enter')
    .attr('stroke', 'grey')
    .attr('stroke-width', 1)
    .attr('d', line3);

  //remove elements for which there is no data
  linesExit
  
  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);



    };
