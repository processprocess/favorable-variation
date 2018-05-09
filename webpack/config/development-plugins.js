const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const ip                 = require('./getIP.js');
const NotifierPlugin     = require('./plugins/NotifierPlugin');
const OpenBrowserPlugin  = require('open-browser-webpack-plugin');
const pkg                = require('./../../package.json');
const PathRewriterPlugin = require('webpack-path-rewriter');
const Webpack            = require('webpack');

const sitePath = pkg.config.DEV_SITE;

const config = Object.assign({}, pkg.config, {
  'API_PATH': JSON.stringify(`${ sitePath }api/`),
  'CONTENT_DIR': JSON.stringify(`${ sitePath }content/`),
  'CONTENT_IMG': JSON.stringify(`${ sitePath }content/slides/`),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
);

const plugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new NotifierPlugin(),
  new OpenBrowserPlugin({ url: `http://${ ip }:3001/` }),
  new PathRewriterPlugin(),
  new Webpack.DefinePlugin(config),
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.NamedModulesPlugin(),
  new Webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom',
    PropTypes: 'prop-types',
    _: 'lodash',
    classNames: 'classnames',
  })
]

module.exports = plugins;
