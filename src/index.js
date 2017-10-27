import stacked_area from './stacked_area'

const xValue = d => d.date;
const xLabel = 'Time';
const yValue = d => d.prod_count;
const yLabel = 'Complaint Count';
const colorValue = d => d.product;
const colorLabel = 'product';
const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const svg = visualization.select('svg');

const parseDate = d3.timeFormat("%Y-%m-%d");

const row = d => {
d.date = new Date(d.date);
d.product = d.product;
d.prod_count = +d.prod_count;
return d;
};

d3.csv('data/cfpb_complaints2.csv', row, data => {

  data = d3.nest()
      .key(function(d) {return parseDate(d.date);})
      .key(function(d) {return d.product;})
      .rollup(function(v) {return {"prod_count": d3.sum(v,function(d) {return d.count;})}})
      .entries(data);

      console.log(data)

  const render = () => {


    // Extract the width and height that was computed by CSS.
    svg
      .attr('width', visualizationDiv.clientWidth)
      .attr('height', visualizationDiv.clientHeight);

    // Render the scatter plot.
    stacked_area(svg, {
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
  //window.addEventListener('resize', render);
});
