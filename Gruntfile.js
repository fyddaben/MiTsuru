'use strict';

var PORT = 35730;

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var miConfig = {
        dev: './source',
        target:'./public',
        views:'./views'
    };

    grunt.initConfig({
        mi: miConfig,
        watch: {
            less: {
             files: ["<%= mi.dev %>/less/*.less"],
             tasks: ["less"]
            },
            coffee:{
                files: ["<%= mi.dev %>/coffee/*.coffee"],
                tasks: ["coffee"]
            },
            jsmin:{
                files: ["<%= mi.dev %>/js/*.js"],
                tasks: ["uglify:main"]
            },
            livereload: {
                options: {
                    livereload: PORT
                },
                files: [
                    '<%= mi.views %>/*.html',
                    '<%= mi.target %>/js/*.js',
                    '<%= mi.target %>/css/*.css'
                ]
            }
        },
        //coffee
        coffee:{
            glob_to_multiple: {
                sourceMap:true,
                expand: true,
                cwd: '<%= mi.dev %>/coffee/',
                src: ['*.coffee'],
                dest: '<%= mi.dev %>/js',
                ext: '.js'
            }
        },
        //jsmin
        uglify:{
            main:{
                options:{
                    mangle:true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= mi.dev %>/js/',
                        src: ['*.js'],
                        dest: '<%= mi.target %>/js',
                        ext: '.min.js'
                    }
                ]
            }
        },
        // less
        less: {
            minify:{
                options: {
                    compress:true,
                    yuicompress: true
                },
                files: [
                     {
                        expand: true,
                        cwd: "<%= mi.dev %>/less/",
                        src: ["*.less"],
                        dest: "<%= mi.target %>/css",
                        ext: ".css"
                    }
                ]
            }
        }
    });
    // 只检查改动过的文件
    grunt.event.on('watch', function (action, filepath) {
        grunt.config('jshint.build.files.src', filepath);
    });

    grunt.registerTask('default', function(target){

        grunt.task.run([
            'watch'
        ]);
    });
};