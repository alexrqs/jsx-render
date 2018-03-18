const path = require('path');

module.exports = {
  devtool: 'cheap-source-code',
  entry: {
    main: path.resolve('./index.js'),
    // server: path.resolve('./server.js'),
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }]
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].js',
  },
  target: 'node',
}
