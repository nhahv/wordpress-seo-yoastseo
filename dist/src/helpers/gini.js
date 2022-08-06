"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = gini;
function gini(scores) {
	scores = scores.sort();
	let subsum = 0;
	const sumAbsoluteDifferences = scores.reduce((accumulator, score, index) => {
		accumulator += index * score - subsum;
		subsum += score;
		return accumulator;
	}, 0);

	return subsum === 0 || scores.length === 0 ? -1 : sumAbsoluteDifferences / subsum / scores.length;
}
