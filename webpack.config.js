const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );


const PATHS = {
    source: path.join( __dirname, './src' ),
    build:  path.join( __dirname, './dist' )
};


const config = {
  entry:  './src/app.js',
  output: {
      path:     PATHS.build,
      filename: './app.js'
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
          test: /\.twig$/,
          loader: "twig-loader",
          options: {
              // See options section below
          },
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
    new HtmlWebpackPlugin( {
        filename: 'index.html',
        template: path.join( __dirname, './src' )+'/index.twig.js',
    } ),
    new BrowserSyncPlugin({
        files: [
          './**/*.html',
          '*.html',
          '*.php'
        ],
        host: 'localhost',
        proxy: 'https://localhost/candidatosui',
        port: 3000,
        logPrefix: 'webpack',
        logLevel: 'debug',
        ghostMode: false
    }),
  ]
};
module.exports = config;