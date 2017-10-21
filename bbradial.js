

      const xValue = d => d.dteday;
      const xLabel = 'Date';
      const y1Value = d => d.registered;
      const y2Value = d => d.casual;
      const y3Value = d => d.atemp;
      const yLabel = 'Bike Share Users';
      const yLabelRight = 'Apparent Temperature';
      const margin = { left: 202, right: 60, top: 30, bottom: 60 };

      const svg = d3.select('svg');
      const width = svg.attr('width');
      const height = svg.attr('height');
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      yAxis2Position = innerWidth

// translate origin to center of inner svg
      const g = svg.append('g')
          .attr('transform', `translate(${innerWidth/2+margin.left},${innerHeight/2+margin.top})`);


//draw ticklines
			let yScaleMax = innerHeight/2;
      let xTickLength = yScaleMax *1.05;
      let numXTicks =24;
      let numYTicks =4;


      let yTicks =  [.25,.5,.75,1]; //place y tick marks at 25%, 50%, 75% 100% of yScaleMax



      const drawYTicks = function(yScaleMax, numYTicks) {
        for (i=0; i<numYTicks; i++){
          g.append('circle')
        		.attr('cx',0)
        		.attr('cy',0)
            .attr('fill', 'none')
            .attr('stroke', 'lightgrey')
            .attr('stroke-width', 1)
            .attr('r', yScaleMax * (i+1)/numYTicks)
        };
      };

      const drawXTicks = function (numXTicks){

        const tickEndPoint = function(angle,radius){
          x = radius * Math.cos(angle)
          y = radius * Math.sin(angle)
          return [x,y]};

        const tickAngles = function(numberOfTicks){
            let tickAngles = []
            for(i=0; i<numberOfTicks; i++){
              angle = Math.PI *2 * i/numberOfTicks
              tickAngles.push(angle)        }
            return tickAngles};

        const tickCoordinates = function(numberOfTicks,tickRadius){
            let tickAngle = tickAngles(numberOfTicks)
            let xTickArray =[]
            for (i = 0; i <tickAngle.length; i++){
              xy = tickEndPoint(tickAngle[i],tickRadius)
              xTickArray.push(xy)
            }
            return xTickArray
           };

        let t = tickAngles(numXTicks);

        let xTickArray = tickCoordinates (numTicks,xTickLength);

        for (i in xTickArray){
          g.append('line')
        		.attr('x1',0)
        		.attr('y1',0)
            .attr('x2',xTickArray[i][0])
        		.attr('y2',xTickArray[i][1])
            .attr('fill', 'none')
            .attr('stroke', 'lightgrey')
            .attr('stroke-width', 1);

          g.append('text')
          	.attr('class', "tick text")
          	.text("xtick")
            .attr('text-anchor', 'middle')
            .attr("x", xTickArray[i][0])
            .attr("y",xTickArray[i][1])
        .attr('transform',`rotate(${90+(t[i])*360/(2*Math.PI)},${xTickArray[i][0]},${xTickArray[i][1]})`)
            .attr('font-family', 'sans-serif')
            .attr('fill',"grey")
          	.attr('font-size', 11)
            .text(`${i/numTicks*2400}`)
        };
      }


      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('x', +innerHeight / 4+5)
          .attr('y', -5)
          .attr('transform', `rotate(0)`)
          .style('text-anchor', 'middle')
          .text(yLabel);

      const xScale = d3.scaleTime();
      const yScaleLeft = d3.scaleLinear();

      const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickPadding(15)
        .ticks(12)
      	.tickFormat(d3.timeFormat("%Y-%m-%d"))
        .tickSize(-innerHeight);

      const yTicksLeft = 5;
      const yAxisLeft = d3.axisLeft()
        .scale(yScaleLeft)
        .ticks(yTicksLeft)
        .tickPadding(15)
        .tickSize(3);



      function deltaDays(date1, date2){
        const dayms = 1000 * 60 * 60 * 24;
        var date1ms = date1.geTime();
        var date2ms = date2.getTime();
        var deltams = date1ms-date2ms
        return (deltams/dayms)
        };

      const maxUser = {Total:1000, Casual:350,  Registered:1000}
      const colorUser = {Total:"grey", Casual:"red",  Registered:"green"}

      const minDate = new Date(2012,1,1)
      const centerOffset = innerHeight/2;
      const radialOffset = .25*Math.PI
      //getting a
      //const days = d => deltaDays(d.dteday,minDate);
      //days calc is a hack since pi is a periodic function
      //calculating days since 1/1/1970 and dividing by 365 gets data on the screen..
      const days = d =>(d.dteday.getTime()/(1000*60*60*24))
      const angleHours = d => (d.hr/24 *Math.PI*2+ radialOffset);
      const radialScale = d => (innerHeight/2* d.cnt/maxUser.Total);
      const radialScale2 = d => (innerHeight/2* d.casual/maxUser.Casual);
      const radialScale1 = d => (innerHeight/2* d.registered/maxUser.Registered);
      var plotColor = colorUser.Registered

      const radialPath = d3.lineRadial()
        .angle(d => angleHours(d))
        .radius(d => radialScale(d))
        .curve(d3.curveLinear);

    	//from https://bl.ocks.org/pstuffa/d5934843ee3a7d2cc8406de64e6e4ea5
      const colorScale = d => d3.scaleSequential(d3.interpolateInferno)

      var parseTime = d3.timeParse("%Y-$m-%d");

      const row = d => {
        d.dteday = new Date(d.dteday);
        d.season = +d.season;
        d.yr = +d.yr;
        d.mnth = +d.mnth;
        d.holiday = +d.holiday;
        d.weekday = +d.weekday;
        d.workingday = +d.workingday;
        d.weathersit = +d.weathersit;
        d.temp = +d.temp;
        d.atemp = +d.atemp;
        d.hum = +d.hum;
        d.windspeed = +d.windspeed;
        d.casual = +d.casual;
        d.registered = +d.registered;
        d.cnt = +d.cnt;
        return d;
      };


			var radialAxis1 = [1000,2000,3000,4000,5000,6000,7000,8000];
      var radialAxis2 ;

      d3.csv('hour.csv', row, data => {

       console.log(data)



        g.append('path')
        		.data(data)
            .attr('fill', 'none')
            .attr('stroke', plotColor)
            .attr('stroke-opacity', 0.7)
            .attr('stroke-width', .1)
            .attr('d', radialPath(data));




      });
    </script>
  </body>
</html>
