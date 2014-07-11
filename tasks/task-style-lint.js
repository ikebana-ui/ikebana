var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var spawn = require("child_process").spawn;
var path = require("path");

/**
 * style:lint
 * Uses SCSSLint to lint all `lib/style/*.scss`.
 * @see github.com/causes/scss-lint
 * @see rubygems.org/gems/scss-lint
 */
gulp.task("style:lint", function () {
  var scsslintProcess = spawn("bundle", [
    "exec",
    "scss-lint",
    "--config",
    path.join(CFG.FILE.config.styleLint),
    path.join(CFG.DIR.src)
  ], {
    stdio: "inherit" // See http://stackoverflow.com/questions/18825493/retaining-output-colors-when-shelling-out-to-node
  });

  scsslintProcess.on("close", function (code) {
      $.util.log("[scss-lint] exited with", code);
    });
});
