var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var argv = require("yargs").argv;
var path = require("path");

/**
 * script:lint
 * @see www.npmjs.org/package/gulp-jshint
 */
gulp.task("script:lint", function () {
  var reporter = argv.reporter || "jshint-stylish"; // See www.npmjs.org/package/jshint-stylish

  return gulp.src([
      path.join(CFG.DIR.src, "/**/*.", CFG.FILE.extension.script.js),
      CFG.DIR.exclude.test
    ])
    .pipe($.jshint(CFG.FILE.config.scriptLint))
    .pipe($.jshint.reporter(reporter));
});
