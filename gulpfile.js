"use strict";


/* ⚑ Configuration */

var gulp = require("gulp"),
    compass = require("gulp-compass"),
    clean = require("gulp-clean"),
    git = require("gulp-git"),
    bump = require("gulp-bump"),
    template = require("gulp-template"),
    args = require("yargs").argv,
    gulpif = require("gulp-if"),
    rename = require("gulp-rename"),
    header = require("gulp-header"),
    expect = require("gulp-expect-file");

/**
 * header config for gulp-header
 */
var ikebana = {
  header: {
    extended: [
      "/**",
      "* <%= name %> - <%= pkg.name %>",
      "* @version v<%= pkg.version %>",
      "* @link <%= pkg.url %>",
      "* @license <%= pkg.license %>",
      "*/\n\n"
    ].join("\n"),

    succinct: "// <%= name %> - <%= pkg.name %> @v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.url %>\n"
  }
};


/* ⚑ Project scaffolding tasks */

/**
 * gulp-bump
 * @see www.npmjs.org/package/gulp-bump
 */
gulp.task("bump", function () {
  var bumpType = process.env.BUMP || "patch"; // major.minor.patch

  return gulp.src(["./package.json", "./bower.json"])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest("./"));
});

/**
 * gulp-clean
 * @see www.npmjs.org/package/gulp-clean
 */
gulp.task("clean", function () {
  var pkg = require("./package.json");

  return gulp.src([pkg.config.dir.dist, pkg.config.dir.doc], { read: false })
    .pipe(clean());
});

/**
 * gulp-tag
 * @see www.npmjs.org/package/gulp-git
 */
gulp.task("tag"/*, ["dist"] */, function () {
  var pkg = require("./package.json");

  var message = "Tagging release v" + pkg.version;

  return gulp.src("./")
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push("origin", "master", "--tags"))
    .pipe(gulp.dest("./"));
});

/**
 * travis-ci
 */
gulp.task("ci", ["clean", "lint", "compass", "dist"]);

/**
 * Custom task to create a new component for development.
 */
gulp.task("create", function () {
  var pkg = require("./package.json"),
      name = args.name || null;

  if(null === name) {
    console.error("[ikebana] Error! Invalid arguments. Usage: gulp create --name <component-name>");
    return;
  }

  return gulp.src(pkg.config.dir.lib + "/components/" + name + "/*.*")
    .pipe(expect({
      errorOnFailure: true,
      reportMissing: false,
      reportUnexpected: true
    }, [ name ]))
    .on("error", function (err) {
      console.error("[ikebana] Error! " + name + " already exists!");
    })
    .pipe(gulp.src(pkg.config.dir.tpl + "/component/css/component.scss"))
    .pipe(template({ name: name }))
    .pipe(rename({
        basename: name,
        prefix: "",
        suffix: "",
        extname: ".scss"
    }))
    .pipe(header(ikebana.header.extended, { name: name, pkg: pkg }))
    .pipe(gulp.dest(pkg.config.dir.lib + "/components/" + name + "/css"))
    .pipe(gulp.src(pkg.config.dir.tpl + "/component/js/component.js"))
    .pipe(template({ name: name }))
    .pipe(rename({
        basename: name,
        prefix: "",
        suffix: "",
        extname: ".js"
    }))
    .pipe(header(ikebana.header.extended, { name: name, pkg: pkg }))
    .pipe(gulp.dest(pkg.config.dir.lib + "/components/" + name + "/js"));
});


/* ⚑ Primary tasks */

/**
 * gulp-compass
 * @see www.npmjs.org/package/gulp-compass
 */
gulp.task("compass", function() {
  var pkg = require("./package.json");

  return gulp.src([pkg.config.dir.lib + "/**/*.scss", pkg.config.dir.lib + "/**/*.sass"])
    .pipe(compass({
      style: "expanded", // Output style; ["nested" | "compact" | "compressed" | "expanded"]
      css: pkg.config.dir.dist,
      sass: pkg.config.dir.lib
    }))
    .pipe(gulp.dest(pkg.config.dir.dist));
});

/**
 * gulp-jshint
 * @see www.npmjs.org/package/gulp-jshint
 */
gulp.task("lint", function () {
  var pkg = require("./package.json");

  return gulp.src(pkg.config.dir.lib + "/*.js")
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"));
});