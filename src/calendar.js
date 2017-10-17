const fmt = d3.format("02");
const parseRace = d => {
  d.Month = +d.Month;
  d.Day = +d.Day;
  d.Weekday = +d.Weekday;
  d.DateString = "2017-" + fmt(d.Month) + "-" + fmt(d.Day);
  return d;
};

const formatCell = d3.format("0");

function calendar(container, props, box) {
  const [racesData] = props.data;

  const nWeeks = 52;
  const nDays = 7;

  const width = box.width,
    height = box.height,
    cellSize = d3.min([width/(nWeeks+10), height/(nDays+8)]);

  
  const color = d3.scaleThreshold()
      .domain([1, 6, 11, 16, 21])
      .range(['#fff', '#ffffb2', "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"]);
  const legendLabels = [null, '1 to 5', '6 to 10', '11 to 15', '16 to 20', 'over 20'];

  const currentYear = 2017;

  // use the "manage only one thing" GUP
  // Calendar group
  const calendarG = container.selectAll('.calendargroup').data([null])
    .enter().append('g')
      .attr('class', 'calendargroup')
      .attr("transform", "translate(" + 
        ((width - cellSize * 53) / 2 - 2*cellSize) + "," + 
        (height - cellSize * 7 - 1)/2 + ")");

  // year label
  calendarG.append("text")
      .attr("class", "yearLabel")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .attr("font-family", "sans-serif")
      .attr("font-size", cellSize*1.8)
      .attr("text-anchor", "middle")
      .text(currentYear);

  // draw the background grid
  // Note: this relies on the top-left corner of this group being (0,0)
  const rect = calendarG.append("g")
      .attr("fill", "none")
    .selectAll("rect")
    .data(d3.timeDays(new Date(currentYear, 0, 1), new Date(currentYear + 1, 0, 1)))
    .enter().append("rect")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", d => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
      .attr("y", d => d.getDay() * cellSize)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .datum(d3.timeFormat("%Y-%m-%d"));

    const data = d3.nest()
        .key(d => d.DateString)
        .rollup(d => { return {"length": d.length, "races": d.map(x => x.Town + " (" + x.Distance + "): " +  x.Name).sort().join("\n")}; })
      .object(racesData);

    const legend = d3.legendColor()
      .labelFormat(d3.format("0"))
      .cells(4)
      .scale(color)
      .orient('vertical')
      .shapeWidth(cellSize)
      .shapeHeight(cellSize)
      .labels(legendLabels)
      .title('Races');

    // fill the rects for each day
    rect.filter(d => d in data)
        .attr("fill", d => color(data[d].length))
        .attr("class", "day_with_race")
      .append("title")
        .text(d => d + ": " + formatCell(data[d].length) + " races\n" +  data[d].races);

    // use the "manage only one thing" version of the General Update Pattern
    const colorLegendG = calendarG.selectAll('.legend').data([null])
      .enter().append('g')
      .attr("transform", "translate(" + (54*cellSize) + "," + (-1*cellSize) + ")");

    colorLegendG.call(legend)
        .attr('class', 'legend');

  calendarG.append("g")
      .attr("id", "monthOutlines")
      .attr("fill", "none")
      .attr("stroke", "#666")
      .attr("stroke-width", "2")
    .selectAll("path")
    .data(d3.timeMonths(new Date(currentYear, 0, 1), new Date(currentYear + 1, 0, 1)))
    .enter().append("path")
      .attr("d", pathMonth);

  // frame for today's date
  const today = d3.timeDay(new Date());
  const todayRect = calendarG.append("rect")
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
  const monthLabels = calendarG.append("g").attr("id", "monthLabels");
  months.forEach((d, i) => {
    monthLabels.append("text")
        .attr("class", "monthLabel")
        .attr("x", monthX[i])
        .attr("y", -10)
        .attr('font-size', cellSize*1.2)
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

