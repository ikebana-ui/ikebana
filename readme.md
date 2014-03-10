# Ikebana

> Ikebana (/ˌɪkɪˈbɑːnə/) is a UI component library.  
> [ikebana-ui.github.io/ikebana](http://ikebana-ui.github.io/ikebana)

[![Build Status](https://travis-ci.org/ikebana-ui/ikebana.png?branch=master)](https://travis-ci.org/ikebana-ui/ikebana) [![Dependencies](https://david-dm.org/ikebana-ui/ikebana.png)](https://david-dm.org/ikebana-ui/ikebana) [![Dependency Status](https://gemnasium.com/ikebana-ui/ikebana.png)](https://gemnasium.com/ikebana-ui/ikebana) <a href="https://codeclimate.com/github/rails/rails"><img src="https://codeclimate.com/github/rails/rails.png" /></a> [![Coverage Status](https://coveralls.io/repos/ikebana-ui/ikebana/badge.png)](https://coveralls.io/r/ikebana-ui/ikebana)

## Getting started

Ikebana components can be installed using [Bower](http://bower.io) from `http://ikebana-ui.github.io/ikebana/dist/<component-name>.zip`.

For example, to install the latest version of the **Button** component...

```
bower install `http://ikebana-ui.github.io/ikebana/dist/components/button.zip`
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

You are welcome to contribute components to Ikebana. Please read the (Contributing)[https://github.com/ikebana-ui/ikebana/wiki/Contributing] wiki for a detailed walkthrough.

## License

Ikebana is licensed under the [MIT license](license.md).

---
