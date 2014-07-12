var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var path = require("path");
var browserSync = require("browser-sync");

/**
 * serve
 * Watches source files and invokes BrowserSync for live-reload support.
 * @see www.browsersync.io
 * @see github.com/google/web-starter-kit/blob/master/gulpfile.js
 */
gulp.task("serve", ["build"], function () {
  browserSync({
    notify: true,
    startPath: path.join(CFG.DIR.dist, CFG.DIR.doc), // Hack path.join() to build a URL string e.g. /dist/doc[/index.html]
    server: {
      baseDir: [path.join(__dirname, "..")] // `__dirname` is the current `gulp` directory so `..` is the project root directory.
    }
  });

  gulp.watch(
    path.join(CFG.DIR.src, "/**/*." + CFG.FILE.extension.style.scss),
    ["style:doc"]
  );
  gulp.watch(
    path.join(CFG.DIR.src, "/**/*." + CFG.FILE.extension.script.js),
    ["script:minify"]
  );
  gulp.watch([
    path.join(CFG.DIR.src, "/**/*." + CFG.FILE.extension.image.jpg),
    path.join(CFG.DIR.src, "/**/*." + CFG.FILE.extension.image.png)
  ], [
    "image:minify"
  ]);

  gulp.watch([
    path.join(CFG.DIR.dist, "/**/*.*")
  ], browserSync.reload);
});
