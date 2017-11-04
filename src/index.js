import stacked_area from './stacked_area'
import issue_barChart from './issue_barChart'

const xValue = d => "issues";
const xLabel = 'Issue';
const yValue = "prod_count";
const yLabel = 'Complaint Count';
const colorValue = 'product';
const colorLabel = 'Products';
const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const svg = visualization.select('svg');

const parseDate = d3.timeFormat("%Y-%m-%d");

const row = d => {
  d.date = new Date(d.date);
  d.product = d.product;
  d.issues = d.issues;
  d.prod_count = +d.prod_count;

  return d;
};

d3.csv('data/cfpb_complaints3.csv', row, data => {

  var data1 = d3.nest()
      .key(function(d) {return parseDate(d.date);})
      .key(function(d) {return d.product;})
      .rollup(function(v) {return {"prod_count": d3.sum(v,function(d) {return d.count;})}})
      .entries(data);

  var data2 = d3.nest()
    .key(function(d) {return d.issues;})
    .key(function(d){return d.product;})
    .rollup(function(v) {return  d3.sum(v,function(d) {return d.count;})})
    .entries(data)
    .map(function(group){
      return {
        issue: group.key,
        product: group.values,
      }
    });


  //console.log(data1)
  //console.log(data2)

  const render = () => {


    // Extract the width and height that was computed by CSS.
    svg
      .attr('width', visualizationDiv.clientWidth)
      .attr('height', visualizationDiv.clientHeight);

    // Render the scatter plot.
    // stacked_area(svg, {
    //   data1,
    //   xValue,
    //   xLabel,
    //   yValue,
    //   yLabel,
    //   colorValue,
    //   colorLabel,
    //   margin
    // });

    issue_barChart(svg, {
      data2,
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
