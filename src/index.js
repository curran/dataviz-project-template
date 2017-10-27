import {
  choroplethMap,
  parseDrivingMap,
  buildRacesRunMap,
  parseRaces as parseRacesForMap,
  getTownNames,
  buildTownIndex,
  buildRaceHorizon,
  buildRacesSoonTables
} from './choroplethMap'

import {
  calendar,
  parseRace as parseRacesForCalendar
} from './calendar.js'

const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const svg = visualization.select('svg');

const functions = {
  calendar: calendar,
  map: choroplethMap,
  selector: () => {},
  drivingTimesFilter: () => {}
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
  let g = svg.selectAll('.' + name).data([null]);
  const gEnter = g.enter().append('g').attr('class', name);
  g = gEnter.merge(g)
      .attr('transform', 'translate(' + x + ',' + y + ')');

  /*
  // Draw a box (will remove this later)
  const rect = g.selectAll('.boxFrame').data([null]);
  rect
    .enter().append('rect')
      .attr('class', 'boxFrame')
      .attr('fill', 'none')
      .attr('stroke', '#666')
    .merge(rect)
      .attr('width', width)
      .attr('height', height);
  */
  // call the specific renderer
  functions[name](g, props[name], box);
};


const layout = {
  orientation: "vertical",
  children: [
    "calendar",
    {
      orientation: "horizontal",
      children: [
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


function dataLoaded(error, mapData, drivingTimes, membersTowns, racesForMap, racesForCalendar) {

  const outOfState = 'Out of State';
  const noPersonName = 'noPersonName';

  const townNames = getTownNames(drivingTimes);
  const townIndex = buildTownIndex(townNames);
  const { racesRunMap, memberTownsMap } = buildRacesRunMap(membersTowns, townNames);
  const raceHorizonByTown = buildRaceHorizon(racesForMap, townNames);
  const racesSoonByTown = buildRacesSoonTables(racesForMap);

  const memberNames = [];
  membersTowns.sort((x, y) => d3.ascending(x.Name, y.Name)).forEach((row, i) => {
    memberNames.push({ 
      title: row.Name,
      description: row.Town + ' - ' + row.TotalTowns + ' towns'
    });
  });

  // defaults
  let myName = noPersonName;
  let myTown = outOfState;

  function setPersonAndTownName(params) {
    if(params == undefined) return;
    if('personName' in params) {
      // if a person is provided, override the town selection
      myName = params.personName;
      myTown = memberTownsMap[myName];
      // also set the town selector to the town to avoid confusion
      $('#townSearch').search('set value', myTown);
    } else if('townName' in params) {
      myTown = params.townName;
    }
  }

  const render = (params) => {
    const defaultName = memberNames[0].title;

    setPersonAndTownName(params);

    const props = {
      calendar: {
        data: [
          racesForCalendar
        ],
        margin: margin
      },
      map: {
        data: [
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
        ],
        margin: margin
      }
    };

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

  $('#personSearch').search({
    source: memberNames,
    maxResults: 12,
    searchFields: [
      'title'
    ],
    searchFullText: false,
    onSelect: (result, response) => {
      // hack to prevent inconsistent display when result is selected
      // after entering a partial match
      $('#searchPersonText').val(result.title);
      if(result.title != '') render({ personName: result.title });
    }
  });

  $('#townSearch').search({
    source: [outOfState].concat(townNames).map(d => ({title: d})),
    maxResults: 12,
    searchFields: [ 'title' ],
    searchFullText: false,
    onSelect: (result, response) => {
      $('#searchTownText').val(result.title);
      if(result.title != '') render({townName: result.title});
    }
  });

}

d3.queue()
  .defer(d3.json, 'data/ct_towns_simplified.topojson')
  .defer(d3.csv, 'data/driving_times_full_symmetric.csv', parseDrivingMap)
  .defer(d3.csv, 'data/members_towns_clean.csv')
  .defer(d3.csv, 'data/races2017.csv', parseRacesForMap)
  .defer(d3.csv, 'data/races2017.csv', parseRacesForCalendar)
  .await(dataLoaded);


