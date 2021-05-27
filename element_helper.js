const assert = require( "assert" );

class ElementHelper extends Helper {

	async seeOneOfTheseElements( locators ) {
		for ( let i = 0; i < locators.length; i++ ) {
			let els = await this.helpers[ "Puppeteer" ]._locate( locators[ i ] );

			if ( els.length > 0 ) {
				assert.strictEqual( 0, 0 );
				return;
			}
		}
		assert.strictEqual( "pindakaas", "helaas" );
	}

	async clickMultipleTimes( locator, amount = 3 ) {
        let els = await this.helpers.Puppeteer._locate( locator );

        await els[ 0 ].click( {
			clickCount: amount,
        } );
        return this.helpers.Puppeteer._waitForAction();
	}
}

module.exports = ElementHelper;
