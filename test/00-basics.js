process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const
	assert = require('assert');

// Libs to test
const moment = require("../lib/index");

// Tests
describe('time difference', function() {
	it('should return correct difference with UTC', function() {
		const now = new Date();
		const n = moment.tz(new Date(), "America/Los_Angeles");

		let diff = n.hours() - now.getUTCHours();
		let shouldBeDate = now.getUTCDate();

		if(diff > 12) {
			shouldBeDate--;
			diff -= 24;
		}

		console.log("SLT: " + n.toString());

		// Check if components of the date are correct
		assert.equal(diff, -7);
		assert.equal(n.minute(), now.getUTCMinutes());
		assert.equal(n.second(), now.getUTCSeconds());
		assert.equal(n.date(), shouldBeDate);
	});

	it('should be correct around UTC', function() {
		const n = moment("2021-04-19 00:01:02Z").tz("America/Los_Angeles");

		// Check if components of the date are correct
		assert.equal(n.format("dddd, MMMM DD YYYY, HH:mm:ss ZZ"), "Sunday, April 18 2021, 17:01:02 -0700");
	});

	it('should have correct default TZ', function() {
		const n = moment();
		const now = new Date();

		console.log("now ISO: " + now.toISOString());

		// Check if components of the date are correct
		assert.equal(n.toISOString(), now.toISOString());
	});
});
