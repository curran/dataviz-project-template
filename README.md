# 2015-2100 World Dependency Ratio

A visualization of dependency ratio change from 2015 to 2100.
<br/><img src="https://gist.githubusercontent.com/BruceHenry/f9c8fdaa96182f18c5517a0d18323f40/raw/fc7658333565e637481f0164861c65030af95141/thumbnail.png"/>

### Have a look on the Alpha Test Version, [Click here](https://bl.ocks.org/BruceHenry/raw/f9c8fdaa96182f18c5517a0d18323f40/) to visit.
<hr/>

## Introduction of [Total Dependency Ratio](https://en.wikipedia.org/wiki/Dependency_ratio)
The dependency ratio is a measure showing the number of dependents, aged 0 to 24 and over the age of 65, to the total population aged 25 to 64. This indicator gives insight into the amount of people of nonworking age compared to the number of those of working age.

## Data Source
The data is from [United Nations: World Population Prospects 2017](https://esa.un.org/unpd/wpp/Download/Standard/Population/).This dataset is total dependency ratio (<25 & 65+)/(25-64) by region, subregion and country, 1950-2100 (ratio of population 0-24 and 65+ per 100 population 25-64).

## Development

This project uses NPM and Webpack. To get started, clone the repository and install dependencies like this:

```
cd dataviz-project-template
npm install
```

You'll need to build the JavaScript bundle using WebPack, using this command:

```
npm run build
```

To see the page run, you'll need to serve the site using a local HTTP server.

```
npm install -g http-server
http-server
```

Now the site should be available at localhost:8080.

For automatic refreshing during development, you can start the Webpack Dev Server like this:

```
npm run serve
```

## References
1. The idea of using bar chart comes from [UNHCR Historical Refugee Data](http://data.unhcr.org/dataviz/).
2. The idea of year range input is from [Custom range input slider with labels](https://codepen.io/trevanhetzel/pen/rOVrGK).
3. The map is built by [DataMaps](http://datamaps.github.io/).
