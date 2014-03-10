# Ikebana

> Ikebana (/ˌɪkɪˈbɑːnə/) is a UI component library.  
> [ikebana-ui.github.io/ikebana](http://ikebana-ui.github.io/ikebana)

[![Build Status](https://travis-ci.org/ikebana-ui/ikebana.png?branch=master "Build status - Travis")](https://travis-ci.org/ikebana-ui/ikebana) [![Dependencies](https://david-dm.org/ikebana-ui/ikebana.png?theme=shields.io "Node package dependencies - David")](https://david-dm.org/ikebana-ui/ikebana) [![Dependency Status](https://gemnasium.com/ikebana-ui/ikebana.png "Ruby gem dependencies - Gemnasium")](https://gemnasium.com/ikebana-ui/ikebana) <a href="https://codeclimate.com/github/rails/rails" title="JSLint - Code Climate"><img src="https://codeclimate.com/github/rails/rails.png" /></a> [![Coverage Status](https://coveralls.io/repos/ikebana-ui/ikebana/badge.png "Code coverage - Coveralls")](https://coveralls.io/r/ikebana-ui/ikebana) [![Stories in Ready - Waffle](https://badge.waffle.io/ikebana-ui/ikebana.png?label=ready&title=Ready "Stories in Ready - Waffle")](https://waffle.io/ikebana-ui/ikebana) [![License](http://img.shields.io/badge/license-MIT-blue.svg "Licensed under MIT")](license.md)

## Getting started

Ikebana components can be installed using [Bower](http://bower.io) from `http://ikebana-ui.github.io/ikebana/dist/<component-name>.zip`.

For example, to install the latest version of the **Button** component...

```
bower install http://ikebana-ui.github.io/ikebana/dist/components/button.zip
```

**NOTE**: The packages are not available yet as Ikebana is still under development.

## Developing

Ensure that you have [Node.js](http://nodejs.org), [Bundler](http://bundler.io) and [Bower](http://bower.io). Next, run...

```
git clone git@github.com:ikebana-ui/ikebana.git
cd ikebana
bundle install && npm install && bower install
gulp dist
```

Once done, the `dist` directory will have the built artefacts in the `master` branch. To view other Gulp tasks, just run `gulp`.

## Contributing

You are welcome to contribute components to Ikebana; just fork this repo and send us a pull request. Please read the [Contributing](https://github.com/ikebana-ui/ikebana/wiki/Contributing) wiki for more details.

### Creating a new component

Use `gulp create --name <component-name>` to create a new component. This will create a new directory under `lib/components/<component-name>`.

### Developing a component

Use `gulp server` to fire up a live-reload server. You can then open `http://localhost:4000/<component-name>/<component-name>.html` and start development. The live-reload server will watch the `lib/components` directory and reload your browser upon detecting changes.

### Distributing a component

Use `gulp dist` to create a distributable version of all the components.

## License

Ikebana is licensed under the [MIT license](license.md).

---
