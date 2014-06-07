# Ikebana

> Ikebana (/ˌɪkɪˈbɑːnə/) is a UI component library.  
> [ikebana-ui.github.io/ikebana](http://ikebana-ui.github.io/ikebana)

[![Build Status](https://travis-ci.org/ikebana-ui/ikebana.svg?branch=master)](https://travis-ci.org/ikebana-ui/ikebana) [![Dependencies](https://david-dm.org/ikebana-ui/ikebana.png?theme=shields.io "Node package dependencies - David")](https://david-dm.org/ikebana-ui/ikebana) [![Dependency Status](https://gemnasium.com/ikebana-ui/ikebana.png "Ruby gem dependencies - Gemnasium")](https://gemnasium.com/ikebana-ui/ikebana) [![Code Climate](https://codeclimate.com/github/ikebana-ui/ikebana.png "Code Climate")](https://codeclimate.com/github/ikebana-ui/ikebana) [![Coverage Status](https://coveralls.io/repos/ikebana-ui/ikebana/badge.png "Code coverage - Coveralls")](https://coveralls.io/r/ikebana-ui/ikebana) [![License](http://img.shields.io/badge/license-MIT-blue.svg "Licensed under MIT")](license.md)

## Getting started with development

Ikebana uses the following libraries...

* [Node.js](http://nodejs.org)
* [Bundler](http://bundler.io)
* [Bower](http://bower.io)

**Tip**: You can use [nvm](https://github.com/creationix/nvm), [rvm](https://rvm.io) and [Homebrew](http://brew.sh)/[Chocolatey](https://chocolatey.org) to manage their installations.

Once they are installed, run...

```
npm install -g gulp # A global installation of gulp is required.
git clone git@github.com:ikebana-ui/ikebana.git
cd ikebana
bundle install && npm install && bower install
gulp build
say awesome
```

Once done, the `dist` directory will have the built artefacts in the `master` branch. To view other Gulp tasks, just run `gulp`.

## Updating your codebase

* Use `git pull --rebase` to update your codebase.
* Run `bundle install && npm install && bower install` after a `git pull --rebase` to ensure that any newly added packages are installed.

## Contributing to Ikebana

You are welcome to contribute components to Ikebana; just fork this repo and send us a pull request. Please read the [Contributing](https://github.com/ikebana-ui/ikebana/wiki/Contributing) wiki for more details.

### Creating a new component

* Use `gulp create --name <component-name>` to create a new component.
* This will create a new directory under `lib/components/<component-name>`.

### Developing a component

* Use `gulp server` to fire up a live-reload server.
* Open `http://localhost:4000/dist/components/<component-name>/<component-name>.html`.
* The `server` task will watch the `lib/components` directory and reload your browser upon detecting changes.

#### Gulp tasks

In addition to `gulp server`, the following tasks are available to you...

* **bump**
  Increments the version numbers (major.minor.patch) in `package.json` and `bower.json`.
* **clean**
  Deletes everything in the `dist` directory.
* **bump:tag** (depends on **bump**)
  Creates a git tag using the version number in `package.json`.
* **bump:commit** (depends on **bump**)
  Creates a git commit by adding `package.json` and `bower.json`, using the version number in `package.json` as the commit message.
* **create** (`--name <component-name>`)
  Takes an argument (`name`), the component name, and creates a directory, `lib/components/<component-name>`, for that component with stub `.scss`, `.js` and `.html` files.
  For example, to create a new component called, *button*, just run...
  ```
  gulp create --name button
  ```
* **css:compass**
  Uses `compass` to compile all the `lib/components/<component-name>/css/*.scss` files.
* **css:sass**
  Uses `sass` to compile all the `lib/components/<component-name>/css/*.scss` files.
* **js:lint**
  Runs `jshint` on all the `lib/components/<component-name>/js/*.js` files. Uses `.jshintrc` for configuration.
* **js:test**
  Runs all the [Mocha](http://visionmedia.github.io/mocha) unit tests inside the `lib/components/<component-name>/test` directory.
* **js:test:report:coveralls**
  Sends test coverage data to *Coveralls.io*. Uses [Istanbul](http://gotwarlost.github.io/istanbul).
* **js:minify**
  Uses [Uglify](http://lisperator.net/uglifyjs) to minify all the `lib/components/<component-name>/js/*.js` files
* **doc:styleguide**
  Uses [Hologram](http://github.com/trulia/hologram) to generate a styleguide.
* **dist:sources**
  Simply copies all the files under `lib/components/**.*` (excluding `lib/components/<component-name>/test/**.*`) to the `dist` directory.
* **dist:zip**
  Zips up all the component files in `dist/components/<component-name>` to `dist/components/<component-name>/<component-name>-<package-version>.zip`.
* **server**
  Runs a live-reload enabled Express server. Watches all the `.js`, `.scss` and `.html` files in `lib/components/<component-name>/**.*` directories and runs **css:compass** and **dist:sources**.
* **build**
  An alias for **css:compass**, **js:minify** and **dist:sources**. *More tasks may be added in the future.*
* **dist**
  An alias for **dist:zip**. *More tasks may be added in the future.*
* **deploy**
  An alias for **bump:tag**. *More tasks may be added in the future.*
* **default**
  Just lists all the available tasks.

### Distributing a component

* Use `gulp dist` to create a distributable version of all the components in the `dist` folder.

## License

Ikebana is licensed under the [MIT license](license.md).

---
