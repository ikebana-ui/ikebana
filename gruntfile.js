module.exports = function(grunt) {
  var foldername = grunt.option('foldername');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["target"],

    uglify: {
      options: {
        banner: '/*! <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js_selected: {
        src: 'lib/components/'+foldername+'/*.js',
        dest: 'target/lib/components/'+foldername+'/'+foldername+'.min.js'
      },
      js_all:{
        src: 'target/lib/components/ikebana/js-ikebana.js',
        dest: 'target/lib/components/ikebana/ikebana.min.js'
      }
    }
    ,
    cssmin: {
      selected: {
        expand: true,
        src: ['lib/components/'+foldername+'/*.css'],
        dest: 'target/',
        ext: '.min.css'
      },
      all: {
          expand: true,
          src: ['target/lib/components/ikebana/*.css'],
          ext: '.min.css'
      }
    }
    ,
    concat:{
      options: {
        banner: '/*! singlified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js_selected: {
        src:'lib/components/'+foldername+'/*.js',
        dest:'target/lib/components/'+foldername+'/'+foldername+'-singlified.js'
      },
      css_selected: {
        src: 'lib/components/'+foldername+'/*.css',
        dest: 'target/lib/components/'+foldername+'/'+foldername+'-singlified.css'
      }, 
      js_all: {
        src:'lib/components/**/*.js',
        dest:'target/lib/components/ikebana/js-ikebana.js'
      },
      css_all: {
        src: 'lib/components/**/*.css',
        dest: 'target/lib/components/ikebana/css-ikebana.css'
      }
    }
    // ,
    // compress:{
    //   main:{
    //   options:{
    //     archive:'compressed/archived.zip'
    //   },
    //   files:[
    //     {src:['src/js/*.js','src/css/*.css']},
    //   ]
    // }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('clear',['clean']);
  grunt.registerTask('build-all',['concat:js_all','concat:css_all','uglify:js_all','cssmin:all']);
  grunt.registerTask('build-selected',['concat:js_selected','concat:css_selected','uglify:js_selected','cssmin:selected']);

  // grunt.registerTask('archive',['compress']);
};