const path = require('path')
const HTMLPage = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-source-code',
  entry: {
    front: path.resolve(__dirname, './front.js'),
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
    path: path.resolve('./examples/ssr/public/'),
    filename: '[name].js',
  },
}
