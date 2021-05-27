const { get } = require( "../utils/config" );

let I;

module.exports = {

	_init() {
		I = actor();
	},

	openHomepage() {
		I.amOnPage( "/" );
		I.see( "Just another WordPress site" );
	},

	openFrontpage() {
		I.amOnPage( "/" );
		I.see( "Just another WordPress site" );
	},

	openPostsPage() {
		I.amOnPage( get( "posts_page" ) );
	},

	openPost1() {
		I.amOnPage( get( "post1" ) );
		I.see( get( "post1_title" ) );
	},

	openPost2() {
		I.amOnPage( get( "post2" ) );
		I.see( get( "post2_title" ) );
	},

	openPost3() {
		I.amOnPage( get( "post3" ) );
		I.see( get( "post3_title" ) );
	},

	openMovie() {
		I.amOnPage( get( "movie" ) );
		I.see( get( "movie_post_title" ) );
	},

	openSong() {
		I.amOnPage( get( "song" ) );
		I.see( get( "song_post_title" ) );
	},

	openEarlyLunch() {
		I.amOnPage( get( "custom_tag" ) );
	},

	openPage1() {
		I.amOnPage( get( "page1" ) );
		I.see( get( "page1_title" ) );
	},

	openPage2() {
		I.amOnPage( get( "page2" ) );
		I.see( get( "page2_title" ) );
	},

	openCategory1() {
		I.amOnPage( get( "category1" ) );
	},

	openCategory2() {
		I.amOnPage( get( "category2" ) );
	},

	openCategoryTester() {
		I.amOnPage( get( "category_tester" ) );
	},

	openTag1() {
		I.amOnPage( get( "tag1" ) );
	},

	openTag2() {
		I.amOnPage( get( "tag2" ) );
	},

	openAuthorArchive( author ) {
		I.amOnPage( "/author/" + author );
	},

	openDateArchive() {
		var d = new Date();
		var curMonth = d.getMonth() + 1;
		var curYear = d.getFullYear();
		I.amOnPage( "/" + curYear + "/" + curMonth );
	},
	// Insert your locators and methods here
};
