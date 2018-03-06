const path = require('path');

module.exports = {
  entry: path.resolve('./index.js'),
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
    }]
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].js',
  },
}
