
Live Version (hosted on Github Pages):https://sajudson.github.io/dataviz-project/

# The Visualization
This is an exploratory visualization looking at the time of day use patterns and the relationship between the number of users and quantitative weather attributes (temperature, humidity and windspeed).

# The Data
## Washington DC Bike Sharing Data Set

This data set contains the number of bike share system users (casual and registered) for each day (and hour) for two years (Jan 2011 - Dec 2012), as well as the day type (holiday, workingday), weather situation, temperature and humidity, apparent temperature and windspeed.

This data is from [UCI Machine Learning Repository: Bike Sharing Data Set](https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset)

The dataset file can be found [here](https://archive.ics.uci.edu/ml/machine-learning-databases/00275/Bike-Sharing-Dataset.zip) as a zip archive.


[Daily Data Block Summary](https://bl.ocks.org/sajudson/d8d4909fa0512302a95b1e0982a07c0f)
[Hourly Data Block Summary](https://bl.ocks.org/sajudson/3b64ad3a4e4e2c5f80898eebd40646ca)

#Sources and Inspiration
This visualization draws inspiration and code from the following sources:
<a href='http://bl.ocks.org/curran/'>curran</a>'s blocks:
<li> <a href='http://bl.ocks.org/curran/ecb09f2605c7fbbadf0eeb75da5f0a6b'>Stylized Scatter Plot with Color Legend</a>
<li><a href='http://bl.ocks.org/curran/90240a6d88bdb1411467b21ea0769029'>Line Chart of Temperature</a>

<a href='http://bl.ocks.org/mbostock/'>mbostock</a>'s blocks, including:
<li><a href='http://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172'>Brush & Zoom</a>



It also draws on my previous work shown on [bl.ocks.org](http://bl.ocks.org/sajudson/) including:
<li>[Global Carbon Emissions by Year, 1751-2011](http://bl.ocks.org/sajudson/ad02a7cf9ba7fd7eed0017ecd4dd0b13)
<li>[CS Degrees Awarded 1971-2011](http://bl.ocks.org/sajudson/159113faca3611883a34bdaf460c020a)
<li>[Bike Share Users Time Series](http://bl.ocks.org/sajudson/6868f6f0836fc6f88566587b9e9e4a50)
<li>[Bike Share Users Radial Time Series](http://bl.ocks.org/sajudson/60aec6f286928b4089d01f74ba4cd627)
<li>[Bike Share Users Radial Time Series - Hourly](https://bl.ocks.org/sajudson/4f7e657d7114022114ea602641874c8c/)
<li>[Interaction 2](https://bl.ocks.org/sajudson/a0713fb9826aea45f15b207dfec9bcb4)

Other sources and references:

<li>[d3 v4 Curve Functions Examples](https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529)



## Development and Deployment Notes (adapted from [UNHCR StreamGraph Explorer](https://github.com/unhcr/dataviz-streamgraph-explorer))

The project is built from a template project that uses Webpack and D3 provided by Curran Kelleher. Designed as a starting point for interactive data visualization projects that require JavaScript code to be organized across many files (as ES6 modules).

Build the JavaScript bundle using WebPack, using this command: npm run build
To see the page run on a local HTTP server at localhost:8080

    npm install -g http-server
    http-server

We are using GitHub pages to deploy this project to the Web. Deployments are manual, and require the following steps:

    git checkout master
    npm run build
    git add -f dist/bundle.js
    git status -s # You should see that only build.js has been changed.
    git commit -m "Deploy the latest" -a
    git push
