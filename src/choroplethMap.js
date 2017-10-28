function getMapHeight(width) {
  return width*3/4;
}

function getTownNames(drivingTimeData) {
  return drivingTimeData.columns;
}

function buildTownIndex(townNames) {
  // create reverse mapping: townIndex[townName] == index
  return townNames.reduce((accumulator, currentValue, currentIndex) => {
    accumulator[currentValue] = currentIndex;
    return accumulator;
  }, {});
}

function drivingTimeToString(drivingTimeMins) {
  // convert driving time in minutes into a string
  const hours = Math.floor(drivingTimeMins/60);
  const mins = Math.round(drivingTimeMins - 60*hours);
  const hoursString = (hours == 0) ? '' : hours + 'h ';
  return hoursString + mins + " min";
}

function parseDrivingMap(row) {
  // convert driving time to numeric value in minutes
  Object.keys(row).forEach(k => { row[k] = +Math.round(row[k]/60); });
  return row;
}

function createNewNameIfNeeded(name, namesAlreadySeen) {
  let currentName = name;
  let suffixIndex = 2;
  while(currentName in namesAlreadySeen) {
    currentName = name + ' (' + suffixIndex + ')';
  }
  return currentName;
}

function buildRacesRunMap(memberTownsRun, townNames) {
  // access result as racesRunMap['Pasini, Jose']['Canton']
  // and as memberTownsMap['Pasini, Jose']
  const racesRunMap = {};
  const memberTownsMap = {};
  memberTownsRun.forEach(row => {
    const newName = createNewNameIfNeeded(row.Name, racesRunMap);
    row.Name = newName;
    memberTownsMap[row.Name] = row.Town;
    racesRunMap[row.Name] = townNames.reduce((accumulator, currentValue) => {
      accumulator[currentValue] = row[currentValue] == '1';
      return accumulator;
    }, {});
  });
  return { racesRunMap, memberTownsMap };
}

function parseTownsRunByMembers(row) {
  row.TotalTowns = +row.TotalTowns;
  return row;
}

function buildRaceHorizon(races, townNames) {
  const today = d3.timeDay(new Date());
  const raceHorizonByTown = {};
  races.forEach(row => {
    const daysToRace = d3.timeDay.count(today, row.raceDay);
    if(daysToRace >= 0 && daysToRace <= 14) {
      const raceType = daysToRace <= 7 ? 'hasRaceVerySoon' : 'hasRaceSoon'; 
      if(row.Town in raceHorizonByTown) {
        if(daysToRace < raceHorizonByTown[row.Town].daysToRace) {
          raceHorizonByTown[row.Town] = { 
            'daysToRace': daysToRace, 
            'raceType': raceType 
          };            
        }            
      } else {
        raceHorizonByTown[row.Town] = { 
          'daysToRace': daysToRace, 
          'raceType': raceType 
        };            
      }
    }
  });
  // complete race horizon table with missing towns
  townNames.forEach(t => {
    if(!(t in raceHorizonByTown)) {
      raceHorizonByTown[t] = { 'daysToRace': 400, 'raceType': ''};
    }
  });
  return raceHorizonByTown;
}

function buildRacesSoonTables(races) {
  const today = d3.timeDay(new Date());
  const racesSoonByTown = {};
  races.forEach(row => {
    const daysToRace = d3.timeDay.count(today, row.raceDay);
    if(daysToRace >= 0 && daysToRace <= 14) {
      const raceString = "<tr><td><span class='racedate'>" + 
          row["Date/Time"].slice(5) + 
          "</span></td><td><span class='racedistance'>" + 
          row.Distance + "</span></td><td><span class='racename'>" + 
          row.Name + "</span></td></tr>";          
      if(row.Town in racesSoonByTown) {
        racesSoonByTown[row.Town] += raceString;
      } else {
        racesSoonByTown[row.Town] = "<table>" + raceString;
      }
    }
  });
  return racesSoonByTown;
}

function parseRaces(row) {
  const fmt = d3.format("02");
  row.Month = +row.Month;
  row.Day = +row.Day;
  row.Weekday = +row.Weekday;
  row.DateString = fmt(row.Month) + "/" + fmt(row.Day);
  row.raceDay = d3.timeDay(new Date(2017, row.Month-1, row.Day));
  return row;
}

const tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0]);

d3.selectAll('svg').call(tip);

function getSliderParameters(width, height) {
  const scale = getMapScale(width, height);
  return { 
    x: width/2 - scale/12000*50, 
    y: height/2 - scale/12000*160, 
    width: scale/12000*180,
    scale: scale/120000
  };
}

function getMapScale(width, height) {
  // known size of CT image for given scale
  const baseScale = 12000;
  const baseWidth = 453;
  const baseHeight = 379;

  const scale1 = baseScale*width/baseWidth;
  const scale2 = baseScale*height/baseHeight;
  return d3.min([scale1, scale2]);
}

function completeTooltipTables(racesSoonByTown) {
  Object.keys(racesSoonByTown).forEach(
    town => { racesSoonByTown[town] += "</table>"; }
  );
}


const carSlider = {value: 40};

function choroplethMap(container, props, box) {
  const [
    mapData,
    drivingTimes,
    racesRunMap,
    racesForMap,
    townNames,
    townIndex,
    racesSoonByTown,
    raceHorizonByTown,
    myTown,
    myName
  ] = props.data;

  // string marker
  // TODO: find a 'DRY' way of doing this -- these are also set in index.js
  const outOfState = 'Out of State'; 
  const noPersonName = 'noPersonName';

  const myTownIndex = townIndex[myTown];

  completeTooltipTables(racesSoonByTown);

  // note: these colors must match the css above
  // TODO: DRY principle: perhaps do colors programmatically
  const legendColors = ['#d73027', '#fdae61', '#2c7bb6'];
  const legendLabels = ['Race within 1 week', 'Race within 2 weeks', 'Town already run'];

  // Extract the width and height that was computed by CSS.
  const width = box.width;
  const height = box.height;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const centerX = width/2;
  const centerY = height/2;

  // Slider
  const sliderParameters = getSliderParameters(width, height);

  const sliderScale = d3.scaleLinear()
    .domain([0, sliderParameters.width])
    .range([0, 150])
    .clamp(true);

  carSlider.x = sliderScale.invert(carSlider.value);

  let sliderG = container.selectAll('.sliderGroup').data([sliderParameters]);
  sliderG = sliderG
    .enter().append('g')
      .attr('class', 'sliderGroup')
    .merge(sliderG)
      .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

  const labelText = myTown;
  let drivingTimeLabel = sliderG.selectAll('.townLabel').data([labelText]);
  drivingTimeLabel = drivingTimeLabel
    .enter().append('text')
      .attr('class', 'townLabel')
      .attr('text-anchor', 'end')
    .merge(drivingTimeLabel)
      .attr('x', -10*sliderParameters.scale)
      .attr('y', 160*sliderParameters.scale)
      .attr('font-size', (175*sliderParameters.scale) + 'px')
      .text(d => d);

  let carLine = sliderG.selectAll('.carLine').data([carSlider]);
  carLine = carLine
    .enter().append('rect')
      .attr('class', 'carLine')
    .merge(carLine)
      .attr('x', 0)
      .attr('y', 100*sliderParameters.scale)
      .attr('width', d => d.x)
      .attr('height', 10*sliderParameters.scale);

  let carLabel = sliderG.selectAll('.carLabel').data([carSlider]);
  carLabel = carLabel
    .enter().append('text')
      .attr('class', 'carLabel')
      .attr('text-anchor', 'middle')
    .merge(carLabel)
      .text(d => drivingTimeToString(sliderScale(d.x)))
      .attr('x', d => d.x + 300*sliderParameters.scale)
      .attr('y', -50*sliderParameters.scale)
      .attr('font-size', (120*sliderParameters.scale) + 'px');


  const car = sliderG.selectAll('.car').data([carSlider]);
  const pathString = "m 25,0 c -4.53004,0.0112 -12.12555,0.69055 -14.0625,6.05859 -5.07703,1.58895 -10.49326,2.14878 -10.14649,9.23437 l 6.23633,0.75782 c 0,0 0.45836,3.05148 3.51563,3.13672 3.05727,0.0852 4.03125,-2.89454 4.03125,-2.89454 l 28.49609,0.0684 c 0,0 1.50286,3.40622 5.20508,3.37696 3.70222,-0.0293 4.85742,-4.37696 4.85742,-4.37696 1.52171,0.005 3.11558,0.0922 4.37695,-0.20703 0.72421,-1.0742 0.63022,-2.1633 -0.33203,-2.23828 -0.0635,-0.005 0.70644,-2.07399 -0.16797,-3.46484 l -0.0859,-1.51563 c -0.85704,-0.4383 -1.83605,-0.7606 -2.92969,-0.74023 -1.55827,-2.22881 -10.56728,-1.44901 -16.36719,-1.96485 -1.45014,-0.83459 -2.9249,-2.47089 -4.51367,-4.27343 0,0 -2.90328,-0.91128 -4.92774,-0.89453 -0.50611,0.004 -1.67553,-0.0662 -3.18554,-0.0625 z m 1.83594,1.23437 c 1.42376,-0.0226 4.15534,0.26141 4.65625,0.51563 0.66787,0.33894 3.90428,3.44039 3.58398,3.87695 -0.3203,0.43656 -8.54696,0.58251 -9.01953,0.26758 -0.47258,-0.31493 -0.28696,-4.16971 -0.0762,-4.52344 0.0527,-0.0884 0.38088,-0.12919 0.85547,-0.13672 z m -3.3418,0.16016 c 0.19862,0.0111 0.33328,0.0434 0.38281,0.10156 0.39621,0.46517 0.29788,4.24032 -0.0234,4.38477 -0.26357,0.11849 -7.94003,0.75278 -8.31054,0.43945 -0.37051,-0.31334 0.16129,-2.35076 1.14648,-3.24024 0.86204,-0.77829 5.41436,-1.76307 6.80469,-1.68554 z"
  const carScale = 10*sliderParameters.scale;

  car
    .enter().append('path')
      .attr('d', pathString)
    .merge(car)
      .attr('class', myTown == outOfState ? 'car inactive' : 'car')
      .attr('transform', d => 'translate(' + d.x + ') scale(' + carScale + ')')
      .call(d3.drag()
          .on('start', myTown == outOfState ? () => {} : dragstarted)
          .on('drag', myTown == outOfState ? () => {} : dragged)
          .on('end', myTown == outOfState ? () => {} : dragended));

  tip
    .html(d => '<span class="townname">' + d.properties.NAME10 + '</span>'
        + (myTown == outOfState ? '' :
          '<br><span>' + drivingTimeToString(drivingTimes[myTownIndex][d.properties.NAME10])
        + ' driving</span>')
        + '<span>' 
        + (d.properties.NAME10 in racesSoonByTown ?
          racesSoonByTown[d.properties.NAME10]
          : '')
        + '</span>'
    );

  // draw the color legend manually
  let colorLegendG = container.selectAll('.mapColorLegendG').data([sliderParameters]);
  colorLegendG = colorLegendG
    .enter().append('g')
      .attr('class', 'mapColorLegendG')
    .merge(colorLegendG)
      .attr("transform", d => "translate(" + (d.x + 1200*d.scale) + "," + (d.y + 2800*d.scale) + ")");

  const colorLegend = colorLegendG.selectAll('rect').data(legendColors);
  const legendLineHeight = 140*sliderParameters.scale;
  colorLegend
    .enter().append('rect')
      .attr('x', 0)
    .merge(colorLegend)
      .attr('fill', d => d)
      .attr('width', legendLineHeight*.9)
      .attr('height', legendLineHeight*.9)
      .attr('y', (d, i) => (i-0.3)*legendLineHeight);
  
  const colorLegendText = colorLegendG.selectAll('text').data(legendLabels);
  colorLegendText
    .enter().append('text')
      .attr('fill', d => d)
      .attr('fill', '#666')
      .attr('alignment-baseline', 'middle')
      .html(d => d)
    .merge(colorLegendText)
      .attr('font-size', 0.75*legendLineHeight)
      .attr('x', legendLineHeight)
      .attr('y', (d, i) => (i + 0.2)*(legendLineHeight));

  // add instructions and title
  const instructions = container.selectAll('.instructions').data([sliderParameters]);
  instructions
    .enter().append('text')
      .attr('class', 'instructions')
      .text('drag car to filter by driving time')
    .merge(instructions)
      .attr('x', d => d.x + 3*legendLineHeight)
      .attr('y', d => d.y + 2.2*legendLineHeight)
      .attr('font-size', d => 0.75*legendLineHeight);

  function isReachable(town) {
    return myTown == outOfState ? true : drivingTimes[myTownIndex][town] <= Math.round(carSlider.value);
  }

  // Start work on the choropleth map
  // idea from https://www.youtube.com/watch?v=lJgEx_yb4u0&t=23s
  const mapScale = getMapScale(width, height);
  const CT_coords = [-72.7,41.6032];
  const projection = d3.geoMercator()
    .center(CT_coords)
    .scale(mapScale)
    .translate([centerX, centerY]);
  const path = d3.geoPath().projection(projection);

  const pathClassName = 'areapath';
  let areas = container.selectAll('.' + pathClassName)
    .data(topojson.feature(mapData, mapData.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84).features);

  areas = areas
    .enter().append('path')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
    .merge(areas)
      .attr('d', path)
      .attr('class', d => {
        const reachableClass = isReachable(d.properties.NAME10) ?
          ' reachable' : ' unreachable';
        return myName != noPersonName && racesRunMap[myName][d.properties.NAME10] ? 
            pathClassName + ' area alreadyRun' + reachableClass : 
            pathClassName + ' area ' + raceHorizonByTown[d.properties.NAME10].raceType + reachableClass;
      });

  function dragstarted(d) {
    d3.select(this).raise().classed('active', true);
  }

  function dragged(d) {
    d.x = d3.event.x < 0 ?
      0 : 
      d3.event.x >  sliderParameters.width ?
        sliderParameters.width :
        d3.event.x;

    d.value = sliderScale(d.x);

    // note trick: scale(1) before translate to ensure 1-to-1 ratio
    // of pixels dragged and pixels translated
    d3.select(this)
        .attr('transform', 'scale(1) translate('+ d.x + ') scale(' + carScale + ')');

    carLabel.merge(carLabel)
        .attr('x', d.x + 300*sliderParameters.scale)
        .text(d => drivingTimeToString(sliderScale(d.x)));

    carLine.merge(carLine)
      .attr('x', 0)
      .attr('width', d => d.x);

    areas.merge(areas)
        .attr("class", d => {
            const reachableClass = isReachable(d.properties.NAME10) ?
              ' reachable' : ' unreachable';
            return myName != noPersonName && racesRunMap[myName][d.properties.NAME10] ? 
              pathClassName + ' area alreadyRun' + reachableClass : 
              pathClassName + ' area ' + raceHorizonByTown[d.properties.NAME10].raceType + reachableClass;
        });
  }

  function dragended(d) {
    d3.select(this).classed('active', false);
  }
}

export {
  choroplethMap, 
  parseDrivingMap, 
  buildRacesRunMap, 
  parseRaces, 
  getTownNames,
  buildTownIndex,
  buildRaceHorizon,
  buildRacesSoonTables,
  getMapHeight
};

