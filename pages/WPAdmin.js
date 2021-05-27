const { get } = require( "../utils/config" );

let I;

module.exports = {

	_init() {
		I = actor();
	},
	loginWPAdmin() {
		I.amOnPage( "/wp-login.php" );
		I.waitForElement( "#loginform", 10 );
		// To make sure login text is fully entered
		I.wait( 10 );
		I.fillField( "log", get( "admin_username" ) );
		I.fillField( "pwd", get( "admin_password" ) );
		I.click( "wp-submit" );
		I.waitForElement( "#wpadminbar", 10 );
	},

	loginTester() {
		I.amOnPage( "/wp-login.php" );
		I.waitForElement( "#loginform", 10 );
		// To make sure login text is fully entered
		I.wait( 10 );
		I.fillField( "log", get( "test_username" ) );
		I.fillField( "pwd", get( "test_password" ) );
		I.click( "wp-submit" );
		I.waitForElement( "#wpadminbar", 10 );
		I.wait( 3 );
		I.see( "Redirects", ".wp-menu-name" );
	},

	logoutWP() {
		I.amOnPage( "/wp-login.php?action=logout" );
		I.waitForElement( "#error-page", 10 );
		I.click( "log out" );
	},

	editPosts() {
		I.amOnPage( "/wp-admin/edit.php" );
		I.see( "Posts" );
	},

	editDrafts() {
		I.amOnPage( "/wp-admin/edit.php?post_status=draft&post_type=post" );
		I.see( "Posts" );
	},

	editGeneralSettings() {
		I.amOnPage( "/wp-admin/options-general.php" );
		I.see( "General Settings" );
	},

	editAdminUser() {
		I.amOnPage( "/wp-admin/profile.php?wp_http_referer=%2Fwp-admin%2Fusers.php" );
		I.see( "Profile" );
	},

	editTesterUser() {
		I.amOnPage( "/wp-admin/users.php" );
		I.click( "tester" );
		I.see( "Profile" );
	},

	editSEODashboard() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_dashboard#top#dashboard" );
		I.see( "Dashboard" );
	},

	editSEOFeatures() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_dashboard#top#features" );
		I.see( "Features" );
	},

	editSEOWebmasterTools() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_dashboard#top#webmaster-tools" );
		I.see( "Webmaster Tools" );
	},

	editSEOGeneral() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#general" );
		I.see( "General" );
	},

	editSEOContentTypes() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#post-types" );
		I.see( "Content Types" );
	},

	editSEOMedia() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#media" );
		I.see( "Media" );
	},

	editSEOTaxonomies() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#taxonomies" );
		I.see( "Taxonomies" );
	},

	editSEOArchives() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#archives" );
		I.wait( 3 );
		I.see( "Archives" );
	},

	editSEOBreadcrumbs() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#breadcrumbs" );
		I.see( "Breadcrumbs" );
	},

	editSEORSS() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#rss" );
		I.see( "RSS" );
	},

	editSEOAccounts() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_social#top#accounts" );
		I.see( "Accounts" );
	},

	editSEOPinterest() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_social#top#pinterest" );
		I.see( "Pinterest" );
	},

	editSEOTools() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_tools" );
		I.see( "Tools" );
	},

	editSEOPremium() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_licenses" );
		I.see( "Premium" );
	},

	editRedirects() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_redirects" );
		I.see( "Redirects - Yoast SEO" );
	},

	editRedirectsNonAdmin() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_redirects" );
		I.see( "Yoast SEO: Redirects" );
	},

	editRegexRedirects() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_redirects&tab=regex" );
		I.see( "Regular Expression redirects" );
	},

	editSeoSocial() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_social" );
		I.wait( 3 );
		I.see( "Social - Yoast SEO" );
	},

	editSeoSocialFacebook() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_social#top#facebook" );
		I.wait( 5 );
		I.see( "Facebook settings" );
	},

	editSeoSocialTwitter() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_social#top#twitterbox" );
		I.see( "Twitter settings" );
	},

	editSeoSearchAppearance() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles" );
		I.wait( 3 );
		I.see( "Search Appearance - Yoast SEO" );
	},

	editSeoArchives() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#archives" );
		I.wait( 3 );
		I.see( "Search Appearance - Yoast SEO" );
	},

	editElementorTools() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=elementor-tools" );
		I.wait( 3 );
		I.see( "Tools" );
	},

	regenerateElementorCSS() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=elementor-tools" );
		I.wait( 3 );
		I.see( "Tools" );
		I.click( "#elementor-clear-cache-button" );
		I.wait( 3 );
		I.click( "submit" );
	},

	editContentTypes() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#post-types" );
		I.wait( 3 );
		I.see( "Search Appearance - Yoast SEO" );
	},

	editTaxonomies() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#taxonomies" );
		I.wait( 3 );
		I.see( "Search Appearance - Yoast SEO" );
	},

	editArchives() {
		I.amOnPage( "/wp-admin/" );
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#archives" );
		I.wait( 3 );
		I.see( "Author archives settings" );
	},

	editBreadcrumbs() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_titles#top#breadcrumbs" );
		I.wait( 3 );
		I.see( "Breadcrumbs settings" );
	},

	editConfigurationWizard() {
		I.amOnPage( "/wp-admin/admin.php?page=wpseo_configurator" );
		I.wait( 3 );
		I.see( "Yoast SEO for WordPress installation wizard" );
	},

	editPost1() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.wait( 3 );
		I.see( "Posts" );
		I.click( get( "post1_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editMovie() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Foods" );
		I.wait( 3 );
		I.see( "Foods" );
		I.click( get( "movie_post_title" ) );
		I.wait( 5 );
		I.see( "Edit Food" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editSong() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Foods" );
		I.wait( 3 );
		I.see( "Foods" );
		I.click( get( "song_post_title" ) );
		I.wait( 5 );
		I.see( "Edit Food" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editPost1CodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.wait( 5 );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post1_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.pressKey( "Escape" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editPost1CodeEditorGutenbergMaster() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post1_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.pressKey( "Escape" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.wait( 3 );
		I.click( "Code editor" );
	},

	editMovieCodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Foods" );
		I.see( "Foods" );
		I.click( get( "movie_post_title" ) );
		I.wait( 5 );
		I.see( "Edit Food" );
		// To make sure welcome notification is gone
		I.pressKey( "Escape" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editSongCodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Foods" );
		I.see( "Foods" );
		I.click( get( "song_post_title" ) );
		I.wait( 5 );
		I.see( "Edit Food" );
		// To make sure welcome notification is gone
		I.pressKey( "Escape" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editPost2() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post2_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editPost2CodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post2_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.pressKey( "Escape" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editPost3() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post3_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editPost3CodeEditor() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post3_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Show more tools & options')]" );
		I.click( "Code editor" );
	},

	editPost3CodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post3_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editPost3CodeEditorGutenbergMaster() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post3_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	createDeletePost() {
		I.amOnPage( "/wp-admin/post-new.php" );
		I.see( "Add title" );
		I.fillField( "#post-title-0", get( "post_delete_title" ) );
		I.scrollTo( "//button[contains(text(),'Publish')]" );
		I.click( "//button[contains(text(),'Publish')]" );
		I.scrollTo( "//button[contains(text(),'Publish')]" );
		I.click( "//button[contains(text(),'Publish')]" );
	},

	editDeletePost() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Posts" );
		I.see( "Posts" );
		I.click( get( "post_delete_title" ) );
		I.wait( 5 );
		I.see( "Edit Post" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	createDeletePage() {
		I.amOnPage( "/wp-admin/post-new.php?post_type=page" );
		I.see( "Add title" );
		I.click( "#post-title-0" );
		I.wait( 5 );
		I.fillField( "#post-title-0", get( "page_delete_title" ) );
		I.scrollTo( "//button[contains(text(),'Publish')]" );
		I.click( "//button[contains(text(),'Publish')]" );
		I.scrollTo( "//button[contains(text(),'Publish')]" );
		I.click( "//button[contains(text(),'Publish')]" );
	},

	editDeletePage() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "page_delete_title" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editPage1() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "page1_title" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editPage2() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "page2_title" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editPage1CodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "page1_title" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editPage1CodeEditorGutenbergMaster() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "page1_title" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.wait( 3 );
		I.click( "Code editor" );
	},

	editPage2CodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "page2_title" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	setStaticHomepage() {
		I.amOnPage( "/wp-admin/options-reading.php" );
		I.see( "Reading Settings" );
		I.checkOption( "page" );
		I.selectOption( { id: "page_on_front" }, get( "static_homepage" ) );
		I.click( { id: "submit" } );
	},

	setPostsPage() {
		I.amOnPage( "/wp-admin/options-reading.php" );
		I.see( "Reading Settings" );
		I.checkOption( "page" );
		I.selectOption( { id: "page_for_posts" }, get( "static_homepage" ) );
		I.click( { id: "submit" } );
	},

	unsetStaticHomepage() {
		I.amOnPage( "/wp-admin/options-reading.php" );
		I.see( "Reading Settings" );
		I.checkOption( "post" );
		I.click( { id: "submit" } );
	},

	editStaticHomepage() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.wait( 3 );
		I.see( "Pages" );
		I.click( get( "static_homepage" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
	},

	editStaticHomepageCodeEditor() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "static_homepage" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Show more tools & options')]" );
		I.click( "Code editor" );
	},

	editStaticHomepageCodeEditorGutenberg() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "static_homepage" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	editStaticHomepageCodeEditorGutenbergMaster() {
		I.amOnPage( "/wp-admin/" );
		I.click( "Pages" );
		I.see( "Pages" );
		I.click( get( "static_homepage" ) );
		I.wait( 5 );
		I.see( "Edit Page" );
		// To make sure welcome notification is gone
		I.click( "#wpseo-meta-tab-content" );
		I.click( "//button[@type='button'][contains(@aria-label, 'Options')]" );
		I.click( "Code editor" );
	},

	createDeleteCategory() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=category" );
		I.see( "Categories" );
		I.fillField( "#tag-name", get( "category_delete_title" ) );
		I.click( "#submit" );
	},

	editCategory1() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=category" );
		I.see( "Categories" );
		I.wait( 2 );
		I.click( get( "category1_title" ) );
		I.wait( 5 );
		I.see( "Edit Category" );
	},

	editCategory2() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=category" );
		I.see( "Categories" );
		I.click( get( "category2_title" ) );
		I.wait( 5 );
		I.see( "Edit Category" );
	},

	editDeleteCategory() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=category" );
		I.see( "Categories" );
		I.click( get( "category_delete_title" ) );
		I.wait( 5 );
		I.see( "Edit Category" );
	},

	createDeleteTag() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=post_tag" );
		I.see( "Tags" );
		I.fillField( "#tag-name", get( "tag_delete_title" ) );
		I.click( "#submit" );
	},

	editTag1() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=post_tag" );
		I.see( "Tags" );
		I.click( get( "tag1_title" ) );
		I.wait( 5 );
		I.see( "Edit Tag" );
	},

	editTag2() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=post_tag" );
		I.see( "Tags" );
		I.click( get( "tag2_title" ) );
		I.wait( 5 );
		I.see( "Edit Tag" );
	},

	editDeleteTag() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=post_tag" );
		I.see( "Tags" );
		I.click( get( "tag_delete_title" ) );
		I.wait( 5 );
		I.see( "Edit Tag" );
	},

	editEarlyLunch() {
		I.amOnPage( "/wp-admin/edit-tags.php?taxonomy=" + get( "custom_taxonomy" ) + "&post_type=" + get( "custom_post_type" ) );		I.see( "Tags" );
		I.see( "Lunches" );
		I.click( get( "custom_tag_title" ) );
		I.wait( 5 );
		I.see( "Edit Lunch" );
	},

	setClassicEditorDefault() {
		I.amOnPage( "/wp-admin/options-writing.php" );
		I.see( "Writing Settings\n" );
		I.click( { id: "classic-editor-classic" } );
		I.scrollTo( "#submit" );
		I.click( "#submit" );
	},

	editDuplicatePostSettings() {
		I.amOnPage( "/wp-admin/options-general.php?page=duplicatepost" );
		I.see( "Duplicate Post Options" );
	},

	// Insert your locators and methods here
};
