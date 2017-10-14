var svg = d3.select("#bar").append("svg").attr('width', '100%').attr('height', '100%');
var barWidth = 30;

function drawBar(yearValue) {
    var data = [];
    for (var i = 2015; i <= 2100; i += 5) {
        data.push({year: String(i), value: yearValue[i]});
    }
    const xValue = d => d.year;
    const yValue = d => +d.value;
    const xScale = d3.scale.linear()
        .domain([2015, 2100])
        .range([0, 915]);
    const yScale = d3.scale.linear()
        .range([0, 299])
        .domain([0, 256]);
    var rects = svg.selectAll('rect').data(data)
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
        .append('title')
        .attr('class', 'rect-popup')
        .text(d => yValue(d));
    $("rect:nth-child(1)").addClass("selected-year");
    $('.year').on('click', function () {
        var index = $(this).index();
        $('.range input').val(index * 5 + 2015).trigger('input');
    });
}