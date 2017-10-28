

const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);

const radialOffset = 0 //.25*Math.PI

export default function (div, props) {
  const {
    data,
    hour,
    yValue,
    yLabel,
    colorValue,
    margin
  } = props;

var vizDiv = document.getElementById(div);
var svg = d3.select(vizDiv)
  .selectAll('svg')
  .data([null]);

const width = vizDiv.offsetWidth;
const height = vizDiv.offsetHeight;

//maintain 1:1 aspect ration for scatter plot
const minDimension = d3.min([width, height]);

var svgEnter = svg
  .enter()
  .append('svg');

//set svg size to window
svg = svgEnter
  .merge(svg)
  .attr('width',minDimension)
  .attr('height',minDimension);


//console.log(width, height, minDimension);
//console.log(svg.attr('width'), svg.attr('height'));

const innerHeight = minDimension - margin.top - margin.bottom;
const innerWidth = minDimension - margin.left - margin.right;
const yScaleMax = innerHeight/2
const yMax = 1000

const yScale = d3.scaleLinear()
  .domain([0,yMax])
  .range([0,yScaleMax]);

let g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

//draw ticklines
//draw ticklines
const xTickLength = yScaleMax *1.05;
const numTicks =24;

const gr= svg.append('g')
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`)
  .attr("class", "r axis")
  .selectAll("g")
  .data([null])

const grEnter = gr.enter().append('circle');


//Update
gr

//merge new and existing
grEnter
  .attr("class", "r axis")
  .data(yScale.ticks(5).slice(1))
  .enter().append("g");

grEnter.append("circle")
    .attr("r",yScale);

gr.append("text")
    .attr('class','tick')
    .attr("y", function(d) { return -yScale(d) + 10; })
    .attr("transform", "rotate(0)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

gr.exit().remove();

const xtickAngle =360/numTicks;

var ga = svg.append('g')
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`)
  .attr("class", "a axis")
  .selectAll("g")
    .data(d3.range(0, 360, xtickAngle))
  .enter().append("g")
    .attr("transform", function(d) { return "rotate(" + d + ")"; });

ga.append("line")
    .attr("x2", yScaleMax);

ga.append("text")
    .attr("x", yScaleMax + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (yScaleMax + 6) + ",0)" : null; })
    .text(function(d,i) { return i*100 + "h"; });


//optional y axis
// const yAxisG = g.append('g');
// yAxisG.append('text')
//   .attr('class', 'axis-label')
//   .attr('x', +innerHeight / 4+5)
//   .attr('y', -5)
//   .attr('transform', `rotate(0)`)
//   .style('text-anchor', 'middle')
//   .text(yLabel);
//

const angleHours = d => (hour/24 *Math.PI*2+ radialOffset);
const curveFunction = d3.curveCatmullRom

const radialPath = d3.lineRadial()
  .angle(d => angleHours(d))
  .radius(d => yScale(yValue(d)))
  .curve(curveFunction);


var radialLines = g.selectAll('path').data([null]);
var radialLinesEnter = radialLines.enter().append('path');
var radialLinesExit = radialLines.exit().remove();

//UPDATE old elements present (change class)
radialLines
  .attr('class','update');

//merge new and existing ell
radialLinesEnter
  .attr('class','enter')
  .attr('fill', 'none')
  .attr('stroke', colorValue)
  .attr('stroke-opacity', 0.7)
  .attr('stroke-width', .25)
  .merge(radialLines)
  .attr('d', radialPath(data));;

//remove elements for which there is no data
radialLinesExit;
};
