module.exports = function(grunt) {
  var component = grunt.option('component');
  var archive = typeof component != 'undefined' ? component : 'ikebana';

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: ["target"],

      uglify: {
        options: {
          banner: '/*! <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        selected_component_js: {
          src: 'lib/components/'+component+'/*.js',
          dest: 'target/lib/components/'+component+'/'+component+'.min.js'
        },
        all_component_js:{
          src: 'target/lib/components/ikebana/ikebana.js',
          dest: 'target/lib/components/ikebana/ikebana.min.js'
        }
      }
      ,
      cssmin: {
        selected_component: {
          expand: true,
          src: ['lib/components/'+component+'/*.css'],
          dest: 'target/',
          ext: '.min.css'
        },
        all_component: {
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
        selected_component_js: {
          src:'lib/components/'+component+'/*.js',
          dest:'target/lib/components/'+component+'/'+component+'-singlified.js'
        },
        selected_component_css: {
          src: 'lib/components/'+component+'/*.css',
          dest: 'target/lib/components/'+component+'/'+component+'-singlified.css'
        }, 
        all_component_js: {
          src:'lib/components/**/*.js',
          dest:'target/lib/components/ikebana/ikebana.js'
        },
        all_component_css: {
          src: 'lib/components/**/*.css',
          dest: 'target/lib/components/ikebana/ikebana.css'
        }
      }
      ,
      compress:{
        main : {
          options: {
              mode: 'zip',
              archive : 'target/compressed/'+ archive +'.zip'
          },

          files: [
            {expand: true, cwd: 'target/lib/components/'+ archive, src: ['*']}
          ]
        }
      }
    }
  );

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('clear',['clean']);
  
  grunt.registerTask('build-ikebana',['concat:all_component_js','concat:all_component_css','uglify:all_component_js','cssmin:all_component']);
  grunt.registerTask('build-this',['concat:selected_component_js','concat:selected_component_css','uglify:selected_component_js','cssmin:selected_component']);

  grunt.registerTask('archive-all',['compress']);
  grunt.registerTask('archive-this',['compress']);
};