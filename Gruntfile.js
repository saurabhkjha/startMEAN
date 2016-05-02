var timer = require('grunt-timer');

module.exports = function (grunt) {
    'use strict';
    //timer.init(grunt);
    timer.init(grunt, {
        deferLogs: true,
        friendlyTime: true,
        color: 'blue'
    });
    // Project configuration.
    grunt.initConfig({
        clean: {
            release: {
                src: ['bin/*']
            },
            default: {
                src: ['bin/*']
            },
            doc:{
                src:['doc/*']
            }

        }, jshint: {
            default: {
                options: {
                    /*reporter: require('jshint-stylish'),*/
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    globals: {
                        jQuery: true,
                        $: true,
                        amplitude: true,
                        window: true,
                        angular: true,
                        localString: true,
                        locale: true,
                        console: true
                    }
                },
                src: ['*.js', 'public/**/*.js', '!build/','!node_modules/', '!Gruntfile.js', '!public/js/vendor/*.js','!public/js/vendor/**/*.js']
            }
        },
         htmlmin: { // Task
            default: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: 'public',
                    src: ['**/*.html'],
                    dest: 'bin/build/views/'
                }]
            },
            release: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        flatten: true,
                        cwd: 'public',
                        src: ['**/*.html'],
                        dest: 'bin/build/views/'
                    }
                    , {
                    src: ['public/index.html.tmpl'],
                    dest: 'bin/build/index.html'
                }
                ]
            }
        },
       cssmin: { // Task
            default: { // Target

                files: [{
                    expand: true,
                    cwd: 'public',
                    src: '**/*.css',
                    dest: 'bin/build/'
                }]
            },
            release: {
                src: ["public/css/bootstrap.min.css",
                    "public/css/styles.css",
                   
                ],
                dest: 'bin/build/css/all.min.css'
            }
        },
        targethtml: {
            debug: {
                files: {
                    'bin/build/index.html': 'public/index.html.tmpl'
                }
            },
            release: {
                files: {
                    'bin/build/index.html': 'public/index.html.tmpl'
                }
            }
        },
        copy: { // Task
            default: { // Target

                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['**/*.{ttf,svg,eot,woff}', '**/*.{png,gif,jpg,jpeg,xml,txt}'],
                    dest: 'bin/build/'
                }]
            },
            release: { // Target

                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['**/*.{ttf,svg,eot,woff,xml,txt}'],
                    dest: 'bin/build/'
                }, {
                    expand: true,
                    cwd: '.',
                    src: ['server/*.js', 'server/**/*.js'],
                    dest: 'bin/'
                }]
            },
            debug: { // Target

                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['**/*.{ttf,svg,eot,woff}', '**/*.{png,gif,jpg,jpeg,xml,txt}', '**/*.js'],
                    dest: 'bin/build/'
                }, {
                    expand: true,
                    cwd: '.',
                    src: ['server/*.js', 'server/**/*.js','server/**/*.ejs'],
                    dest: 'bin/'
                }]
            }
        }
        

    });

    
    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-targethtml');
   
    grunt.registerTask('debug', ['clean:release', 'jshint', 'copy:debug','htmlmin:default','cssmin:default','targethtml:debug']);
   
};