//import barChart from './BarChart'

export default function (countryName, width, height) {

    updateBarChart("China", 2010, width, height)
    const margin = { left: 60, right: 60, top: 0, bottom: 120 };

    d3.select("div#svg_chart2_container").remove();
    var svg_chart2 = d3.select("div#detailChart2")
        .append("div")
        .attr("id", "svg_chart2_container")
        .append("svg")
        .attr("width", width)
        .attr("height", height/5)
        .attr('transform', `translate(${margin.left},${margin.top})`);

    var x = d3.scaleLinear()
        .domain([1990, 2013])
        .range([0, width - margin.left - margin.right])
        .clamp(true);

    var slider = svg_chart2.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + "," + height / 20 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() { handler(x.invert(d3.event.x)); }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    function handler(h) {
        h = Math.round(h);
        handle.attr("cx", x(h));
        //svg_chart2.style("background-color", d3.hsl(h, 0.8, 0.8));
        updateBarChart(countryName, h, width, height);
    }


    function updateBarChart(selectedCountryName, selectedYear, outerWidth, outerHeight){

        d3.select("div#svg_chart3_container").remove();

        var margin = {top: 20, right: 60, bottom: 10, left: 60},
            padding = {top: 0, right: 20, bottom: 40, left: 70},
            innerWidth = outerWidth - margin.left - margin.right,
            innerHeight = outerHeight - margin.top - margin.bottom,
            width = innerWidth - padding.left - padding.right,
            height = innerHeight - padding.top - padding.bottom;

        var svg_chart3 = d3.select("div#detailChart3")
            .append("div")
            .attr("id", "svg_chart3_container")
            .append("svg")
            .attr("width", outerWidth)
            .attr("height", outerHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0Scale = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.3);

        var x1Scale = d3.scaleBand()
            .padding(0.4);

        var yScale = d3.scaleLinear()
            .rangeRound([height, 0]);

        var zScale = d3.scaleOrdinal()
            .range(["#7b6888", "#ff8c00"]);

        var g = svg_chart3.append("g")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

        var row = d => {
            if(d['Entity'] === selectedCountryName && d.Year == selectedYear){
                d['GDP per capita'] = +d['GDP per capita'];
                d['Mobile cellular subscriptions'] = +d['Mobile cellular subscriptions'];
                return d;
            }
        };

        d3.csv('data/combined2.csv', row, data => {
            var keys = data.columns.slice(3);
            x0Scale.domain(data.map(function(d) { return d.Entity; }));
            x1Scale.domain(keys).rangeRound([0, x0Scale.bandwidth()]);
            yScale.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

            g.append("g")
                .selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0Scale(d.lead) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter()
                .append("rect")
                .attr("class", function(d) { return d.key; })
                .attr("x", function(d) { return x1Scale(d.key); })
                .attr("y", function(d) { return yScale(d.value); })
                .attr("width", x1Scale.bandwidth())
                .attr("height", function(d) { return height - yScale(d.value); })
                .attr("fill", function(d) { return zScale(d.key); });

            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x0Scale));

            g.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(yScale).ticks(null, "s"))
                .append("text")
                .attr("x", 10)
                .attr("y", yScale(yScale.ticks().pop()) + 0.5)
                .attr("dy", "0.33em")
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "start")
                .text("%");

            // Legend
            var legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(keys)
                .enter().append("g")
                .attr("class", "lgd")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("class", function(d, i) { return "lgd_" + data.columns.slice(1)[i]; })
                .attr("x", width + 50)
                .attr("y", -15)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", zScale);

            legend.append("text")
                .attr("x", width + 45)
                .attr("y", -5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
        })

    }
}
