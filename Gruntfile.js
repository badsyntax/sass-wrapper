module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.registerTask('test', ['jasmine_node']);
  grunt.registerTask('default', ['test']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine_node: {
      specNameMatcher: 'spec',
      projectRoot: 'spec/',
      requirejs: false,
      forceExit: true
    }
  });
};