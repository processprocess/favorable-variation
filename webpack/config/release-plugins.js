const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const NotifierPlugin     = require('./plugins/NotifierPlugin');
const pkg                = require('./../../package.json');
const Webpack            = require('webpack');
const PathRewriterPlugin = require('webpack-path-rewriter');

const sitePath = '/' ;

const config = Object.assign({}, pkg.config, {
  'API_PATH': JSON.stringify(`${ sitePath }api/`),
  'CONTENT_DIR': JSON.stringify(`${ sitePath }content/`),
  'CONTENT_IMG': JSON.stringify(`${ sitePath }content/slides/`),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }
);

const plugins = [
  new ExtractTextPlugin('[name].[hash].css'),
  new NotifierPlugin(),
  new Webpack.DefinePlugin(config),
  new PathRewriterPlugin({silent: true}),
  new Webpack.optimize.OccurrenceOrderPlugin(),
  new Webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom',
    PropTypes: 'prop-types',
    _: 'lodash',
    classNames: 'classnames',
  }),
  new Webpack.optimize.UglifyJsPlugin()
]

module.exports = plugins;
