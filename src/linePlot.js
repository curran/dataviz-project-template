
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

export default function (div, props) {
  const {
    data,
    xValue,
    yValue, //registered  Left Y Axis
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
  const innerWidth = width - margin.left - margin.right;


  xScale
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  yScaleLeft
    .domain(d3.extent(data, yValue))
    .range([innerHeight, 0])
    .nice(yTicksLeft);

  yScaleRight
    .domain(d3.extent(data, yValue))
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
//   .x(d => xScale(xValue(d)))
//   .y(d => yScaleLeft(y2Value(d)))
//   .curve(d3.curveBasis);

var line1 = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(yValue(d)))
  .curve(d3.curveBasis)

// var line3 = d3.line()
//   .x(d => xScale(xValue(d)))
//   .y(d => yScaleRight(y3Value(d)))
//   .curve(d3.curveBasis)

  //data join
  const line = g.selectAll('path').data(data);

  //Add new elements
  const lineEnter = line.enter().append('path');

  const t = d3.transition().duration(500);

  const lineExit = line.exit().remove();

  //UPDATE old elements present (change class)
  line
    .attr('class','update');

  //merge new and existing ell
  lineEnter
    .attr('class','enter')
    .attr('fill','none')
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('d', line1(data));

  //remove elements for which there is no data
  lineExit

  //call X and Y axis
  xAxisG.call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-15)");;
  yAxisLeftG.call(yAxisLeft);
  // yAxisRightG.call(yAxisRight);


    };
