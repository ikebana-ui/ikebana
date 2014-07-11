var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var path = require("path");

/**
 * script:test
 * Uses Mocha to run unit tests.
 * @see www.npmjs.org/package/gulp-mocha
 * @see visionmedia.github.io/mocha
 */
gulp.task("script:test", ["script:lint"], function () {
  return gulp.src([ path.join(CFG.DIR.src, "/**/*.", CFG.FILE.extension.script.js) ])
    .pipe($.istanbul())
    .on("finish", function () {
      gulp.src([ path.join(CFG.DIR.src, "/**/*.", CFG.FILE.extension.script.js) ])
        .pipe($.mocha())
        .pipe($.istanbul.writeReports());
    });
});
