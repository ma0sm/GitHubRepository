class Response extends Helper {

	async customAmOnPage( url ) {
		if ( url.indexOf( "http" ) !== 0 ) {
			url = this.helpers.Puppeteer.options.url + url;
		}
		const response = await this.helpers.Puppeteer.page.goto( url, { timeout: this.helpers.Puppeteer.options.getPageTimeout, waitUntil: this.helpers.Puppeteer.options.waitForNavigation } );
		return new Promise( resolve => {
		  setTimeout( () => {
			resolve( response );
		  }, 500 );
		} );
	}
}

module.exports = Response;
