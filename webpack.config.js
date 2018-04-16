const path = require('path')

const CleanPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.join(__dirname, 'src', 'common.js'),
  mode: IS_PROD ? 'production' : 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Index Title',
      template: path.join(__dirname, 'src', 'index.html'),
      minify: IS_PROD && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    IS_PROD && new CleanPlugin(path.join(__dirname, 'dist', '*')),
    IS_PROD && new CompressionPlugin()
  ].filter(Boolean)
}