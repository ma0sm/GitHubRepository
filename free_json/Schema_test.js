const { get } = require( "../utils/config" );
const assert = require( "assert" );
const assertChai = require( "chai" ).assert;
const find = require( "lodash/find" );

Feature( "In order to include Schema json-ld output in my posts/pages/taxonomies\n" +
	"As an Yoast SEO user\n" +
    "I need to configure Knowledge Graph and user settings" );

Before( ( { I, wpAdmin } ) => {
	wpAdmin.loginWPAdmin();
	wpAdmin.editGeneralSettings();
	I.fillField( "blogname", "Local WordPress Dev" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );
} );
/**
Scenario( "Given admin post Post2 with allocated tag “Mytag” exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post2\n" +
    "Then source contains correct application/ld+json including \"keywords”: \"Mytag\"\n",
async( I, post, wpAdmin ) => {
	wpAdmin.editPost2();
	let visibilityPanel = await I.grabAttributeFrom( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]", "aria-expanded" );
	/* eslint eqeqeq: "off" */
//	If ( visibilityPanel == "false" ) {
/**		I.click( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]" );
	}
	I.click( "//button[contains(@data-label, 'Post')]" );
	I.click( "//*[@id='editor']/div/div/div[1]/div/div[2]/div[2]/div/div/div[3]/div[5]" );
	I.wait( 3 );
	I.fillField( "#components-form-token-input-0", get( "tag1_title" ) );
	I.pressKey( "Enter" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
 let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
 if ( logo !== "0" ) {
    I.click( "#yoast-organization-image-remove-button" );
}
 I.click( "#yoast-organization-image-select-button" );
 I.see( "Media" );
 I.click( "Media Library" );
 I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
/**	If ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost2();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post2" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post2_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( article.keywords, "Mytag", "Expected Article keyword (tag) is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
} );
**/
Scenario( "Given admin post Post1 exists\n" +
	"And Social accounts are filled in SEO - Social\n" +
	"And Breadcrumbs are enabled\n" +
	"When I choose Company in Knowledge Graph\n" +
	"And enter company name 'Yoast'\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post1\n" +
    "Then source contains correct application/ld+json\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost1();
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
} );

Scenario( "Given admin post Post2 with Featured image exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post2\n" +
    "Then source contains correct application/ld+json where \"@type\":\"WebPage\" has Image included\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost2();
	let visibilityPanel = await I.grabAttributeFrom( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]", "aria-expanded" );
	/* eslint eqeqeq: "off" */
	if ( visibilityPanel == "false" ) {
		I.click( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]" );
	}
	I.click( "//button[contains(@data-label, 'Post')]" );
	I.click( "Featured image" );
	I.click( "Set featured image" );
	I.click( "Media Library" );
	// To pass test locally uncomment line below
	// I.resizeWindow( 800, 600 );
	I.click( "//li[contains(@aria-label, 'piggy')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	// To pass test locally uncomment line below
	// I.resizeWindow( 1600, 1200 );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
	    I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost2();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let image = find( json[ "@graph" ], { "@type": "ImageObject" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post2" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post2_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( image.url, get( "piggy_pic_url" ), "Expected Webpage Featured image is not found in json+ld output" );
	assert.strictEqual( image[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#primaryimage" ), "Expected Webpage Featured image id is not found in json+ld output" );
	assert.strictEqual( image.width, get( "piggy_width" ), "Expected Webpage Featured image width is not found in json+ld output" );
	assert.strictEqual( image.height, get( "piggy_height" ), "Expected Webpage Featured image height is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );

	// Remove Featured image
	wpAdmin.editPost2();
	let visibilityPanel1 = await I.grabAttributeFrom( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]", "aria-expanded" );
	/* eslint eqeqeq: "off" */
	if ( visibilityPanel1 == "false" ) {
		I.click( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]" );
	}
	I.click( "//button[contains(@data-label, 'Post')]" );
	I.click( "Remove featured image" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
} );

Scenario( "Given admin post Post2 with 1 comment exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post2\n" +
    "Then source contains correct application/ld+json including comment count == 1\n",
async( { I, post, wpAdmin } ) => {
	post.openPost2();
	I.scrollTo( "#comment" );
	I.fillField( "#comment", "Great post!" );
	I.click( "#submit" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost2();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post2" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post2_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( article.commentCount, 1, "commentCount does not equal expected in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
} );

Scenario( "Given admin post Post1 with Meta description “Test description” exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post1\n" +
    "Then source contains correct application/ld+json with \"@type\":\"WebPage\" including \"description\":\"Test description\"\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost1();
	I.click( 'a[href="#wpseo-meta-section-content"]' );
	I.see( "Meta description" );
	I.clickMultipleTimes( "#yoast-google-preview-description-metabox", 3 );
	I.pressKey( [ "Delete" ] );
	I.fillField( "#yoast-google-preview-description-metabox", "Test description" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( webpage.description, "Test description", "Expected Webpage description is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
} );

Scenario( "Given admin post Post1 with empty Meta description exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enbled\n" +
    'And Posts meta description in Content types of SEO - Search Appearance contains "Global description"\n' +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post1\n" +
    'Then source contains correct application/ld+json with "@type":"WebPage" including "description":"Global description"',
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost1();
	I.click( 'a[href="#wpseo-meta-section-content"]' );
	I.see( "Meta description" );
	I.clickMultipleTimes( "#yoast-google-preview-description-metabox", 3 );
	I.pressKey( [ "Delete" ] );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	I.wait( 3 );

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}
	wpAdmin.editSEOFeatures();
	wpAdmin.editContentTypes();
	I.scrollTo( "#metadesc-post-snippet-editor" );
	I.clickMultipleTimes( "#metadesc-post-snippet-editor", 3 );
	I.pressKey( [ "Delete" ] );
	I.scrollTo( "#submit" );
	I.click( "#submit" );
	I.fillField( "#metadesc-post-snippet-editor", "Global description" );
	I.scrollTo( "#submit" );
	I.click( "#submit" );

	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( webpage.description, "Global description", "Expected Webpage description is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );

	// Reset global description
	wpAdmin.editContentTypes();
	I.scrollTo( "#metadesc-post-snippet-editor" );
	I.clickMultipleTimes( "#metadesc-post-snippet-editor", 3 );
	I.pressKey( [ "Delete" ] );
	I.scrollTo( "#submit" );
	I.click( "#submit" );
	I.fillField( "#metadesc-post-snippet-editor", "Global description" );
	I.scrollTo( "#submit" );
	I.click( "#submit" );
} );

Scenario( "Given admin post Post1 exists\n" +
    "And user Admin has all social profile filled in\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Person in Knowledge Graph\n" +
    "And I choose Admin in drop down list\n" +
    "And Save changes\n" +
    "And I open Post1\n" +
    "Then source contains correct application/ld+json\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editAdminUser();
	I.fillField( { id: "facebook" }, get( "facebook_admin" ) );
	I.fillField( { id: "instagram" }, get( "instagram_admin" ) );
	I.fillField( { id: "linkedin" }, get( "linkedin_admin" ) );
	I.fillField( { id: "myspace" }, get( "myspace_admin" ) );
	I.fillField( { id: "pinterest" }, get( "pinterest_admin" ) );
	I.fillField( { id: "soundcloud" }, get( "soundcloud_admin" ) );
	I.fillField( { id: "tumblr" }, get( "tumblr_admin" ) );
	I.fillField( { id: "twitter" }, get( "twitter_admin" ) );
	I.fillField( { id: "youtube" }, get( "youtube_admin" ) );
	I.fillField( { id: "wikipedia" }, get( "wikipedia_admin" ) );
	I.click( { id: "submit" } );
	I.wait( 3 );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Person" );
	I.fillField( "#wpseo-person-selector-name", get( "admin_username" ) );
	I.wait( 5 );
	I.pressKey( "Enter" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );

	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let person = find( json[ "@graph" ], { "@type": [ "Person", "Organization" ] } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.include( person.sameAs,  get( "facebook_admin" ), "Expected Person facebook site is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "instagram_admin" ), "Expected Person instagram url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "linkedin_admin" ), "Expected Person linkedin url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "myspace_admin" ), "Expected Person myspace url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "pinterest_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "youtube_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "tumblr_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "soundcloud_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "wikipedia_admin" ), "Expected Person wikipedia url is not found in json+ld output" );
	assertChai.include( person.sameAs, "https://twitter.com/" + get( "twitter_admin" ), "Expected Person twitter url is not found in json+ld output" );
	assert.strictEqual( person.image[ "@type" ], "ImageObject", "Expected Person image type is not found in json+ld output" );
	assert.strictEqual( person.image[ "@id" ], ( get( "wp_url" ) + "/#personlogo" ), "Expected Person image @id is not found in json+ld output" );
	assert.strictEqual( person.image.caption, get( "admin_username" ), "Expected Person caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
} );

Scenario( "Given \"tester\" user post 'Tester post' exists\n" +
    "And user Admin has all social profile filled in\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Person in Knowledge Graph\n" +
    "And I choose Admin in drop down list\n" +
    "And Save changes\n" +
    "And I open 'Tester post'\n" +
    "Then source contains correct application/ld+json with Person Admin and Article author \"tester\"\n",
async( { I, wpAdmin } ) => {
	wpAdmin.editAdminUser();
	I.fillField( { id: "facebook" }, get( "facebook_admin" ) );
	I.fillField( { id: "instagram" }, get( "instagram_admin" ) );
	I.fillField( { id: "linkedin" }, get( "linkedin_admin" ) );
	I.fillField( { id: "myspace" }, get( "myspace_admin" ) );
	I.fillField( { id: "pinterest" }, get( "pinterest_admin" ) );
	I.fillField( { id: "soundcloud" }, get( "soundcloud_admin" ) );
	I.fillField( { id: "tumblr" }, get( "tumblr_admin" ) );
	I.fillField( { id: "twitter" }, get( "twitter_admin" ) );
	I.fillField( { id: "youtube" }, get( "youtube_admin" ) );
	I.fillField( { id: "wikipedia" }, get( "wikipedia_admin" ) );
	I.click( { id: "submit" } );
	I.wait( 3 );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Person" );
	I.fillField( "#wpseo-person-selector-name", get( "admin_username" ) );
	I.wait( 5 );
	I.pressKey( "Enter" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );

	I.wait( 3 );
	I.amOnPage( "/" + get( "tester_post_title" ) );
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let person = find( json[ "@graph" ], { "@type": [ "Person", "Organization" ] } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.include( person.sameAs,  get( "facebook_admin" ), "Expected Person facebook site is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "instagram_admin" ), "Expected Person instagram url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "linkedin_admin" ), "Expected Person linkedin url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "myspace_admin" ), "Expected Person myspace url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "pinterest_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "youtube_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "tumblr_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "soundcloud_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "wikipedia_admin" ), "Expected Person wikipedia url is not found in json+ld output" );
	assertChai.include( person.sameAs, "https://twitter.com/" + get( "twitter_admin" ), "Expected Person twitter url is not found in json+ld output" );
	assert.strictEqual( person.image[ "@type" ], "ImageObject", "Expected Person image type is not found in json+ld output" );
	assert.strictEqual( person.image[ "@id" ], ( get( "wp_url" ) + "/#personlogo" ), "Expected Person image @id is not found in json+ld output" );
	assert.strictEqual( person.image.caption, get( "admin_username" ), "Expected Person caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + "/" + get( "tester_post_title" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + "/" + get( "tester_post_title" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "tester_post_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + "/"  + get( "tester_post_title" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + "/" + get( "tester_post_title" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
} );

Scenario( "Given admin page Page1 exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Page1\n" +
    'Then source contains correct application/ld+json without "@type":"Article"\n',
async( { I, post, wpAdmin } ) => {
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPage1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "page1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "page1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "page1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "page1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "@type Article is found in json+ld output" );
} );

Scenario( "Given \"tester\" user social accounts are filled in\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Person in Knowledge Graph\n" +
    "And I choose tester in drop down list\n" +
    "And Save changes\n" +
    "And I open non-existing post\n" +
    "Then I get 404 response\n" +
    "And source contains correct application/ld+json only for Person and WebSite nodes\n",
async( { I, wpAdmin } ) => {
	wpAdmin.editTesterUser();
	I.fillField( { id: "facebook" }, get( "facebook_tester" ) );
	I.fillField( { id: "instagram" }, get( "instagram_tester" ) );
	I.fillField( { id: "linkedin" }, get( "linkedin_tester" ) );
	I.fillField( { id: "myspace" }, get( "myspace_tester" ) );
	I.fillField( { id: "pinterest" }, get( "pinterest_tester" ) );
	I.fillField( { id: "soundcloud" }, get( "soundcloud_tester" ) );
	I.fillField( { id: "tumblr" }, get( "tumblr_tester" ) );
	I.fillField( { id: "twitter" }, get( "twitter_tester" ) );
	I.fillField( { id: "youtube" }, get( "youtube_tester" ) );
	I.fillField( { id: "wikipedia" }, get( "wikipedia_tester" ) );
	I.click( { id: "submit" } );
	I.wait( 3 );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Person" );
	I.fillField( "#wpseo-person-selector-name", get( "test_username" ) );
	I.wait( 5 );
	I.pressKey( "Enter" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );

	I.wait( 3 );
	const response = await I.customAmOnPage( "/non-existing" );
	assert.strictEqual( response._status, 404 );
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let person = find( json[ "@graph" ], { "@type": [ "Person", "Organization" ] } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	assertChai.include( person.sameAs,  get( "facebook_tester" ), "Expected Person facebook site is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "instagram_tester" ), "Expected Person instagram url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "linkedin_tester" ), "Expected Person linkedin url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "myspace_tester" ), "Expected Person myspace url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "pinterest_tester" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "youtube_tester" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "tumblr_tester" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "soundcloud_tester" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "wikipedia_tester" ), "Expected Person wikipedia url is not found in json+ld output" );
	assertChai.include( person.sameAs, "https://twitter.com/" + get( "twitter_tester" ), "Expected Person twitter url is not found in json+ld output" );
	assert.strictEqual( person.image[ "@type" ], "ImageObject", "Expected Person image type is not found in json+ld output" );
	assert.strictEqual( person.image[ "@id" ], ( get( "wp_url" ) + "/#personlogo" ), "Expected Person image @id is not found in json+ld output" );
	assert.strictEqual( person.image.caption, get( "test_username" ), "Expected Person caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	assertChai.isUndefined( webpage, "@type WebPage is found in json+ld output" );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assertChai.isUndefined( breadcrumb, "@type Breadcrumb is found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "@type Article is found in json+ld output" );
} );

Scenario( "Given \"tester\" user category TesterCategory exists\n" +
    "And user \"tester\" has all social profile filled in\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Person in Knowledge Graph\n" +
    "And I choose tester in drop down list\n" +
    "And Save changes\n" +
    "And I open TesterCategory\n" +
    "Then source contains correct application/ld+json\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.loginWPAdmin();
	wpAdmin.editTesterUser();
	I.fillField( { id: "facebook" }, get( "facebook_tester" ) );
	I.fillField( { id: "instagram" }, get( "instagram_tester" ) );
	I.fillField( { id: "linkedin" }, get( "linkedin_tester" ) );
	I.fillField( { id: "myspace" }, get( "myspace_tester" ) );
	I.fillField( { id: "pinterest" }, get( "pinterest_tester" ) );
	I.fillField( { id: "soundcloud" }, get( "soundcloud_tester" ) );
	I.fillField( { id: "tumblr" }, get( "tumblr_tester" ) );
	I.fillField( { id: "twitter" }, get( "twitter_tester" ) );
	I.fillField( { id: "youtube" }, get( "youtube_tester" ) );
	I.fillField( { id: "wikipedia" }, get( "wikipedia_tester" ) );
	I.click( { id: "submit" } );
	I.wait( 3 );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Person" );
	I.fillField( "#wpseo-person-selector-name", get( "test_username" ) );
	I.wait( 5 );
	I.pressKey( "Enter" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );

	I.wait( 3 );
	post.openCategoryTester();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let person = find( json[ "@graph" ], { "@type": [ "Person", "Organization" ] } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "CollectionPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assertChai.include( person.sameAs,  get( "facebook_tester" ), "Expected Person facebook site is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "instagram_tester" ), "Expected Person instagram url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "linkedin_tester" ), "Expected Person linkedin url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "myspace_tester" ), "Expected Person myspace url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "pinterest_tester" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "youtube_tester" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "tumblr_tester" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "soundcloud_tester" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "wikipedia_tester" ), "Expected Person wikipedia url is not found in json+ld output" );
	assertChai.include( person.sameAs, "https://twitter.com/" + get( "twitter_tester" ), "Expected Person twitter url is not found in json+ld output" );
	assert.strictEqual( person.image[ "@type" ], "ImageObject", "Expected Person image type is not found in json+ld output" );
	assert.strictEqual( person.image[ "@id" ], ( get( "wp_url" ) + "/#personlogo" ), "Expected Person image @id is not found in json+ld output" );
	assert.strictEqual( person.image.caption, get( "test_username" ), "Expected Person caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "category_tester" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "category_tester_title" ) + " Archives - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "category_tester" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
} );

Scenario( "Given \"tester\" user posts exist\n" +
    "And user Admin has all social profile filled in\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Person in Knowledge Graph\n" +
    "And I choose Admin in drop down list\n" +
    "And Save changes\n" +
    "And I open \"tester\" author archives\n" +
    "Then source contains correct application/ld+json with Website user Admin and Article author \"tester\"\n",
async( { I, wpAdmin } ) => {
	wpAdmin.editAdminUser();
	I.fillField( { id: "facebook" }, get( "facebook_admin" ) );
	I.fillField( { id: "instagram" }, get( "instagram_admin" ) );
	I.fillField( { id: "linkedin" }, get( "linkedin_admin" ) );
	I.fillField( { id: "myspace" }, get( "myspace_admin" ) );
	I.fillField( { id: "pinterest" }, get( "pinterest_admin" ) );
	I.fillField( { id: "soundcloud" }, get( "soundcloud_admin" ) );
	I.fillField( { id: "tumblr" }, get( "tumblr_admin" ) );
	I.fillField( { id: "twitter" }, get( "twitter_admin" ) );
	I.fillField( { id: "youtube" }, get( "youtube_admin" ) );
	I.fillField( { id: "wikipedia" }, get( "wikipedia_admin" ) );
	I.click( { id: "submit" } );
	I.wait( 3 );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Person" );
	I.fillField( "#wpseo-person-selector-name", get( "admin_username" ) );
	I.wait( 5 );
	I.pressKey( "Enter" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );

	I.wait( 3 );
	I.amOnPage( "/author/" + get( "test_username" ) );
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let personAuthor = find( json[ "@graph" ], { name: "tester" } );
	let personWebsite = find( json[ "@graph" ], { name: "admin" } );
	assert.notEqual( personAuthor, personWebsite, "Website user is not expected to be equal to Person" );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "ProfilePage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assertChai.include( personWebsite.sameAs,  get( "facebook_admin" ), "Expected Person facebook site is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "instagram_admin" ), "Expected Person instagram url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "linkedin_admin" ), "Expected Person linkedin url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "myspace_admin" ), "Expected Person myspace url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "pinterest_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "youtube_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "tumblr_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "soundcloud_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, get( "wikipedia_admin" ), "Expected Person wikipedia url is not found in json+ld output" );
	assertChai.include( personWebsite.sameAs, "https://twitter.com/" + get( "twitter_admin" ), "Expected Person twitter url is not found in json+ld output" );
	assert.strictEqual( personWebsite.image[ "@type" ], "ImageObject", "Expected Person image type is not found in json+ld output" );
	assert.strictEqual( personWebsite.image[ "@id" ], ( get( "wp_url" ) + "/#personlogo" ), "Expected Person image @id is not found in json+ld output" );
	assert.strictEqual( personWebsite.image.caption, get( "admin_username" ), "Expected Person caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + "/author/" + get( "test_username" ) + "/#webpage" ), "Expected ProfilePage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + "/author/" + get( "test_username" ) + "/" ), "Expected ProfilePage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "test_username" ) + ", Author at Local WordPress Dev" ), "Expected ProfilePage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + "/author/" + get( "test_username" )  + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
} );

Scenario( "Given \"tester\" user posts exist\n" +
    "And user Admin has all social profile filled in\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Person in Knowledge Graph\n" +
    "And I choose Admin in drop down list\n" +
    "And Save changes\n" +
    "And I open data archives\n" +
    "Then source contains correct application/ld+json\n",
async( { I, wpAdmin } ) => {
	wpAdmin.editAdminUser();
	I.fillField( { id: "facebook" }, get( "facebook_admin" ) );
	I.fillField( { id: "instagram" }, get( "instagram_admin" ) );
	I.fillField( { id: "linkedin" }, get( "linkedin_admin" ) );
	I.fillField( { id: "myspace" }, get( "myspace_admin" ) );
	I.fillField( { id: "pinterest" }, get( "pinterest_admin" ) );
	I.fillField( { id: "soundcloud" }, get( "soundcloud_admin" ) );
	I.fillField( { id: "tumblr" }, get( "tumblr_admin" ) );
	I.fillField( { id: "twitter" }, get( "twitter_admin" ) );
	I.fillField( { id: "youtube" }, get( "youtube_admin" ) );
	I.fillField( { id: "wikipedia" }, get( "wikipedia_admin" ) );
	I.click( { id: "submit" } );
	I.wait( 3 );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Person" );
	I.fillField( "#wpseo-person-selector-name", get( "admin_username" ) );
	I.wait( 5 );
	I.pressKey( "Enter" );
	I.scrollTo( { id: "submit" } );
	I.click( { id: "submit" } );

	I.wait( 3 );
	var currentYear = new Date().getFullYear();
	I.amOnPage( "/" + currentYear );
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let person = find( json[ "@graph" ], { "@type": [ "Person", "Organization" ] } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "CollectionPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assertChai.include( person.sameAs,  get( "facebook_admin" ), "Expected Person facebook site is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "instagram_admin" ), "Expected Person instagram url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "linkedin_admin" ), "Expected Person linkedin url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "myspace_admin" ), "Expected Person myspace url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "pinterest_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "youtube_admin" ), "Expected Person youtube url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "tumblr_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "soundcloud_admin" ), "Expected Person pinterest url is not found in json+ld output" );
	assertChai.include( person.sameAs, get( "wikipedia_admin" ), "Expected Person wikipedia url is not found in json+ld output" );
	assertChai.include( person.sameAs, "https://twitter.com/" + get( "twitter_admin" ), "Expected Person twitter url is not found in json+ld output" );
	assert.strictEqual( person.image[ "@type" ], "ImageObject", "Expected Person image type is not found in json+ld output" );
	assert.strictEqual( person.image[ "@id" ], ( get( "wp_url" ) + "/#personlogo" ), "Expected Person image @id is not found in json+ld output" );
	assert.strictEqual( person.image.caption, get( "admin_username" ), "Expected Person caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + "/" + currentYear + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + "/" + currentYear + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( currentYear + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + "/"  + currentYear + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
} );

Scenario( "Given admin custom post Movie exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name 'Yoast'\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Movie\n" +
    "Then source contains correct application/ld+json without \"@type\":\"Article\"\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openMovie();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );    assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "movie" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "movie" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "movie_post_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "movie" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "@type Article is found in json+ld output" );
} );

Scenario( "Given admin post Post3 exists\n" +
    "And FAQ block with test data is added\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name 'Yoast'\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post3\n" +
    "Then source contains correct application/ld+json with FAQ output\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost3CodeEditorGutenberg();
	I.click( { id: "post-content-0" } );
	I.clearField( { id: "post-content-0" } );
	I.fillField( { id: "post-content-0" }, "<!-- wp:yoast/faq-block " +
            "{\"questions\":[{\"id\":\"faq-question-1559650664899\",\"question\":[\"What is an FAQ?\"],\"answer\":" +
            "[\"FAQ stands for frequently asked questions. \"]," +
            "\"jsonQuestion\":\"What is an FAQ?\",\"jsonAnswer\":\"FAQ stands for frequently asked questions. \"},{\"id\":\"faq-question-1559650685598\",\"question\":" +
            "[\"But first: Do you really, really, really need an FAQ?\"],\"answer\":[\"Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that. \"]," +
            "\"jsonQuestion\":\"But first: Do you really, really, really need an FAQ?\",\"jsonAnswer\":\"Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that. \"},{\"id\":\"faq-question-1559650702269\",\"question\":[\"Questions and answers spoken out loud?\"],\"answer\":" +
            "[\"Google is trying to match a question from a searcher to an answer from a source. If you mark up your questions and answers with Question \",{\"type\":\"a\",\"props\":{\"href\":\"https://yoast.com/structured-data-schema-ultimate-guide/\",\"children\":[\"structured data\"]}},\", you tell search engines that this little sentence is a question and that this paragraph is its answer. \"]," +
            "\"jsonQuestion\":\"Questions and answers spoken out loud?\",\"jsonAnswer\":\"Google is trying to match a question from a searcher to an answer from a source. If you mark up your questions and answers with Question structured data, you tell search engines that this little sentence is a question and that this paragraph is its answer. \"}]} -->\n" +
            "<div class=\"schema-faq wp-block-yoast-faq-block\"><div class=\"schema-faq-section\"><strong class=\"schema-faq-question\">What is an FAQ?</strong> <p class=\"schema-faq-answer\">FAQ stands for frequently asked questions. </p> </div> <div class=\"schema-faq-section\"><strong class=\"schema-faq-question\">But first: Do you really, really, really need an FAQ?</strong> <p class=\"schema-faq-answer\">" +
            "Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that. </p> </div> <div class=\"schema-faq-section\"><strong class=\"schema-faq-question\">Questions and answers spoken out loud?</strong> <p class=\"schema-faq-answer\">Google is trying to match a question from a searcher to an answer from a source. " +
            "If you mark up your questions and answers with Question " +
            "<a href=\"https://yoast.com/structured-data-schema-ultimate-guide/\">structured data</a>, you tell search engines that this little sentence is a question and that this paragraph is its answer. </p> </div> </div>\n" +
            "<!-- /wp:yoast/faq-block -->" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost3();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": [ "WebPage", "FAQPage" ] } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	let question1 = find( json[ "@graph" ], { "@type": "Question", position: 1 } );
	let question2 = find( json[ "@graph" ], { "@type": "Question", position: 2 } );
	let question3 = find( json[ "@graph" ], { "@type": "Question", position: 3 } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post3" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post3_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
	assert.strictEqual( question1.name, "What is an FAQ?", "Expected FAQ Question1 is not found in json+ld output" );
	assert.strictEqual( question1.acceptedAnswer.text, "FAQ stands for frequently asked questions.\u00a0", "Expected FAQ Answer1 is not found in json+ld output" );
	assert.strictEqual( question2.name, "But first: Do you really, really, really need an FAQ?", "Expected FAQ Question2 is not found in json+ld output" );
	assert.strictEqual( question2.acceptedAnswer.text, "Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that.\u00a0", "Expected FAQ Answer2 is not found in json+ld output" );
	assert.strictEqual( question3.name, "Questions and answers spoken out loud?", "Expected FAQ Question3 is not found in json+ld output" );
	assert.strictEqual( question3.acceptedAnswer.text, "Google is trying to match a question from a searcher to an answer from a source. If you mark up your questions and answers with Question\u00a0structured data, you tell search engines that this little sentence is a question and that this paragraph is its answer.\u00a0", "Expected FAQ Answer3 is not found in json+ld output" );
} );

Scenario( "Given admin post Post3 exists\n" +
    "And HowTo block with test data is added\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name 'Yoast'\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post3\n" +
    "Then source contains correct application/ld+json with HowTo output\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost3CodeEditorGutenberg();
	I.click( { id: "post-content-0" } );
	I.clearField( { id: "post-content-0" } );
	I.fillField( { id: "post-content-0" }, "<!-- wp:yoast/how-to-block " +
            "{\"hasDuration\":true,\"days\":\"0\",\"hours\":\"2\",\"minutes\":\"13\"," +
            "\"jsonDescription\":\"Taking the Wheel off the Bicycle\",\"steps\":" +
            "[{\"id\":\"how-to-step-1562151691567\",\"name\":[{\"type\":\"strong\"," +
            "\"props\":{\"children\":[\"Use an upright bike stand to elevate the wheel while you work.\"]}},\"\"],\"text\":" +
            "[\"If necessary, you can turn the bike upside down to work on it, just be sure to lay an old towel or " +
            "cloth beneath the saddle and handlebars to prevent scratching them.\"],\"jsonName\":\"Use an upright bike " +
            "stand to elevate the wheel while you work.\",\"jsonText\":\"If necessary, you can turn the bike upside down " +
            "to work on it, just be sure to lay an old towel or cloth beneath the saddle and handlebars to prevent scratching " +
            "them.\"},{\"id\":\"how-to-step-1562151730921\",\"name\":[{\"type\":\"strong\",\"props\":{\"children\":" +
            "[\"Loosen the nuts on the wheel axle with a wrench.\"]}},\"\"],\"text\":[\"Use silicone spray or even cooking spray " +
            "if the nuts refuse to loosen with a wrench or ratchet alone. Some newer bikes have much simpler, quick-release wheel " +
            "latches — in this case, just open the latch without removing the wheel yet.\"],\"jsonName\":\"Loosen the nuts on the wheel " +
            "axle with a wrench.\",\"jsonText\":\"Use silicone spray or even cooking spray if the nuts refuse to loosen with a wrench or " +
            "ratchet alone. Some newer bikes have much simpler, quick-release wheel latches — in this case, just open the latch without " +
            "removing the wheel yet.\"},{\"id\":\"how-to-step-1562151778489\",\"name\":[{\"type\":\"strong\",\"props\":{\"children\":" +
            "[\"Disconnect the brakes if they’re in the way of taking off the wheel.\"]}},\"\"],\"text\":[\"There are numerous types of " +
            "brake mechanisms with different releases, but you’ll often find a quick release on either the brake calipers or the hand brake " +
            "lever. Or, you might need to squeeze the calipers on the brakes to disconnect the cable. Check your bike’s instruction manual " +
            "if you have it, or search the website of the bike or brake manufacturer.\",{\"type\":\"img\",\"key\":\"110\",\"ref\":null,\"props\":" +
            "{\"alt\":\"\",\"src\":\"http://local.wordpress.test/wp-content/uploads/misspiggy.jpg\"},\"_owner\":null}],\"jsonName\":" +
            "\"Disconnect the brakes if they’re in the way of taking off the wheel.\",\"jsonText\":\"There are numerous types of " +
            "brake mechanisms with different releases, but you’ll often find a quick release on either the brake calipers or the hand brake " +
            "lever. Or, you might need to squeeze the calipers on the brakes to disconnect the cable. Check your bike’s instruction manual if " +
            "you have it, or search the website of the bike or brake manufacturer.\",\"jsonImageSrc\":" +
            "\"http://local.wordpress.test/wp-content/uploads/misspiggy.jpg\"}],\"defaultDurationText\":\"Time needed:\"} -->\n" +
            "<div class=\"schema-how-to wp-block-yoast-how-to-block\">" +
            "<p class=\"schema-how-to-total-time\"><span class=\"schema-how-to-duration-time-text\">" +
            "Time needed: </span>2 hours and 13 minutes. </p><p class=\"schema-how-to-description\">" +
            "<strong>Taking the Wheel off the Bicycle</strong></p> <ol class=\"schema-how-to-steps\">" +
            "<li class=\"schema-how-to-step\" id=\"how-to-step-1562151691567\">" +
            "<strong class=\"schema-how-to-step-name\"><strong>Use an upright bike stand to elevate the wheel while you work.</strong>" +
            "</strong> <p class=\"schema-how-to-step-text\">If necessary, you can turn the bike upside down to work on it, just be sure " +
            "to lay an old towel or cloth beneath the saddle and handlebars to prevent scratching them.</p> </li><li class=\"schema-how-to-step\" " +
            "id=\"how-to-step-1562151730921\"><strong class=\"schema-how-to-step-name\"><strong>Loosen the nuts on the wheel axle with a wrench." +
            "</strong></strong> <p class=\"schema-how-to-step-text\">Use silicone spray or even cooking spray if the nuts refuse to loosen with a " +
            "wrench or ratchet alone. Some newer bikes have much simpler, quick-release wheel latches — in this case, just open the latch without removing " +
            "the wheel yet.</p> </li><li class=\"schema-how-to-step\" id=\"how-to-step-1562151778489\"><strong class=\"schema-how-to-step-name\">" +
            "<strong>Disconnect the brakes if they’re in the way of taking off the wheel.</strong></strong> <p class=\"schema-how-to-step-text\">" +
            "There are numerous types of brake mechanisms with different releases, but you’ll often find a quick release on either the brake calipers " +
            "or the hand brake lever. Or, you might need to squeeze the calipers on the brakes to disconnect the cable. Check your bike’s instruction" +
            " manual if you have it, or search the website of the bike or brake manufacturer.<img alt=\"\" " +
            "src=\"http://local.wordpress.test/wp-content/uploads/misspiggy.jpg\"/></p> </li></ol></div>\n" +
            "<!-- /wp:yoast/how-to-block -->" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost3();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	let howto = find( json[ "@graph" ], { "@type": "HowTo" } );
	let howtoStep1 = find( howto.step, { url: "http://local.wordpress.test/post3/#how-to-step-1562151691567" } );
	let howtoStep2 = find( howto.step, { url: "http://local.wordpress.test/post3/#how-to-step-1562151730921" } );
	let howtoStep3 = find( howto.step, { url: "http://local.wordpress.test/post3/#how-to-step-1562151778489" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs,  get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post3" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post3_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
	assert.strictEqual( howto[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#howto-1" ), "Expected HowTo @id is not found in json+ld output" );
	assert.strictEqual( howto.description, "Taking the Wheel off the Bicycle", "Expected HowTo description is not found in json+ld output" );
	assert.strictEqual( howto.totalTime, "P0DT2H13M", "Expected HowTo total time is not found in json+ld output" );
	assert.strictEqual( howtoStep1.name, "Use an upright bike stand to elevate the wheel while you work.", "Expected HowTo Step title is not found in json+ld output" );
	assert.strictEqual( howtoStep2.name, "Loosen the nuts on the wheel axle with a wrench.", "Expected HowTo Step title is not found in json+ld output" );
	assert.strictEqual( howtoStep3.name, "Disconnect the brakes if they’re in the way of taking off the wheel.", "Expected HowTo Step title is not found in json+ld output" );
	assert.strictEqual( howtoStep3.image.url, get( "piggy_pic_url" ), "Expected image within HowTo Step is not found in json+ld output" );
} );

Scenario( "Given admin post Post3 exists\n" +
    "And FAQ block with test data is added\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And company name is left empty\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post3\n" +
    "Then source contains correct application/ld+json with FAQ output and without Organization and Article\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost3CodeEditorGutenberg();
	I.click( { id: "post-content-0" } );
	I.clearField( { id: "post-content-0" } );
	I.fillField( { id: "post-content-0" }, "<!-- wp:yoast/faq-block " +
            "{\"questions\":[{\"id\":\"faq-question-1559650664899\",\"question\":[\"What is an FAQ?\"],\"answer\":" +
            "[\"FAQ stands for frequently asked questions. \"]," +
            "\"jsonQuestion\":\"What is an FAQ?\",\"jsonAnswer\":\"FAQ stands for frequently asked questions. \"},{\"id\":\"faq-question-1559650685598\",\"question\":" +
            "[\"But first: Do you really, really, really need an FAQ?\"],\"answer\":[\"Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that. \"]," +
            "\"jsonQuestion\":\"But first: Do you really, really, really need an FAQ?\",\"jsonAnswer\":\"Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that. \"},{\"id\":\"faq-question-1559650702269\",\"question\":[\"Questions and answers spoken out loud?\"],\"answer\":" +
            "[\"Google is trying to match a question from a searcher to an answer from a source. If you mark up your questions and answers with Question \",{\"type\":\"a\",\"props\":{\"href\":\"https://yoast.com/structured-data-schema-ultimate-guide/\",\"children\":[\"structured data\"]}},\", you tell search engines that this little sentence is a question and that this paragraph is its answer. \"]," +
            "\"jsonQuestion\":\"Questions and answers spoken out loud?\",\"jsonAnswer\":\"Google is trying to match a question from a searcher to an answer from a source. If you mark up your questions and answers with Question structured data, you tell search engines that this little sentence is a question and that this paragraph is its answer. \"}]} -->\n" +
            "<div class=\"schema-faq wp-block-yoast-faq-block\"><div class=\"schema-faq-section\"><strong class=\"schema-faq-question\">What is an FAQ?</strong> <p class=\"schema-faq-answer\">FAQ stands for frequently asked questions. </p> </div> <div class=\"schema-faq-section\"><strong class=\"schema-faq-question\">But first: Do you really, really, really need an FAQ?</strong> <p class=\"schema-faq-answer\">" +
            "Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that. </p> </div> <div class=\"schema-faq-section\"><strong class=\"schema-faq-question\">Questions and answers spoken out loud?</strong> <p class=\"schema-faq-answer\">Google is trying to match a question from a searcher to an answer from a source. " +
            "If you mark up your questions and answers with Question " +
            "<a href=\"https://yoast.com/structured-data-schema-ultimate-guide/\">structured data</a>, you tell search engines that this little sentence is a question and that this paragraph is its answer. </p> </div> </div>\n" +
            "<!-- /wp:yoast/faq-block -->" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost3();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": [ "WebPage", "FAQPage" ] } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	let question1 = find( json[ "@graph" ], { "@type": "Question", position: 1 } );
	let question2 = find( json[ "@graph" ], { "@type": "Question", position: 2 } );
	let question3 = find( json[ "@graph" ], { "@type": "Question", position: 3 } );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post3" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post3_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
	assert.strictEqual( question1.name, "What is an FAQ?", "Expected FAQ Question1 is not found in json+ld output" );
	assert.strictEqual( question1.acceptedAnswer.text, "FAQ stands for frequently asked questions.\u00a0", "Expected FAQ Answer1 is not found in json+ld output" );
	assert.strictEqual( question2.name, "But first: Do you really, really, really need an FAQ?", "Expected FAQ Question2 is not found in json+ld output" );
	assert.strictEqual( question2.acceptedAnswer.text, "Usually, if you need to answer a lot of questions from users in an FAQ, that means that your content is not providing these answers and that you should work on that.\u00a0", "Expected FAQ Answer2 is not found in json+ld output" );
	assert.strictEqual( question3.name, "Questions and answers spoken out loud?", "Expected FAQ Question3 is not found in json+ld output" );
	assert.strictEqual( question3.acceptedAnswer.text, "Google is trying to match a question from a searcher to an answer from a source. If you mark up your questions and answers with Question\u00a0structured data, you tell search engines that this little sentence is a question and that this paragraph is its answer.\u00a0", "Expected FAQ Answer3 is not found in json+ld output" );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	assertChai.isUndefined( organisation, "Organization is found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "Article is found in json+ld output" );
} );

Scenario( "Given admin post Post3 exists\n" +
    "And HowTo block with test data is added\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name 'Yoast'\n" +
    "And no image is uploaded in Company logo\n" +
    "And Save changes\n" +
    "And I open Post3\n" +
    "Then source contains correct application/ld+json with HowTo output and without Organization and Article \n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost3CodeEditorGutenberg();
	I.click( { id: "post-content-0" } );
	I.clearField( { id: "post-content-0" } );
	I.fillField( { id: "post-content-0" }, "<!-- wp:yoast/how-to-block " +
            "{\"hasDuration\":true,\"days\":\"0\",\"hours\":\"2\",\"minutes\":\"13\"," +
            "\"jsonDescription\":\"Taking the Wheel off the Bicycle\",\"steps\":" +
            "[{\"id\":\"how-to-step-1562151691567\",\"name\":[{\"type\":\"strong\"," +
            "\"props\":{\"children\":[\"Use an upright bike stand to elevate the wheel while you work.\"]}},\"\"],\"text\":" +
            "[\"If necessary, you can turn the bike upside down to work on it, just be sure to lay an old towel or " +
            "cloth beneath the saddle and handlebars to prevent scratching them.\"],\"jsonName\":\"Use an upright bike " +
            "stand to elevate the wheel while you work.\",\"jsonText\":\"If necessary, you can turn the bike upside down " +
            "to work on it, just be sure to lay an old towel or cloth beneath the saddle and handlebars to prevent scratching " +
            "them.\"},{\"id\":\"how-to-step-1562151730921\",\"name\":[{\"type\":\"strong\",\"props\":{\"children\":" +
            "[\"Loosen the nuts on the wheel axle with a wrench.\"]}},\"\"],\"text\":[\"Use silicone spray or even cooking spray " +
            "if the nuts refuse to loosen with a wrench or ratchet alone. Some newer bikes have much simpler, quick-release wheel " +
            "latches — in this case, just open the latch without removing the wheel yet.\"],\"jsonName\":\"Loosen the nuts on the wheel " +
            "axle with a wrench.\",\"jsonText\":\"Use silicone spray or even cooking spray if the nuts refuse to loosen with a wrench or " +
            "ratchet alone. Some newer bikes have much simpler, quick-release wheel latches — in this case, just open the latch without " +
            "removing the wheel yet.\"},{\"id\":\"how-to-step-1562151778489\",\"name\":[{\"type\":\"strong\",\"props\":{\"children\":" +
            "[\"Disconnect the brakes if they’re in the way of taking off the wheel.\"]}},\"\"],\"text\":[\"There are numerous types of " +
            "brake mechanisms with different releases, but you’ll often find a quick release on either the brake calipers or the hand brake " +
            "lever. Or, you might need to squeeze the calipers on the brakes to disconnect the cable. Check your bike’s instruction manual " +
            "if you have it, or search the website of the bike or brake manufacturer.\",{\"type\":\"img\",\"key\":\"110\",\"ref\":null,\"props\":" +
            "{\"alt\":\"\",\"src\":\"http://local.wordpress.test/wp-content/uploads/misspiggy.jpg\"},\"_owner\":null}],\"jsonName\":" +
            "\"Disconnect the brakes if they’re in the way of taking off the wheel.\",\"jsonText\":\"There are numerous types of " +
            "brake mechanisms with different releases, but you’ll often find a quick release on either the brake calipers or the hand brake " +
            "lever. Or, you might need to squeeze the calipers on the brakes to disconnect the cable. Check your bike’s instruction manual if " +
            "you have it, or search the website of the bike or brake manufacturer.\",\"jsonImageSrc\":" +
            "\"http://local.wordpress.test/wp-content/uploads/misspiggy.jpg\"}],\"defaultDurationText\":\"Time needed:\"} -->\n" +
            "<div class=\"schema-how-to wp-block-yoast-how-to-block\">" +
            "<p class=\"schema-how-to-total-time\"><span class=\"schema-how-to-duration-time-text\">" +
            "Time needed: </span>2 hours and 13 minutes. </p><p class=\"schema-how-to-description\">" +
            "<strong>Taking the Wheel off the Bicycle</strong></p> <ol class=\"schema-how-to-steps\">" +
            "<li class=\"schema-how-to-step\" id=\"how-to-step-1562151691567\">" +
            "<strong class=\"schema-how-to-step-name\"><strong>Use an upright bike stand to elevate the wheel while you work.</strong>" +
            "</strong> <p class=\"schema-how-to-step-text\">If necessary, you can turn the bike upside down to work on it, just be sure " +
            "to lay an old towel or cloth beneath the saddle and handlebars to prevent scratching them.</p> </li><li class=\"schema-how-to-step\" " +
            "id=\"how-to-step-1562151730921\"><strong class=\"schema-how-to-step-name\"><strong>Loosen the nuts on the wheel axle with a wrench." +
            "</strong></strong> <p class=\"schema-how-to-step-text\">Use silicone spray or even cooking spray if the nuts refuse to loosen with a " +
            "wrench or ratchet alone. Some newer bikes have much simpler, quick-release wheel latches — in this case, just open the latch without removing " +
            "the wheel yet.</p> </li><li class=\"schema-how-to-step\" id=\"how-to-step-1562151778489\"><strong class=\"schema-how-to-step-name\">" +
            "<strong>Disconnect the brakes if they’re in the way of taking off the wheel.</strong></strong> <p class=\"schema-how-to-step-text\">" +
            "There are numerous types of brake mechanisms with different releases, but you’ll often find a quick release on either the brake calipers " +
            "or the hand brake lever. Or, you might need to squeeze the calipers on the brakes to disconnect the cable. Check your bike’s instruction" +
            " manual if you have it, or search the website of the bike or brake manufacturer.<img alt=\"\" " +
            "src=\"http://local.wordpress.test/wp-content/uploads/misspiggy.jpg\"/></p> </li></ol></div>\n" +
            "<!-- /wp:yoast/how-to-block -->" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost3();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	let howto = find( json[ "@graph" ], { "@type": "HowTo" } );
	let howtoStep1 = find( howto.step, { url: "http://local.wordpress.test/post3/#how-to-step-1562151691567" } );
	let howtoStep2 = find( howto.step, { url: "http://local.wordpress.test/post3/#how-to-step-1562151730921" } );
	let howtoStep3 = find( howto.step, { url: "http://local.wordpress.test/post3/#how-to-step-1562151778489" } );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post3" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post3_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
	assert.strictEqual( howto[ "@id" ], ( get( "wp_url" ) + get( "post3" ) + "/#howto-1" ), "Expected HowTo @id is not found in json+ld output" );
	assert.strictEqual( howto.description, "Taking the Wheel off the Bicycle", "Expected HowTo description is not found in json+ld output" );
	assert.strictEqual( howto.totalTime, "P0DT2H13M", "Expected HowTo total time is not found in json+ld output" );
	assert.strictEqual( howtoStep1.name, "Use an upright bike stand to elevate the wheel while you work.", "Expected HowTo Step title is not found in json+ld output" );
	assert.strictEqual( howtoStep2.name, "Loosen the nuts on the wheel axle with a wrench.", "Expected HowTo Step title is not found in json+ld output" );
	assert.strictEqual( howtoStep3.name, "Disconnect the brakes if they’re in the way of taking off the wheel.", "Expected HowTo Step title is not found in json+ld output" );
	assert.strictEqual( howtoStep3.image.url, get( "piggy_pic_url" ), "Expected image within HowTo Step is not found in json+ld output" );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	assertChai.isUndefined( organisation, "Organization is found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "Article is found in json+ld output" );
} );

Scenario( "Given admin post Post1 exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And company name is left empty\n" +
    "And upload image in Company logo\n" +
    "And Save changes\n" +
    "And I open Post1\n" +
    "Then source contains correct application/ld+json without Organization and Article\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost1();
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	assertChai.isUndefined( organisation, "Organization is found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "Article is found in json+ld output" );
} );

Scenario( "Given admin page Page1 exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enbled\n" +
    "When I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And image is not uploaded in Company logo\n" +
    "And Save changes\n" +
    "And I open Page1\n" +
    "Then source contains correct application/ld+json without Organization\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPage1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "page1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "page1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "page1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "page1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	assertChai.isUndefined( article, "@type Article is found in json+ld output" );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	assertChai.isUndefined( organisation, "Organization is found in json+ld output" );
} );

Scenario( "Given admin post Post1 exists\n" +
	"And Company is set in Knowledge Graph\n" +
	"And company name is set to “Yoast”\n" +
	"And image is uploaded in Company logo\n" +
	"And Social accounts are filled in SEO - Social\n" +
	"And Breadcrumbs are enabled\n" +
	"When I add image to content of Post1 \n" +
	"And open Post1\n" +
	"Then source contains correct application/ld+json with primaryImage\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost1();
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	wpAdmin.editPost1CodeEditorGutenberg();
	I.fillField( { id: "post-content-0" }, "<img src=" + get( "piggy_pic" )  + " alt=\"\" width=" + get( "piggy_pic_width" ) + " height=" + get( "piggy_pic_height" ) + " class=\"alignnone size-medium wp-image-66\" />" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );

	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	let image = find( json[ "@graph" ], { "@type": "ImageObject" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );
	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Expected Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post1" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post1_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post1" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );
	assert.strictEqual( image[ "@type" ], "ImageObject", "Expected Image type is not found in json+ld output" );
	assert.strictEqual( image.url, get( "piggy_pic_url" ), "Expected Image url is not found in json+ld output" );
	assert.strictEqual( image[ "@id" ],  ( get( "wp_url" ) + get( "post1" ) + "/#primaryimage" ), "Expected Image @id is not found in json+ld output" );
	assert.strictEqual( image.width,  ( get( "piggy_width" ) ), "Expected Image width is not found in json+ld output" );
	assert.strictEqual( image.height,  ( get( "piggy_height" ) ), "Expected Image height is not found in json+ld output" );
} );

Scenario( "Given admin post Post1 exists\n" +
	"And Schema settings for Posts are set to default in SEO - Search Appearance\n" +
	"When I change Default Page type to QA Page\n" +
	"And I change Default Article type to Tech article\n" +
	"And Save changes\n" +
	"And open Post1\n" +
	"Then application/ld+json of my Post contains:\n" +
	"\"@type\":[\"WebPage\",\"QAPage\"]\n" +
	"\"@type\":[\"Article\",\"TechArticle\"]\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost1();
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	wpAdmin.editContentTypes();
	I.scrollTo( "#wpseo-settings-page-button" );
	I.selectOption( "#schema-page-type-post", "QA Page" );
	I.wait( 3 );
	I.click( "#schema-page-type-post" );
	I.selectOption( "#schema-article-type-post", "Tech Article" );
	I.wait( 3 );
	I.click( "#schema-article-type-post" );
	I.scrollTo( "#submit" );
	I.click( "#submit" );
	I.wait( 3 );
	post.openPost1();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let webpage = find( json[ "@graph" ], { "@id": ( get( "wp_url" ) + get( "post1" ) + "/#webpage" ) } );
	let article = find( json[ "@graph" ], { "@id": ( get( "wp_url" ) + get( "post1" ) + "/#article" ) } );
	assertChai.include( webpage[ "@type" ], "QAPage", "Expected Default Page type is not found in json+ld output" );
	assertChai.include( article[ "@type" ], "TechArticle", "Expected Default Article type is not found in json+ld output" );
} );

Scenario( "Given admin post Post2 with Featured image exists\n" +
    "And Social accounts are filled in SEO - Social\n" +
    "And Breadcrumbs are enabled\n" +
    "And I choose Company in Knowledge Graph\n" +
    "And enter company name “Yoast”\n" +
    "And upload image in Company logo\n" +
    "When I upload Facebook image within Post2" +
    "And Save changes\n" +
    "And I open Post2\n" +
    "Then source contains correct application/ld+json with Facebook image in primaryImage\n",
async( { I, post, wpAdmin } ) => {
	wpAdmin.editPost2();
	let visibilityPanel = await I.grabAttributeFrom( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]", "aria-expanded" );
	/* eslint eqeqeq: "off" */
	if ( visibilityPanel == "false" ) {
		I.click( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]" );
	}
	I.click( "//button[contains(@data-label, 'Post')]" );
	I.click( "Featured image" );
	I.click( "Set featured image" );
	I.click( "Media Library" );
	// To pass test locally uncomment line below
	// I.resizeWindow( 800, 600 );
	I.click( "//li[contains(@aria-label, 'piggy')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	// To pass test locally uncomment line below
	// I.resizeWindow( 1600, 1200 );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );

	wpAdmin.editPost2CodeEditorGutenberg();
	I.click( "#wpseo-meta-tab-social" );
	var fbImage = await I.grabValueFrom( "#yoast_wpseo_opengraph-image" );
	if ( fbImage !== "" ) {
		I.click( "#facebook-remove-button-metabox" );
	}
	I.click( "#facebook-select-button-metabox" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'elmo')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
	I.wait( 3 );

	wpAdmin.editSeoSearchAppearance();
	I.selectOption( "#company_or_person", "Organization" );
	I.clearField( { id: "company_name" } );
	I.fillField( { id: "company_name" }, "Yoast" );
	let logo = await I.grabAttributeFrom( "#company_logo_id", "value" );
	if ( logo !== "0" ) {
		I.click( "#yoast-organization-image-remove-button" );
	}
	I.click( "#yoast-organization-image-select-button" );
	I.see( "Media" );
	I.click( "Media Library" );
	I.resizeWindow( 640, 480 );
	I.click( "//li[contains(@aria-label, 'cookie-monster-1116')]" );
	I.click( "//*[@id=\"__wp-uploader-id-0\"]/div[4]/div/div[2]/button" );
	I.resizeWindow( 1600, 1200 );
	I.click( { id: "submit" } );
	wpAdmin.editSeoSocial();
	I.fillField( { id: "facebook_site" }, get( "facebook_site_company" ) );
	I.fillField( { id: "twitter_site" }, get( "twitter_site_company" ) );
	I.fillField( { id: "instagram_url" }, get( "instagram_url_company" ) );
	I.fillField( { id: "linkedin_url" }, get( "linkedin_url_company" ) );
	I.fillField( { id: "myspace_url" }, get( "myspace_url_company" ) );
	I.fillField( { id: "pinterest_url" }, get( "pinterest_url_company" ) );
	I.fillField( { id: "youtube_url" }, get( "youtube_url_company" ) );
	I.fillField( { id: "wikipedia_url" }, get( "wikipedia_url_company" ) );
	I.click( { id: "submit" } );
	wpAdmin.editBreadcrumbs();
	let poppy = await I.grabAttributeFrom( "#breadcrumbsinfo", "style" );
	/* eslint eqeqeq: "off" */
	if ( Object.values( poppy ) == "display" ) {
		I.click( "#breadcrumbs-enable" );
		I.click( "#submit" );
	}

	I.wait( 3 );
	post.openPost2();
	let json = JSON.parse( await I.grabTextFrom( "//script[@type=\"application/ld+json\"]" ) );
	let organisation = find( json[ "@graph" ], { "@type": "Organization" } );
	let website = find( json[ "@graph" ], { "@type": "WebSite" } );
	let webpage = find( json[ "@graph" ], { "@type": "WebPage" } );
	let image = find( json[ "@graph" ], { "@type": "ImageObject" } );
	let breadcrumb = find( json[ "@graph" ], { "@type": "BreadcrumbList" } );
	let article = find( json[ "@graph" ], { "@type": "Article" } );
	let person = find( json[ "@graph" ], { "@type": "Person" } );
	assert.strictEqual( organisation[ "@id" ], ( get( "wp_url" ) + "/#organization" ), "Expected Organization @id is not found in json+ld output" );
	assert.strictEqual( organisation.name, "Yoast", "Expected Organization name 'Yoast' is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "facebook_site_company" ), "Expected Company facebook site is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "instagram_url_company" ), "Expected Company instagram url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "linkedin_url_company" ), "Expected Company linkedin url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "myspace_url_company" ), "Expected Company myspace url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "youtube_url_company" ), "Expected Company youtube url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "pinterest_url_company" ), "Expected Company pinterest url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, get( "wikipedia_url_company" ), "Expected Company wikipedia url is not found in json+ld output" );
	assertChai.include( organisation.sameAs, "https://twitter.com/" + get( "twitter_site_company" ), "Expected Company twitter url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@type" ], "ImageObject", "Expected Organization logo type is not found in json+ld output" );
	assert.strictEqual( organisation.logo.url, get( "cookie_monster_url" ), "Expected Organization logo url is not found in json+ld output" );
	assert.strictEqual( organisation.logo[ "@id" ],  ( get( "wp_url" ) + "/#logo" ), "Expected Organization logo @id is not found in json+ld output" );
	assert.strictEqual( organisation.logo.width,  ( get( "cookie_monster_width" ) ), "Expected Organization logo width is not found in json+ld output" );
	assert.strictEqual( organisation.logo.height,  ( get( "cookie_monster_height" ) ), "Expected Organization logo height is not found in json+ld output" );
	assert.strictEqual( organisation.logo.caption,  ( "Yoast" ), "Expected Organization logo caption is not found in json+ld output" );	assert.strictEqual( website[ "@id" ], ( get( "wp_url" ) + "/#website" ), "Expected Website @id is not found in json+ld output" );
	assert.strictEqual( website.name, "Local WordPress Dev", "Website name is not found in json+ld output" );
	assert.strictEqual( webpage[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#webpage" ), "Expected Webpage @id is not found in json+ld output" );
	assert.strictEqual( webpage.url, ( get( "wp_url" ) + get( "post2" ) + "/" ), "Expected Webpage url is not found in json+ld output" );
	assert.strictEqual( webpage.name, ( get( "post2_title" ) + " - Local WordPress Dev" ), "Expected Webpage name is not found in json+ld output" );
	assert.strictEqual( image.url, get( "elmo_pic_url" ), "Expected Webpage social image is not found in json+ld output" );
	assert.strictEqual( image[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#primaryimage" ), "Expected Webpage Facebook image id is not found in json+ld output" );
	assert.strictEqual( image.width, get( "elmo_width" ), "Expected Webpage Facebook image width is not found in json+ld output" );
	assert.strictEqual( image.height, get( "elmo_height" ), "Expected Webpage Facebook image height is not found in json+ld output" );
	assert.strictEqual( breadcrumb[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#breadcrumb" ), "Expected Breadcrumb @id is not found in json+ld output" );
	assert.strictEqual( article[ "@id" ], ( get( "wp_url" ) + get( "post2" ) + "/#article" ), "Expected Article @id is not found in json+ld output" );
	assert.strictEqual( person.name, get( "admin_username" ), "Expected Person name is not found in json+ld output" );

	// Remove Featured image
	wpAdmin.editPost2();
	let visibilityPanel1 = await I.grabAttributeFrom( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]", "aria-expanded" );
	/* eslint eqeqeq: "off" */
	if ( visibilityPanel1 == "false" ) {
		I.click( "//button[@type='button'][contains(@class, 'components-button components-panel__body-toggle')]" );
	}
	I.click( "//button[contains(@data-label, 'Post')]" );
	I.click( "Remove featured image" );
	I.scrollTo( "//button[contains(text(),'Update')]" );
	I.click( "//button[contains(text(),'Update')]" );
} );

After( async( { wpAdmin, I } ) => {
	wpAdmin.editContentTypes();
	I.scrollTo( "#wpseo-settings-page-button" );
	I.selectOption( "#schema-page-type-post", "Web Page (default)" );
	I.wait( 3 );
	I.click( "#schema-page-type-post" );
	I.selectOption( "#schema-article-type-post", "Article (default)" );
	I.wait( 3 );
	I.click( "#schema-article-type-post" );
	I.scrollTo( "#submit" );
	I.click( "#submit" );
} );
