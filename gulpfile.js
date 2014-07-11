"use strict";

var $    = require("gulp-load-plugins")();
var gulp = require("gulp");

/**
 * Load all tasks from the gulp directory.
 */
require("require-dir")("tasks");


/**
 * Build (alias)
 * Used by travis-ci.
 */
gulp.task("build", ["style:doc", "script:minify", "image:minify"]);


/**
 * Default
 * Lists all available tasks.
 */
gulp.task("default", function () {
  $.util.log("Available tasks:");
  Object.keys(gulp.tasks).forEach(function (taskName) {
    $.util.log("\t", $.util.colors.yellow(taskName));
  });
  $.util.log("Use", $.util.colors.green("gulp dist"), "to get started.");
});
