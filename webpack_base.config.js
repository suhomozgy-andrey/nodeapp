const path = require('path');
const webpack = require('webpack');


module.exports = {
  context: __dirname,

  // точки входа (entry point)
  entry: {
    application: ['./javascripts/application.js', './stylesheets/application.sass']
  },

  // путь к сгенерированным файлам
  output: {
    path: path.join(__dirname, 'assets', 'build'),
    publicPath: '/assets/build/',
    filename: 'bundle-[name].js'
  },

  externals: {
    jquery: 'var jQuery'
  },

  resolve: {
    // можно использовать require без указания расширения
    extensions: ['', '.js', '.jsx', '.coffee', '.css', '.sass', '.scss'],
    modulesDirectories: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
    // alias: {
    //   images: path.resolve(__dirname, '..', 'assets', 'webpack', 'images')
    // }
  },

  module: {
    loaders: [
      // Можно писать на ES6
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015'] }},

      // React
      // { test: /\.jsx?$/, loaders: ['react-hot', 'jsx-loader'] },

      // Можно писать на CoffeeScript
      { test: /\.coffee$/, loader: 'coffee-loader' },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url-loader?limit=1&name=images/[name].[ext]'
      },

      // для Vue JS компонентов
      { test: /\.vue$/, loader: 'vue' }
    ],
  }
};
