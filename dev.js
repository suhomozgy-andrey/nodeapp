const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
const WebpackDevServer = require('webpack-dev-server');
const hotRailsPort = process.env.HOT_RAILS_PORT || 3000;

config.output.publicPath = `http://localhost:${hotRailsPort}/`;

['application'].forEach(entryName => {
  config.entry[entryName].push(
    'webpack-dev-server/client?http://localhost:' + hotRailsPort
    // 'webpack/hot/dev-server'
  );
});


config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
//   new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: false,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  }
}).listen(hotRailsPort, 'localhost', function (err, result) {
  if (err) console.log(err)
  console.log(
    '=> Webpack development server is running on port ' + hotRailsPort
  );
})
