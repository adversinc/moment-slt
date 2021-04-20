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
		const n = moment("1992-01-01 00:01:02Z").tz("America/Los_Angeles");

		// Check if components of the date are correct
		assert.equal(n.toString(), "Tue Dec 31 1991 16:01:02 GMT-0800");
	});
});
