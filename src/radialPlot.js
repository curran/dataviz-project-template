

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
const rScaleMax = innerHeight/2
const rMax = 1000


let g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);

let gr = svg.selectAll('g').data([null]);

 gr = gr.enter().append('g')
   .merge(gr)
   .attr('transform',
  				`translate(${innerWidth/2+margin.left},
										 ${innerHeight/2+margin.top})`);


let ga = svg.selectAll('g').data([null]);

ga = ga.enter().append('g')
    .merge(ga)
    .attr('transform',
   				`translate(${innerWidth/2+margin.left},
 										 ${innerHeight/2+margin.top})`);

//draw ticklines
//draw ticklines
const xTickLength = rScaleMax;
const numTicks =8;
const xTickAngle =360/numTicks;
const xTickLabelMultiplier = 2400/numTicks
const rScale = d3.scaleLinear()
const aScale = d3.scaleLinear()

rScale
  .domain([0,rMax])
  .range([0,rScaleMax]);

const rScaleTicks = rScale.ticks(5).slice(1);

var rAxisG = gr.selectAll('#r-axis-g').data([null]);
//creates 5 objects
// rAxisG = rAxisG
//   .data(rScale.ticks(5).slice(1))
//   .enter().append('g').merge(rAxisG)
// 	.attr('id','r-axis-g')
//   .data(rScale.ticks(5).slice(1))
//   .enter().append('g');

var rAxisTicks = gr.selectAll('#r-axis-ticks').data([null]);

//these are created in dom (and update properly based on browser
// window size, but they are not visible
// is this an  issue with the class?
rAxisTicks=rAxisTicks
  .data(rScale.ticks(5).slice(1))
  .enter().append('circle').merge(rAxisTicks)
  .attr('class','axis circle')
  .attr('id', 'r-axis-tick')
  .append('circle')
	.attr("r",rScale);

var rAxisText = gr.selectAll('#r-axis-text').data([null]);
// these are create but 'ghosts' of previously drawn labels
// remain on chart. Their angular position relative to the origin // stays the same, but the radius varies
rAxisText =rAxisText
  .data(rScale.ticks(5).slice(1))
  .enter().append('text').merge(rAxisText)
  .attr('class','tick')
  .attr('id', 'r-axis-text')
  .attr("y", function(d) { return -rScale(d) + 10; })
  .attr("transform", "rotate(22.5)")
  .style("text-anchor", "middle")
  .text(function(d) { return d; });

var aAxisG = gr.selectAll('#a-axis-g').data([null]);
// these appear to function as intended - they exist in the dom,
//and they are visible
aAxisG = aAxisG
    .data(d3.range(0, 360, xTickAngle))
    .enter().append("g").merge(aAxisG)
    .attr('id', 'a-axis-g')
    .attr('class', 'axis tick')
    .attr("transform", function(d) { return "rotate(" + d + ")"; });

aAxisG
    .append("line")
    .attr("x2", rScaleMax);

var aAxisText = gr.selectAll('#a-axis-text').data([null]);
// these do no appear in the dom at all
aAxisText = aAxisG
    .data(d3.range(0, 360, xTickAngle))
    .enter().append("text").merge(aAxisText)
    .attr('id','a-axis-text')
    .attr("x", rScaleMax + 6)
    .attr("dy", ".35em")
    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (rScaleMax + 6) + ",0)" : null; })
    .text(function(d,i) { return i*xTickLabelMultiplier + "h"; });





const angleHours = d => (d.hr/24 *Math.PI*2+ radialOffset);
const curveFunction = d3.curveCatmullRom
//
// aScale
//   .domain(d3.extent(data,hour))
//   .range([0,Math.PI*2]);

const radialPath = d3.lineRadial()
  .angle(d => angleHours(d))
  .radius(d => rScale(yValue(d)))
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
