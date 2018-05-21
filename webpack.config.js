const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const config = {
  context: path.resolve(__dirname, "src"),
  // configurations here
  entry: {
    app: './js/app.js'
  },
  output: {
    filename: './js/[name].js',
    // Output path using nodeJs path module
    path: path.resolve(__dirname)
  },
  // Adding jQuery as external library
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader', options: { url: false, sourceMap: true } }, 
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
            ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
              loader: 'babel-loader',
              options: {
                  presets: ['env']
              }   
          }
        ]
      }
    ]
  },
  watch: true,
  plugins: [
    require('autoprefixer'),
    new ExtractTextPlugin("/css/[name].css"),
    new BrowserSyncPlugin({
        files: [
          './**/*.html',
          '*.html'
        ],
        host: 'localhost',
        port: 3000,
        server: true,
        logPrefix: 'webpack',
        logLevel: 'debug',
        ghostMode: false
    }),
  ]
};
module.exports = config;