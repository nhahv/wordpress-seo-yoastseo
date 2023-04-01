"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _inRange = require("../../helpers/inRange");

var _isValueTooLong = require("../../helpers/isValueTooLong");

var _isValueTooLong2 = _interopRequireDefault(_isValueTooLong);

var _addMark = require("../../markers/addMark");

var _addMark2 = _interopRequireDefault(_addMark);

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recommendedValue = 150;

const getTooLongParagraphs = function getTooLongParagraphs(paragraphsLength) {
	return (0, _lodashEs.filter)(paragraphsLength, function (paragraph) {
		return (0, _isValueTooLong2.default)(recommendedValue, paragraph.wordCount);
	});
};

const calculateParagraphLengthResult = function calculateParagraphLengthResult(paragraphsLength, tooLongParagraphs, i18n) {
	let score;
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35d");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35e");

	if (paragraphsLength.length === 0) {
		return {};
	}

	const longestParagraphLength = paragraphsLength[0].wordCount;

	if (longestParagraphLength <= 150) {
		score = 9;
	}

	if ((0, _inRange.inRangeEndInclusive)(longestParagraphLength, 150, 200)) {
		score = 6;
	}

	if (longestParagraphLength > 200) {
		score = 3;
	}

	if (score >= 7) {
		return {
			score: score,
			hasMarks: false,

			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sParagraph length%2$s: None of the paragraphs are too long. Great job!"), urlTitle, "</a>")
		};
	}
	return {
		score: score,
		hasMarks: true,
		text: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sParagraph length%2$s: %3$d of the paragraphs contains more than the recommended maximum of %4$d words." + " %5$sShorten your paragraphs%2$s!", "%1$sParagraph length%2$s: %3$d of the paragraphs contain more than the " + "recommended maximum of %4$d words. %5$sShorten your paragraphs%2$s!", tooLongParagraphs.length), urlTitle, "</a>", tooLongParagraphs.length, recommendedValue, urlCallToAction)
	};
};

var sortParagraphs = function sortParagraphs(paragraphs) {
	return paragraphs.sort(function (a, b) {
		return b.wordCount - a.wordCount;
	});
};

var paragraphLengthMarker = function paragraphLengthMarker(paper, researcher) {
	var paragraphsLength = researcher.getResearch("getParagraphLength");
	var tooLongParagraphs = getTooLongParagraphs(paragraphsLength);
	return (0, _lodashEs.map)(tooLongParagraphs, function (paragraph) {
		var paragraphText = (0, _stripHTMLTags.stripBlockTagsAtStartEnd)(paragraph.text);
		var marked = (0, _addMark2.default)(paragraphText);
		return new _Mark2.default({
			original: paragraphText,
			marked: marked
		});
	});
};

var paragraphLengthAssessment = function paragraphLengthAssessment(paper, researcher, i18n) {
	var paragraphsLength = researcher.getResearch("getParagraphLength");

	paragraphsLength = sortParagraphs(paragraphsLength);

	var tooLongParagraphs = getTooLongParagraphs(paragraphsLength);
	var paragraphLengthResult = calculateParagraphLengthResult(paragraphsLength, tooLongParagraphs, i18n);
	var assessmentResult = new _AssessmentResult2.default();

	assessmentResult.setScore(paragraphLengthResult.score);
	assessmentResult.setText(paragraphLengthResult.text);
	assessmentResult.setHasMarks(paragraphLengthResult.hasMarks);

	return assessmentResult;
};

var isApplicable = function isApplicable(paper) {
	return paper.hasText();
};

exports.default = {
	identifier: "textParagraphTooLong",
	getResult: paragraphLengthAssessment,
	isApplicable: isApplicable,
	getMarks: paragraphLengthMarker
};
