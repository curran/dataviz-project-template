const path = require('path');
module.exports = [
  {
    entry: ['./src/input.js','./src/render-bar.js','./src/render-map.js',],
    output: {
      filename: 'dist/bundle.js',
      path: __dirname
    }
  }
];
