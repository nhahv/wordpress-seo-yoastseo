"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (precedingWords, matchIndex, addSpace = true) {
	var space = addSpace ? 1 : 0;

	if ((0, _lodashEs.isEmpty)(precedingWords)) {
		return false;
	}

	var precedingWordsEndIndices = [];
	(0, _lodashEs.forEach)(precedingWords, function (precedingWord) {
		var precedingWordsEndIndex = precedingWord.index + precedingWord.match.length + space;
		precedingWordsEndIndices.push(precedingWordsEndIndex);
	});
	return (0, _lodashEs.includes)(precedingWordsEndIndices, matchIndex);
};

var _lodashEs = require("lodash-es");
