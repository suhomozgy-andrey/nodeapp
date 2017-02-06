const webpack = require('webpack');
const merge = require('webpack-merge');

const env = process.env.NODE_ENV || 'development';

module.exports = merge(
  require('./webpack_base.config.js'),
  require(`./webpack_${env}.config.js`)
);
