'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function(grunt) {

    /**
     * Configurations for the various modules
     */
    grunt.initConfig({

        // constants
        dir: {
            webapp: 'src',
            dist: 'dist',
            bower_components: 'bower_components'
        },


        connect: {
            src: {
                options: {
                    port: 8080,
                    hostname: 'localhost',
                    keepalive: true,
                    base: 'src',
                    middleware: function(connect, options) {

                        console.log(connect)
                        return [
                            proxySnippet,
                            require('serve-static')(options.base[0])
                        ]
                    }
                },
                proxies: [{
                    context: '/system-local/public/lcabrera/MyNorthWindOnHANA',
                    host: '52.210.13.50',
                    port: 8010,
                    https: false,
                    headers: {
                        "Authorization": "Basic " + new Buffer("lcabrera:Diego261209").toString('base64')
                            //"cookie": "xsIdBBE999A7C321FB19324EDD11DEC33693=9C7E9AE2C60D744293C34504D44BF0AB; sapxslb=52A300E5DDEB224183C1C096B0ABC919"
                    }
                }, {
                    context: '/sap/bc/shell_json/',
                    host: 'sapddd3.europe.shell.com',
                    port: 8003,
                    https: false,
                    headers: {
                        "Authorization": "Basic " + new Buffer("NLIMOB:Justbi.21").toString('base64')
                    }
                }]
            },
            dist: {}
        },


        openui5_preload: {
            component: {
                options: {
                    resources: {
                        cwd: '<%= dir.webapp %>',
                        prefix: 'justbi.mainapp'
                    },
                    dest: '<%= dir.dist %>'
                },
                components: true
            }
        },

        clean: {
            dist: '<%= dir.dist %>/'
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.webapp %>',
                    src: [
                        '**',
                        '!components/**',
                        '!test/**'
                    ],
                    dest: '<%= dir.dist %>'
                }]
            }
        },

        eslint: {
            webapp: ['<%= dir.webapp %>']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-openui5');
    grunt.loadNpmTasks('grunt-eslint');


    grunt.registerTask('serve', function(target) {
        grunt.task.run([
            'configureProxies:src',
            'connect:src'
        ]);
    });

    grunt.registerTask('lint', [
        'eslint'
    ]);

    grunt.registerTask('build', [
        'clean',
        'openui5_preload',
        'copy'
    ]);

    grunt.registerTask('default', [
        //'lint',
        'clean',
        'build',
        'serve'
    ]);
};