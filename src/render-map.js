var special = {
    900: 'World',
    1503: 'High Income Countries',
    1517: 'Middle Income Countries',
    1500: 'Low Income Countries'
};
var countryCode = {900: null, 1503: null, 1517: null, 1500: null};//{country numeric code : alpha 3 code}
var codeName = {};// {alpha 3 code : country name}
var codeValue = []; // [alpha 3 code, {year: value}]
var countriesNames = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];//
var nameValue = {};//{country name: value}
function countryCodeRow(d) {
    countryCode[d.Numeric_code] = d.Alpha_3_code;
    return 0;
}

function row(d) {
    if (countryCode[d.Country_code] !== undefined) {
        var rowData = {};
        for (var i = 2015; i <= 2100; i += 5) {
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
        var countryList = d3.select('#country-input');
        countryList.selectAll('*').remove();
        countriesNames.sort();
        countriesNames.unshift('World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries');
        for (var i in countriesNames)
            countryList.append('option').text(countriesNames[i]);
        $("#country-input").val("World");
    }
    var dataset = {};
    var onlyValues = codeValue.map(function (obj) {
        return obj[1][$("#year-input").val()];
    });
    var minValue = Math.min.apply(null, onlyValues);
    var maxValue = Math.max.apply(null, onlyValues);
    // create color palette function
    var paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(["#f4fff8", "#b90700"]); // blue color
    // fill dataset in appropriate format
    codeValue.forEach(function (item) { //item example value ["USA", 70]
        var iso = item[0];
        var value = item[1][$("#year-input").val()];
        dataset[iso] = {numberOfThings: value, fillColor: paletteScale(value)};
    });
    // render map
    new Datamap({
        element: document.getElementById('map'),
        projection: 'mercator', // big world map
        // countries don't listed in dataset will be painted with this color
        fills: {defaultFill: '#F5F5F5'},
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
                var popupInfo = ['<div class="hoverinfo">', '<strong>', geo.properties.name, '</strong>'];
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
                    $("#country-input").val(codeName[geography.id]);
                    drawBar(nameValue[$("#country-input").val()]);
                }
            });
        }
    });
}

d3.csv("data/CountryCode.csv", countryCodeRow, function () {
        d3.csv("data/2015 to 2100 Dependency Ratio.csv", row, function () {
            render();
            drawBar(nameValue["World"]);
        });
    }
);