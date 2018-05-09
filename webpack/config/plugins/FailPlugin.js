class Fail {
  apply(compiler) {
    compiler.plugin('done', (stats) => {
      if (stats.compilation.errors && stats.compilation.errors.length)
        {
          console.log('\n');
          stats.compilation.errors.forEach((error) => {
            console.log(error.message)
            console.log('\n');
          })
          console.log('\n');
          process.exit(1);
        }
    });
  }
}

module.exports = Fail;