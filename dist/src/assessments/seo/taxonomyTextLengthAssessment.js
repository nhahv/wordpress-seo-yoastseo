"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AssessmentResult = require("../../values/AssessmentResult.js");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _lodashEs = require("lodash-es");

var _shortlinker = require("../../helpers/shortlinker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recommendedMinimum = 150;

const calculateWordCountResult = function calculateWordCountResult(wordCount, i18n) {
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34j");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34k");

	if (wordCount >= 150) {
		return {
			score: 9,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%3$s: The text contains %1$d word. Good job!", "%2$sText length%3$s: The text contains %1$d words. Good job!", wordCount), wordCount, urlTitle, "</a>")
		};
	}

	if ((0, _lodashEs.inRange)(wordCount, 125, 150)) {
		return {
			score: 7,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is slightly below the recommended minimum of %5$d word. %3$sAdd a bit more copy%4$s.", "This is slightly below the recommended minimum of %5$d words. %3$sAdd a bit more copy%4$s.", recommendedMinimum), wordCount, urlTitle, urlCallToAction, "</a>", recommendedMinimum)
		};
	}

	if ((0, _lodashEs.inRange)(wordCount, 100, 125)) {
		return {
			score: 5,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is below the recommended minimum of %5$d word. %3$sAdd more content%4$s.", "This is below the recommended minimum of %5$d words. %3$sAdd more content%4$s.", recommendedMinimum), wordCount, urlTitle, urlCallToAction, "</a>", recommendedMinimum)
		};
	}

	if ((0, _lodashEs.inRange)(wordCount, 50, 100)) {
		return {
			score: -10,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is below the recommended minimum of %5$d word. %3$sAdd more content%4$s.", "This is below the recommended minimum of %5$d words. %3$sAdd more content%4$s.", recommendedMinimum), wordCount, urlTitle, urlCallToAction, "</a>", recommendedMinimum)
		};
	}

	if ((0, _lodashEs.inRange)(wordCount, 0, 50)) {
		return {
			score: -20,
			text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is far below the recommended minimum of %5$d word. %3$sAdd more content%4$s.", "This is far below the recommended minimum of %5$d words. %3$sAdd more content%4$s.", recommendedMinimum), wordCount, urlTitle, urlCallToAction, "</a>", recommendedMinimum)
		};
	}
};

const taxonomyTextLengthAssessment = function taxonomyTextLengthAssessment(paper, researcher, i18n) {
	console.warn("Deprecation Warning: This assessment has been deprecated since version 1.48. " + "Please use the TextLengthAssessment with different configuration parameters instead.");

	const wordCount = researcher.getResearch("wordCountInText");
	const wordCountResult = calculateWordCountResult(wordCount, i18n);
	const assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(wordCountResult.score);
	assessmentResult.setText(i18n.sprintf(wordCountResult.text, wordCount, recommendedMinimum));

	return assessmentResult;
};

exports.default = {
	identifier: "taxonomyTextLength",
	getResult: taxonomyTextLengthAssessment
};
