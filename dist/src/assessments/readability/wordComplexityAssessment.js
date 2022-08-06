"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _addMark = require("../../markers/addMark");

var _addMark2 = _interopRequireDefault(_addMark);

var _shortlinker = require("../../helpers/shortlinker");

var _removeSentenceTerminators = require("../../stringProcessing/removeSentenceTerminators");

var _removeSentenceTerminators2 = _interopRequireDefault(_removeSentenceTerminators);

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recommendedValue = 3;

var filterComplexity = function filterComplexity(words) {
	return (0, _lodashEs.filter)(words, function (word) {
		return word.complexity > recommendedValue;
	});
};

var calculateComplexity = function calculateComplexity(wordCount, wordComplexity, i18n) {
	var percentage = 0;
	var tooComplexWords = filterComplexity(wordComplexity).length;

	if (wordCount !== 0) {
		percentage = tooComplexWords / wordCount * 100;
	}

	percentage = (0, _formatNumber2.default)(percentage);
	var hasMarks = percentage > 0;
	var recommendedMaximum = 5;
	var wordComplexityURL = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/difficult-words");

	var score = 9 - Math.max(Math.min(0.6 * (percentage - 1.7), 6), 0);
	score = (0, _formatNumber2.default)(score);

	if (score >= 7) {
		return {
			score: score,
			hasMarks: hasMarks,
			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$s of the words contain %2$sover %3$s syllables%4$s, " + "which is less than or equal to the recommended maximum of %5$s."), percentage + "%", wordComplexityURL, recommendedValue, "</a>", recommendedMaximum + "%")
		};
	}

	return {
		score: score,
		hasMarks: hasMarks,
		text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$s of the words contain %2$sover %3$s syllables%4$s, " + "which is more than the recommended maximum of %5$s."), percentage + "%", wordComplexityURL, recommendedValue, "</a>", recommendedMaximum + "%")
	};
};

var markComplexWordsInSentence = function markComplexWordsInSentence(sentence, complexWords) {
	var splitWords = sentence.split(/\s+/);

	(0, _lodashEs.forEach)(complexWords, function (complexWord) {
		var wordIndex = complexWord.wordIndex;

		if (complexWord.word === splitWords[wordIndex] || complexWord.word === (0, _removeSentenceTerminators2.default)(splitWords[wordIndex])) {
			splitWords[wordIndex] = splitWords[wordIndex].replace(complexWord.word, (0, _addMark2.default)(complexWord.word));
		}
	});
	return splitWords;
};

var splitSentenceOnWhitespace = function splitSentenceOnWhitespace(sentence) {
	var whitespace = sentence.split(/\S+/);

	whitespace.pop();
	whitespace.shift();

	return whitespace;
};

var wordComplexityMarker = function wordComplexityMarker(paper, researcher) {
	var wordComplexityResults = researcher.getResearch("wordComplexity");

	return (0, _lodashEs.flatMap)(wordComplexityResults, function (result) {
		var words = result.words;
		var sentence = result.sentence;

		var complexWords = filterComplexity(words);

		if (complexWords.length === 0) {
			return [];
		}

		var splitWords = markComplexWordsInSentence(sentence, complexWords);

		var whitespace = splitSentenceOnWhitespace(sentence);

		var markedSentence = (0, _lodashEs.zip)(splitWords, whitespace);
		markedSentence = (0, _lodashEs.flatten)(markedSentence);
		markedSentence = markedSentence.join("");

		return new _Mark2.default({
			original: sentence,
			marked: markedSentence
		});
	});
};

var wordComplexityAssessment = function wordComplexityAssessment(paper, researcher, i18n) {
	var wordComplexity = researcher.getResearch("wordComplexity");
	wordComplexity = (0, _lodashEs.flatMap)(wordComplexity, function (sentence) {
		return sentence.words;
	});
	var wordCount = wordComplexity.length;

	var complexityResult = calculateComplexity(wordCount, wordComplexity, i18n);
	var assessmentResult = new _AssessmentResult2.default();
	assessmentResult.setScore(complexityResult.score);
	assessmentResult.setText(complexityResult.text);
	assessmentResult.setHasMarks(complexityResult.hasMarks);
	return assessmentResult;
};

var isApplicable = function isApplicable(paper) {
	return paper.hasText();
};

exports.default = {
	identifier: "wordComplexity",
	getResult: wordComplexityAssessment,
	isApplicable: isApplicable,
	getMarks: wordComplexityMarker
};
