var gulp = require("gulp");
var CFG  = require("./config.js");
var del  = require("del");

/**
 * Clean
 * @see www.npmjs.org/package/del
 */
gulp.task("clean", del.bind(null, [
  CFG.DIR.dist,
  CFG.DIR.istanbulCoverage
]));
