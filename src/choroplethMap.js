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
  const mins = drivingTimeMins - 60*hours;
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
          row["Date/Time"] + 
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

  // TODO: fix if town is 'Out of State'
  const myTownIndex = townIndex[myTown];

  completeTooltipTables(racesSoonByTown);

  const colorScale = d3.scaleOrdinal()
    .domain(["Race within 1 week", "Race within 2 weeks", "Town already run"])
    .range(["#f03b20", "#feb24c", "#16a"]);
  // TODO: have legend scale with plot
  const colorLegend = d3.legendColor()
    .scale(colorScale)
    .shapeWidth(40)
    .shapeHeight(20);

  // use the "manage only one thing" version of the General Update Pattern
  const colorLegendG = container.selectAll(".color-legend").data([null])
    .enter().append('g')
    .attr("transform",`translate(10,10)`);
  colorLegendG.call(colorLegend)
    .attr("class", "color-legend");

  // Extract the width and height that was computed by CSS.
  const width = box.width;
  const height = box.height;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const centerX = width/2;
  const centerY = height/2;

  tip
    .html(d => '<span class="townname">' + d.properties.NAME10 + '</span>'
        + (myTown == 'Out of State' ? '' :
          '<br><span>' + drivingTimeToString(drivingTimes[myTownIndex][d.properties.NAME10])
        + ' driving</span>')
        + '<span>' 
        + (d.properties.NAME10 in racesSoonByTown ?
          racesSoonByTown[d.properties.NAME10]
          : '')
        + '</span>'
    );


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
  const areas = container.selectAll('.' + pathClassName)
    .data(topojson.feature(mapData, mapData.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84).features);

  areas
    .enter()
    .append('path')
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .merge(areas)
      .attr('class', d =>
          racesRunMap[myName][d.properties.NAME10] ? 
            pathClassName + " area alreadyRun" : 
            pathClassName + " area " + raceHorizonByTown[d.properties.NAME10].raceType
      )
      .attr('d', path);
}

export {
  choroplethMap, 
  parseDrivingMap, 
  buildRacesRunMap, 
  parseRaces, 
  getTownNames,
  buildTownIndex,
  buildRaceHorizon,
  buildRacesSoonTables
};

