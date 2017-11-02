 var vizDiv = document.getElementById("viz");
    
    // This stateless component renders a static "wheel" made of circles,
    // and rotates it depending on the value of props.angle.
    var wheel = d3.component("g")
      .create(function (selection){
        var minRadius = 4,
            maxRadius = 10,
            numDots = 10,
            wheelRadius = 40,
            rotation = 0,
            rotationIncrement = 3, 
            radius = d3.scaleLinear()
              .domain([0, numDots - 1])
              .range([maxRadius, minRadius]),
            angle = d3.scaleLinear()
              .domain([0, numDots])
              .range([0, Math.PI * 2]);
        selection
          .selectAll("circle").data(d3.range(numDots))
          .enter().append("circle")
            .attr("cx", function (d){ return Math.sin(angle(d)) * wheelRadius; })
            .attr("cy", function (d){ return Math.cos(angle(d)) * wheelRadius; })
            .attr("r", radius);
      })
      .render(function (selection, d){
        selection.attr("transform", "rotate(" + d + ")");
      });
    
    // This component with a local timer makes the wheel spin.
    var spinner = (function (){
      var timer = d3.local();
      return d3.component("g")
        .create(function (selection, d){
          timer.set(selection.node(), d3.timer(function (elapsed){
            selection.call(wheel, elapsed * d.speed);
          }));
        })
        .render(function (selection, d){
          selection.attr("transform", "translate(" + d.x + "," + d.y + ")");
        })
        .destroy(function(selection, d){
          timer.get(selection.node()).stop();
        	return selection
          		.attr("fill-opacity", 1)
          	.transition().duration(3000)
          		.attr("transform", "translate(" + d.x + "," + d.y + ") scale(10)")
          		.attr("fill-opacity", 0);
        });
    }());
    
    var axis = (function (){
      var axisLocal = d3.local();
      return d3.component("g")
      	.create(function (selection, d){
        	axisLocal.set(selection.node(), d3["axis" + d.type]());
          selection
            	.attr("opacity", 0)
              .call(axisLocal.get(selection.node())
                .scale(d.scale)
                .ticks(d.ticks || 10))
            .transition("opacity").duration(2000)
          	  .attr("opacity", 0.8);
        })
      	.render(function (selection, d){
        	selection
              .attr("transform", "translate(" + [
            		d.translateX || 0,
            		d.translateY || 0
          		] + ")")
            .transition("ticks").duration(3000)
          		.call(axisLocal.get(selection.node()));
        });
    }());
    
    // This component displays the visualization.
    var scatterPlot = (function (){
      var xScale = d3.scaleLinear(),
          yScale = d3.scaleLinear(),
          colorScale = d3.scaleOrdinal()
      			.range(d3.schemeCategory10),
          radiusScale = d3.scaleSqrt(); // add new scale for circle


      function render(selection, d){
        var x = d.x,
            y = d.y,
            color = d.color,
            margin = d.margin,
            innerWidth = d.width - margin.left - margin.right,
            innerHeight = d.height - margin.top - margin.bottom,
            radius = d.radius,
            minRadius = 1,
            maxRadius = 15;
            
            
        xScale
        	.domain(d3.extent(d.data, function (d){ return d[x]; }))
        	.range([0, innerWidth]);
        yScale
        	.domain(d3.extent(d.data, function (d){ return d[y]; }))
        	.range([innerHeight, 0]);
        colorScale
        	.domain(d3.extent(d.data, function (d){ return d[color]; }));
        radiusScale
          .range([1,10])
          .domain(d3.extent(d.data, function (d){ return d[radius]; }));
        
        
        selection
        		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        		.call(axis, [
              {
                type: "Left",
                scale: yScale,
                translateX: -12
              },
              {
                type: "Bottom",
                scale: xScale,
                translateY: innerHeight + 12,
                ticks: 20
              }
            ])
        
        var circles = selection.selectAll(".point").data(d.data);
        circles.exit().remove();
        circles
          .enter().append("circle")
        		.attr("class", "point")
            .attr("r", 0)
            .attr("cx", d.width / 2 - margin.left)
            .attr("cy", d.height / 2 - margin.top)
          .merge(circles)
            .on("mouseover", d.show)
            .on("mouseout", d.hide)
          .transition()
          	.duration(2000)
        		.delay(function (d, i){ return i * 5; })
            .attr("r", function (d){ return radiusScale(d[radius]); })
            .attr("cx", function (d){ return xScale(d[x]); })
            .attr("cy", function (d){ return yScale(d[y]); })
        		.attr("color", function (d){ return colorScale(d[color]); })
      }
      return d3.component("g")
        .render(render);
    }());
    
    // Leverage the d3-tip library for tooltips.
    var tooltip = (function (){
      var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0]);
      return function (svgSelection, state){
        
        // Wish we could use D3 here for DOM manipulation..
        tip.html(function(d) {
          return [
            "<h4>" + d.Player + " (" + d.Team + ")" + "</h4>",
            "<div><strong>" + state.x + ": </strong>",
            "<span>" + d[state.x] + "</span></div>",
            "<div><strong>" + state.y + ": </strong>",
            "<span>" + d[state.y] + "</span></div>",
            "<div><strong>" + state.color + ": </strong>",
            "<span>" + d[state.color] + "</span></div>",
            "<div><strong>" + state.radius + ": </strong>",
            "<span>" + d[state.radius] + "</span></div>"
          ].join("");
        });
        svgSelection.call(tip);
        return {
          show: tip.show,
          hide: tip.hide
        };
      }
    }());
    
    // ---------------------------------------------------------------
    
    // This component manages an svg element, and
    // either displays a spinner or text,
    // depending on the value of the `loading` state.
    var svg = d3.component("svg")
      .render(function (selection, d){
        var svgSelection = selection
        		.attr("width", d.width)
        		.attr("height", d.height)
            .call(spinner, !d.loading ? [] : {
              x: d.width / 2,
              y: d.height / 2,
              speed: 0.2
            });
        var tipCallbacks = tooltip(svgSelection, d);
        svgSelection
            .call(scatterPlot, d.loading ? [] : d, tipCallbacks);
      });
    
    var label = d3.component("label", "col-sm-2 col-form-label")
    	.render(function (selection, d){
        selection.text(d);
      });
    
    var option = d3.component("option")
    	.render(function (selection, d){
        selection.text(d);
      });
    
    var select = d3.component("select", "form-control")
    	.render(function (selection, d){
        selection
          	.call(option, d.columns)
        		.property("value", d.value)
        		.on("change", function (){
              d.action(this.value);
            })
      });
    
    var rowComponent = d3.component("div", "row");
    var colSm10 = d3.component("div", "col-sm-10");
    var menu = d3.component("div", "col-sm-4")
    	.render(function (selection, d){
        var row = rowComponent(selection).call(label, d.label);
        colSm10(row).call(select, d);
      });
    
    var menus = d3.component("div", "container-fluid")
    	.create(function (selection){
        selection.style("opacity", 0);
      })
    	.render(function (selection, d){
        rowComponent(selection).call(menu, [
          {
            label: "X",
            value: d.x,
            action: d.setX,
            columns: d.numericColumns
          },
          {
            label: "Y",
            value: d.y,
            action: d.setY,
            columns: d.numericColumns
          },
          {
            label: "Color",
            value: d.color,
            action: d.setColor,
            columns: d.ordinalColumns
          },
          {
            label: "Radius",
            value: d.radius,
            action: d.setRadius,
            columns: d.numericColumns
          }
        ], d);
        if(!d.loading && selection.style("opacity") === "0"){
          selection.transition().duration(2000)
          		.style("opacity", 1);
        }
      });
    
    var app = d3.component("div")
    	.render(function (selection, d){
        selection.call(menus, d).call(svg, d);
      });
    
    function loadData(actions){
      var numericColumns = [
            "Games Played",
            "Win Percentage", 
            "Average Scoreboard Position", 
            "Shooting Percentage", 
            "Goal Participation", 
            "Misc Score Per Game", 
            "Number of Wins",
        		"Score Per Game",
            "Goals Per Game",
            "Assists Per Game",
            "Saves Per Game",
            "Shots Per Game",
            "MVPs Per Game",
        		"Percent of Team's Score",
        		"Percent of Team's Assists",
        		"Percent of Team's Saves",
        		"Percent of Team's Shots",
        		"Percent of Team's MVPs"
          ],
          ordinalColumns = [
            "Season",
            "Player",
            "Team"
          ];

      setTimeout(function (){ // Show off the spinner for a few seconds ;)
        d3.csv("data/rkl_3seasons.csv", type, function (data){
          actions.ingestData(data, numericColumns, ordinalColumns)
        });
      }, 500);
      
      function type(d){
        return numericColumns.reduce(function (d, column){
          d[column] = + d[column];
          return d;
        }, d);
      }
    }
    
    // ------------------------------------------------------------
    // 960, 500 - 38
    function reducer (state, action){
      var state = state || {
        width: 960,
        height: 500 - 38,
        loading: true,
        margin: {top: 12, right: 12, bottom: 40, left: 50},
        x: "Win Percentage",
        y: "Misc Score Per Game",
        color: "Season",
        radius: "Games Played"
      };
      switch (action.type) {
        case "INGEST_DATA":
          return Object.assign({}, state, {
            loading: false,
            data: action.data,
            numericColumns: action.numericColumns,
            ordinalColumns: action.ordinalColumns
          });
        case "SET_X":
          return Object.assign({}, state, { x: action.column });
        case "SET_Y":
          return Object.assign({}, state, { y: action.column });
        case "SET_COLOR":
          return Object.assign({}, state, { color: action.column });
        case "SET_RADIUS":
          return Object.assign({}, state, { radius: action.column });
        default:
          return state;
      }
    }
    
    function actionsFromDispatch(dispatch){
      return {
        ingestData: function (data, numericColumns, ordinalColumns){
          dispatch({
            type: "INGEST_DATA",
            data: data,
            numericColumns: numericColumns,
            ordinalColumns: ordinalColumns
          });
        },
        setX: function (column){
          dispatch({ type: "SET_X", column: column });
        },
        setY: function (column){
          dispatch({ type: "SET_Y", column: column });
        },
        setColor: function (column){
          dispatch({ type: "SET_COLOR", column: column });
        },
        setRadius: function (column){
          dispatch({ type: "SET_RADIUS", column: column });
        }
      };
    }
    
    // 
    //var svg = d3.select(vizDiv).append("svg");
    
    function main(){
      
      // grab the screen width and height computed by css
      //var width = vizDiv.clientWidth;
      //var height = vizDiv.clientHeight;
      
      var store = Redux.createStore(reducer),
          actions = actionsFromDispatch(store.dispatch);
          renderApp = function(){
            d3.select("body").call(app, store.getState(), actions);
          }
      renderApp();
      store.subscribe(renderApp);
      loadData(actions);
    }
    
    // draw for the first time to initialize
    main();
    
    // redraw based on new window size when browser is resided
    window.addEventListener("resize", main);
