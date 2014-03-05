"use strict";



/* ⚑ Configuration */

var args     = require("yargs").argv,
    bump     = require("gulp-bump"),
    clean    = require("gulp-clean"),
    compass  = require("gulp-compass"),
    debug    = require("gulp-debug"),
    exec     = require('child_process').exec,
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
  npm: "node_modules"
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
gulp.task("tag", ["bump", "build"], function () {
  var pkg = require("./package.json");

  var v = "v" + pkg.version;
  var message = "@gulp Tagging release " + v + " on " + new Date().toUTCString();

  gulp.src("./")
    .pipe(git.commit(message));
  git.tag(v, message);
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
      "!/**/test{,/**}"
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

  return gulp.src([
      path.join(DIR.src, DIR.cmp.src, "/**/*.js"),
      "!./**/test{,/**}" // See https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
    ])
    .pipe(uglify({
      outSourceMap: true,
      preserveComments: "some"
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(DIR.dist));
});


/**
 * Build
 * Custom task for building the latest version.
 */
gulp.task("build", ["clean", "compass", "lint", "test", "minify"], function () {
  var pkg = require("./package.json");

  return gulp.src([
      pkg.config.dir.src + "/" + pkg.config.dir.cmp + "/**/*.*",
      "!./**/test{,/**}" // See https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
    ], {
      base: "./" + pkg.config.dir.src
    })
    .pipe(gulp.dest(pkg.config.dir.dist));
});


/**
 * Deploy
 * Custom task to deploy a distribution to the server.
 */
gulp.task("deploy", ["dist"], function () {
  var pkg = require("./package.json");

  var v = "v" + pkg.version,
      message = ":tropical_drink: [gulp] Distribution generated with release " + v + " on " + new Date().toUTCString(),
      execScript = [
        "git checkout gh-pages",
        "git add dist doc web",
        ("git commit -m '" + message + "'"),
        "git push origin gh-pages",
        "git checkout master"
      ].join(" ; ");

  var child = exec(execScript, function (error, stdout, stderr) {
    gutil.log("stdout: ", stdout);
    gutil.log("stderr: ", stderr);
    if (null !== error) {
      gutil.log("exec error: ", error);
    }
  });
});


/**
 * Dist
 * Distribute each component into its own zip file.
 */
gulp.task("dist", ["build"], function () {
  var pkg = require("./package.json");

  // Courtesy github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
  function getFolders (dir) {
    return fs.readdirSync(dir)
      .filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  gulp.src([
    pkg.config.dir.src,
    "!./**/test{,/**}"
  ], {
    base: "./" + pkg.config.dir.src
  })
    .pipe(gulp.dest(pkg.config.dir.dist));

  var folders = getFolders(pkg.config.dir.dist + "/" + pkg.config.dir.cmp);

  var tasks = folders.map(function (folder) {
    return gulp.src([
        pkg.config.dir.dist + "/" + pkg.config.dir.cmp + "/" + folder + "/**/*.*"
      ], {
        base: "./" + pkg.config.dir.dist
      })
      .pipe(zip(folder + "-" + pkg.version + ".zip"))
      .pipe(gulp.dest(pkg.config.dir.dist + "/" + pkg.config.dir.cmp + "/" + folder + "/"));
  });

  return es.concat.apply(null, tasks);
});


/**
 * CI
 * CI server task alias for deployment.
 */
gulp.task("ci", ["tag", "deploy"]);
