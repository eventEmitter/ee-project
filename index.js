
	var   fs 			= require( "fs" )
		, childProcess 	= require( "child_process" )
		, file 			= fs.existsSync( process.argv[ 1 ].indexOf( ".js" ) >= 0 ? process.argv[ 1 ] : process.argv[ 1 ] + ".js" ) ?  process.argv[ 1 ] + ".js" :  process.argv[ 1 ]
		, isDir 		= fs.existsSync( file ) && fs.statSync( file ).isDirectory()
		, path 			= ( isDir ? file : file.substr( 0, process.argv[ 1 ].lastIndexOf( "/" ) ) ) + "/";



	var Class = require( "ee-class" );

	module.exports = new ( new Class( {
		  root: 	path
		, config: 	fs.existsSync( path + "config.js" ) ? require( path + "config.js" ) : {}

		, getGITRevision: function( callback ){
			childProcess.exec( "cd "+path+" && git rev-parse HEAD", function( err, stdout, stderr ){
				if ( err ) callback( err );
				else if ( !stdout || stdout.trim().length < 10 ) callback( new Error( "failed to load git reveision!" ) );
				else callback ( null, stdout.trim() );
			}.bind( this ) );
		}
	} ) )();
