module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.loadTasks('tasks');

  // Default task(s)

  grunt.registerTask('default', [
    'jshint',
    'jscs',
    'jasmine_node'
  ]);

};