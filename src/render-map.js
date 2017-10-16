const format = d3.format(".1f");
const specials = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];
const ageGroups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54',
    '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90-94', '95-99', '100+'];
let ageData = {};
const codeToName = {};// {alpha 3 code : country name}
const nameToCode = {};// {country name : alpha 3 code}
const codeToValues = []; // [[alpha 3 code, {year: value}]]
const nameToValues = {};//{country name: {values}}
let countriesNames = [];
let minValue = 99999;
let maxValue = -1;

function render() {
    d3.select("#map").selectAll("*").remove();
    if (document.getElementById("country-input").childElementCount === 0) {
        const countryList = d3.select('#country-input');
        countryList.selectAll('*').remove();
        countriesNames.forEach(value => countryList.append('option').text(value));
        $("#country-input").val("World");
    }
    const dataset = {};
    // create color palette function
    const colorValue = d3.scale.linear().range([0, 1]).domain([minValue, maxValue]);
    const paletteScale = value => d3.interpolateReds(colorValue(value));
    // fill dataset in appropriate format
    codeToValues.forEach(function (item) { //item example value ["USA", 70]
        const value = item[1][$("#year-input").val()];
        dataset[item[0]] = {numberOfThings: value, fillColor: paletteScale(value)};
    });
    // render map
    const datamap = new Datamap({
        element: document.getElementById('map'),
        projection: 'mercator', // big world map
        // countries don't listed in dataset will be painted with this color
        fills: {defaultFill: '#e0e1d7'},
        data: dataset,
        geographyConfig: {
            borderColor: '#717171',
            highlightBorderWidth: 2,
            // don't change color on mouse hover
            highlightFillColor: function (geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
            // show desired information in tooltip
            popupTemplate: function (geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) {
                    const popupInfo = ['<div class="hoverinfo">', '<strong>', geo.properties.name, '</strong>'];
                    popupInfo.push('<br><strong>No Data</strong>');
                    return popupInfo.join('');
                }
                else {
                    const popupInfo = ['<div class="hoverinfo">', '<strong>', codeToName[geo.id], '</strong>'];
                    return popupInfo.concat(['<br>Total Dependency Ratio: <strong>',
                        format(data.numberOfThings), '</strong>', '</div>']).join('');
                }

            },
            // only change border
            highlightBorderColor: '#ff5a04'
        },
        done: function (datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
                if (codeToName.hasOwnProperty(geography.id)) {
                    const country = $("#country-input");
                    country.val(codeToName[geography.id]);
                    drawBar(nameToValues[country.val()]);
                    renderPyramid();
                }
            });
        }
    });
    const svg = d3.select('.datamap');
    svg.select('#map-legend').remove();
    svg.select('#map-legend-axis').remove();
    const legend = svg.append("defs").append("svg:linearGradient").attr("id", "gradient")
        .attr("x1", "0%").attr("y1", "100%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");
    for (let i = 0; i <= 100; i += 10) {
        legend.append("stop").attr("offset", i + '%').attr("stop-color", d3.interpolateReds(i / 100))
    }
    svg.append("rect").attr("width", 150).attr("height", 15).style("fill", "url(#gradient)")
        .attr('id', 'map-legend')
        .attr("transform", "translate(545,640)");
    const axisScale = d3.scale.linear().range([0, 150]).domain([minValue, maxValue]);
    const axis = d3.svg.axis().scale(axisScale).orient("bottom").ticks(5);
    svg.append("g")
        .attr("transform", "translate(545,655)")
        .attr("id", "map-legend-axis")
        .call(axis);
}

function renderPyramid() {
    const height = 10;
    d3.select('#pyramid').remove();
    const g = d3.select('.datamap').append('g').attr('id', 'pyramid').attr("transform", "translate(0,400)");
    const index = ($("#year-input").val() - 2015) / 5;
    const country = ageData[nameToCode[$("#country-input").val()]];
    let maxValue = -1;

    const maleData = country['male'][index];
    const femaleData = country['female'][index];
    for (let i = 0; i < 21; i++) {
        maxValue = maxValue > maleData[i] ? maxValue : maleData[i];
        maxValue = maxValue > femaleData[i] ? maxValue : femaleData[i];
    }
    // for (let gender in country) {
    //     const years = country[gender];
    //     for (let i = 0; i < years.length; i++) {
    //         const values = country[gender][i];
    //         for (let j = 0; j < values.length; j++)
    //             maxValue = maxValue > values[j] ? maxValue : values[j];
    //     }
    // }
    const xScale = d3.scale.linear()
        .domain([0, maxValue])
        .range([0, 100]);
    const maleRects = g.selectAll('.male-age-rect').data(country['male'][index])
        .attr('x', d => 140 - xScale(d))
        .attr('width', d => xScale(d));
    maleRects.enter().append('rect').attr('class', 'age-rect male-age-rect')
        .attr('x', d => 140 - xScale(d))
        .attr('y', (d, i) => 240 - i * height)
        .attr('width', d => xScale(d))
        .attr('height', height)
        .append('title')
        .text(d => d+' thousand');
    const femaleRects = g.selectAll('.female-age-rect').data(country['female'][index])
        .attr('width', d => xScale(d[1]));
    femaleRects.enter().append('rect').attr('class', 'age-rect female-age-rect')
        .attr('x', 140)
        .attr('y', (d, i) => 240 - i * height)
        .attr('width', d => xScale(d))
        .attr('height', height)
        .append('title')
        .text(d => d+' thousand');
    g.selectAll('text').data(ageGroups).enter()
        .append('text').attr('x', (d, i) => i > 1 ? 1 : 7).attr('y', (d, i) => 250 - i * height)
        .text(d => d)
        .style('font-size', '11px');
    g.append('text').attr('x', 60).attr('y', 45).text('Male').style('font-size', '20px');
    g.append('text').attr('x', 160).attr('y', 45).text('Female').style('font-size', '20px');

    const MalexScale = d3.scale.linear()
        .domain([maxValue/1000, 0])
        .range([0, 100]);
    const FemalexScale = d3.scale.linear()
        .domain([0,maxValue/1000])
        .range([0, 100]);
    const axisMale = d3.svg.axis().scale(MalexScale).orient("bottom").ticks(3);
    const axisFemale = d3.svg.axis().scale(FemalexScale).orient("bottom").ticks(3);
    g.append("g")
        .attr("transform", "translate(40,250)")
        .attr("id", "map-legend-axis")
        .call(axisMale);
    g.append("g")
        .attr("transform", "translate(140,250)")
        .attr("id", "map-legend-axis")
        .call(axisFemale);

    g.append('text').attr('x',75).attr('y',280).text('Population (million)');


    // g.append('rect').attr('x', 0).attr('y', 28).attr('width', 242).attr('height', 260)
    //     .style('fill', 'none').style('stroke', '#717171')

}

d3.json("data/DR2565.json", function (data) {
    for (let code in data) {
        if (code === 'min' || code === 'max')
            continue;
        if (data.hasOwnProperty(code)) {
            const name = data[code].name;
            const values = data[code].data;
            nameToValues[name] = values;
            codeToName[code] = name;
            nameToCode[name] = code;
            if (specials.includes(code))
                continue;
            codeToValues.push([code, values]);
            countriesNames.push(name);
        }
    }
    minValue = parseInt(data['min'] / 10) * 10;
    maxValue = parseInt(data['max'] / 10 + 1) * 10;
    countriesNames = specials.concat(countriesNames.sort());
    render();
    drawBar(nameToValues["World"]);
    $("#year-2015").addClass('selected-year');
    d3.json("data/AgeComposition.json", function (data) {
        ageData = data;
        renderPyramid();
    });
});



