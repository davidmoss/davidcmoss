module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json'),
			staticRoot = './davidcmoss/static/';

  grunt.initConfig({
    pkg: pkg,
    less: {
        production: {
            options: {
								compress: true
            },
            files: {
                "./davidcmoss/static/css/main.css": staticRoot + "less/main.less"
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less']);

};