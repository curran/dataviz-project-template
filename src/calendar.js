const fmt = d3.format("02");
const parseRace = d => {
  d.Month = +d.Month;
  d.Day = +d.Day;
  d.Weekday = +d.Weekday;
  d.DateString = "2017-" + fmt(d.Month) + "-" + fmt(d.Day);
  return d;
};

const formatCell = d3.format("0");

function calendar(props, box, name) {
  const [racesData] = props.data;

  const width = 960,
    height = 136 + 100,
    cellSize = 17;

const color = d3.scaleLinear()
    .domain([1, 10, 25, 31])
    .range(["#dee", "#699", "#366", "#000"])
    .interpolate(d3.interpolateHcl);

const svg = d3.select("body")
  .selectAll("svg")
  .data(d3.range(2017, 2018))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("class", "yearLabel")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .attr("font-family", "sans-serif")
    .attr("font-size", 20)
    .attr("text-anchor", "middle")
    .text(d => d);

// draw the background grid
const rect = svg.append("g")
    .attr("fill", "none")
  .selectAll("rect")
  .data(d => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
  .enter().append("rect")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
    .attr("y", d => d.getDay() * cellSize)
    .attr("stroke", "#ccc")
    .attr("stroke-width", 1)
    .datum(d3.timeFormat("%Y-%m-%d"));

d3.csv("races2017.csv", parseRace, csv => {

  const data = d3.nest()
      .key(d => d.DateString)
      .rollup(d => { return {"length": d.length, "races": d.map(x => x.Town + " (" + x.Distance + "): " +  x.Name).sort().join("\n")}; })
    .object(csv);

  const legend = d3.legendColor()
    .labelFormat(d3.format("0"))
    .cells(7)
    .scale(color)
    .orient("horizontal")
    .shapeWidth(30)
    .shapeHeight(20)
    .title("Number of races");

  rect.filter(d => d in data)
      .attr("fill", d => color(data[d].length))
      .attr("class", "day_with_race")
    .append("title")
      .text(d => d + ": " + formatCell(data[d].length) + " races\n" +  data[d].races);

  svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(20,-90)");

  svg.select(".legend")
    .call(legend);
});

svg.append("g")
    .attr("id", "monthOutlines")
    .attr("fill", "none")
    .attr("stroke", "#666")
    .attr("stroke-width", "2")
  .selectAll("path")
  .data(d => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
  .enter().append("path")
    .attr("d", pathMonth);

// frame for today's date
const today = d3.timeDay(new Date());
const todayRect = svg.append("rect")
    .attr("fill", "none")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", d3.timeWeek.count(d3.timeYear(today), today)*cellSize)
    .attr("y", today.getDay() * cellSize)
    .attr("stroke", "darkred")
    .attr("stroke-width", 3);


// ideas for month/day labels:
// https://bl.ocks.org/alansmithy/6fd2625d3ba2b6c9ad48

// get bounding box for each month outline
const mp = document.getElementById("monthOutlines").childNodes;
const BB = Object.values(mp).map(d => d.getBBox());
const monthX = BB.map(d => d.x + d.width/2);
// add the labels
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthLabels = svg.append("g").attr("id", "monthLabels");
months.forEach((d, i) => {
  monthLabels.append("text")
      .attr("class", "monthLabel")
      .attr("x", monthX[i])
      .attr("y", -10)
      .text(d);
});

function pathMonth(t0) {
  const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}


}

export { calendar, parseRace };

