"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _inRange = require("../../helpers/inRange");

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark.js");

var _Mark2 = _interopRequireDefault(_Mark);

var _addMark = require("../../markers/addMark.js");

var _addMark2 = _interopRequireDefault(_addMark);

var _getLanguageAvailability = require("../../helpers/getLanguageAvailability.js");

var _getLanguageAvailability2 = _interopRequireDefault(_getLanguageAvailability);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const availableLanguages = ["en", "de", "es", "fr", "nl", "it", "pt", "ru", "ca", "pl", "sv", "hu", "id", "ar", "he", "tr"];

const calculateTransitionWordPercentage = function calculateTransitionWordPercentage(sentences) {
	if (sentences.transitionWordSentences === 0 || sentences.totalSentences === 0) {
		return 0;
	}

	return (0, _formatNumber2.default)(sentences.transitionWordSentences / sentences.totalSentences * 100);
};

const calculateScoreFromPercentage = function calculateScoreFromPercentage(percentage) {
	if (percentage < 20) {
		return 3;
	}

	if ((0, _inRange.inRangeStartInclusive)(percentage, 20, 30)) {
		return 6;
	}

	if (percentage >= 30) {
		return 9;
	}
};

const calculateTransitionWordResult = function calculateTransitionWordResult(transitionWordSentences, i18n) {
	const percentage = calculateTransitionWordPercentage(transitionWordSentences);
	const score = calculateScoreFromPercentage(percentage);
	const hasMarks = percentage > 0;
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34z");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35a");

	if (score < 7 && percentage === 0) {
		return {
			score: (0, _formatNumber2.default)(score),
			hasMarks: hasMarks,
			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sTransition words%2$s: None of the sentences contain transition words. %3$sUse some%2$s."), urlTitle, "</a>", urlCallToAction)
		};
	}

	if (score < 7) {
		return {
			score: (0, _formatNumber2.default)(score),
			hasMarks: hasMarks,
			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sTransition words%2$s: Only %3$s of the sentences contain transition words, which is not enough. %4$sUse more of them%2$s."), urlTitle, "</a>", percentage + "%", urlCallToAction)
		};
	}

	return {
		score: (0, _formatNumber2.default)(score),
		hasMarks: hasMarks,
		text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sTransition words%2$s: Well done!"), urlTitle, "</a>")
	};
};

const transitionWordsAssessment = function transitionWordsAssessment(paper, researcher, i18n) {
	const transitionWordSentences = researcher.getResearch("findTransitionWords");
	const transitionWordResult = calculateTransitionWordResult(transitionWordSentences, i18n);
	const assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(transitionWordResult.score);
	assessmentResult.setText(transitionWordResult.text);
	assessmentResult.setHasMarks(transitionWordResult.hasMarks);

	return assessmentResult;
};

const transitionWordsMarker = function transitionWordsMarker(paper, researcher) {
	const transitionWordSentences = researcher.getResearch("findTransitionWords");

	return (0, _lodashEs.map)(transitionWordSentences.sentenceResults, function (sentenceResult) {
		let sentence = sentenceResult.sentence;
		sentence = (0, _stripHTMLTags.stripIncompleteTags)(sentence);
		return new _Mark2.default({
			original: sentence,
			marked: (0, _addMark2.default)(sentence)
		});
	});
};

const isApplicable = function isApplicable(paper) {
	const isLanguageAvailable = (0, _getLanguageAvailability2.default)(paper.getLocale(), availableLanguages);
	return isLanguageAvailable && paper.hasText();
};

exports.default = {
	identifier: "textTransitionWords",
	getResult: transitionWordsAssessment,
	isApplicable: isApplicable,
	getMarks: transitionWordsMarker
};
