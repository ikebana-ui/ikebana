var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var path = require("path");
var argv = require("yargs").argv;

/**
 * style:compile
 * Uses Sass to compile `lib/style/*.scss` to `dist/style/*.css`.
 * @see www.npmjs.org/package/gulp-sass
 * @see sass-lang.com
 */
gulp.task("style:compile", ["style:lint"], function() {
  var outputStyle = argv.output || "expanded";  // Output style; ["nested" | "compact" | "compressed" | "expanded"]

return gulp.src([
    path.join(CFG.DIR.src, "**", "*." + CFG.FILE.extension.style.scss)
  ])
  .pipe($.rubySass({
    style: outputStyle
  }))
  .pipe(gulp.dest(CFG.DIR.dist));
});
