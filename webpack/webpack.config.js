if (process.env.NODE_ENV === "development") {
    module.exports = require('./environments/development.js')
} else {
    module.exports = require('./environments/release.js');
}
