
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);


const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickPadding(10)
  .tickFormat(d3.format('0'))
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .tickFormat(d3.format('.2s'))
  .tickPadding(10)
  .tickSize(-innerWidth);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shape('circle');

export default function (div, props) {
  const {
    data,
    xValue,
    yValue,
    xLabel,
    yLabel,
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


  console.log(width, height, minDimension);
  console.log(svg.attr('width'), svg.attr('height'));

  const innerHeight = minDimension - margin.top - margin.bottom;
  const innerWidth = minDimension - margin.left - margin.right;


  xScale
    .domain(d3.extent(data, xValue))
    .range([0, 2*Math.pi]);

  yScale
    .domain(d3.extent(data, yValue)) //d3.extent(data, yValue
    .range([innerHeight/2, 0])
    .nice();

  var g = svg.selectAll('g').data([null]);

  g = g.enter().append('g')
    .merge(g)
    .attr('transform', `translate(${innerWidth/2},${innerHeight/2})`);




  //data join
  var line = g.selectAll('path').data(data);

  //Add new elements
  var lineEnter = line.enter().append('path');

  var circlesExit = line.exit()
    .attr('class','exit')
    .remove();

  //UPDATE old elements present (change class)
  line
    .attr('class','update');

  //merge new and existing ell
  circlesEnter
    .attr('class','enter')
    .attr('fill', colorValue)
    .attr('fill-opacity', .2)
    .attr('r', pointSize)
   .merge(circles)
    .attr('cx', d => xScale(xValue(d)))
    .attr('cy', d => yScale(yValue(d)));

  //remove elements for which there is no data
  circlesExit

  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  colorLegendG.call(colorLegend)
    .selectAll('.cell text')
    .attr('dy', '0.1em');


// TODO adapt radial time series code to
// const xValue = d => d.dteday;



//       function deltaDays(date1, date2){
//         const dayms = 1000 * 60 * 60 * 24;
//         var date1ms = date1.geTime();
//         var date2ms = date2.getTime();
//         var deltams = date1ms-date2ms
//         return (deltams/dayms)
//         };

       const colorUser = {Total:"grey", Casual:"red",  Registered:"green"}

      const minDate = new Date(2012,1,1);
      const msPerHour = (1000*60*60);
      const msPerDay = msPerHour * 24;
      const hoursSinceStart = d => ((d.dteday.getTime() - minDate.getTime())/msPerHour);
      var plotColor = colorUser.Registered;
//
      const line = d3.lineRadial()
        .angle(d => xScale(hoursSinceStart(d)))
        .radius(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

        g.append('path')
            .attr('fill', 'none')
            .attr('stroke', plotColor)
            .attr('stroke-opacity', 0.7)
            .attr('stroke-width', .1)
            .attr('d', line(data));

        g.append('circle')
            .attr('cx',innerWidth/2)
            .attr('cy',innerHeight/2)
            .attr('fill', 'none')
            .attr('stroke', 'grey')
            .attr('stroke-width', 2)
            .attr('r', innerHeight/2);






    };
