module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            options: {
                transform: [require('grunt-react').browserify],
                debug: true
            },
            app: {
                src: './src/js/index.js',
                dest: './src/dist/bundle.js'
            }
        },
        watch: {
            express: {
              files:  [ 'server.js', './leapset/*' ],
              tasks:  [ 'express:dev' ],
              options: {
                spawn: false
              }
            },
            build: {
                files: ['./src/js/*'],
                tasks: ['build']
            }
        },
        express: {
            dev: {
              options: {
                script: './server.js'
              }
            }
          }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['build', 'express:dev', 'watch']);
    grunt.registerTask('build', ['browserify:app']);
};