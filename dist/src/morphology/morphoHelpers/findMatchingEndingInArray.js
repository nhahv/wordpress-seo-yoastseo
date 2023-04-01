"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findMatchingEndingInArray = findMatchingEndingInArray;
function findMatchingEndingInArray(string, endings) {
	const matches = [];
	for (const i in endings) {
		if (string.endsWith(endings[i])) {
			matches.push(endings[i]);
		}
	}

	const longest = matches.sort(function (a, b) {
		return b.length - a.length;
	})[0];

	if (longest) {
		return longest;
	}
	return "";
}
