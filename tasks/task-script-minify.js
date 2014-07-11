var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var path = require("path");

/**
 * script:minify
 * Uses UglifyJS to minify and obfuscate scripts in `lib/script/*.js`.
 * @see www.npmjs.org/package/gulp-uglify
 * @see github.com/mishoo/UglifyJS
 */
gulp.task("script:minify", ["script:test"], function () {
  // TODO Use gulp-header to add version info.

  return gulp.src([
      path.join(CFG.DIR.src, "/**/*.", CFG.FILE.extension.script.js),
      CFG.DIR.exclude.test
    ], {
      base: CFG.DIR.src
    })
    .pipe($.uglify({
      outSourceMap: true,
      preserveComments: "some"
    }))
    .pipe($.rename({ suffix: ".min" }))
    .pipe(gulp.dest(CFG.DIR.dist));
});
