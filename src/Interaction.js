

  // var svg = d3.select("svg"),
  //   margin = {top: 20, right: 80, bottom: 110, left: 80},
  //   margin2 = {top: 430, right: 80, bottom: 30, left: 80},
  //   width = +svg.attr("width") - margin.left - margin.right,
  //   height = +svg.attr("height") - margin.top - margin.bottom,
  //   height2 = +svg.attr("height") - margin2.top - margin2.bottom;

var parseDate = d3.timeParse("%b %Y");

var x = d3.scaleTime().range([0, innerWidth]),
    x2 = d3.scaleTime().range([0, innerWidth]),
    y = d3.scaleLinear().range([innerHeight, 0]),
    yRight = d3.scaleLinear().range([innerHeight, 0]),
    y2 = d3.scaleLinear().range([innerHeight2, 0]);

var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y),
    yAxisRight = d3.axisRight(yRight);

var brush = d3.brushX()
    .extent([[0, 0], [innerWidth, innerHeight2]])
    .on("brush end", brushed);

var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [innerWidth, height]])
    .extent([[0, 0], [innerWidth, innerHeight]])
    .on("zoom", zoomed);

export default function (div, props) {
      const {
        data,
        xValue4,
        yValue1,
        yValue2,
        yValue3,
        yValue4,
        xLabel,
        yLabel1,
        yLabel4,
        colorValue1,
        colorValue1,
        colorValue1,
        colorValue1,
        lineSize,
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

  const innerHeight = minDimension - margin.top - margin.bottom;
  const innerWidth = minDimension - margin.left - margin.right;

  //configure x and y scales
  x.domain(d3.extent(data, function(d) { return xValue(d); }));
  y.domain([0, d3.max(data, function(d) { return yValue3(d); })]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  //set area for displaying data in focus chart
  //data outside this area will be clipped
  //see CSS id clip in classes affected by this
  svg.append("defs").append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight);

  var g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  var focus = g.enter().append("g")
      .merge(g)  //should this g or focus?
      .attr("class", "focus")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var context = g.enter().append("g")
      .merge(g)  //should this be g or context?
      .attr("class", "context")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");



  var xAxisFocusG = focus.selectAll('#focus-axis-x').data([null])
  xAxisFocusG = xAxisFocusGenter().append("g").merge(xAxisFocusG)
      .attr("id", "focus-axis-x")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + innerHeight + ")");

  var yAxisFocusG = focus.selectAll('#focus-axis-y').data([null]);

  yAxisFocusG = yAxisFocusG.enter().append("g").merge(yAxisFocusG)
          .attr("id", "focus-axis-y")
          .attr("class", "axis axis--y");

  var yAxisFocusRightG = focus.selectAll('#focus-axis-yRight').data([null]);

  yAxisFocusRightG = yAxisFocusRightG.enter().append("g").merge(yAxisFocusRightG)
          .attr("id", "focus-axis-yRight")
          .attr("class", "axis axis--y2")
          .attr("transform", "translate(" + innerWidth + ",0)");


      yAxisG.append('text')
              .attr('class', 'axis-label')
              .attr('x', -innerHeight / 2)
              .attr('y', -50)
              .attr('transform', `rotate(-90)`)
              .style('text-anchor', 'middle')
              .text(yLabel1);


      yAxisRightG.append('text')
              .attr('class', 'axis-label')
              .attr('x', innerHeight/2)
              .attr('y', -40)
              .attr('transform', `rotate(90)`)
              .style('text-anchor', 'middle')
              .text(yLabel4);



  var lineCasual = d3.line()
    .curve(d3.curveCatmullRom)
    .x(function(d) { return x(xValue4); })
    .y(function(d) { return yRight(yValue2); })

  var lineTemp = d3.line()
      .curve(d3.curveCatmullRom)
      .x(function(d) { return x(xValue4); })
      .y(function(d) { return yRight(yValue4); });

  var lineRegistered = d3.line()
      .curve(d3.curveCatmullRom)
      .x(function(d) { return x(xValue4); })
  		.y(function(d) { return y(yValue1); });

  var lineTotal = d3.line()
      .curve(d3.curveCatmullRom)
      .x(function(d) { return x2(xValue4); })
      .y(function(d) { return y2(yValue3); });

  //data join to all lines
  var lines = focus.selectAll('path').data(data);

  //Add new elements
  var linesEnter = lines.enter().append('path');

  //remove old elements
  var linesExit = lines.exit()
    .attr('class','exit')
    .remove();

 //Eliminate focus charts and implement context only with multiple lines??

  // need a sample of code for general update pattern for multiple lines

  lines.focus.append("path")
      .datum(data)
      .attr("class", "line line_casual")
      .attr("d", lineCasual);

  focus.append("path")
      .datum(data)
      .attr("class", "line line_registered")
      .attr("d", lineRegistered);

  focus.append("path")
      .datum(data)
      .attr("class", "line line_temp")
      .attr("d", lineTemp);

      xAxisFocusG.call(xAxis)
      yAxisFocusG.call(yAxis);
      yAxisFocusRightG.call(yAxisRight);






  context.append("path")
      .datum(data)
      .attr("class", "line_total")
      .attr("d", lineTotal);

  context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + innerHeight2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.move, x.range());

function brushed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
  var s = d3.event.selection || x2.range();
  x.domain(s.map(x2.invert, x2));
  focus.selectAll(".line_casual").attr("d", lineCasual);
  focus.select(".line_registered").attr("d", lineRegistered);
  focus.select(".line_temp").attr("d", lineTemp);
  focus.select(".axis--x").call(xAxis);
  svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
      .scale(innerWidth / (s[1] - s[0]))
      .translate(-s[0], 0));
}





</script>
