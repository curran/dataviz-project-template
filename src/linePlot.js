
const xScale = d3.scaleLinear();
const yScaleLeft = d3.scaleLinear();
const yScaleRight = d3.scaleLinear();
const minDate = new Date(2011,-1,1)
const maxDate = new Date(2012,11,31)


const xTicks = 24
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
    yValue1, //registered  Left Y Axis
    yValue2,
    xLabel,
    yLabelLeft,
    yLabelRight,
    colorValue,
    pointSize,
    margin
  } = props;

  console.log(minDate, maxDate, d3.extent(xValue))

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
  const innerWidth = width - margin.left - margin.right*4;


  xScale
    .domain([minDate,maxDate]) //[minDate,maxDate] or d3.extent(data, xValue)
    .range([0, innerWidth])
    .nice(xTicks);

  yScaleLeft
    .domain(d3.extent(data, yValue1))
    .range([innerHeight, 0])
    .nice(yTicksLeft);

  yScaleRight
    .domain(d3.extent(data, yValue1))
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
//   .x(d => xScalße(xValue(d)))
//   .y(d => yScaleLeft(y2Value(d)))
//   .curve(d3.curveBasis);
// CatmullRom curve selected because it
// it passes through all points and
// has less overshoot that others
const curveFunction = d3.curveCatmullRom

const lineRegistered = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScaleLeft(yValue1(d)))
  .curve(curveFunction);

console.log(lineRegistered);
  // var line2 = d3.line()
  //   .x(d => xScale(xValue(d)))
  //   .y(d => yScaleLeft(yValue2(d)))
  //   .curve(d3.curveCatmullRom);

// var line3 = d3.line()
//   .x(d => xScale(xValue(d)))
//   .y(d => yScaleRight(y3Value(d)))
//   .curve(d3.curveBasis)

  //data join
  var userLines = g.selectAll('path').data([null]);
  var userLinesEnter = userLines
      .enter()
      .append('path');
  var userLinesExit = userLines.exit().remove();

  // var userLines2 = g.selectAll('path').data([null]);
  // var userLines2Enter = userLines2
  //     .enter()
  //     .append('path')
  //     .attr('id','line2');

  //UPDATE old elements present (change class)
  userLines
    .attr('class','update');

  //merge new and existing ell
  userLinesEnter
    .attr('class','enter')
    .attr('fill','none')
    .attr('stroke', 'green')
    .attr('stroke-width', 1)
    .merge(userLines)
    .attr('d', lineRegistered(data));

  // userLines2Enter
  //     .selectAll('#line2')
  //     .attr('id','#line2')
  //     .attr('class','enter')
  //     .attr('fill','none')
  //     .attr('stroke', 'red')
  //     .attr('stroke-width', 1)
  //     .attr('d', line2(data))
  //     .merge(userLines2);

  //remove elements for which there is no data

  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisLeftG.call(yAxisLeft);
  // yAxisRightG.call(yAxisRight);


    };
