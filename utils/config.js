const memoize = require( "lodash/memoize" );
const fs = require( "fs" );
const path = require( "path" );
const yaml = require( "js-yaml" );

const loadYaml = memoize( function() {
	const filePath = path.resolve( __dirname, "../", "./testData.yml" );

	try {
		return yaml.safeLoad( fs.readFileSync( filePath, "utf8" ) );
	} catch ( e ) {
		console.error( "Loading Yaml file failed" );
		throw e;
	}
} );

/**
 * Returns the configuration with the given key.
 *
 * @param { string } key The key from the configuration to retrieve.
 *
 * @returns {*} The configuration.
 */
function get( key ) {
	const config = loadYaml();

	return config[ key ];
}

module.exports = {
	get,
};
