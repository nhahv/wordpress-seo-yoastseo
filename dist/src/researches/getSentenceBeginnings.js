"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	let sentences = researcher.getResearch("sentences");
	const firstWordExceptions = (0, _getFirstWordExceptions2.default)(paper.getLocale())();

	let sentenceBeginnings = sentences.map(function (sentence) {
		return getSentenceBeginning(sentence, firstWordExceptions);
	});

	sentences = sentences.filter(function (sentence) {
		return (0, _getWords2.default)((0, _stripSpaces2.default)(sentence)).length > 0;
	});
	sentenceBeginnings = (0, _lodashEs.filter)(sentenceBeginnings);

	return compareFirstWords(sentenceBeginnings, sentences);
};

var _getWords = require("../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _getFirstWordExceptions = require("../helpers/getFirstWordExceptions.js");

var _getFirstWordExceptions2 = _interopRequireDefault(_getFirstWordExceptions);

var _stripHTMLTags = require("../stringProcessing/stripHTMLTags.js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startsWithSameWord = function startsWithSameWord(currentSentenceBeginning, nextSentenceBeginning) {
	if (!(0, _lodashEs.isEmpty)(currentSentenceBeginning) && currentSentenceBeginning === nextSentenceBeginning) {
		return true;
	}

	return false;
};

const compareFirstWords = function compareFirstWords(sentenceBeginnings, sentences) {
	const consecutiveFirstWords = [];
	let foundSentences = [];
	let sameBeginnings = 1;

	(0, _lodashEs.forEach)(sentenceBeginnings, function (beginning, i) {
		const currentSentenceBeginning = beginning;
		const nextSentenceBeginning = sentenceBeginnings[i + 1];
		foundSentences.push(sentences[i]);

		if (startsWithSameWord(currentSentenceBeginning, nextSentenceBeginning)) {
			sameBeginnings++;
		} else {
			consecutiveFirstWords.push({ word: currentSentenceBeginning, count: sameBeginnings, sentences: foundSentences });
			sameBeginnings = 1;
			foundSentences = [];
		}
	});

	return consecutiveFirstWords;
};

function getSentenceBeginning(sentence, firstWordExceptions) {
	const words = (0, _getWords2.default)((0, _stripHTMLTags.stripFullTags)((0, _stripSpaces2.default)(sentence)));

	if (words.length === 0) {
		return "";
	}

	let firstWord = words[0].toLocaleLowerCase();

	if (firstWordExceptions.indexOf(firstWord) > -1 && words.length > 1) {
		firstWord += " " + words[1];
	}

	return firstWord;
}
