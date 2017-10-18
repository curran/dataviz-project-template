let svg = d3.select("#bar").append("svg").attr('id', 'bar-svg').attr('width', '100%').attr('height', '100%');
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
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    const kiloToMillion = $("#type-input").val()==='Population (million)'?1000:1;
    for (let i = 2015; i <= 2100; i += 5) {
        const value = yearValue[i]/kiloToMillion;
        data.push({year: String(i), value: value});
        min = min < value ? min : value;
        max = max > value ? max : value;
    }
    min = parseInt(min / 5) * 5;
    max = parseInt(max / 5 + 1) * 5;
    const xValue = d => +d.year;
    const yValue = d => +d.value;
    const xScale = d3.scale.linear()
        .domain(d3.extent(data, xValue))
        .range([0, 915]);
    const yScale = d3.scale.linear()
        .domain([min, max])
        .range([10, 260]);
    const yAxisScale = d3.scale.linear()
        .domain([max, min])
        .range([280 - yScale(max), 280 - yScale(min)]);


    const rects = svg.selectAll('rect').data(data)
        .attr('x', d => xScale(xValue(d)) + 12)
        .attr('y', d => 280 - yScale(yValue(d)))
        .attr('width', barWidth)
        .attr('height', d => yScale(yValue(d)));
    svg.selectAll('title').data(data)
        .text(d => yValue(d));
    rects.enter().append('rect')
        .attr('class', 'year')
        .attr('id', d => 'year-' + d.year)
        .attr('x', d => xScale(xValue(d)) + 12)
        .attr('y', d => 280 - yScale(yValue(d)))
        .attr('width', barWidth)
        .attr('height', d => yScale(yValue(d)))
        .on('click', clickRect)
        .on('mouseover', mouseoverRect)
        .on('mouseout', mouseoutRect)
        .append('title')
        .attr('class', 'rect-popup')
        .text(d => yValue(d));

    const yAxis = d3.svg.axis().scale(yAxisScale).orient("right").ticks(8).innerTickSize(-1000);
    svg.select('.grid').remove();
    svg.insert("g", ":first-child")
        .attr("transform", "translate(972,0)")
        .attr("class", "grid")
        .call(yAxis);

    svg.selectAll('.bar-line').remove();
    svg.selectAll('.bar-text').remove();
    svg.selectAll('.bar-point').remove();

    for (let i = 0; i < data.length; i++) {
        svg.append('text')
            .attr('class', 'bar-text')
            .attr('x', xScale(xValue(data[i])) + 10)
            .attr('y', 280 - yScale(yValue(data[i])) - 8)
            .text(format(yValue(data[i])));

        svg.append('circle')
            .attr('class', 'bar-point')
            .attr('cx', xScale(xValue(data[i])) + 12 + barWidth / 2)
            .attr('cy', 280 - yScale(yValue(data[i])))
            .attr('r', 3);

        if (i === data.length - 1)
            break;
        svg.append("line")
            .attr('class', 'bar-line')
            .attr('x1', xScale(xValue(data[i])) + 12 + barWidth / 2)
            .attr('y1', 280 - yScale(yValue(data[i])))
            .attr('x2', xScale(xValue(data[i + 1])) + 12 + barWidth / 2)
            .attr('y2', 280 - yScale(yValue(data[i + 1])));
    }
}
