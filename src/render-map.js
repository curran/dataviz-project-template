import  drawBar from './render-bar'
const format = d3.format(",.1f");
const specials = ['World', 'High Income Countries', 'Middle Income Countries', 'Low Income Countries'];
const ageGroups = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54',
    '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90-94', '95-99', '100+'];
var ageData = {};
var codeToName = {};// {alpha 3 code : country name}
var nameToCode = {};// {country name : alpha 3 code}
var codeToValues = []; // [[alpha 3 code, {year: value}]]
var nameToValues = {};//{country name: {values}}
var countriesNames = [];
var maxValue = Number.MIN_VALUE;//max value including 'World'
var maxValue2 = Number.MIN_VALUE;//max value of a country
var minValue = Number.MAX_VALUE;
var barSvg = d3.select("#bar").append("svg").attr('id', 'bar-svg').attr('width', '100%').attr('height', '100%');

const properties = {
    'Population (million)': {file: 'Population.json', color: d3.interpolateBlues, class: 'Population'},
    'Median Age': {file: 'MedianAge.json', color: d3.interpolateBuGn, class: 'Median Age'},
    'Total Dependency Ratio ((Age 0-14 + Age 65+) / Age 15-64)': {
        file: 'DR1564.json',
        color: d3.interpolateReds,
        class: 'Total Dependency Ratio'
    },
    'Total Dependency Ratio ((Age 0-19 + Age 65+) / Age 20-64)': {
        file: 'DR2064.json',
        color: d3.interpolateReds,
        class: 'Total Dependency Ratio'
    },
    'Total Dependency Ratio ((Age 0-19 + Age 70+) / Age 20-69)': {
        file: 'DR2069.json',
        color: d3.interpolateReds,
        class: 'Total Dependency Ratio'
    },
    'Total Dependency Ratio ((Age 0-24 + Age 65+) / Age 25-64)': {
        file: 'DR2564.json',
        color: d3.interpolateReds,
        class: 'Total Dependency Ratio'
    },
    'Total Dependency Ratio ((Age 0-24 + Age 70+) / Age 25-69)': {
        file: 'DR2569.json',
        color: d3.interpolateReds,
        class: 'Total Dependency Ratio'
    },
    'Old-Age Dependency Ratio (Age 65+ / Age 15-64)': {
        file: 'ODR1564.json',
        color: d3.interpolateRdPu,
        class: 'Old-Age Dependency Ratio'
    },
    'Old-Age Dependency Ratio (Age 65+ / Age 20-64)': {
        file: 'ODR2064.json',
        color: d3.interpolateRdPu,
        class: 'Old-Age Dependency Ratio'
    },
    'Old-Age Dependency Ratio (Age 70+ / Age 20-69)': {
        file: 'ODR2069.json',
        color: d3.interpolateRdPu,
        class: 'Old-Age Dependency Ratio'
    },
    'Old-Age Dependency Ratio (Age 65+ / Age 25-64)': {
        file: 'ODR2564.json',
        color: d3.interpolateRdPu,
        class: 'Old-Age Dependency Ratio'
    },
    'Old-Age Dependency Ratio (Age 70+ / Age 25-69)': {
        file: 'ODR2569.json',
        color: d3.interpolateRdPu,
        class: 'Old-Age Dependency Ratio'
    }
};

//for IE not supporting Array.includes()
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        value: function (obj) {
            var newArr = this.filter(function (el) {
                return el == obj;
            });
            return newArr.length > 0;
        }
    });
}

function dataInput() {
    codeToName = {};
    nameToCode = {};
    codeToValues = [];
    nameToValues = {};
    countriesNames = [];
    d3.json("data/" + properties[$("#type-input").val()].file, function (data) {
        for (var code in data) {
            if (code === 'min' || code === 'max' || code === 'max2')
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
        maxValue2 = parseInt(data['max2'] / 10 + 1) * 10;
        countriesNames = specials.concat(countriesNames.sort());
        renderMap();
        drawBar(nameToValues[$("#country-input").val()], barSvg);
        $("#year-2015").addClass('selected-year');
        d3.json("data/AgeComposition.json", function (data) {
            ageData = data;
            renderPyramid();
        });
    });
}

function renderMap() {
    $('#map').empty();
    if (document.getElementById("country-input").childElementCount !== countriesNames.length) {
        const previousCountry = $("#country-input").val();
        const countryList = d3.select('#country-input');
        countryList.selectAll('*').remove();

        // countriesNames.forEach(value => countryList.append('option').text(value));
        countriesNames.forEach(function (value) {
            countryList.append('option').text(value);
        });

        if (countriesNames.includes(previousCountry))
            $("#country-input").val(previousCountry);
        else
            $("#country-input").val("World");
    }
    const dataset = {};
    // create color palette function
    const type = $("#type-input").val();
    const max_value = type === 'Population (million)' ? maxValue2 : maxValue;
    const colorIndex = type === 'Population (million)' ? 3 : 1;
    const colorValue = d3.scale.linear().range([0, 1]).domain([minValue, max_value / colorIndex]);
    // const paletteScale = value => properties[type].color(colorValue(value));
    // fill dataset in appropriate format
    codeToValues.forEach(function (item) { //item example value ["USA", 70]
        const value = item[1][$("#year-input").val()];
        dataset[item[0]] = {numberOfThings: value, fillColor: properties[type].color(colorValue(value))};
    });
    // renderMap map
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
                    if (type === 'Population (million)') {
                        var number = data.numberOfThings;
                        number = number > 1000 ? format(number / 1000) + ' million' : format(number) + ' thousand';
                        const popupInfo = ['<div class="hoverinfo">', '<strong>', codeToName[geo.id], '</strong>'];
                        return popupInfo.concat(['<br/>', properties[$("#type-input").val()].class, ': <strong>',
                            number, '</strong>', '</div>']).join('');
                    } else {
                        const popupInfo = ['<div class="hoverinfo">', '<strong>', codeToName[geo.id], '</strong>'];
                        return popupInfo.concat(['<br/>', properties[$("#type-input").val()].class, ': <strong>',
                            format(data.numberOfThings), '</strong>', '</div>']).join('');
                    }
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
                    drawBar(nameToValues[country.val()], barSvg);
                    renderPyramid();
                }
            });
        }
    });
    const kiloToMillion = type === 'Population (million)' ? 1000 : 1;
    const svg = d3.select('.datamap');
    svg.select('#map-legend').remove();
    svg.select('#map-legend-axis').remove();
    const legend = svg.append("defs").append("svg:linearGradient").attr("id", "gradient")
        .attr("x1", "0%").attr("y1", "100%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");
    for (var i = 0; i <= 100; i += 10) {
        legend.append("stop").attr("offset", i + '%').attr("stop-color", properties[$("#type-input").val()].color(i / 100))
    }
    svg.append("rect").attr("width", 150).attr("height", 15).style("fill", "url(#gradient)")
        .attr('id', 'map-legend')
        .attr("transform", "translate(460,625)");
    const axisScale = d3.scale.linear().range([0, 150]).domain([minValue, max_value / kiloToMillion / colorIndex]);
    const axis = d3.svg.axis().scale(axisScale).orient("bottom").ticks(5);
    svg.append("g")
        .attr("transform", "translate(460,640)")
        .attr("id", "map-legend-axis")
        .call(axis);
    if (type === 'Population (million)')
        svg.append('text').attr('x', 620).attr('y', 658).text('+ (million)');
}

function renderPyramid() {
    const height = 10;
    d3.select('#pyramid').remove();
    const g = d3.select('.datamap').append('g').attr('id', 'pyramid').attr("transform", "translate(0,400)");
    const index = ($("#year-input").val() - 2015) / 5;
    const country = ageData[nameToCode[$("#country-input").val()]];
    if (country === undefined)
        return;
    var maxValue = Number.MIN_VALUE;

    const maleData = country['male'][index];
    const femaleData = country['female'][index];
    for (var i = 0; i < 21; i++) {
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
        .attr('x', function (data) {
            return 140 - xScale(data);
        })
        .attr('width', function (data) {
            return xScale(data);
        });
    maleRects.enter().append('rect').attr('class', 'age-rect male-age-rect')
        .attr('x', function (data) {
            return 140 - xScale(data);
        })
        .attr('y', function (data, index) {
            return 240 - index * height;
        })
        .attr('width', function (data) {
            return xScale(data);
        })
        .attr('height', height)
        .append('title')
        .text(function (data) {
            return data + 'thousand';
        });
    const femaleRects = g.selectAll('.female-age-rect').data(country['female'][index])
        .attr('width', function (data) {
            return xScale(data[1]);
        });
    femaleRects.enter().append('rect').attr('class', 'age-rect female-age-rect')
        .attr('x', 140)
        .attr('y', function (data, index) {
            return 240 - index * height;
        })
        .attr('width', function (data) {
            return xScale(data);
        })
        .attr('height', height)
        .append('title')
        .text(function (data) {
            return data + 'thousand';
        });
    g.selectAll('text').data(ageGroups).enter()
        .append('text').attr('x', function (data, index) {
        return index > 1 ? 1 : 7;
    }).attr('y', function (data, index) {
        return 250 - index * height;
    })
        .text(function (data) {
            return data;
        })
        .style('font-size', '11px');
    g.append('text').attr('x', 60).attr('y', 45).text('Male').style('font-size', '20px');
    g.append('text').attr('x', 160).attr('y', 45).text('Female').style('font-size', '20px');

    const MalexScale = d3.scale.linear()
        .domain([maxValue / 1000, 0])
        .range([0, 100]);
    const FemalexScale = d3.scale.linear()
        .domain([0, maxValue / 1000])
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

    g.append('text').attr('x', 75).attr('y', 280).text('Population (million)');
}

const sheet = document.createElement('style'),
    $rangeInput = $('.range input'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
document.head.appendChild(sheet);
const getTrackStyle = function (el) {
    const curVal = el.value;
    const val = (curVal - 2015) * 1.176470588;
    var style = '';
    $('.range-labels li').removeClass('active selected');
    $('.year').removeClass('active-year selected-year');
    const curLabel = $('.range-labels').find('li:nth-child(' + (curVal - 2010) / 5 + ')');
    curLabel.addClass('active selected');
    curLabel.prevAll().addClass('active selected');
    const curYear = $("#bar-svg").find('rect:nth-child(' + (curVal - 2005) / 5 + ')');
    curYear.addClass('active-year selected-year');
    curYear.prevAll().addClass('selected-year');
    for (var i = 0; i < prefs.length; i++) {
        style += '.range {background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #fff ' + val + '%, #fff 100%)}';
        style += '.range input::-' + prefs[i] + '{background: linear-gradient(to right, #ff5a04 0%, #ff5a04 ' + val + '%, #0099cb ' + val + '%, #0099cb 100%)}';
    }
    return style;
};
$rangeInput.on('input', function () {
    sheet.textContent = getTrackStyle(this);
    renderMap();
    renderPyramid();
});
$('.range-labels li').on('click', function () {
    const index = $(this).index();
    $rangeInput.val(index * 5 + 2015).trigger('input');
});
$("#country-input").change(function () {
    const name = $("#country-input").val();
    drawBar(nameToValues[name], barSvg);
    renderPyramid();
});

$('#type-input').change(function () {
    dataInput();
});
dataInput();


