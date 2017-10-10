function countryCodeRow(d) {
    countriesInCode.push(d['English short name (upper/lower case)']);
    countryCode[d.Numeric_code] = d.Alpha_3_code;
}

function row(d) {
    if (countriesInCode.indexOf(d['Region, subregion, country or area *']) !== -1)
        countries.push(d['Region, subregion, country or area *']);
    series.push([countryCode[d.Country_code], d["2050"]]);
}