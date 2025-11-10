import {describe, before, after, beforeEach, it} from "mocha";

process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

const
	assert = require('assert');

// Libs to test
import { dayjs, dayjsModule } from "../lib";

import duration from "dayjs/plugin/duration";
dayjsModule.extend(duration);

const t1 = dayjs;
const t2 = dayjsModule;

// Tests
describe('supports duration', function() {
	it('should calculate correct duration', function() {
		const now = dayjs();
		const then = now.add(1, "days").add(2, "hours").add(3, "minutes");
		const dur = dayjsModule.duration(then.diff(now));

		console.log("Local: " + now.toISOString());

		// Check if components of the date are correct
		assert.equal(dur.days(), 1);
		assert.equal(dur.hours(), 2);
		assert.equal(dur.minutes(), 3);
	});
});
