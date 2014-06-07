"use strict";


// JSHint directives
/*
global require: false
global process: false
global __dirname: false
*/


/* # Configuration */

var addsrc    = require("gulp-add-src"),
    args      = require("yargs").argv,
    bump      = require("gulp-bump"),
    clean     = require("gulp-clean"),
    compass   = require("gulp-compass"),
    coveralls = require("gulp-coveralls"),
    debug     = require("gulp-debug"),
    exec      = require("child_process").exec,
    es        = require("event-stream"),
    fs        = require("fs"),
    git       = require("gulp-git"),
    gulp      = require("gulp"),
    gulpif    = require("gulp-if"),
    gutil     = require("gulp-util"),
    header    = require("gulp-header"),
    ignore    = require("gulp-ignore"),
    istanbul  = require("gulp-istanbul"),
    jshint    = require("gulp-jshint"),
    mocha     = require("gulp-mocha"),
    path      = require("path"),
    sass      = require("gulp-ruby-sass"),
    rename    = require("gulp-rename"),
    template  = require("gulp-template"),
    uglify    = require("gulp-uglify"),
    zip       = require("gulp-zip");

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
  script: "script",
  style: "style",
  image: "image",
  test: "test",

  exclude: {
    test: "!/**/test{,/**}" // Exclude test files; @see https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
  }
};

var FILE = {
  config: {
    style: "_config.scss",
    pkg: "package.json",
    hologram: ".hologramrc"
  },
  style: {
    scss: "*.scss",
    sass: "*.sass"
  },
  script: {
    js: "*.js"
    // coffee: "*.coffee"
  },
  markup: {
    html: "*.html"
    // haml: "*.haml"
  }
};


/* # Project scaffolding tasks */

/**
 * Bump
 * @see www.npmjs.org/package/gulp-bump
 */
gulp.task("bump", ["dist"], function () {
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
 * bump:tag
 * Tags the release after bump:commit.
 */
gulp.task("bump:tag", ["bump:commit"], function () {
  var pkg = require("./package.json");

  var v = "v" + pkg.version,
      message = "[gulp] Release " + v;

  git.tag(v, message);

  gutil.log("Tagged release", gutil.colors.blue(v));
});


/**
 * bump:commit
 * Commits package.json & bower.json after the bump.
 */
gulp.task("bump:commit", ["bump"], function () {
  var pkg = require("./package.json");

  var v = "v" + pkg.version,
      message = "[gulp] Bumped to " + v;

  var execScript = [
        "git add package.json bower.json",
        ("git commit -m '" + message + "'"),
      ].join(" && "); // FIXME gulp-git is unstable at v0.3.3; hence using this workaround.

  var child = exec(execScript, function (error, stdout, stderr) {
    gutil.log("stdout: ", stdout);
    gutil.log("stderr: ", stderr);
    if (null !== error) {
      gutil.log("exec error: ", error);
    }
  });

  gutil.log("Bumped to", gutil.colors.blue(v));
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
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/", FILE.script.js),
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/", FILE.markup.html),
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/", FILE.style.scss),
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/", FILE.style.sass)
    ])
    .pipe(rename({
      basename: name,
      prefix: "",
      suffix: ""
    }))
    .pipe(addsrc([
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/", FILE.config.pkg),
      path.join(DIR.tpl, DIR.cmp.tpl, "/**/", FILE.config.style)
    ]))
    .pipe(template({
      name: name,
      pkg: pkg
    }))
    .pipe(gulp.dest(path.join(DIR.src, DIR.cmp.src, name)));

    // TODO Make this interactive using https://www.npmjs.org/package/gulp-prompt
    // SEE https://github.com/isaacs/rimraf
    // SEE https://github.com/substack/node-mkdirp
    // SEE https://github.com/isaacs/node-touch
});



/* # Primary tasks */

/**
 * Compass
 * @see www.npmjs.org/package/gulp-compass
 */
gulp.task("css:compass", function() {
  var pkg = require("./package.json"),
      outputStyle = args.output || "expanded";  // Output style; ["nested" | "compact" | "compressed" | "expanded"]

  return gulp.src([
      path.join(DIR.src, "/**/*.scss"),
      path.join(DIR.src, "/**/*.sass")
    ])
    .pipe(compass({
      style: outputStyle,
      css: DIR.dist,
      sass: DIR.src
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest(DIR.dist));
});


/**
 * Sass
 * @see www.npmjs.org/package/gulp-ruby-sass
 */
gulp.task("css:sass", function() {
  var pkg = require("./package.json"),
      outputStyle = args.output || "expanded";  // Output style; ["nested" | "compact" | "compressed" | "expanded"]

  return gulp.src([
      path.join(DIR.src, "/**/*.scss"),
      path.join(DIR.src, "/**/*.sass")
    ])
    .pipe(sass({
      style: outputStyle
    }))
    .pipe(gulp.dest(DIR.dist));
});


/**
 * Documentation / Styleguide
 * @see trulia.github.io/hologram
 */
gulp.task("doc:styleguide", function () {
  exec("bundle exec hologram --config " + FILE.config.hologram, function (error, stdout, stderr) {
    gutil.log("hologram stdout: ", stdout);
    gutil.log("hologram stderr: ", stderr);
    if (null !== error) {
      gutil.log("hologram exec error: ", error);
    }
  });
});


/**
 * Lint
 * @see www.npmjs.org/package/gulp-jshint
 */
gulp.task("js:lint", function () {
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
gulp.task("js:test", ["js:lint"], function () {
  var pkg = require("./package.json");

  return gulp.src([ path.join(DIR.src, "/**/*.js") ])
    .pipe(istanbul())
    .on("finish", function () {
      gulp.src([ path.join(DIR.src, "/**/*.js") ])
        .pipe(mocha())
        .pipe(istanbul.writeReports());
    });
});


/**
 * Report results to Coveralls.io
 * @see www.npmjs.org/package/gulp-coveralls
 */
gulp.task("js:test:report:coveralls", ["js:test"], function () {
  var pkg = require("./package.json");

  gulp.src("coverage/**/lcov.info")
    .pipe(coveralls());
});


/**
 * Minify
 * @see www.npmjs.org/package/gulp-uglify
 */
gulp.task("js:minify", ["js:test"], function () {
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
 * Zip
 * Zip each component into its own zip file.
 */
gulp.task("dist:zip", ["build"], function () {
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
 * Live-reload
 * Uses `express`, `tiny-lr` and `connect-livereload` to set up a live-reload server.
 */
gulp.task("server", ["build"], function () {
  var express         = require("express"),
      app             = express(),
      lr              = require("tiny-lr")(),
      clr             = require("connect-livereload"),
      EXPRESS_PORT    = 4000,
      EXPRESS_ROOT    = path.join(__dirname),
      LIVERELOAD_PORT = 35729;

  app.use(clr());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
  lr.listen(LIVERELOAD_PORT);

  // Watch all the source files and push them to the dist folder.
  gulp.watch(path.join(DIR.src, "/**/*.scss"), ["css:compass"]); // css:compass task automatically pushes generated CSS files to the dist folder, so no need to run dist:sources
  gulp.watch(path.join(DIR.src, "/**/*.js"), ["dist:sources"]);
  gulp.watch(path.join(DIR.src, "/**/*.html"), ["dist:sources"]);
  // TODO Add support for png, jpg, svg etc.

  // Watch all the dist files and reload when they are changed.
  gulp.watch([
    path.join(DIR.dist, "/**/*.css"),
    path.join(DIR.dist, "/**/*.js"),
    path.join(DIR.dist, "/**/*.html")
    // TODO Add support for png, jpg, svg etc.
  ], function(event) {
    var fileName = path.relative(EXPRESS_ROOT, event.path);

    lr.changed({
      body: {
        files: [ fileName ]
      }
    });
  });

  gutil.log("Serving", gutil.colors.yellow(EXPRESS_ROOT), "at", gutil.colors.green("http://localhost:") + gutil.colors.blue(EXPRESS_PORT), "(Press", gutil.colors.red("Ctrl + C"), "to stop.)");
});


/**
 * Build (alias)
 * Used by travis-ci.
 */
gulp.task("build", ["css:compass", "js:minify", "dist:sources"]);


/**
 * Dist (alias)
 */
gulp.task("dist", ["dist:zip"]);


/**
 * Deploy (alias)
 */
gulp.task("deploy", ["bump:tag"]);


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
