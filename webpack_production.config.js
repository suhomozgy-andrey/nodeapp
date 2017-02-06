const path = require('path')
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("bundle-[name]-[chunkhash].css");
const CompressionPlugin = require("compression-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  output: {
    // добавлем хеш в имя файла
    filename: 'bundle-[name].js',
    chunkFilename: 'bundle-[name].js',
    publicPath: '/assets/build/'
  },
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
      // { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192' },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?.+)?$/,
        loader: 'file'
      },
    ]
  },
  plugins: [
    extractCSS,
    // используем другое имя для манифеста, чтобы при релизе не перезаписывать
    // developoment версию
    new AssetsPlugin({
      prettyPrint: true, filename: 'webpack-assets.json'
    }),

    // файл с общим js-кодом для всех точек входа
    // Webpack самостоятельно его генерирует, если есть необходимость
    new webpack.optimize.CommonsChunkPlugin(
      'common', 'bundle-[name].js'
    ),

    // выделяем CSS в отдельный файл
    new ExtractTextPlugin("bundle-[name].css", {
      allChunks: true
    }),

    // оптимизация...
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),

    // генерация gzip версий
    new CompressionPlugin({ test: /\.js$|\.css$/ }),

    // очистка перед очередной сборкой
    new CleanPlugin(
      path.join('assets', 'build'),
      { root: path.join(process.cwd()) }
    )
  ]
};
