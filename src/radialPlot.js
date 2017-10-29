

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

 gr = g.enter().append('g')
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
const xTickLength = rScaleMax *1.05;
const numTicks =24;
const xTickAngle =360/numTicks;
const xTickLabelMultiplier = 2400/numTicks
const rScale = d3.scaleLinear()
const aScale = d3.scaleLinear()

rScale
  .domain([0,rMax])
  .range([0,rScaleMax]);

const rScaleTicks = rScale.ticks(5).slice(1);

var rAxisG = gr
	.attr('class', 'r axis tick')
  .selectAll('ga')
  .data(rScale.ticks(5).slice(1))
  .enter().append('g');

rAxisG
  .append('circle')
	.attr("r",rScale);

rAxisG
  .append('text')
	.attr("y", function(d) { return -rScale(d) + 10; })
  .attr("transform", "rotate(22.5)")
  .style("text-anchor", "middle")
  .text(function(d) { return d; });

var aAxisG = ga
  .attr("class", "a axis tick")
  .selectAll("ga")
    .data(d3.range(0, 360, xTickAngle))
  .enter().append("g")
    .attr("transform", function(d) { return "rotate(" + d + ")"; });


aAxisG
    .selectAll('ga')
    .append("line")
    .attr("x2", rScaleMax);

aAxisG
    .selectAll('ga')
    .append("text")
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
