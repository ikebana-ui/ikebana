var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();

/**
 * Bump
 * @see www.npmjs.org/package/gulp-bump
 */
gulp.task("bump", ["dist"], function () {
  var bumpType = process.env.BUMP || "patch"; // major.minor.patch

  return gulp.src(["../package.json", "../bower.json"])
    .pipe($.bump({ type: bumpType }))
    .pipe(gulp.dest(".."));
});
