const PathRewriterPlugin = require('webpack-path-rewriter')

module.exports = [
  {
    test: /\.pug(\?.*)?$/,
    loader: PathRewriterPlugin.rewriteAndEmit({
        name: '[name].html',
        loader: 'pug-html-loader?'+JSON.stringify({
          pretty: true,
          data: {
            hash: '',
            development: true
          }
        })
    })
  }, {
    test: /\.jsx?(\?.*)?$/,
    loaders: ['react-hot-loader', 'babel-loader', 'eslint-loader'],
    exclude: /node_modules/
  }, {
    test: /\.scss(\?.*)?$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader']
  }, {
    test: /\.(jpe?g|png|gif)(\?.*)?$/i,
    loader: 'file-loader?name=[name].[ext]'
  }, {
    test: /\.(ico|tff|eot|svg|woff|woff2)(\?.*)?$/,
    loader: 'file-loader?name=[name].[ext]'
  }, {
    test: /\.static.?$/,
    loader: 'file?name=[name].[ext]'
  }
];
