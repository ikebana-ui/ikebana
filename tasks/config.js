module.exports = {
  DIR: {
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

    istanbulCoverage: "coverage",

    exclude: {
      test: "!/**/test{,/**}" // Exclude test files; @see https://github.com/gulpjs/gulp/issues/165#issuecomment-32613179
    }
  }, // /DIR

  FILE: {
    config: {
      style: "_config.scss",
      pkg: "package.json",
      styleLint: ".scsslintrc",
      scriptLint: ".jshintrc",
      compass: "config.rb",
      hologram: ".hologramrc"
    },
    extension: {
      style: {
        scss: "scss",
        sass: "sass",
        css: "css"
      },
      script: {
        js: "js"
        // coffee: "coffee"
      },
      markup: {
        html: "html"
        // haml: "haml"
      },
      image: {
        jpg: "jpg",
        png: "png"
      }
    }
  } // /FILE
};
