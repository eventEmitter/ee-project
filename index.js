	
	var   fs 			= require( "fs" )
		, childProcess 	= require( "child_process" )
		, isDir 		= fs.existsSync( process.argv[ 1 ] ) && fs.statSync( process.argv[ 1 ] ).isDirectory()
		, path 			= ( isDir ? process.argv[ 1 ] : process.argv[ 1 ].substr( 0, process.argv[ 1 ].lastIndexOf( "/" ) ) ) + "/";


	module.exports = {
		  root: 			path
		, config: 			fs.existsSync( path + "config.js" ) ? require( path + "config.js" ) : {}
		, getGITRevision: function( callback ){
			childProcess.exec( "cd "+path+" && git rev-parse HEAD", function( err, stdout, stderr ){
				if ( err ) callback( err );
				else if ( !stdout || stdout.trim().length < 10 ) callback( new Error( "failed to load git reveision!" ) );
				else callback ( null, stdout.trim() );
			}.bind( this ) );
		}
	};