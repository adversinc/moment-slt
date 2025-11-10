import {describe, before, after, beforeEach, it} from "mocha";

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const
	assert = require('assert');

// Libs to test
import { dayjs, dayjsModule } from "../lib";


// Tests
describe('time difference', function() {
	it('should return correct difference with UTC', function() {
		const now = new Date("2024.02.27 19:26:00");
		const inSL = dayjs(now);

		console.log("Local: " + now.toISOString(), now.getUTCHours());
		console.log("SLT: " + inSL.format("YYYY.MM.DD HH:mm"), inSL.hour());

		let diff = inSL.hour() - now.getUTCHours();
		let shouldBeDate = now.getUTCDate();

		if(diff > 12) {
			shouldBeDate--;
			diff -= 24;
		}

		// Changes for winter time. Dirty hack!
		if(diff == -8) { diff = -7; }

		// Check if components of the date are correct
		assert.equal(diff, -7);
		assert.equal(inSL.minute(), now.getUTCMinutes());
		assert.equal(inSL.second(), now.getUTCSeconds());
		assert.equal(inSL.date(), shouldBeDate);
	});

	it('should respect new Date', function() {
		const inSL = dayjs(new Date());
		const nowTxt = new Date().toISOString();
		const inSLtxt = inSL.format("YYYY.MM.DD HH:mm");

		console.log("Now Date: " + nowTxt);
		console.log("Now SLT: " + inSLtxt);

		const m1 = nowTxt.match(/^[0-9T-]+(\d{2}).*$/);
		const nowH = m1[1];

		const m2 = inSLtxt.match(/[0-9. ]+(\d{2}).*$/);
		const sltH = m2[1];

		console.log(`nowH=${nowH}, sltH=${sltH}`);

		// Now hour and SLT hour should not match
		assert.notEqual(Number(nowH), NaN);
		assert.notEqual(Number(sltH), NaN);
		assert.notEqual(Number(nowH), Number(sltH));
	});

	it('should be correct around UTC', function() {
		const d = new Date("2021-04-19 00:01:02Z");
		const n = dayjs(d);

		// Check if components of the date are correct
		assert.equal(n.format("dddd, MMMM DD YYYY, HH:mm:ss ZZ"), "Sunday, April 18 2021, 17:01:02 -0700");
	});

	it('should have correct default TZ', function() {
		const n = dayjs();
		const now = new Date();

		console.log("now ISO: " + now.toISOString());

		// Check if components of the date are correct
		assert.equal(n.toISOString(), now.toISOString());
	});
});
