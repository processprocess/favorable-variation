const notifier = require('node-notifier');
const pkg = require('./../../../package.json');

const soundOn = pkg.config.SOUNDS === '1';

class Notifier {
  apply(compiler) {
    compiler.plugin('done', (stats) => {
      if (stats.compilation.errors.length) {
        notifier.notify({
          message: stats.compilation.errors.map(e => e.module).join('\n'),
          title: `Failure - ${pkg.name}`
          // sound: soundOn && 'Basso',
        });
      } else {
        notifier.notify({
          title: 'Success',
          message: pkg.name
          // sound: soundOn && 'Glass',
        });
      }
    });
  }
}

module.exports = Notifier;
