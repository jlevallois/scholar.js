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
    jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false,
          "$": false,
          "jQuery": false
				}
			},
			files: [ 'Gruntfile.js', 'src/scholar.js' ]
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
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // Default task(s).
  grunt.registerTask('default', ['js']);
  grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );
  grunt.registerTask( 'serve', [ 'watch' ] );

};
