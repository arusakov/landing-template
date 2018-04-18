const path = require('path')

const Autoprefixer = require('autoprefixer')
const CleanPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  // mode: IS_PROD ? 'production' : 'development',
  entry: path.join(__dirname, 'src', 'common.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: IS_PROD,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  Autoprefixer({ browsers: ['last 2 versions', 'ie >= 11'] }),
                ],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // includePaths: [path.resolve(PATH_SRC, 'styles')],
                sourceMap: true,
              }
            }
          ],
        }),
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          fallback: 'file-loader',
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      disable: !IS_PROD,
      filename: 'styles.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Index Title',
      template: path.join(__dirname, 'src', 'index.html'),
      minify: IS_PROD && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'About title',
      filename: 'about/index.html',
      template: path.join(__dirname, 'src', 'index.html'),
      minify: IS_PROD && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    IS_PROD && new CleanPlugin(path.join(__dirname, 'dist', '*')),
    IS_PROD && new UglifyJSPlugin({ sourceMap: true }),
    IS_PROD && new CompressionPlugin()
  ].filter(Boolean)
}