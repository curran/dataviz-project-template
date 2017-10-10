


//
// var chartDiv = document.getElementById("chart");
// var svg = d3.select(chartDiv).append("svg");
//
// function update(countryName){
//
//     const xValue = d => d['Year'];
//     const xLabel = 'Year';
//     const yValue = d => d['Mobile cellular subscriptions'];
//     const yLabel = 'Subscription per 100 people';
//
//     var width = chartDiv.clientWidth;
//     var height = chartDiv.clientHeight;
//     var margin = { left: width * 2/20, right: width * 1/20, top: height * 1/20, bottom: height * 4/20 };
//
//     svg
//         .attr("width", width)
//         .attr("height", height);
//
//     var innerWidth = width - margin.left - margin.right;
//     var innerHeight = height - margin.top - margin.bottom;
//
//     var g = svg.selectAll('*').remove();
//
//     var g = svg.append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`);
//     var xAxisG = g.append('g')
//         .attr('transform', `translate(0, ${innerHeight})`);
//     var yAxisG = g.append('g');
//
//     xAxisG.append('text')
//         .attr('class', 'axis-label')
//         .attr('x', innerWidth / 2)
//         .attr('y', height * 3/20)
//         .style('font-size', String(18 * width/600))
//         .text(xLabel);
//
//     yAxisG.append('text')
//         .attr('class', 'axis-label')
//         .attr('x', -innerHeight / 2)
//         .attr('y', -width * 1/20)
//         .style('font-size', String(18 * width/600))
//         .attr('transform', `rotate(-90)`)
//         .style('text-anchor', 'middle')
//         .text(yLabel);
//
//     var xScale = d3.scaleLinear();
//     var yScale = d3.scaleLinear();
//
//     var xAxis = d3.axisBottom()
//         .scale(xScale)
//         .tickPadding(innerHeight * 0.5/20)
//         .ticks(5)
//         .tickSize(-innerHeight)
//         .tickFormat(d3.format("d"));
//
//     var yTicks = 5;
//     var yAxis = d3.axisLeft()
//         .scale(yScale)
//         .ticks(yTicks)
//         .tickPadding(innerWidth * 0.3/20)
//         .tickSize(-innerWidth)
//         .tickFormat(d3.format("d"));
//
//     var line = d3.line()
//         .x(d => xScale(xValue(d)))
//         .y(d => yScale(yValue(d)))
//         .curve(d3.curveBasis);
//
//     var row = d => {
//         if(d['Entity'] === countryName){
//             d['Year'] = +d['Year'];
//             d['Mobile cellular subscriptions'] = +d['Mobile cellular subscriptions'];
//             return d;
//         }
//     };
//
//     d3.csv('mobile-cellular-subscriptions-by-country.csv', row, data => {
//         xScale
//             .domain(d3.extent(data, xValue))
//             .range([0, innerWidth])
//             .nice();
//
//         yScale
//             .domain(d3.extent(data, yValue))
//             .range([innerHeight, 0])
//             .nice(yTicks);
//
//         g.append('path')
//             .attr('fill', 'none')
//             .attr('stroke', 'red')
//             .attr('stroke-width', 4)
//             .attr('d', line(data));
//
//         xAxisG.call(xAxis);
//         yAxisG.call(yAxis);
//     });
// }