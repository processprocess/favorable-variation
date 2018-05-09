const devServer = require('./../config/dev-server.js');
const loaders = require('./../config/development-loaders.js');
const plugins = require('./../config/development-plugins.js');
const path = require('path')

module.exports = {
  devServer,
  devtool: 'inline-source-map',
  entry: {
    main: [
      'babel-polyfill',
      './src/index.js'
    ]
  },
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    publicPath: '/'
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
  plugins
};
