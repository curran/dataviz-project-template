import scatterPlot from './scatterPlot'
import choroplethMap from './choroplethMap'

const xValue = d => d.sepalLength;
const xLabel = 'Sepal Length';
const yValue = d => d.petalLength;
const yLabel = 'Petal Length';
const colorValue = d => d.species;
const colorLabel = 'Species';
const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const svg = visualization.select('svg');

const row = d => {
  d.petalLength = +d.petalLength;
  d.petalWidth = +d.petalWidth;
  d.sepalLength = +d.sepalLength;
  d.sepalWidth = +d.sepalWidth;
  return d;
};

function dataLoaded(error, data, mapData, drivingTimes, racesRun, races) {

  const render = () => {

    // Extract the width and height that was computed by CSS.
    svg
      .attr('width', visualizationDiv.clientWidth)
      .attr('height', visualizationDiv.clientHeight);

    // Render the scatter plot.
    scatterPlot(svg, {
      data,
      xValue,
      xLabel,
      yValue,
      yLabel,
      colorValue,
      colorLabel,
      margin
    });
  }

  // Draw for the first time to initialize.
  render();

  // Redraw based on the new size whenever the browser window is resized.
  window.addEventListener('resize', render);
}

d3.queue()
  .defer(d3.csv, "data/iris.csv", row)
  .defer(d3.json, "data/ct_towns_simplified.topojson")
  .defer(d3.csv, "data/driving_times_from_avon.csv")//, build_driving_map)
  .defer(d3.csv, "data/towns_run.csv")//, build_races_run_map)
  .defer(d3.csv, "data/races2017.csv")//, parseRaces)
  .await(dataLoaded);


