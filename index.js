	
	var   fs 			= require( "fs" )
		, childProcess 	= require( "child_process" )
		, file 			= process.argv[ 1 ].indexOf( ".js" ) >= 0 ? process.argv[ 1 ] : process.argv[ 1 ] + ".js"
		, isDir 		= fs.existsSync( file ) && fs.statSync( file ).isDirectory()
		, path 			= ( isDir ? file : file.substr( 0, process.argv[ 1 ].lastIndexOf( "/" ) ) ) + "/";


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