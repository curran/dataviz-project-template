let svg = d3.select("#bar").append("svg").attr('width', '100%').attr('height', '100%');
const barWidth = 30;

function clickRect() {
    const index = $(this).index() - 1;
    $('.range input').val(index * 5 + 2015).trigger('input');
}

function mouseoverRect() {
    $(this).addClass('active-year');
}

function mouseoutRect() {
    $(this).removeClass('active-year');
}


function drawBar(yearValue) {
    let data = [];
    for (let i = 2015; i <= 2100; i += 5) {
        data.push({year: String(i), value: yearValue[i]});
    }
    const xValue = d => +d.year;
    const yValue = d => +d.value;
    const xScale = d3.scale.linear()
        .domain(d3.extent(data, xValue))
        .range([0, 915]);
    const yScale = d3.scale.linear()
        .domain([33.4, 255.6])
        .range([10, 280]);
    const yAxisScale = d3.scale.linear()
        .domain([270, 25])
        .range([0, 300]);


    const rects = svg.selectAll('rect').data(data)
        .attr('x', d => xScale(xValue(d)) + 12)
        .attr('y', d => 300 - yScale(yValue(d)))
        .attr('width', barWidth)
        .attr('height', d => yScale(yValue(d)));

    svg.selectAll('title').data(data)
        .text(d => yValue(d));

    rects.enter().append('rect')
        .attr('class', 'year')
        .attr('id', d => 'year-' + d.year)
        .attr('x', d => xScale(xValue(d)) + 12)
        .attr('y', d => 300 - yScale(yValue(d)))
        .attr('width', barWidth)
        .attr('height', d => yScale(yValue(d)))
        .style('z-index', 100)
        .on('click', clickRect)
        .on('mouseover', mouseoverRect)
        .on('mouseout', mouseoutRect)
        .append('title')
        .attr('class', 'rect-popup')
        .text(d => yValue(d));

    const yAxis = d3.svg.axis().scale(yAxisScale).orient("right").tickSize(-2).innerTickSize(-1000);
    svg.select('.grid').remove();
    svg.insert("g", ":first-child")
        .attr("transform", "translate(972,0)")
        .attr("class", "grid")
        .call(yAxis);
}
