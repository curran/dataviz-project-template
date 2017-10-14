const special = {
    900: 'World',
    1503: 'High Income Countries',
    1517: 'Middle Income Countries',
    1500: 'Low Income Countries'
};
const countryCode = {900: null, 1503: null, 1517: null, 1500: null};//{country numeric code : alpha 3 code}
const codeName = {};// {alpha 3 code : country name}
const codeValue = []; // [alpha 3 code, {year: value}]
const countriesNames = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];//
const nameValue = {};//{country name: value}
function countryCodeRow(d) {
    countryCode[d.Numeric_code] = d.Alpha_3_code;
    return 0;
}

function row(d) {
    if (countryCode[d.Country_code] !== undefined) {
        const rowData = {};
        for (let i = 2015; i <= 2100; i += 5) {
            rowData[i] = d[i];
        }
        if (special[d.Country_code] !== undefined)
            nameValue[special[d.Country_code]] = rowData;
        else {
            codeValue.push([countryCode[d.Country_code], rowData]);
            nameValue[d['Region, subregion, country or area *']] = rowData;
            countriesNames.push(d['Region, subregion, country or area *']);
            codeName[countryCode[d.Country_code]] = d['Region, subregion, country or area *'];
        }
    }
}

function render() {
    d3.select("#map").selectAll("*").remove();
    if (document.getElementById("country-input").childElementCount === 0) {
        const countryList = d3.select('#country-input');
        countryList.selectAll('*').remove();
        countriesNames.sort();
        countriesNames.unshift('World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries');
        countriesNames.forEach(currentValue=>countryList.append('option').text(currentValue));
        $("#country-input").val("World");
    }
    const dataset = {};
    // create color palette function
    const colorValue = d3.scale.linear().range([0, 1]).domain([33.4, 255.6]);
    const paletteScale = value => d3.interpolateReds(colorValue(value));
    // fill dataset in appropriate format
    codeValue.forEach(function (item) { //item example value ["USA", 70]
        const iso = item[0];
        const value = item[1][$("#year-input").val()];
        dataset[iso] = {numberOfThings: value, fillColor: paletteScale(value)};
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
                    country.val(codeName[geography.id]);
                    drawBar(nameValue[country.val()]);
                }
            });
        }
    });
}

d3.csv("data/CountryCode.csv", countryCodeRow, function () {
        d3.csv("data/2015 to 2100 Dependency Ratio.csv", row, function () {
            render();
            drawBar(nameValue["World"]);
            $("#year-2015").addClass('selected-year')
        });
    }
);
