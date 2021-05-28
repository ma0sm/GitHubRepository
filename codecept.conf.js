const { setHeadlessWhen } = require( "@codeceptjs/configure" );

// Turn on headless mode when running with HEADLESS=true environment variable
// Export HEADLESS=true && npx codeceptjs run
setHeadlessWhen( process.env.HEADLESS );

exports.config = {
	tests: "./*_test.js",
	output: "./output",
	helpers: {
		Puppeteer: {
			url: "http://www.github.com",
			show: false,
			windowSize: "1600x1200",
			timeouts: {
				script: 60000,
				"page load": 10000,
			},
			chrome: {
				args: [
					"--no-sandbox",
					"--disable-setuid-sandbox",
				],
			},
		},
		Response: {
			require: "./response_helper.js",
		},
		ElementHelper: {
			require: "./element_helper.js",
		},
		REST: {
			endpoint: "http://www.github.com/wp-json/wp/v2/",
			onRequest: ( request ) => {
				request.headers.auth = "123";
			},
		},
	},
	include: {
		I: "./steps_file.js",
		github: "./pages/github.js",
		config: "./utils/config.js",
	},
	bootstrap: null,
	mocha: {},
	name: "plugins-automated-testing",
	plugins: {
		pauseOnFail: {},
		retryFailedStep: {
			enabled: true,
			retries: 10,
		},
		tryTo: {
			enabled: true,
		},
		screenshotOnFail: {
			enabled: true,
		},
	},
};
