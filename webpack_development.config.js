const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const jQuery = require('jquery');
// const StaticFilesWebpackPlugin = require('static-files-webpack-plugin');

module.exports = {
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,

  // включаем source map
  devtool: 'cheap-module-eval-source-map',

  module: {
    loaders: [
      // css
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      },

      // нужно дополнительно применить плагин resolve-url,
      // чтобы логично работали относительные пути к изображениям
      // внутри *.sass файлов
      {
        test: /\.sass$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!resolve-url-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true")
      },
      { test: /\.html\.slim$/, loader: "slim" },
      // шрифты
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/,
        loader: 'file?name=[path][name].[ext]'
      }
    ],
  },

  postcss: [ autoprefixer({ browsers: ['last 3 versions'] }) ],

  plugins: [
    // new StaticFilesWebpackPlugin({path: 'static.json'}),
    // Для выделения css в отдельные файлы
    new ExtractTextPlugin("bundle-[name].css"),

    // для генерация файла-манифеста, который будет использован фреймворком для подключения js и css
    // new AssetsPlugin({ path: path.join(__dirname), prettyPrint: true })
  ]
};
