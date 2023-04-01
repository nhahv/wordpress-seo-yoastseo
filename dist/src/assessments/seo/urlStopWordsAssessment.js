"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _getLanguageAvailability = require("../../helpers/getLanguageAvailability");

var _getLanguageAvailability2 = _interopRequireDefault(_getLanguageAvailability);

var _shortlinker = require("../../helpers/shortlinker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const availableLanguages = ["en"];

const calculateUrlStopWordsCountResult = function calculateUrlStopWordsCountResult(stopWordCount, i18n) {
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34p");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34q");

	if (stopWordCount > 0) {
		return {
			score: 5,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sSlug stopwords%3$s: The slug for this page contains a stop word. %2$sRemove it%3$s!", "%1$sSlug stopwords%3$s: The slug for this page contains stop words. %2$sRemove them%3$s!", stopWordCount), urlTitle, urlCallToAction, "</a>")
		};
	}

	return {};
};

const urlHasStopWordsAssessment = function urlHasStopWordsAssessment(paper, researcher, i18n) {
	console.warn("Deprecation Warning: The UrlLengthAssessment has been deprecated since version 1.48. " + "We have removed it from the assessments since we do not consider it an important SEO factor anymore.");

	const stopWords = researcher.getResearch("stopWordsInUrl");

	const assessmentResult = new _AssessmentResult2.default();

	const stopWordsResult = calculateUrlStopWordsCountResult(stopWords.length, i18n);

	assessmentResult.setScore(stopWordsResult.score);
	assessmentResult.setText(stopWordsResult.text);

	return assessmentResult;
};

const isApplicable = function isApplicable(paper) {
	return (0, _getLanguageAvailability2.default)(paper.getLocale(), availableLanguages);
};

exports.default = {
	identifier: "urlStopWords",
	isApplicable: isApplicable,
	getResult: urlHasStopWordsAssessment
};
