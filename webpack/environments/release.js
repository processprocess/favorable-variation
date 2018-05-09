const loaders = require('./../config/release-loaders.js');
const path = require('path');
const plugins = require('./../config/release-plugins.js');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    chunkFilename: '[name].[hash].chunk.js',
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../../dist/'),
    publicPath: '/dist/',
  },
  module: { loaders },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(__dirname, '../../src/scripts')
    ]
  },
  resolveLoader: { modules: [path.resolve(__dirname, '../../node_modules')] },
  plugins,
  stats: {
    children: false,
    maxModules: 0,
    modules: false
  }
};
