	
	var   fs 	= require( "fs" )
		, path 	= process.argv[ 1 ].substr( 0, process.argv[ 1 ].lastIndexOf( "/" ) + 1 );


	module.exports = {
		  root: 		path
		, config: 		fs.existsSync( path + "config.js" ) ? require( path + "config.js" ) : {}
	};