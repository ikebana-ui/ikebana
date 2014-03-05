"use strict";



/* ⚑ Configuration */

var args     = require("yargs").argv,
    bump     = require("gulp-bump"),
    clean    = require("gulp-clean"),
    compass  = require("gulp-compass"),
    debug    = require("gulp-debug"),
    exec     = require("child_process").exec,
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

var DIR = {
  src: "lib",
  dist: "dist",
  doc: "doc",
  web: "web",
  tpl: "template",
  cmp: {
    tpl: "component",
    src: "components"
  },
  bower: "bower_components",
  npm: "node_modules",

  exclude: {
    test: "!/**/test{,/**}" // Exclude test files; @see https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
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

  return gulp.src([DIR.dist], { read: false })
    .pipe(clean());
});


/**
 * Tag
 * @see www.npmjs.org/package/gulp-git
 */
gulp.task("tag", ["bump"], function () {
  var pkg = require("./package.json");

  var v = "v" + pkg.version,
      message = "[gulp] Tagging release " + v + " on " + new Date().toUTCString(),
      execScript = [
        "git checkout master",
        "git add package.json bower.json",
        ("git commit -m '" + message + "'"),
        ("git tag --annotate " + v),
      ].join(" && "); // FIXME gulp-git is unstable at v0.3.3; hence using this workaround.

  var child = exec(execScript, function (error, stdout, stderr) {
    gutil.log("stdout: ", stdout);
    gutil.log("stderr: ", stderr);
    if (null !== error) {
      gutil.log("exec error: ", error);
    }
  });
});


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

  return gulp.src([
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/*.*")
    ])
    .pipe(template({
      name: name,
      pkg: pkg
    }))
    .pipe(rename({
      basename: name,
      prefix: "",
      suffix: ""
    }))
    .pipe(gulp.dest(path.join(DIR.src, DIR.cmp.src, name, "/")));

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

  return gulp.src([
      path.join(DIR.src, "/**/*.scss"),
      path.join(DIR.src, "/**/*.sass")
    ])
    .pipe(compass({
      style: "expanded", // Output style; ["nested" | "compact" | "compressed" | "expanded"]
      css: DIR.dist,
      sass: DIR.src
    }))
    .pipe(gulp.dest(DIR.dist));
});


/**
 * Lint
 * @see www.npmjs.org/package/gulp-jshint
 */
gulp.task("lint", function () {
  var pkg = require("./package.json");

  return gulp.src([
      path.join(DIR.src, "/**/*.js"),
      DIR.exclude.test
    ])
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"));
});


/**
 * Test
 * @see www.npmjs.org/package/gulp-mocha
 */
gulp.task("test", function () {
  var pkg = require("./package.json");

  return gulp.src([
      path.join(DIR.src, "/**/*.js")
    ])
    .pipe(mocha({ reporter: "spec" }));
});


/**
 * Minify
 * @see www.npmjs.org/package/gulp-uglify
 */
gulp.task("minify", function () {
  var pkg = require("./package.json");

  // TODO Use gulp-header to add version info.

  return gulp.src([
      path.join(DIR.src, "/**/*.js"),
      DIR.exclude.test
    ], {
      base: DIR.src
    })
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: "some"
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(DIR.dist));
});

/**
 * Dist:Sources
 * Copies source files to dist for end-users who want to develop with sources.
 */
gulp.task("dist:sources", function () {
  var pkg = require("./package.json");

  return gulp.src([
      path.join(DIR.src, DIR.cmp.src, "/**/*.*"),
      DIR.exclude.test
    ], {
      base: DIR.src
    })
    .pipe(gulp.dest(DIR.dist));
});


/**
 * Publish
 * Custom task to publish a distribution to the server.
 */
gulp.task("publish", ["dist", "tag"], function () {
  var pkg = require("./package.json");

  var v = "v" + pkg.version,
      message = "[gulp] Publishing release " + v + " on " + new Date().toUTCString(),
      execScript = [
        "git checkout gh-pages",
        "git pull --rebase origin gh-pages",
        "git add dist doc web",
        ("git commit -m '" + message + "'"),
        "git push --tags origin master gh-pages",
        "git checkout master"
      ].join(" && "); // FIXME gulp-git is unstable at v0.3.3; hence using this workaround.

  var child = exec(execScript, function (error, stdout, stderr) {
    gutil.log("stdout: ", stdout);
    gutil.log("stderr: ", stderr);
    if (null !== error) {
      gutil.log("exec error: ", error);
    }
  });
});


/**
 * Zip
 * Zip each component into its own zip file.
 */
gulp.task("zip", ["build", "dist:sources"], function () {
  var pkg = require("./package.json");

  // Courtesy github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
  function getFolders (dir) {
    return fs.readdirSync(dir)
      .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  var folders = getFolders(path.join(DIR.dist, DIR.cmp.src));

  var pipechain = folders.map(function (folder) {
    return gulp.src([
        path.join(DIR.dist, DIR.cmp.src, folder, "/**/*.*")
      ])
      .pipe(zip(folder + "-" + pkg.version + ".zip"))
      .pipe(gulp.dest(path.join(DIR.dist, DIR.cmp.src, folder, "/")));
  });

  return es.concat.apply(null, pipechain);
});


/**
 * Build (alias)
 */
gulp.task("build", ["clean", "compass", "lint", "test", "minify"]);


/**
 * Dist (alias)
 */
gulp.task("dist", ["build", "zip"]);


/**
 * Deploy (alias)
 * Used by travis-ci.
 */
gulp.task("deploy", ["dist", "publish"]);


/**
 * Default
 * List all available tasks.
 */
gulp.task("default", function () {
  gutil.log("Available tasks:");
  Object.keys(gulp.tasks).forEach(function (taskName) {
    gutil.log("\t", gutil.colors.yellow(taskName));
  });
  gutil.log("Use", gutil.colors.green("gulp dist"), "to get started.");
});
