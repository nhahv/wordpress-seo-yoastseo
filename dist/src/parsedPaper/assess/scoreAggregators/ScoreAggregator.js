"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

class ScoreAggregator {
	aggregate(results) {
		console.warn("'aggregate' must be implemented by a child class of 'ScoreAggregator'");
	}
}

exports.default = ScoreAggregator;
