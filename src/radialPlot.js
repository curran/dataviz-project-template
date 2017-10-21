
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();


const colorScale = d3.scaleOrdinal()
  .range(d3.schemeCategory10);



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
    .domain([0,1000]) //d3.extent(data, yValue
    .range([0,innerHeight/2])
    .nice();

  var g = svg.selectAll('g').data([null]);

  // translate origin to center of inner svg
        const g = svg.append('g')
            .attr('transform', `translate(${innerWidth/2+margin.left},${innerHeight/2+margin.top})`);

  //draw ticklines
        const yMax = 1000;
        const yScaleMax = innerHeight/2;
        const numXTicks =24;
        const numYTicks =4;
        const yScaleradialScaleFactor = (innerHeight/2*yScaleMax);

        const drawYTicks = function(yScaleMax, numYTicks) {
          for (i=0; i<numYTicks; i++){
            g.append('circle')
          		.attr('cx',0)
          		.attr('cy',0)
              .attr('fill', 'none')
              .attr('stroke', 'lightgrey')
              .attr('stroke-width', 1)
              .attr('r', yScaleMax * (i+1)/numYTicks)
          };
        };

        const drawXTicks = function (numXTicks){

          const tickEndPoint = function(angle,radius){
            x = radius * Math.cos(angle)
            y = radius * Math.sin(angle)
            return [x,y]};

          const tickAngles = function(numberOfTicks){
              let tickAngles = []
              for(i=0; i<numberOfTicks; i++){
                angle = Math.PI *2 * i/numberOfTicks
                tickAngles.push(angle)        }
              return tickAngles};

          const tickCoordinates = function(numberOfTicks,tickRadius){
              let tickAngle = tickAngles(numberOfTicks)
              let xTickArray =[]
              for (i = 0; i <tickAngle.length; i++){
                xy = tickEndPoint(tickAngle[i],tickRadius)
                xTickArray.push(xy)
              }
              return xTickArray
             };

          let t = tickAngles(numXTicks);
          let xTickLength = yScaleMax *1.05;
          let xTickArray = tickCoordinates (numTicks,xTickLength);

          for (i in xTickArray){
            g.append('line')
          		.attr('x1',0)
          		.attr('y1',0)
              .attr('x2',xTickArray[i][0])
          		.attr('y2',xTickArray[i][1])
              .attr('fill', 'none')
              .attr('stroke', 'lightgrey')
              .attr('stroke-width', 1);

            g.append('text')
            	.attr('class', "tick text")
            	.text("xtick")
              .attr('text-anchor', 'middle')
              .attr("x", xTickArray[i][0])
              .attr("y",xTickArray[i][1])
          .attr('transform',`rotate(${90+(t[i])*360/(2*Math.PI)},${xTickArray[i][0]},${xTickArray[i][1]})`)
              .attr('font-family', 'sans-serif')
              .attr('fill',"grey")
            	.attr('font-size', 11)
              .text(`${i/numTicks*2400}`)
          };
        }

        //draw x abd y tick marks and labels
        drawXTicks(numXTicks);
        drawYTicks(yScaleMax, numYTicks);

        yAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('x', +innerHeight / 4+5)
            .attr('y', -5)
            .attr('transform', `rotate(0)`)
            .style('text-anchor', 'middle')
            .text(yLabel);

        const xScale = d3.scaleTime();
        const yScaleLeft = d3.scaleLinear()
          .domain([0,yMax])
          .range([0,yScaleMax]);

        const colorUser = {Total:"grey", Casual:"red",  Registered:"green"}

        const minDate = new Date(2012,1,1)
        const centerOffset = innerHeight/2;
        const radialOffset = 0 //.25*Math.PI

        const angleHours = d => (xValue(d)/24 *Math.PI*2+ radialOffset);
        var plotColor = colorUser.Registered



        const radialTimeSeriesLine = d3.lineRadial()
          .angle(d => angleHours(d))
          .radius(d => yValue(d)*radialScaleFactor)
          .curve(d3.curveLinear);

        //data join
        const radialPath = g.selectAll('path').data(data);

        //Add new elements
        var radialPathEnter = radialPath.enter().append('path');

        var radialPathExit = radialPath.exit()
            .attr('class','exit')
            .remove();

        //UPDATE old elements present (change class)
        radialPath
            .attr('class','update');

        //merge new and existing ell
        radialPathEnter
          .attr('class','enter')
          .merge(radialPath)
          .attr('fill', 'none')
          .attr('stroke', colorValue)
          .attr('stroke-opacity', 0.7)
          .attr('stroke-width', .1)
          .attr('d', radialTimeSeriesLine(data));

      //remove elements for which there is no data
      radialPathExit
  };
