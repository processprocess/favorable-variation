const extractTextPlugin = require("extract-text-webpack-plugin");
const PathRewriterPlugin = require('webpack-path-rewriter')
const {GA_TRACKING_CODE} = require('./../../package.json').config;

module.exports = [
  {
    test: /\.pug(\?.*)?$/,
    loader: PathRewriterPlugin.rewriteAndEmit({
        name: '[name].html',
        pathRegExp: /(src|href|content)\s*=\s*"(.*?\.[\w\d]{1,6})"/,
        pathMatchIndex: 2,
        pathReplacer: '[1]="[path]"',
        loader: 'pug-html-loader?'+JSON.stringify({
          pretty: true,
          data: {
            hash: '.*',
            GATrackingCode: GA_TRACKING_CODE
          }
        })
    })
  }, {
    test: /\.jsx?(\?.*)?$/,
    loaders: ['babel-loader', 'eslint-loader'],
    exclude: /node_modules/,
  }, {
    test: /\.scss(\?.*)?$/,
    loader: extractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: "css-loader",
          options: {minimize: true}
        },
        {loader: "postcss-loader"},
        {loader: "sass-loader"},
        {loader: "import-glob-loader"}
      ]
    }),
  },
  {
    test: /^((?!static).)*\.(jpe?g|png|gif)(\?.*)?$/i,
    loader: 'file-loader?name=[name].[hash].[ext]',
  }, {
    test: /\.(ico|tff|eot|svg|woff|woff2)(\?.*)?$/,
    loader: 'file-loader?name=[name].[ext]'
  }, {
    test: /\.static.?/,
    loader: 'file-loader?name=[name].[ext]'
  }
];
