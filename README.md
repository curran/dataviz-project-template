


# The Visualization
This is an exploratory visualization looking at the time of day use patterns and the relationship between the number of users and quantitative weather attributes (temperature, humidity and windspeed). 

# The Data
## Washington DC Bike Sharing Data Set

This data set contains the number of bike share system users (casual and registered) for each day (and hour) for two years (Jan 2011 - Dec 2012), as well as the day type (holiday, workingday), weather situation, temperature and humidity, apparent temperature and windspeed.

This data is from [UCI Machine Learning Repository: Bike Sharing Data Set](https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset)

The dataset file can be found [here](https://archive.ics.uci.edu/ml/machine-learning-databases/00275/Bike-Sharing-Dataset.zip) as a zip archive.


[Daily Data Block Summary](https://bl.ocks.org/sajudson/d8d4909fa0512302a95b1e0982a07c0f)
[Hourly Data Block Summary](https://bl.ocks.org/sajudson/3b64ad3a4e4e2c5f80898eebd40646ca)

##Sources of inspiration and code
<a href='http://bl.ocks.org/curran/'>curran</a>'s block: <a href='http://bl.ocks.org/curran/ecb09f2605c7fbbadf0eeb75da5f0a6b'>Stylized Scatter Plot with Color Legend</a>
<a href='http://bl.ocks.org/sajudson/'>sajudson</a>'s block: <a href='http://bl.ocks.org/sajudson/159113faca3611883a34bdaf460c020a'>CS Degrees Awarded 1971-2011</a>


## Development and Deployment Notes (adapted from [UNHCR StreamGraph Explorer](https://github.com/unhcr/dataviz-streamgraph-explorer))

The project is built from a template project that uses Webpack and D3. Designed as a starting point for interactive data visualization projects that require JavaScript code to be organized across many files (as ES6 modules).

Build the JavaScript bundle using WebPack, using this command: npm run build
To see the page run on a local HTTP server at localhost:8080 
    
    npm install -g http-server
    http-server

For automatic refreshing during development, start the Webpack Dev Server using: 

    npm run serve

We are using GitHub pages to deploy this project to the Web. Deployments are manual, and require the following steps:

    git checkout master
    git pull
    git checkout gh-pages
    git merge master
    npm run build
    git status -s # You should see that only build.js has been changed.
    git add .
    git branch # Make sure you're on the gh-pages branch.
    git commit -m "Deploy the latest" -a
    git push


