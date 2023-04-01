"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var matches;

	matches = text.match(/<a[\s]+(?:[^>]+)>((?:.|[\n\r\u2028\u2029])*?)<\/a>/ig);

	if (matches === null) {
		matches = [];
	}

	return matches;
};
