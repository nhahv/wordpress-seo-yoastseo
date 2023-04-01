"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	const strippedTextStart = (0, _stripWordBoundaries.stripWordBoundariesStart)(text);
	let wordBoundaryStart = "";
	let wordBoundaryEnd = "";

	if (strippedTextStart !== text) {
		const wordBoundaryStartIndex = text.search(strippedTextStart);
		wordBoundaryStart = text.substr(0, wordBoundaryStartIndex);
	}

	const strippedTextEnd = (0, _stripWordBoundaries.stripWordBoundariesEnd)(strippedTextStart);

	if (strippedTextEnd !== strippedTextStart) {
		const wordBoundaryEndIndex = strippedTextStart.search(strippedTextEnd) + strippedTextEnd.length;
		wordBoundaryEnd = strippedTextStart.substr(wordBoundaryEndIndex);
	}

	return wordBoundaryStart + "<yoastmark class='yoast-text-mark'>" + strippedTextEnd + "</yoastmark>" + wordBoundaryEnd;
};

var _stripWordBoundaries = require("../stringProcessing/stripWordBoundaries");
