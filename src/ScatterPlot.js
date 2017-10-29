
export default function (countryName) {
    const margin = { left: 100, right: 60, top: 20, bottom: 120 };
    const innerWidth = 500 - margin.left - margin.right;
    const innerHeight = 400 - margin.top - margin.bottom;

    d3.select("div#svg_chart1_container").remove();
    var svg_chart1 = d3.select("div#detailChart1")
        .append("div")
        .attr("id", "svg_chart1_container")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + 700 + " " + 400)
        .attr("id", "svg-content-responsive")
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xValue = d => d['Percentage of Individuals using the Internet (ICT)'];
    // const xLabel = 'Percentage of Individuals using the Internet (ICT)';
    const xLabel = 'Internet Users per 100 people';
    const yValue = d => d['GDP per capita'];
    const yLabel = 'GDP per capita ($)';
    const colorValue = d => d['Entity'];
    const colorLabel = 'Countries';

    const g = svg_chart1.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    const xAxisG = g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);
    const yAxisG = g.append('g');

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', 50)
        .text(xLabel);

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerHeight / 2)
        .attr('y', -80)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();
    const colorScale = d3.scaleOrdinal()
        .range(d3.schemeCategory10);

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickPadding(15)
        .tickSize(-innerHeight)
    //.tickFormat(d3.format("d"));
    var yTicks = 5;
    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(yTicks)
        .tickPadding(15)
        .tickSize(-innerWidth);

    const row = d => {
        if((d['Year'] < 2014 && d['Year'] > 1990) && (d['Entity'] === countryName)){
            d['Percentage of Individuals using the Internet (ICT)'] = +d['Percentage of Individuals using the Internet (ICT)'];
            d['GDP per capita'] = +d['GDP per capita'];
            d['Total population (Gapminder)'] = +d['Total population (Gapminder)'];
            return d;
        }
    };

    d3.csv('data/correlation-between-internet-users-as-a-share-of-the-population-and-gdp-per-capita-since-1980.csv', row, data => {

        xScale
            .domain(d3.extent(data, xValue))
            .range([0, innerWidth])
            .nice();

        yScale
            .domain(d3.extent(data, yValue))
            .range([innerHeight, 0])
            .nice(yTicks);

        g.selectAll('path').data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(xValue(d)))
            .attr('cy', d => yScale(yValue(d)))
            .attr('fill', d => colorScale(colorValue(d)))
            .attr('fill-opacity', 0.6)
            .attr('r', 4);

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    });



}
