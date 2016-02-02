module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
			banner:
				'/*!\n' +
				' * scholar.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
				' * https://github.com/jlevallois/scholar.js\n' +
				' * CC-BY-NC-SA-4.0 licensed\n' +
				' *\n' +
				' * Copyright (C) 2016 Jérémy Levallois, http://karganys.fr\n' +
				' */'
		},
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        src: 'src/scholar.js',
        dest: 'dist/scholar.min.js'
      }
    },
    watch: {
			options: {
				livereload: true
			},
			js: {
				files: [ 'Gruntfile.js', 'src/scholar.js' ],
				tasks: 'js'
			}
		}
  });

  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // Default task(s).
  grunt.registerTask('default', ['js']);
  grunt.registerTask( 'js', [ 'uglify' ] );
  grunt.registerTask( 'serve', [ 'watch' ] );

};
