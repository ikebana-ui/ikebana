var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var path = require("path");

/**
 * image:minify
 * @see www.npmjs.org/package/gulp-imagemin
 */
gulp.task("image:minify", function () {
  return gulp.src([
      path.join(CFG.DIR.src, CFG.DIR.image, "**/*")
    ])
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(path.join(CFG.DIR.dist, CFG.DIR.image)))
    .pipe($.size({
      title: "images"
    }));
});
