"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _addMark = require("../../markers/addMark");

var _addMark2 = _interopRequireDefault(_addMark);

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

var _getLanguageAvailability = require("../../helpers/getLanguageAvailability.js");

var _getLanguageAvailability2 = _interopRequireDefault(_getLanguageAvailability);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const maximumConsecutiveDuplicates = 2;

const availableLanguages = ["en", "de", "es", "fr", "nl", "it", "ru", "pl", "sv", "pt", "id", "ar", "he", "hu", "tr"];

const groupSentenceBeginnings = function groupSentenceBeginnings(sentenceBeginnings) {
	const tooOften = (0, _lodashEs.partition)(sentenceBeginnings, function (word) {
		return word.count > maximumConsecutiveDuplicates;
	});

	if (tooOften[0].length === 0) {
		return { total: 0 };
	}

	const sortedCounts = (0, _lodashEs.sortBy)(tooOften[0], function (word) {
		return word.count;
	});

	return { total: tooOften[0].length, lowestCount: sortedCounts[0].count };
};

const calculateSentenceBeginningsResult = function calculateSentenceBeginningsResult(groupedSentenceBeginnings, i18n) {
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35f");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35g");

	if (groupedSentenceBeginnings.total > 0) {
		return {
			score: 3,
			hasMarks: true,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sConsecutive sentences%2$s: The text contains %3$d consecutive sentences starting with the same word." + " %5$sTry to mix things up%2$s!", "%1$sConsecutive sentences%2$s: The text contains %4$d instances where" + " %3$d or more consecutive sentences start with the same word. %5$sTry to mix things up%2$s!", groupedSentenceBeginnings.total), urlTitle, "</a>", groupedSentenceBeginnings.lowestCount, groupedSentenceBeginnings.total, urlCallToAction)
		};
	}
	return {
		score: 9,
		hasMarks: false,
		text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sConsecutive sentences%2$s: There is enough variety in your sentences. That's great!"), urlTitle, "</a>")
	};
};

const sentenceBeginningMarker = function sentenceBeginningMarker(paper, researcher) {
	let sentenceBeginnings = researcher.getResearch("getSentenceBeginnings");
	sentenceBeginnings = (0, _lodashEs.filter)(sentenceBeginnings, function (sentenceBeginning) {
		return sentenceBeginning.count > maximumConsecutiveDuplicates;
	});

	const sentences = (0, _lodashEs.map)(sentenceBeginnings, function (begin) {
		return begin.sentences;
	});

	return (0, _lodashEs.map)((0, _lodashEs.flatten)(sentences), function (sentence) {
		sentence = (0, _stripHTMLTags.stripIncompleteTags)(sentence);
		const marked = (0, _addMark2.default)(sentence);
		return new _Mark2.default({
			original: sentence,
			marked: marked
		});
	});
};

const sentenceBeginningsAssessment = function sentenceBeginningsAssessment(paper, researcher, i18n) {
	const sentenceBeginnings = researcher.getResearch("getSentenceBeginnings");
	const groupedSentenceBeginnings = groupSentenceBeginnings(sentenceBeginnings);
	const sentenceBeginningsResult = calculateSentenceBeginningsResult(groupedSentenceBeginnings, i18n);
	const assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(sentenceBeginningsResult.score);
	assessmentResult.setText(sentenceBeginningsResult.text);
	assessmentResult.setHasMarks(sentenceBeginningsResult.hasMarks);
	return assessmentResult;
};

const isApplicable = function isApplicable(paper) {
	const isLanguageAvailable = (0, _getLanguageAvailability2.default)(paper.getLocale(), availableLanguages);
	return isLanguageAvailable && paper.hasText();
};

exports.default = {
	identifier: "sentenceBeginnings",
	getResult: sentenceBeginningsAssessment,
	isApplicable: isApplicable,
	getMarks: sentenceBeginningMarker
};
