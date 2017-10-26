      const yLabel = "Global Carbon Emissions (10E6 metric tons)"
      const row = d => {
        d.Year = new Date(+d.Year);
        d.Gas = +d.Gas;
        d.Liquids = +d.Liquids;
        d.Solids = +d.Solids;
        d.Cement = +d.Cement;
        d.Flaring = +d.Flaring;
        d.Total = +d.Total;
        d.Capita = 0;
        return d;
      };
      
      // Load and summarize the data.
      d3.csv('dataco2tall.csv', row, data => {
       
        render(data);
      });

      var margin = { top: 0, bottom: 30, left: 80, right: 10 };

      var svg = d3.select('svg');
      var width = +svg.attr('width');
      var height = +svg.attr('height');
      
      var g = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
      var xAxisG = g.append('g')
          .attr('class', 'axis');
      var yAxisG = g.append('g')
          .attr('class', 'axis axis--major axis--y');
      var xAxisMinorG = xAxisG.append('g')
          .attr('class', 'axis axis--minor');
      var xAxisMajorG = xAxisG.append('g')
          .attr('class', 'axis axis--major');
      var marksG = g.append('g');
      
      const keys = ["Gas","Liquids","Solids","Cement","Flaring"];
      
      var stack = d3.stack()
        .keys(keys);

      var xValue = function (d) { return d.Year; };
      var xScale = d3.scaleTime();
      var yScale = d3.scaleLinear();
      var colorScale = d3.scaleOrdinal()
        .range(d3.schemeCategory10);
      


      var xAxisMajor = d3.axisBottom().scale(xScale).tickFormat(d3.format('0'));
      var xAxisMinor = d3.axisBottom().scale(xScale).ticks(30);
      var yAxis = d3.axisLeft().scale(yScale).ticks(10);
      
      var area = d3.area()
        .x(d => xScale(xValue(d.data)))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveBasis);
      
      // Render StreamGraph
      function render(data) {
        const stacked = stack(data)
        
        console.log(keys);
        console.log(stacked);
        
        var innerWidth = width - margin.right - margin.left;
        var innerHeight = height - margin.top - margin.bottom;

        xScale
          .domain(d3.extent(data, xValue))
          .range([0, innerWidth]);

        yScale
          .domain([
            d3.min(stacked, function (series) {
              return d3.min(series, function (d) { return d[0]; });
            }),
            d3.max(stacked, function (series) {
              return d3.max(series, function (d) { return d[1]; });
            })
          ])
          .range([innerHeight, 0]);

        //check y domain and range
        console.log(yScale.domain())
        console.log(yScale.range())

        colorScale.domain(d3.range(keys.length));
        
        var paths = marksG.selectAll('path').data(stacked);
        var pathsEnter = paths
          .enter().append('path');
        pathsEnter.merge(paths)
            .attr('fill', function (d) { return colorScale(d.index); })
            .attr('stroke', function (d) { return colorScale(d.index); })
            .attr('d', area);
        
        paths.select('title')
          .merge(pathsEnter.append('title'))
            .text(function (d) { return d.key; })

        var labels = marksG.selectAll('text').data(stacked)
        labels
          .enter().append('text')
            .attr('class', 'area-label')
          .merge(labels)
            .text(function (d) { return d.key; })
            .attr('transform', d3.areaLabel(area).interpolateResolution(1000));
        console.log(innerHeight)
        //TypeError: cannot read property TickSize of Null       
        xAxisMajor.tickSize(2); 
        xAxisMinor.tickSize(0);
        yAxis.tickSize(-innerWidth); 
        
        xAxisG.attr('transform', `translate(0,${innerHeight})`);
        xAxisMajorG.call(xAxisMajor);
        xAxisMinorG.call(xAxisMinor);
        yAxisG.call(yAxis)
        yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', -innerHeight / 2)
          .attr('y', -60)
          .attr('transform', `rotate(-90)`)
          .style('text-anchor', 'middle')
          .text(yLabel);
;
      }