module.exports = function(grunt) {
  var component = grunt.option('component');
  var flavour = grunt.option('flavour');
  var name = flavour+'/'+(typeof component == 'undefined' ? flavour : (component+'/'+flavour+'_'+component));
  var concat_src = (typeof component == 'undefined' ? '*' : component);

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      clean: ["target"],

      uglify: {
        selected_component_js: {
          src: 'target/flavours/'+flavour+'/*.js',
          dest: 'target/flavours/'+name+'.min.js'
        }
      },

      cssmin: {
        selected_component_css: {
          src: 'target/flavours/'+flavour+'/*.css',
          dest: 'target/flavours/'+name+'.min.css'
        }
      },

      concat:{
        selected_component_js: {
          src: 'lib/flavours/'+flavour+'/'+ concat_src +'/*.js',
          dest: 'target/flavours/'+name+'-singlified.js'
        },

        selected_component_css: {
          src: 'lib/flavours/'+flavour+'/'+ concat_src +'/*.css',
          dest: 'target/flavours/'+name+'-singlified.css'
        },
      },

      compress:{
        main : {
          options: {
              mode: 'zip',
              archive : 'target/compressed/'+ (typeof component == 'undefined' ? flavour : flavour +'_'+ component) +'.zip'
          },

          files: [
            {expand: true, cwd: 'target/flavours/'+ (typeof component == 'undefined' ? flavour : flavour +'/'+ component) + '/', src: ['*']}
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
  
  grunt.registerTask('build-this',['concat:selected_component_js','concat:selected_component_css','uglify:selected_component_js','cssmin']);

  grunt.registerTask('archive-this',['compress']);
};