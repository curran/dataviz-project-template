export default function (svg, props) {
  const {
    mapData,
    drivingTimes,
    racesRun,
    races,
    racesRunMap,
    drivingTimesMap,
    racesSoonByTown,
    raceHorizonByTown,
    margin
  } = props;

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

  svg.call(tip);

  completeTooltipTables();

  // Extract the width and height that was computed by CSS.
  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

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

