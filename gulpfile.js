"use strict";


/* ⚑ Configuration */

var args     = require("yargs").argv,
    bump     = require("gulp-bump"),
    clean    = require("gulp-clean"),
    compass  = require("gulp-compass"),
    debug    = require("gulp-debug"),
    es       = require("event-stream"),
    fs       = require("fs"),
    git      = require("gulp-git"),
    gulp     = require("gulp"),
    gulpif   = require("gulp-if"),
    gutil    = require("gulp-util"),
    header   = require("gulp-header"),
    ignore   = require("gulp-ignore"),
    jshint   = require("gulp-jshint"),
    mocha    = require("gulp-mocha"),
    path     = require("path"),
    rename   = require("gulp-rename"),
    template = require("gulp-template"),
    uglify   = require("gulp-uglify"),
    zip      = require("gulp-zip");

/**
 * Header configuration for gulp-header
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
 * Bump
 * @see www.npmjs.org/package/gulp-bump
 */
gulp.task("bump", function () {
  var bumpType = process.env.BUMP || "patch"; // major.minor.patch

  return gulp.src(["./package.json", "./bower.json"])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest("./"));
});

/**
 * Clean
 * @see www.npmjs.org/package/gulp-clean
 */
gulp.task("clean", function () {
  var pkg = require("./package.json");

  return gulp.src([pkg.config.dir.dist, pkg.config.dir.doc], { read: false })
    .pipe(clean());
});

/**
 * Tag
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
 * Create
 * Custom task to create a new component for development.
 */
gulp.task("create", function () {
  var pkg = require("./package.json"),
      name = args.name || null;

  if(null === name) {
    gutil.log("Error, invalid argument(s)! Usage: gulp create --name <component-name>");
    return;
  }

  return gulp.src(pkg.config.dir.tpl + "/component/**/*.*")
    .pipe(template({
      name: name,
      pkg: pkg
    }))
    .pipe(rename({
      basename: name,
      prefix: "",
      suffix: ""
    }))
    .pipe(gulp.dest(pkg.config.dir.src + "/" + pkg.config.dir.cmp + "/" + name + "/"));

    // TODO Make this interactive using https://www.npmjs.org/package/gulp-prompt
    // SEE https://github.com/isaacs/rimraf
    // SEE https://github.com/substack/node-mkdirp
    // SEE https://github.com/isaacs/node-touch
});


/* ⚑ Primary tasks */

/**
 * Compass
 * @see www.npmjs.org/package/gulp-compass
 */
gulp.task("compass", function() {
  var pkg = require("./package.json");

  return gulp.src([pkg.config.dir.src + "/**/*.scss", pkg.config.dir.src + "/**/*.sass"])
    .pipe(compass({
      style: "expanded", // Output style; ["nested" | "compact" | "compressed" | "expanded"]
      css: pkg.config.dir.dist,
      sass: pkg.config.dir.src
    }))
    .pipe(gulp.dest(pkg.config.dir.dist));
});

/**
 * Lint
 * @see www.npmjs.org/package/gulp-jshint
 */
gulp.task("lint", function () {
  var pkg = require("./package.json");

  return gulp.src(pkg.config.dir.src + "/**/*.js")
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"));
});

/**
 * Test
 * @see www.npmjs.org/package/gulp-mocha
 */
gulp.task("test", ["lint"], function () {
  var pkg = require("./package.json");

  return gulp.src(pkg.config.dir.src + "/**/*.js")
    .pipe(mocha({ reporter: "spec" }));
});

/**
 * Uglify
 * @see www.npmjs.org/package/gulp-uglify
 */
gulp.task("uglify", ["lint"], function () {
  var pkg = require("./package.json");

  return gulp.src([
      pkg.config.dir.src + "/**/*.js",
      "!./**/test{,/**}" // See https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
    ], {
      base: "./" + pkg.config.dir.src
    })
    .pipe(gulp.dest(pkg.config.dir.dist)) // Keep non-uglified files
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: "some"
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(pkg.config.dir.dist));
});

/**
 * Dist
 * Custom task for building the latest version.
 */
gulp.task("dist", ["clean", "compass", "lint", "test", "uglify"], function () {
  var pkg = require("./package.json");

  return gulp.src([
      pkg.config.dir.src + "/" + pkg.config.dir.cmp + "/**",
      "!./**/test{,/**}" // See https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
    ], {
      base: "./" + pkg.config.dir.src
    })
    .pipe(gulp.dest(pkg.config.dir.dist));
});

/**
 * Zip
 * Compress each component into its own zip file.
 */
gulp.task("zip", ["dist"], function () {
  var pkg = require("./package.json");

  // Courtesy github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
  function getFolders (dir) {
    return fs.readdirSync(dir)
      .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  var folders = getFolders(pkg.config.dir.src + "/" + pkg.config.dir.cmp);

  var tasks = folders.map(function (folder) {
    return gulp.src([
        pkg.config.dir.src + "/" + pkg.config.dir.cmp + "/" + folder + "/**",
        "!./**/test{,/**}"
      ], {
        base: "./" + pkg.config.dir.src
      })
      .pipe(zip(folder + "-" + pkg.version + ".zip"))
      .pipe(gulp.dest(pkg.config.dir.dist + "/" + pkg.config.dir.cmp + "/" + folder + "/"));
  });

  return es.concat.apply(null, tasks);
});

/**
 * CI
 * CI server task for deployment.
 */
gulp.task("ci", ["zip"], function () {
  var pkg = require("./package.json");
});

