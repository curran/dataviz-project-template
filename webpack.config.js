const path = require('path');
module.exports = [
    {
        entry: ['./src/render-map.js'],
        output: {
            filename:  'dist/bundle.js',
            path: __dirname
        }
    }
];
