const path = require('path');

module.exports = {
  devtool: 'cheap-source-code',
  entry: {
    jsx: path.resolve(__dirname, './src/standalone.js'),
  },

  mode: 'production',

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        extends: path.resolve(__dirname, '.babelrc'),
      },
    }]
  },

  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    library: 'jsx',
    libraryExport: 'jsx',
    libraryTarget: 'umd',
  },

}
