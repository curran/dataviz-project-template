
const xScale = d3.scaleBand();

const yScale = d3.scaleLinear();

const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

const xAxis = d3.axisBottom()
  .scale(xScale)
  .tickSize(-innerHeight);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .tickSize(-innerWidth)
  .tickPadding(15);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shapePadding(3)
  .shapeWidth(15)
  .shapeHeight(15)
  .labelOffset(4);

export default function (svg, props) {
  const { 
    data2,
    xValue,
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
    margin
  } = props;

  const layerColumn = colorValue;
  
  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

  const xAxisG = g.append('g').attr('transform', `translate(0, ${innerHeight})`);
  const yAxisG = g.append('g');

  const barsG = g.append('g');

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 76)
    .text(xLabel);

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2 - 3)
    .attr('y', -57)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

  var colorLegendG = g.append("g")
    .attr("class", "color-legend")
    .attr("transform", "translate(620,14)");

  var dataset = data2.map(function(d){ 
    var ob = {
      issue: d.issue
    };

    for (var i = 0; i < d.product.length; i++){
      ob[d.product[i].key] = d.product[i].value;
    }

    return ob; 
  });


  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan","Virtual currency"];

  for(var j=0;j<dataset.length;j++){
    for(var k in keys){
      if (!dataset[j].hasOwnProperty(keys[k])) {
        dataset[j][keys[k]] = 0;
      }
    }
  };

  //console.log(dataset)
  
  var stack = d3.stack()
    .keys(keys);

  var stacked = stack(dataset);
  console.log(stacked)

  xScale
    .domain(data2.map(function (d) { return d.issue; }))
    .range([0, innerWidth]);

  yScale
    .domain([0, d3.max(stacked.map(function (d){
      return d3.max(d, function (d){ return d[1];});
    }))])
    .range([innerHeight, 0])
    .nice();

  colorScale
    .domain(keys)

  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  //console.log(stacked);

  var groups = barsG.selectAll('g').data(stacked)
    .enter()
    .append("g")
      .style('fill', function(d) { return colorScale(d.key); });
    
  var rects = groups.selectAll('rect')
    .data(function (d) { return d; })
    .enter()
    .append("rect")
    .attr('width', xScale.bandwidth())
    .attr('x', function(d){ return xScale(d.data.issue);})
    .attr('y', function (d) { return yScale(d[1]); })
    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]); });

  colorLegendG.call(colorLegend)
      .selectAll('.cell text')
      .attr('dy', '0.1em');


}
