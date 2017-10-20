
export default function (countryName, width, height) {

    const margin = { left: 120, right: 60, top: 20, bottom: 120 };

    const xValue = d => d['Year'];
    const xLabel = 'Year';
    const yValue = d => d['Mobile cellular subscriptions'];
    const yLabel = 'Subscription per 100 people';

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    d3.select("div#svg_chart1_container").remove();
    var svg_chart1 = d3.select("div#detailChart1")
        .append("div")
        .attr("id", "svg_chart1_container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisG = svg_chart1.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);
    const yAxisG = svg_chart1.append('g');

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth/4)
        .attr('y', 80)
        .text(xLabel);

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerHeight/2)
        .attr('y', margin.left/2)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(yLabel);

    const xScale = d3.scale.linear();
    const yScale = d3.scale.linear();

    const xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickPadding(15)
        .tickSize(-innerHeight)
        .tickFormat(d3.format("d"));

    const yTicks = 5;
    const yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(yTicks)
        .tickPadding(15)
        .tickSize(innerWidth)
        .tickFormat(d3.format("d"));

    const line = d3.svg.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .interpolate("basis");

    const row = d => {
        if(d['Entity'] === countryName){
            d['Year'] = +d['Year'];
            d['Mobile cellular subscriptions'] = +d['Mobile cellular subscriptions'];
            return d;
        }
    };

    d3.csv('/data/mobile-cellular-subscriptions-by-country.csv', row, data => {
        xScale
            .domain(d3.extent(data, xValue))
            .range([margin.left, innerWidth - margin.right])
            .nice();

        yScale
            .domain(d3.extent(data, yValue))
            .range([innerHeight, margin.top])
            .nice(yTicks);

        svg_chart1.append('path')
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', 4)
            .attr('d', line(data));

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    });
}