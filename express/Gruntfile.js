module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['lib/*.js','database/*.js','routes/*.js','*.js'],//,'public/javascripts/*.js'
                tasks: ['jshint'],
                options: {
                    spawn: true,
                },
            },
            configFiles: {
                files: ['Gruntfile.js', 'config/*.js'],
                options: {
                    reload: true
                }
            },
            html: {
                files: ['*.html'],
                options: {
                    reload: true
                }
            },
            css: {
                files: 'scss/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
            express: {
              files:  [ '**/*.js' ],
              tasks:  [ 'express:dev' ],
              options: {
                spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded 
              }
            }
            // concurrent: {
            //     files:  [ '**/*.js' ],
            //     tasks:  [ 'concurrent' ],
            // }
        },
        // sass: {
        //     dist: {
        //         files: {
        //             'public/stylesheets/user.css': 'scss/user.scss',
        //             'public/stylesheets/settings.css': 'scss/settings.scss',
        //             'public/stylesheets/organization.css': 'scss/organization.scss'
        //         }
        //     }
        // },
        sass: {
            dist: {
              files: [{
                expand: true,
                cwd: 'scss',
                src: ['**/*.scss'],
                dest: 'public/stylesheets',
                ext: '.css'
              },

              ]
            }
        },
        jshint: {
            all: {
                src: ['lib/*.js','database/*.js','routes/*.js','*.js'],//,'public/**/*.js'
            },
        },
        open: {
            all: {
                path: 'http://localhost:3000/index.html'
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: {
                        //target: 'http://localhost:9000/index.html'
                    },
                    base: [
                        './'
                    ]
                }
            }
        },
        concurrent: {
            target: {
                tasks: ['express', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
          express: {
            options: {
              // Override defaults here 
              spawn: false
            },
            dev: {
              options: {
                script: 'bin/www'
              }
            },
            prod: {
              options: {
                script: 'bin/www',
                node_env: 'production'
              }
            },
            test: {
              options: {
                script: 'bin/www'
              }
            }
          }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-express-server');
    // Default task(s).
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.registerTask('default', ['express', 'watch']);

};
