const path = require('path');
module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'dist/bundle.js',
      path: __dirname
    }
  }
];
