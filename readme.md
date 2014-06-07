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



## Contributing to Ikebana

You are welcome to contribute components to Ikebana; just fork this repo and send us a pull request. Please read the [Contributing](https://github.com/ikebana-ui/ikebana/wiki/Contributing) wiki for more details.


### Updating your codebase

* Use `git pull --rebase` to update your codebase.
* Run `bundle install && npm install && bower install` after a `git pull --rebase` to ensure that any newly added packages are installed.


### Creating a new component

* Use `gulp create --name {{component-name}}` to create a new component.
* This will create a new directory under `lib/components/{{component-name}}`.


### Developing a component

* Use `gulp server` to fire up a live-reload server.
* Open `http://localhost:4000/dist/components/{{component-name}}/{{component-name}}.html`.
* The `server` task will watch the `lib/components` directory and reload your browser upon detecting changes.


### Gulp tasks

In addition to `gulp server`, the following tasks are available to you...

<dl>
  <dt>bump</dt>
  <dd>Increments the version numbers (major.minor.patch) in <code>package.json</code> and <code>bower.json</code>.</dd>

  <dt>clean</dt>
  <dd>Deletes everything in the <code>dist</code> directory.</dd>

  <dt>bump:tag</dt>
  <dd>Creates a git tag using the version number in <code>package.json</code>.</dd>

  <dt>bump:commit</dt>
  <dd>Creates a git commit by adding <code>package.json</code> and <code>bower.json</code>, using the version number in <code>package.json</code> as the commit message.</dd>

  <dt>create --name {{component-name}}</dt>
    <dd>
      <p>Takes an argument (<code>name</code>), the component name, and creates a directory, <code>lib/components/{{component-name}}</code>, for that component with stub <code>.scss</code>, <code>.js</code> and <code>.html</code> files.</p>
      <p>For example, to create a new component called, <strong>button</strong>, just run&hellip;</p>
      <code>
        <pre>gulp create --name button</pre>
      </code>
  </dd>

  <dt>css:compass</dt>
  <dd>Uses `compass` to compile all the `lib/components/{{component-name}}/css/*.scss` files.</dd>

  <dt>css:sass</dt>
  <dd>Uses `sass` to compile all the `lib/components/{{component-name}}/css/*.scss` files.</dd>

  <dt>js:lint</dt>
  <dd>Runs `jshint` on all the `lib/components/{{component-name}}/js/*.js` files. Uses `.jshintrc` for configuration.</dd>

  <dt>js:test</dt>
  <dd>Runs all the [Mocha](http://visionmedia.github.io/mocha) unit tests inside the `lib/components/{{component-name}}/test` directory.</dd>

  <dt>js:test:report:coveralls</dt>
  <dd>Sends test coverage data to *Coveralls.io*. Uses [Istanbul](http://gotwarlost.github.io/istanbul).</dd>

  <dt>js:minify</dt>
  <dd>Uses [Uglify](http://lisperator.net/uglifyjs) to minify all the `lib/components/{{component-name}}/js/*.js` files</dd>

  <dt>doc:styleguide</dt>
  <dd>Uses [Hologram](http://github.com/trulia/hologram) to generate a styleguide.</dd>

  <dt>dist:sources</dt>
  <dd>Simply copies all the files under `lib/components/**.*` (excluding `lib/components/{{component-name}}/test/**.*`) to the `dist` directory.</dd>

  <dt>dist:zip</dt>
  <dd>Zips up all the component files in `dist/components/{{component-name}}` to `dist/components/{{component-name}}/{{component-name}}-<package-version>.zip`.</package-version>

  <dt>server</dt>
  <dd>Runs a live-reload enabled Express server. Watches all the `.js`, `.scss` and `.html` files in `lib/components/{{component-name}}/**.*` directories and runs **css:compass** and **dist:sources**.</dd>

  <dt>build</dt>
  <dd>An alias for **css:compass**, **js:minify** and **dist:sources**. *More tasks may be added in the future.*</dd>

  <dt>dist</dt>
  <dd>An alias for **dist:zip**. *More tasks may be added in the future.*</dd>

  <dt>deploy</dt>
  <dd>An alias for **bump:tag**. *More tasks may be added in the future.*</dd>

  <dt>default</dt>
  <dd>Just lists all the available tasks.</dd>
</dl>

### Distributing a component

* Use `gulp dist` to create a distributable version of all the components in the `dist` folder.



## License

Ikebana is licensed under the [MIT license](license.md).

---
