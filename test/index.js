

/**
 * Created by abdulhagi on 4/6/17.
 */
// only ES5 is allowed in this file
require("babel-core/register");
require("babel-polyfill");
// other babel configuration, if necessary

let Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path');

// Instantiate a Mocha instance.
let mocha = new Mocha();





// List all files in a directory in Node.js recursively in a synchronous fashion
let walkSync = function(dir) {
  let files = fs.readdirSync(dir);
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      walkSync(path.join(dir, file));
    }
    else {
      // Add each .js file to the mocha instance
      if (file.substr(-3) === '.js') mocha.addFile(path.join(dir, file));

    }
  });
};


walkSync(__dirname);

// Run the tests.
mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});

