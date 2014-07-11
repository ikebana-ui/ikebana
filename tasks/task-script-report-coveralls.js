var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();

/**
 * script:test:report:coveralls
 * Reports test coverage results to Coveralls.io.
 * @see www.npmjs.org/package/gulp-coveralls
 */
gulp.task("script:test:report:coveralls", ["script:test"], function () {
  gulp.src("coverage/**/lcov.info")
    .pipe($.coveralls());
});
