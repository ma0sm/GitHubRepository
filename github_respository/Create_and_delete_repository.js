const { get } = require( "../utils/config" );

Feature( "In order to prove that I can write automated tests\n" +
	"As a test user\n" +
    "I need to create and delete a GitHub repository" );

Before( ( { I, github } ) => {
	github.login();
} );

Scenario( "Given a GitHub user account exists\n" +
	"And I am logged in\n" +
	"When I navigate to the Create Repository screen\n" +
	"And fill in the details\n" +
	"And submit\n" +
	"Then the new repository is created\n",
	async( { I, github } ) => {
		github.createRepository( true, true, "JENKINS_HOME", true, "The Unlicense" );
	} );

Scenario( "Given a GitHub user account exists\n" +
	"And I am logged in\n" +
	"And I have created a test repository\n" +
	"When I navigate to the repository\n" +
	"And create a README.md file\n" +
	"And commit and push it via the GitHub UI\n" +
	"Then a new commit will exist.\n",
	async( { I, github } ) => {
		github.editRepositoryFile( get( "readme" ) );
		github.removeAllTextFromFile();
		github.addTextToFile( get( "new_readme_text" ) );
		github.fillCommitText( get( "readme_summary" ), get( "readme_description" ) );
		github.checkCommitExists( get( "readme_summary" ) );
	} );

Scenario( "Given a GitHub user account exists\n" +
	"And I am logged in\n" +
	"And I have created a test repository\n" +
	"When I delete the repository\n" +
	"Then it will no longer exist.\n",
	async( { I, github } ) => {
		github.deleteRepository( get( "repository" ) );
	} );

After( async( { I, github } ) => {
	github.logout();
} );
