# 2015-2100 World Population Data

A visualization of world population data from 2015 to 2100.

Have a look => [Click here](https://bl.ocks.org/BruceHenry/raw/f9c8fdaa96182f18c5517a0d18323f40/) to visit.
<br/><img src="https://gist.githubusercontent.com/BruceHenry/f9c8fdaa96182f18c5517a0d18323f40/raw/0c2763039f565f32412a994c7e437278bd687c43/thumbnail.png"/>
<hr/>

## Introduction of Concept
- [Total dependency ratio](https://en.wikipedia.org/wiki/Dependency_ratio) is a measure showing the number of dependents, aged 0 to 14 and over the age of 65, to the total population aged 15 to 64. This indicator gives insight into the amount of people of nonworking age compared to the number of those of working age.
<br/><br/><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/e7515ecc13b474b4953708350ad4197be7b6e40f"/>

- Old-age dependency ratio is aged over the age of 65, to the total population aged 15 to 64.
<br/><br/><img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/1864839236c02e2787c3fa2cac420edfcf8e5de2"/>

## Data Source
The data is from [United Nations: World Population Prospects 2017](https://esa.un.org/unpd/wpp/Download/Standard/Population/).

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
