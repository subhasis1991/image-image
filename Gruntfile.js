module.exports = function(grunt){
	grunt.initConfig({

		// jshint: {
		//      files: [
		//      	'public/app1/scripts/**/*.js'
		//      	// 'public/app1/bower_components/angular/*.js'
		//      ],
		//       options: {
		//         jshintrc: '.jshintrc'
		//       }
		//     },

		watch: {
			// files: "public/app1/styles/less/*",
   //          tasks: ["less","jshint"],

			options:{
				livereload: true
			},

			//back end
			js: {
				files : [
					//routers
					'routes/*.js',
					'app.js'
				]
			},

			ejs:{
				files :[
					'views/*.ejs',
					'views/partials/*.ejs'
				]
			},

			//front end
			html: {
				files: [					
					'public/app/*.html',
					'public/app/views/*.html',
					'public/app/html/*.html',
					'public/app1/views/*.html'
					]
			},

			js: {
				files: [
					'public/scripts/main.js',
				]
			},
			css: {
				files: [
					'public/styles/*.css'
				]
			},

			reloadWatch: {
				files: 'Gruntfile.js',
				options: {
					reload: true
				}
			}

			
        }

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default',['watch']);

};
