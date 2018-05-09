const ip = require('./getIP.js');

module.exports = {
  compress: true,
  contentBase: './dist/',
  port: 3001,
  host: ip,
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: { colors: true },
  watchOptions: {
    poll: true,
    aggregateTimeout: 1000
  }
};
