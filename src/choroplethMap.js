/***** parsing code for choropleth *********/

const drivingTimesMap = {};
const buildDrivingMap = row => {
  drivingTimesMap[row.Town] = {};
  drivingTimesMap[row.Town].time = +row.DrivingTime;
  const hours = Math.floor(+row.DrivingTime/60);
  const mins = +row.DrivingTime - 60*hours;
  if(hours > 0) {
    drivingTimesMap[row.Town].timeString = hours + "h " + mins + " min";
  } else {
    drivingTimesMap[row.Town].timeString = mins + " min";
  }
  if(!(row.Town in raceHorizonByTown)) {
    raceHorizonByTown[row.Town] = { 'daysToRace': 400, 'raceType': ""};
  }
  return row;
};

const racesRunMap = {};
const buildRacesRunMap = row => {
  racesRunMap[row.Town] = {};
  racesRunMap[row.Town].distance = row.Distance;
  return row;
};

const today = d3.timeDay(new Date());
const racesSoonByTown = {};
const raceHorizonByTown = {};
const fmt = d3.format("02");
const parseRaces = row => {
  row.Month = +row.Month;
  row.Day = +row.Day;
  row.Weekday = +row.Weekday;
  row.DateString = fmt(row.Month) + "/" + fmt(row.Day);
  row.raceDay = d3.timeDay(new Date(2017, row.Month-1, row.Day));
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
    const raceType = daysToRace <= 7 ? "hasRaceVerySoon" : "hasRaceSoon"; 
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
  return row;
};

  const tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(d => "<span class='townname'>" + d.properties.NAME10 + ":</span> <span>"
          + drivingTimesMap[d.properties.NAME10].timeString
          + " driving</span>" 
          + "<span>" 
          + (d.properties.NAME10 in racesSoonByTown ?
            racesSoonByTown[d.properties.NAME10]
            : "")
          + "</span>"
          );

d3.selectAll('svg').call(tip);

function choroplethMap(container, props, box) {
  const [
    mapData,
    drivingTimes,
    racesRun,
    races
  ] = props.data;


  function getMapScale(width, height) {
    // known size of CT image for given scale
    const baseScale = 12000;
    const baseWidth = 453;
    const baseHeight = 379;

    const scale1 = baseScale*width/baseWidth;
    const scale2 = baseScale*height/baseHeight;
    return d3.min([scale1, scale2]);
  }

  function completeTooltipTables() {
    Object.keys(racesSoonByTown).forEach(
        key => { racesSoonByTown[key] += "</table>"; }
    );
  }

  completeTooltipTables();

  const colorScale = d3.scaleOrdinal()
    .domain(["Race within 1 week", "Race within 2 weeks", "Town already run"])
    .range(["#f03b20", "#feb24c", "#16a"]);
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
      .attr('d', path)
      .attr('class', d =>
          d.properties.NAME10 in racesRunMap ? 
            pathClassName + " area alreadyRun" : 
            pathClassName + " area " + raceHorizonByTown[d.properties.NAME10].raceType
      )
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .merge(areas)
      .attr('d', path);
}

export { choroplethMap, buildDrivingMap, buildRacesRunMap, parseRaces };
