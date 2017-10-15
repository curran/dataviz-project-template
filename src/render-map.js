const specials = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];
const codeToName = {};// {alpha 3 code : country name}
const codeToValues = []; // [[alpha 3 code, {year: value}]]
const nameToValues = {};//{country name: {values}}
let countriesNames = [];

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
    const colorValue = d3.scale.linear().range([0, 1]).domain([33.4, 255.6]);
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
            borderColor: '#DEDEDE',
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
                        data.numberOfThings, '</strong>', '</div>']).join('');
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
}

d3.json("data/DR2565.json", function (data) {
    for (let code in data) {
        if (data.hasOwnProperty(code)) {
            const name = data[code].name;
            const values = data[code].data;
            nameToValues[name] = values;
            codeToName[code] = name;
            if (specials.includes(code))
                continue;
            codeToValues.push([code, values]);
            countriesNames.push(name);
        }
    }
    countriesNames = specials.concat(countriesNames.sort());
    render();
    drawBar(nameToValues["World"]);
    $("#year-2015").addClass('selected-year')
});