'use strict';
module.exports = function (grunt) {
    grunt.config('jscs', {
        jscs: {
            src: [
                'spec/*/*.js',
                'app.js',
                'routes/*.js'
            ],
            options: {
                config: './.jscsrc',
                // the reporter plugin requires direct references to the reporter.js
                // it does not support require of the module as it does not export the js
                // https://www.npmjs.com/package/jscs-teamcity-reporter
                reporter: 'node_modules/jscs-teamcity-reporter/teamcity-reporter.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-jscs');
};
