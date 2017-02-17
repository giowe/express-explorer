const webpack = require('webpack');

const config = {
  context: __dirname + '/src/static/scripts',
  entry: {
    app: './index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    path: __dirname + '/build/static',
    filename: 'scripts.min.js',
    libraryTarget: 'var',
    library: 'Lib'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
