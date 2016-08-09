'use strict';
module.exports = function (grunt) {
    grunt.config('jshint', {
        jshint: {
            src: [
                'spec/*/*.js',
                'app.js',
                'routes/*.js'
            ],
            options: {
                jshintrc: './.jshintrc',
                reporter: require('jshint-teamcity')
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
