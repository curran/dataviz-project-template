
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
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
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
    .range([0, innerWidth])
    .nice();

  yScale
    .domain(d3.extent(data, yValue)) //d3.extent(data, yValue
    .range([innerHeight, 0])
    .nice();
 
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
    .text(yLabel);
          
   
  //data join
  var circles = g.selectAll('circle').data(data);

  //Add new elements
  var circlesEnter = circles.enter().append('circle');
  
  var t = d3.transition().duration(500);
  
  var circlesExit = circles.exit()
    .attr('class','exit')
    .remove();

  //UPDATE old elements present (change class)
  circles
    .attr('class','update');

  //merge new and existing ell
  circlesEnter
    .attr('class','enter')
    .attr('fill', pointColor)
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
      
//       const yMax = d3.max(yValue)
//       const colorUser = {Total:"grey", Casual:"red",  Registered:"green"} 
      
//       const minDate = new Date(2012,1,1)
//       const centerOffset = innerHeight/2;
//       const radialOffset = .25*Math.PI
//       //getting a 
//       //const days = d => deltaDays(d.dteday,minDate);
//       //days calc is a hack since pi is a periodic function
//       //calculating days since 1/1/1970 and dividing by 365 gets data on the screen..
//       const days = d =>(d.dteday.getTime()/(1000*60*60*24))
//       const theta = d => (d.hr/24 *Math.PI*2+ radialOffset);

//       const radialScale = d => (innerHeight/2* yValue/yMax);
//       const radialX = d => (radialScale(d) * Math.cos(theta(d))+centerOffset);
//       const radialY = d => (radialScale(d) * Math.sin(theta(d))+centerOffset);
//       var plotColor = colorUser.Registered
//       
//       const radialPath = d3.line()
//         .x(d => radialX(d))
//         .y(d => radialY(d))
//         .curve(d3.curveBasis);
                  
//         g.append('path')
//             .attr('fill', 'none')
//             .attr('stroke', plotColor)
//             .attr('stroke-opacity', 0.7)
//             .attr('stroke-width', .1)
//             .attr('d', radialPath(data));

//         g.append('circle')
//             .attr('cx',centerOffset)
//             .attr('cy',centerOffset)
//             .attr('fill', 'none')
//             .attr('stroke', 'grey')
//             .attr('stroke-width', 2)
//             .attr('r', centerOffset);

        



      
    };
