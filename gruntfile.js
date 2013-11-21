module.exports = function(grunt) {
  var target = grunt.option('target');
  var target_js = target || '*.js';
  var target_css = target || '*.css';

  var js_dest = target_js.replace(".js","");
  js_dest = js_dest.replace("*","uglified");

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: 'src/js/'+ target_js,
        dest: 'build/js/'+js_dest+'.min.js'
      }
    }
    ,
    cssmin:{
      combine:{
        files:{
        'build/css/uglified.min.css':['src/css/*.css'] 
        }  
      }
    }
    ,
    concat:{
      options: {
        banner: '/*! singlified <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
       js: {
        src:'src/js/*.js',
        dest:'build/js/singlified.js'
      },
      css: {
        src: 'src/css/*.css',
        dest: 'build/css/singlified.css'
      }
    }
    ,
    compress:{
      main:{
      options:{
        archive:'compressed/archived.zip'
      },
      files:[
        {src:['src/js/*.js','src/css/*.css']},
      ]
    }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('minify', ['uglify:js','cssmin']);
  grunt.registerTask('minify-js', ['uglify:js']);
  grunt.registerTask('minify-css', ['cssmin']);

  grunt.registerTask('singlify',['concat:js','concat:css']);
  grunt.registerTask('singlify-js',['concat:js']);
  grunt.registerTask('singlify-css',['concat:css']);
  
  grunt.registerTask('archive',['compress']);
};