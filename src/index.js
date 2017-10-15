import { choroplethMap, build_driving_map, build_races_run_map, parseRaces } from './choroplethMap'

const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const svg = visualization.select('svg');

const functions = {
  calendar: choroplethMap,
  map: choroplethMap,
  selector: choroplethMap,
  drivingTimesFilter: choroplethMap
}

function drawBox(name, box, functions, props) {
  // From sample code
  // https://bl.ocks.org/curran/ad6d4eaa6cf39bf58769697307ec5f3a
  const x = box.x;
  const y = box.y;
  const width = box.width;
  const height = box.height;

  // set up a group for this box
  // this is the "managing one thing" version of the General Update Pattern
  const g = svg.selectAll('.' + name).data([null]);
  const gEnter = g.enter().append('g').attr('class', name);
  gEnter.merge(g)
      .attr('transform', 'translate(' + x + ',' + y + ')');

  // Draw a box (will remove this later)
  gEnter
    .append('rect')
      .attr('fill', 'none')
      .attr('stroke', '#666')
    .merge(g.select('rect'))
      .attr('width', width)
      .attr('height', height);
  // call the specific renderer
  functions[name](props[name], box, name);
};


const layout = {
  orientation: "vertical",
  children: [
    "calendar",
    {
      orientation: "horizontal",
      children: [
        "selector",
        "drivingTimesFilter",
        "map"
      ],
      size: 3
    }
  ]
};

const sizes = {
  calendar: {
    size: 1
  },
  map: {
    size: 2
  }
};


function dataLoaded(error, mapData, drivingTimes, racesRun, races) {
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

  const props = {
    calendar: {
      data: [
        mapData,
        drivingTimes,
        racesRun,
        races
      ],
      margin: margin
    },
    map: {
      data: [
        mapData,
        drivingTimes,
        racesRun,
        races
      ],
      margin: margin
    },
    selector: {
      data: [
        mapData,
        drivingTimes,
        racesRun,
        races
      ],
      margin: margin
    },
    drivingTimesFilter: {
      data: [
        mapData,
        drivingTimes,
        racesRun,
        races
      ],
      margin: margin
    }
  };




  const render = () => {
    // Extract the width and height that was computed by CSS.
    const width = visualizationDiv.clientWidth;
    const height = visualizationDiv.clientHeight;
    svg
      .attr('width', width)
      .attr('height', height);

    const box = {
      width: width,
      height: height
    };

    const boxes = d3.boxes(layout, sizes, box);

    // Render the choropleth map.
    Object.keys(boxes).forEach( name => { drawBox(name, boxes[name], functions, props); } );

  }

  // Draw for the first time to initialize.
  render();

  // Redraw based on the new size whenever the browser window is resized.
  window.addEventListener('resize', render);
}

d3.queue()
  .defer(d3.json, "data/ct_towns_simplified.topojson")
  .defer(d3.csv, "data/driving_times_from_avon.csv", build_driving_map)
  .defer(d3.csv, "data/towns_run.csv", build_races_run_map)
  .defer(d3.csv, "data/races2017.csv", parseRaces)
  .await(dataLoaded);


