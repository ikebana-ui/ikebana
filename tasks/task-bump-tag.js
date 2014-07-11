var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");

/**
 * bump:tag
 * Tags the release after bump:commit.
 */
gulp.task("bump:tag", ["bump:commit"], function () {
var v = "v" + pkg.version,
      message = "[gulp] Release " + v;

  $.git.tag(v, message);

  gutil.log("Tagged release", gutil.colors.blue(v));
});
