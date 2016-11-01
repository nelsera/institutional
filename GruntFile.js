'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Load grunt tasks automatically
    require('jit-grunt')(grunt);

    // configurable paths
    var config = {
            source: 'src/',
            dist: 'pub/',
            assets: {
                requirejs: {},
                cssmin: {},
                header: {}
            }
        },
        assets = grunt.file.readJSON(config.source + '.assets');

    assets.forEach(function (asset) {
        config.assets.requirejs[asset] = {
            options: {
                baseUrl: '<%= config.source %>scripts',
                optimize: 'uglify2',
                include: ['requirejs', asset + '-config'],
                mainConfigFile: [
                    '<%= config.source %>scripts/client/config.js',
                    '<%= config.source %>scripts/' + asset + '-config.js'
                ],
                out: '<%= config.dist %>scripts/' + asset + '-body.min.js',
                generateSourceMaps: true,
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true,
                findNestedDependencies: true
            }
        };
        config.assets.cssmin['<%= config.dist %>styles/' + asset + '-styles.min.css'] =
            '.tmp/styles/' + asset + '-styles.css';
        config.assets.cssmin['<%= config.dist %>styles/fonts/' + asset + '-fonts.min.css'] =
            '<%= config.source %>styles/fonts/' + asset + '-fonts.css';
        config.assets.header['<%= config.dist %>scripts/' + asset + '-header.min.js'] = [
            '<%= config.source %>scripts/vendors/modernizr/modernizr.js'
        ];
    });

    grunt.initConfig({
        config: config,
        watch: {
            compass: {
                files: ['<%= config.source %>styles/**/*.{scss,sass}'],
                tasks: ['compass:server', 'copy:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>'
                    ]
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= config.source %>styles',
                cssDir: '.tmp/styles',
                specify: assets.map(function (asset) {
                    return '<%= config.source %>styles/' + asset + '-styles.scss';
                }),
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= config.source %>images',
                javascriptsDir: '<%= config.source %>scripts',
                fontsDir: '<%= config.source %>styles/fonts',
                importPath: '<%= config.source %>scripts/vendors',
                httpImagesPath: '../images',
                httpGeneratedImagesPath: '../images/generated',
                require: ['sass-css-importer'],
                httpFontsPath: 'fonts',
                assetCacheBuster: true
            },
            dist: {
                options: {
                    debugInfo: false,
                    generatedImagesDir: '<%= config.dist %>images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        browserSync: {
            bsFiles: {
                src : '<%= config.source %>'
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./<%= config.source %>"
                }
            }
        },
        requirejs: config.assets.requirejs,
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= config.dist %>images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>images',
                    src: '**/*.svg',
                    dest: '<%= config.dist %>images'
                }]
            }
        },
        cssmin: {
            options: {
            },
            dist:  {
                files: config.assets.cssmin
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: assets.map(function (asset) {
                    return {
                        expand: true,
                        cwd: '<%= config.source %>' + asset + '-templates',
                        src: '**/*.html',
                        dest: '<%= config.dist %>' + asset + '-templates'
                    };
                })
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.source %>',
                        dest: '<%= config.dist %>',
                        src: [
                            'favicon.png',
                            'images/**/*.*',
                            'styles/fonts/**/*.{eot,svg,ttf,woff,woff2}'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.source %>styles',
                dest: '.tmp/styles/',
                src: assets.map(function (asset) {
                    return asset + '-styles.css';
                })
            },
            watch: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '.tmp/images/',
                        dest: '<%= config.source %>images',
                        src: '**/*.*'
                    }
                ].concat(
                    assets.map(function (asset) {
                        return {
                            expand: true,
                            dot: true,
                            cwd: '.tmp/styles/',
                            dest: '<%= config.source %>styles',
                            src: asset + '-styles.css'
                        };
                    })
                )
            }
        },
        uglify: {
            header: {
                files: config.assets.header
            }
        },
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        concurrent: {
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'copy:watch',
        'cssmin',
        //'imagemin',
        'requirejs',
        'htmlmin',
        'processhtml',
        'uglify:header',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
    grunt.registerTask('styles', [
        'compass:server', 'copy:watch'
    ]);

    grunt.registerTask('dev', ['browserSync', 'styles', 'watch']);
};
