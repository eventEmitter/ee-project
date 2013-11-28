
	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, assert 		= require('assert')
		, fs 			= require('fs');




	var project = require('../');


	describe('The Project library', function(){

		it('Should be able to return the project path', function(done){
			assert.ok(project.root);

			this.timeout(10000);

			// fake git
			if (!fs.existsSync(project.root+'.git')){
				log.warn('copying «'+project.root+'test/git» to «'+project.root+'.git» in 5 seconds, this may overwrite you git data! you may abort now!');
				setTimeout(function(){
					fs.renameSync(project.root+'.git', project.root+'test/git');
					done();
				}, 8000);				
			}
			else done();
		});

		it('Should be able to return the config.js contents', function(){
			assert.deepEqual(project.config,  {
				  test:   	true
				, passing: 	'test'
			});
		});	

		it('Should be able to return the GIT revision', function(done){
			project.git.revision(done);
		});

		it('Should be able to return the GIT remote', function(done){
			project.git.remote(done);
		});

		it('Should be able to return the GIT remote repository', function(done){
			project.git.remoteRepository(done);
		});
	});
	