const path = require('path')
const HTMLPage = require('html-webpack-plugin')

module.exports = {
  devServer: {
    port: 3030,
  },

  devtool: 'cheap-source-code',

  entry: {
    client: path.resolve(__dirname, './client.js'),
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          extends: path.resolve(__dirname, '../../.babelrc'),
        },
      },
    ],
  },

  output: {
    filename: '[name].js',
  },

  plugins: [new HTMLPage()],
}
