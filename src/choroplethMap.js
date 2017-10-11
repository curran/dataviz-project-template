export default function (svg, props) {

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

  const chartDiv = document.getElementById("chart");
  const colorScale = d3.scaleOrdinal()
    .domain(["Race within 1 week", "Race within 2 weeks", "Town already run"])
    .range(["#f03b20", "#feb24c", "#16a"]);
  const colorLegend = d3.legendColor()
    .scale(colorScale)
    .shapeWidth(40)
    .shapeHeight(20);

  const colorLegendG = svg.append("g")
    .attr("transform",`translate(10,10)`);
  colorLegendG.call(colorLegend)
    .attr("class", "color-legend");

  function getMapScale(width, height) {
    // known size of CT image for given scale
    const baseScale = 12000;
    const baseWidth = 453;
    const baseHeight = 379;

    const scale1 = baseScale*width/baseWidth;
    const scale2 = baseScale*height/baseHeight;
    return d3.min([scale1, scale2]);
  }

  const drivingTimesMap = {};
  build_driving_map = row => {
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
  build_races_run_map = row => {
    racesRunMap[row.Town] = {};
    racesRunMap[row.Town].distance = row.Distance;
    return row;
  };

  const today = d3.timeDay(new Date());
  const racesSoonByTown = {};
  const raceHorizonByTown = {};
  fmt = d3.format("02");
  parseRaces = row => {
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

  function completeTooltipTables() {
    Object.keys(racesSoonByTown).forEach(
        key => { racesSoonByTown[key] += "</table>"; }
    );
  }

  svg.call(tip);

  function dataLoaded(error, mapData, drivingTimes, racesRun, races) {
    completeTooltipTables();
    function redraw(){

      // Extract the width and height that was computed by CSS.
      const width = chartDiv.clientWidth;
      const height = chartDiv.clientHeight;
      const centerX = width/2;
      const centerY = height/2;

      // Use the extracted size to set the size of an SVG element.
      svg
        .attr("width", width)
        .attr("height", height);

      // Start work on the choropleth map
      // idea from https://www.youtube.com/watch?v=lJgEx_yb4u0&t=23s
      const mapScale = getMapScale(width, height);
      const CT_coords = [-72.7,41.6032];
      const projection = d3.geoMercator()
        .center(CT_coords)
        .scale(mapScale)
        .translate([centerX, centerY]);
      const path = d3.geoPath().projection(projection);

      const group = svg.selectAll(".path")
        .data(topojson.feature(mapData, mapData.objects.townct_37800_0000_2010_s100_census_1_shp_wgs84).features);

      const areas = group
        .enter()
        .append("g").attr("class", "path").append("path")
          .attr("d", path)
          .attr("class", d => 
              d.properties.NAME10 in racesRunMap ? 
                "area alreadyRun" : 
                "area " + raceHorizonByTown[d.properties.NAME10].raceType
               )
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

      areas.merge(group).selectAll("path")
          .attr("d", path);
    }

    // Draw for the first time to initialize.
    redraw();

    // Redraw based on the new size whenever the browser window is resized.
    window.addEventListener("resize", redraw);
  }

  d3.queue()
    .defer(d3.json, "ct_towns_simplified.topojson")
    .defer(d3.csv, "driving_times_from_avon.csv", build_driving_map)
    .defer(d3.csv, "towns_run.csv", build_races_run_map)
    .defer(d3.csv, "races2017.csv", parseRaces)
    .await(dataLoaded);

}
