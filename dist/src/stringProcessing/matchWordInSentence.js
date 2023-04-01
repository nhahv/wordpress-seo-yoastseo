"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isWordInSentence = exports.characterInBoundary = undefined;

var _wordBoundaries = require("../config/wordBoundaries.js");

var _wordBoundaries2 = _interopRequireDefault(_wordBoundaries);

var _lodashEs = require("lodash-es");

var _addWordboundary = require("./addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wordBoundaries = (0, _wordBoundaries2.default)();

const characterInBoundary = function characterInBoundary(character) {
	return (0, _lodashEs.includes)(wordBoundaries, character);
};

const isWordInSentence = function isWordInSentence(word, sentence) {
	word = word.toLocaleLowerCase();
	sentence = sentence.toLocaleLowerCase();

	const wordWithBoundaries = (0, _addWordboundary2.default)((0, _lodashEs.escapeRegExp)(word));
	let occurrenceStart = sentence.search(new RegExp(wordWithBoundaries, "ig"));

	if (occurrenceStart === -1) {
		return false;
	}

	if (occurrenceStart > 0) {
		occurrenceStart += 1;
	}
	const occurrenceEnd = occurrenceStart + word.length;

	const previousCharacter = characterInBoundary(sentence[occurrenceStart - 1]) || occurrenceStart === 0;
	const nextCharacter = characterInBoundary(sentence[occurrenceEnd]) || occurrenceEnd === sentence.length;

	return previousCharacter && nextCharacter;
};

exports.characterInBoundary = characterInBoundary;
exports.isWordInSentence = isWordInSentence;
exports.default = {
	characterInBoundary,
	isWordInSentence
};
