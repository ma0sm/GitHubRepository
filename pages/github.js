const { get } = require( "../utils/config" );

let I;

module.exports = {

	_init() {
		I = actor();
	},
	login() {
		try{
			I.amOnPage( "/" );
			I.click( "Sign in" );
			I.waitForElement( "#login_field", get( "defaultTimeout" ) );
			I.fillField( "#login_field", get( "loginEmail" ) );
			I.fillField( "#password", get( "password" ) );
			I.click( "Sign in" );
			I.waitForElement( "//a[@href = '/notifications']" , get( "defaultTimeout" ) );
		} catch ( e ) {
			console.log( "Error while logging in:", e );
		}
	},

	logout() {
		try {
			I.amOnPage( "/" );
			I.click( "//summary[@aria-label='View profile and more']" );
			I.waitForElement( "//button[@class='dropdown-item dropdown-signout']", get( "defaultTimeout" ) );
			I.click( "//button[@class='dropdown-item dropdown-signout']" );
			I.waitForElement( "//a[@href = '/login']" );
		} catch ( e ) {
			console.log( "Error while logging out:", e );
		}
	},

	createRepository( addReadme, addGitIgnore, gitIgnoreTemplate, license, licenseType ) {
		try {
			I.amOnPage( "/new" );
			I.waitForElement("//meta[@content = '" + get("username") + "']", get("defaultTimeout" ) );
			I.fillField("#repository_name", get("repository"));
			I.fillField("#repository_description", get("repositoryDescription" ) );
			I.checkOption("#repository_visibility_" + get("repositoryVisibility" ) );
			if ( addReadme === true ) {
				I.checkOption("#repository_auto_init");
			}
			if ( addGitIgnore === true ) {
				I.checkOption("#repository_gitignore_template_toggle" );
				if ( gitIgnoreTemplate !== "" ) {
					I.click( "//*[text()[contains(.,'.gitignore template:')]]" );
					I.fillField("//input[@aria-label='Choose .gitignore type']", get("gitIgnoreTemplate") );
					I.click( "//*[text()='" + get("gitIgnoreTemplate") + "']" );
				}
			}
			if ( license === true ) {
				I.checkOption("#repository_license_template_toggle" );
				if ( licenseType !== "" ) {
					I.click( "//*[text()[contains(.,'License:')]]" );
					I.fillField("//input[@aria-label='License']", get("gitLicenseType" ) );
					I.click( "//*[text()[contains(.,'" + get("gitLicenseType") + "')]]" );
					I.pressKey( 'Enter' );
				}
			}
			I.click( "//button[@data-disable-with='Creating repository…']" );
			I.waitForElement( "//a[@href = '/" + get( "username" ) + "/" + get( "repository" ) + "']", get("defaultTimeout" ) )
		} catch ( e ) {
			console.log( "Error while creating repository:", e );
		}
	},

	editRepositoryFile( filename ) {
		try {
			I.amOnPage( "/" + get( "username" ) + "/" + get( "repository" ) + "/" + "edit/main/" + filename );

		} catch ( e ) {
			console.log( "Error while editing file " + filename + ":", e );
		}
	},

	removeAllTextFromFile() {
		try {
			I.click( "//pre[@class=' CodeMirror-line ']" );
			I.pressKey(['CommandOrControl', 'A']);
			I.pressKey( 'Delete' );
		} catch ( e ) {
			console.log( "Error while removing all text from file:", e );
		}
	},

	addTextToFile( text ) {
		try {
			I.fillField( "//div[@class='CodeMirror-code']", text );
		} catch ( e ) {
			console.log( "Error while adding text \"" + text + "\" to file:", e );
		}
	},

	fillCommitText( summary, description ) {
		try {
			I.scrollTo( "#commit-description-textarea" );
			I.fillField( "#commit-summary-input", summary );
			I.fillField( "#commit-description-textarea", description );
			I.click( "//button[@data-edit-text='Commit changes']" );
			I.click( "//a[@class='text-small text-mono Link--secondary']" );
			I.waitForElement( "//*[text()='" + get("readme_summary") + "']" );
		} catch ( e ) {
			console.log( "Error while filling in the commit text with summary \"" + summary + "\" and description \"" + description + "\":", e );
		}
	},

	checkCommitExists( commitSummary ) {
		try {
			I.amOnPage( "/" + get( "username" ) + "/" + get( "repository" ) + "/" + "commits/main/" );
			I.waitForElement( "//*[text()='" + commitSummary + "']" );

		} catch ( e ) {
			console.log( "Error while checking if commit \"" + commitSummary + "\" is present:", e );
		}
	},

	deleteRepository( repository ) {
		try {
			I.amOnPage( "/" + get( "username" ) + "/" + repository + "/" + "settings" );
			I.scrollTo( "//*[text()[contains(.,'Delete this repository')]]" );
			I.click( "//*[text()[contains(.,'Delete this repository')]]" );
			I.fillField( "//input[@name='verify']", get( "username" ) + "/" + repository );
			I.click( "//*[text()='I understand the consequences, delete this repository']" );
			I.waitForElement( "//*[text()[contains(.,'Your repository \"" + get( "username" ) + "/" + repository + "\" was successfully deleted.')]]" );
		} catch ( e ) {
			console.log( "Error while deleting repository " + repository + " :", e );
		}
	}
};
