module.exports = function(grunt) {
  var foldername = grunt.option('foldername');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["target"],

    uglify: {
      options: {
        banner: '/*! <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js_min: {
        src: 'lib/components/'+foldername+'/*.js',
        dest: 'target/lib/components/'+foldername+'/'+foldername+'.min.js'
      },
      js_ikebana:{
        src: 'lib/components/ikebana/*.js',
        dest: 'target/lib/components/ikebana/ikebana.min.js'
      }
    }
    ,
    cssmin: {
      minify: {
        expand: true,
        src: ['lib/components/'+foldername+'/*.css'],
        dest: 'target/',
        ext: '.min.css'
    },
    minify_ikebana: {
        expand: true,
        src: ['lib/components/ikebana/*.css'],
        dest: 'target/',
        ext: '.min.css'
    }
  }
    ,
    concat:{
      options: {
        banner: '/*! singlified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
       js: {
        src:'lib/components/**/*.js',
        dest:'target/lib/components/ikebana/js-ikebana.js'
      },
      css: {
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
  grunt.registerTask('clean',['clean']);
  grunt.registerTask('build',['concat','uglify','cssmin']);
  
  // grunt.registerTask('archive',['compress']);
};