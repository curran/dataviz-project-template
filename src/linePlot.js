
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const minDate = new Date(2011,0,1)
const maxDate = new Date(2012,11,31)


const xTicks = 24
const yTicks = 5

const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(10)
  .tickFormat(d3.timeFormat("%Y-%m-%d"))
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(yTicks)
  .tickFormat(d3.format('.2s'))
  .tickPadding(10)
  .tickSize(-innerWidth);


export default function (div, props) {
  const {
    data,
    xValue,
    yValue1,
    yValue2,
    xLabel,
    yLabelLeft,
    yLabelRight,
    colorValue,
    pointSize,
    margin
  } = props;

  console.log(minDate, maxDate, d3.extent(data, xValue))

  var vizDiv = document.getElementById(div);
  var svg = d3.select(vizDiv)
    .selectAll('svg')
    .data([null]);

  const width = vizDiv.offsetWidth;
  const height = vizDiv.offsetHeight;

  var brush = d3.brushX()
      .extent([[0, 0], [width, height]])
      .on("brush end", brushed);

  function brushed() {
      var s = d3.event.selection || xScale.range();
      var dateRange=s.map(xScale.invert, xScale);
      //startDate and endDate appear to be undeclared in this function
      //- even though they are desclared in index.js
      // startDate = dateRange[0];
      // endDate = dateRange[1];
      //xScale.domain(s.map(xScale.invert, x2));
      console.log(dateRange)
      // console.log(startDate);
      // console.log(endDate);
      };

  var svgEnter = svg
    .enter()
    .append('svg');

  //set svg size to window
  svg = svgEnter
    .merge(svg)
    .attr('width',width)
    .attr('height',height);

//following code works - only one set of axes, but
//new line added to dom each time it resizes
  // var g = svg.selectAll('g').data([null]);
  // g = g.enter().append('g')
  //     .merge(g)
  //     .attr('transform', `translate(${margin.left},${margin.top})`);


  var g = svg.selectAll('.lineChartGroup').data([null]);
  g = g.enter().append('g')
      .attr('class','lineChartGroup')
      .merge(g)
      .attr('transform', `translate(${margin.left},${margin.top})`);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right*4;

  xScale
    .domain([minDate,maxDate]) //[minDate,maxDate] or d3.extent(data, xValue)
    .range([0, innerWidth])
    .nice(xTicks);

  yScale
    .domain(d3.extent(data, yValue1))
    .range([innerHeight, 0])
    .nice(yTicks);


  // var g = svg.selectAll('.lineChartGroup').data([null]);
  //g.enter().append('g').attr('class','.lineChartGroup');
  // var g = svg.selectAll('g').data([null]);
  // var gExit = svg.selectAll('.lineChartGroup').exit().remove();


  var xAxisG = g.selectAll('#x-axis-g').data([null]);

  xAxisG = xAxisG.enter().append('g').merge(xAxisG)
    .attr('id','x-axis-g')
    .attr('transform', `translate(0, ${innerHeight})`);

  var yAxisG = g.selectAll('#y-axis-g').data([null]);

  yAxisG = yAxisG
    .enter()
      .append('g')
    .merge(yAxisG)
    .attr('id','y-axis-g');

  var xAxisText = g.selectAll('#x-axis-label').data([null]);
  // var xAxisTextExit = g.selectAll('#x-axis-label').exit().remove();

  xAxisText = xAxisText.enter().append('text').merge(xAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'x-axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight+margin.bottom/2)
    .style('text-anchor', 'middle')
    .text(xLabel);

  var yAxisText = g.selectAll('#y-axis-label').data([null]);
  // var yAxisTextExit = g.selectAll('#y-axis-label').exit().remove();

  yAxisText = yAxisText.enter().append('text').merge(yAxisText)
    .attr('class', 'axis-label')
    .attr('id', 'y-axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y',  -margin.left/2)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabelLeft);

//add brush to line chart
    g.append("g")
         .attr("class", "brush")
         .call(brush)
         .call(brush.move, xScale.range())

const curveFunction = d3.curveCatmullRom

const lineRegistered = d3.line()
  .x(d => xScale(xValue(d)))
  .y(d => yScale(yValue1(d)))
  .curve(curveFunction);

  //data join
  var userLines = g.selectAll('.linePath').data([null]);
  var userLinesEnter = userLines
      .enter()
      .append('path')
      .attr('class','linePath');
  var userLinesExit = userLines.remove();

  //UPDATE old elements present (change class)
userLinesExit

userLines;

  //merge new and existing elements
  userLinesEnter
    .attr('fill','none')
    .attr('stroke', 'green')
    .attr('stroke-width', 1)
    .merge(userLines)
    .attr('d', lineRegistered(data));


  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);


    };
