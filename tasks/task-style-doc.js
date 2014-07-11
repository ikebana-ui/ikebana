var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var spawn = require("child_process").spawn;

/**
 * style:doc
 * Generates a living styleguide from the `doc` comments from all `lib/style/*.scss`.
 * @see trulia.github.io/hologram
 */
gulp.task("style:doc", ["style:compile"], function() {
  var hologramProcess = spawn("bundle", [
    "exec",
    "hologram",
    "--config",
    CFG.FILE.config.hologram
  ], {
    stdio: "inherit" // See http://stackoverflow.com/questions/18825493/retaining-output-colors-when-shelling-out-to-node
  });

  hologramProcess.on("close", function (code) {
    $.util.log("[hologram] exited with", code);
  });
});
