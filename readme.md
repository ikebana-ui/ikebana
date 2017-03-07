# Ikebana

> Ikebana (/ˌɪkɪˈbɑːnə/) is a UI component library.  
> [ikebana-ui.github.io/ikebana](http://ikebana-ui.github.io/ikebana)

[![Build status](https://travis-ci.org/ikebana-ui/ikebana.svg?branch=master "Build status")](https://travis-ci.org/ikebana-ui/ikebana) [![Dependency status (npm)](https://david-dm.org/ikebana-ui/ikebana.svg "Dependency status (npm)")](https://david-dm.org/ikebana-ui/ikebana) [![Dependency status - bundler](https://gemnasium.com/ikebana-ui/ikebana.png "Dependency status (bundler)")](https://gemnasium.com/ikebana-ui/ikebana) [![Code Climate](http://img.shields.io/codeclimate/github/ikebana-ui/ikebana.svg "Code Climate")](https://codeclimate.com/github/ikebana-ui/ikebana) [![Coverage status](https://img.shields.io/coveralls/ikebana-ui/ikebana.svg "Coverage status")](https://coveralls.io/r/ikebana-ui/ikebana) [![License](http://img.shields.io/badge/license-MIT-blue.svg "License")](license.md)



## :rowboat: Getting started with development

Ikebana depends on the latest stable versions following...

* [Node.js](http://nodejs.org)
* [Ruby](http://www.ruby-lang.org)
* [Bundler](http://bundler.io)
* [Bower](http://bower.io)

:point_up: You can use [nvm](https://github.com/creationix/nvm), [rvm](https://rvm.io) and [Homebrew](http://brew.sh)/[Chocolatey](https://chocolatey.org) to manage their installations.

Once they are all installed, run...

```
npm install -g gulp # A global installation of gulp is required.
git clone git@github.com:ikebana-ui/ikebana.git
cd ikebana
bundle install && npm install && bower install
gulp build
say awesome
```

Once done, the `dist` directory will have the built artefacts. To view other Gulp tasks, just run `gulp`.



## :mortar_board: Contributing to Ikebana

You are welcome to contribute components to Ikebana; just fork this repo and send us a pull request. Please read the [Contributing](https://github.com/ikebana-ui/ikebana/wiki/Contributing) wiki for more details.


### :high_brightness: Updating your codebase

* Use `git pull --rebase` to update your codebase.
* :warning: Run `bundle install && npm install && bower install` after a `git pull --rebase` to ensure that any newly added modules are installed.
* Optionally, run `npm prune && bower prune` to remove any unused node and bower modules.


### :star2: Creating a new component

* Use `gulp create --name {{component-name}}` to create a new component.
* This will create a new directory under `lib/components/{{component-name}}`.


### :pencil2: Developing a component

* Use `gulp serve` to fire up your default browser and a live-reload server via the `browser-sync` module.
* The `serve` task will watch the `lib/components` directory and reload your browser upon detecting changes.


### :dart: Gulp tasks

In addition to the `serve` task, the following tasks are available to you...

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
      Takes an argument (<code>name</code>), the component name, and creates a directory, <code>lib/components/{{component-name}}</code>, for that component with stub <code>.scss</code>, <code>.js</code> and <code>.html</code> files.
      <p>For example, to create a new component called, <strong>button</strong>, just run&hellip;</p>
      <pre>gulp create --name button</pre>
  </dd>

  <dt>style:compile</dt>
  <dd>Uses <code>sass</code> to compile all the <code>lib/components/{{component-name}}/css/*.scss</code> files.</dd>

  <dt>script:lint</dt>
  <dd>Runs <code>jshint</code> on all the <code>lib/components/{{component-name}}/js/*.js</code> files. Uses <code>.jshintrc</code> for configuration.</dd>

  <dt>script:test</dt>
  <dd>Runs all the <a href="http://mochajs.org/">Mocha</a> unit tests inside the <code>lib/components/{{component-name}}/test</code> directory.</dd>

  <dt>script:test:report:coveralls</dt>
  <dd>Sends test coverage data to <a href="https://coveralls.io/r/ikebana-ui/ikebana">coveralls.io</a>. Uses <a href="http://gotwarlost.github.io/istanbul">Istanbul</a>.</dd>

  <dt>script:minify</dt>
  <dd>Uses <a href="http://lisperator.net/uglifyjs">Uglify</a> to minify all the <code>lib/components/{{component-name}}/js/*.js</code> files.</dd>

  <dt>style:doc</dt>
  <dd>Uses <a href="http://github.com/trulia/hologram">Hologram</a> to generate a styleguide.</dd>

  <dt>dist:sources</dt>
  <dd>Copies all the files under <code>lib/components/**.*</code> (excluding <code>lib/components/{{component-name}}/test/**.*<code>) to the <code>dist</code> directory.</dd>

  <dt>dist:zip</dt>
  <dd>Compresses (zip) all the component files in <code>dist/components/{{component-name}}</code> to <code>dist/components/{{component-name}}/{{component-name}}-{{package-version}}.zip<code>.</dd>

  <dt>serve</dt>
  <dd>Creates a live-reload server using browser-sync.</dd>

  <dt>build</dt>
  <dd>Cleans and builds the entire project to the <code>dist</code> directory.</dd>

  <dt>default</dt>
  <dd>Just lists all the available tasks.</dd>
</dl>

### :rocket: Distributing a component

* Use `gulp build` to create a distributable version of all the components in the `dist` folder.



## :scroll: License

Ikebana is licensed under the [MIT license](license.md).

---
