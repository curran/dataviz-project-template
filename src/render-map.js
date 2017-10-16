const format = d3.format(".1f");
const specials = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];
const codeToName = {};// {alpha 3 code : country name}
// const nameToCode = {};// {country name : alpha 3 code}
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
                const popupInfo = ['<div class="hoverinfo">', '<strong>', geo.properties.name, '</strong>'];
                if (!data) {
                    popupInfo.push('<br><strong>No Data</strong>');
                    return popupInfo.join('');
                }
                else
                    return popupInfo.concat(['<br>Total Dependency Ratio: <strong>',
                        format(data.numberOfThings), '</strong>', '</div>']).join('');
            },
            // only change border
            highlightBorderColor: '#ff5a04'
        },
        done: function (datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
                if (geography.id !== -99) {
                    const country = $("#country-input");
                    country.val(codeToName[geography.id]);
                    drawBar(nameToValues[country.val()]);
                }
            });
        }
    });
    const svg = d3.select('svg');
    svg.select('#map-legend').remove();
    svg.select('#map-legend-axis').remove();
    const legend = svg.append("defs").append("svg:linearGradient").attr("id", "gradient")
        .attr("x1", "0%").attr("y1", "100%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");
    for (let i = 0; i <= 100; i += 10) {
        legend.append("stop").attr("offset", i + '%').attr("stop-color", d3.interpolateReds(i / 100))
    }
    svg.append("rect").attr("width", 150).attr("height", 15).style("fill", "url(#gradient)")
        .attr('id','map-legend')
        .attr("transform", "translate(450,590)");
    const axisScale = d3.scale.linear().range([0, 150]).domain([minValue, maxValue]);
    const axis = d3.svg.axis().scale(axisScale).orient("bottom").ticks(5);
    svg.append("g")
        .attr("transform", "translate(450,605)")
        .attr("id", "map-legend-axis")
        .call(axis);
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
            // nameToCode[name] = code;
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
    $("#year-2015").addClass('selected-year')
});