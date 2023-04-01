"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, regex) {
	const results = [];

	for (let match = regex.exec(sentencePart); match !== null; match = regex.exec(sentencePart)) {
		results.push({
			match: match[0],
			index: match.index
		});
	}
	return results;
};
