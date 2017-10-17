
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

export default function (svg, props) {
  const { 
    data,
    xValue,
    xLabel,
    yValue1, //registered
    yValue2, //casual
    yValue3, //temp
    yLabelLeft,
    yLabelRight,
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
//     .attr('y',  -margin.left/2)
//     .attr('transform', `rotate(-90)`)
//     .style('text-anchor', 'middle')
//     .text(yLabel1);
      

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

      
      // const line2 = d3.line()
      //   .x(d => xScale(xValue(d)))
      //   .y(d => yScaleLeft(y2Value(d)))
      //   .curve(d3.curveBasis);

      // const line1 = d3.line()
      //   .x(d => xScale(xValue(d)))
      //   .y(d => yScaleLeft(y1Value(d)))
      //   .curve(d3.curveBasis)
      
      // const line3 = d3.line()
      //   .x(d => xScale(xValue(d)))
      //   .y(d => yScaleRight(y3Value(d)))
      //   .curve(d3.curveBasis)

      

      //   g.append('path')
      //       .attr('fill', 'none')
      //       .attr('stroke', 'grey')
      //       .attr('stroke-width', 1)
      //       .attr('d', line1(data));

      //   g.append('path')
      //       .attr('fill', 'none')
      //       .attr('stroke', 'grey')
      //       .attr('stroke-width', 1)
      //       .attr('d', line2(data));
       
        
      //   xAxisG.call(xAxis)
      //         .selectAll("text")
      //         .style("text-anchor", "end")
      //         .attr("dx", "-.8em")
      //         .attr("dy", ".15em")
      //         .attr("transform", "rotate(-15)");
      //   yAxisG.call(yAxisLeft);
      //   yAxisRightG.call(yAxisRight);
        
      //   g.append('path')
      //       .attr('fill', 'none')
      //       .attr('stroke', 'green')
      //       .attr('stroke-width', 1)
      //       .attr('d', line3(data));
  


  //call X and Y axis
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);
  

      
    };
