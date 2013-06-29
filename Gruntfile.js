module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'jasmine_node']);
  grunt.registerTask('default', ['test']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: {
        src: ['*.js']
      }
    },
    jasmine_node: {
      specNameMatcher: 'spec',
      projectRoot: 'spec/',
      requirejs: false,
      forceExit: true
    }
  });
};