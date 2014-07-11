var gulp = require("gulp");
var CFG  = require("./config.js");
var $    = require("gulp-load-plugins")();
var pkg  = require("../package.json");
var exec = require("child_process").exec;
var es   = require("event-stream");
var fs   = require("fs");

/**
 * bump:commit
 * Commits package.json & bower.json after the bump.
 */
gulp.task("bump:commit", ["bump"], function () {
  var v = "v" + pkg.version,
      message = "[gulp] Bumped to " + v;

  var execScript = [
        "git add package.json bower.json",
        ("git commit -m '" + message + "'"),
      ].join(" && "); // FIXME gulp-git is unstable at v0.3.3; hence using this workaround.

  var child = $.exec(execScript, function (error, stdout, stderr) {
    gutil.log("stdout: ", stdout);
    gutil.log("stderr: ", stderr);
    if (null !== error) {
      gutil.log("exec error: ", error);
    }
  });

  gutil.log("Bumped to", gutil.colors.blue(v));
});
