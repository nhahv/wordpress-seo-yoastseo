"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _checkForTooLongSentences = require("../../assessmentHelpers/checkForTooLongSentences");

var _checkForTooLongSentences2 = _interopRequireDefault(_checkForTooLongSentences);

var _formatNumber = require("../../helpers/formatNumber");

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _inRange = require("../../helpers/inRange");

var _addMark = require("../../markers/addMark");

var _addMark2 = _interopRequireDefault(_addMark);

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SentenceLengthInTextAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			recommendedWordCount: 20,
			slightlyTooMany: 25,
			farTooMany: 30
		};

		this.identifier = "textSentenceLength";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		const sentences = researcher.getResearch("countSentencesFromText");
		const percentage = this.calculatePercentage(sentences);
		const score = this.calculateScore(percentage);

		const assessmentResult = new _AssessmentResult2.default();

		assessmentResult.setScore(score);
		assessmentResult.setText(this.translateScore(score, percentage, i18n));
		assessmentResult.setHasMarks(percentage > 0);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasText();
	}

	getMarks(paper, researcher) {
		const sentenceCount = researcher.getResearch("countSentencesFromText");
		const sentenceObjects = this.getTooLongSentences(sentenceCount);

		return (0, _lodashEs.map)(sentenceObjects, function (sentenceObject) {
			const sentence = (0, _stripHTMLTags.stripIncompleteTags)(sentenceObject.sentence);
			return new _Mark2.default({
				original: sentence,
				marked: (0, _addMark2.default)(sentence)
			});
		});
	}

	translateScore(score, percentage, i18n) {
		const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34v");
		const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34w");
		if (score >= 7) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSentence length%2$s: Great!"), urlTitle, "</a>");
		}

		return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSentence length%2$s: %3$s of the sentences contain more than %4$s words, which is more than the recommended maximum of %5$s." + " %6$sTry to shorten the sentences%2$s."), urlTitle, "</a>", percentage + "%", this._config.recommendedWordCount, this._config.slightlyTooMany + "%", urlCallToAction);
	}

	calculatePercentage(sentences) {
		let percentage = 0;

		if (sentences.length !== 0) {
			const tooLongTotal = this.countTooLongSentences(sentences);

			percentage = (0, _formatNumber2.default)(tooLongTotal / sentences.length * 100);
		}

		return percentage;
	}

	calculateScore(percentage) {
		let score;

		if (percentage <= this._config.slightlyTooMany) {
			score = 9;
		}

		if ((0, _inRange.inRangeEndInclusive)(percentage, this._config.slightlyTooMany, this._config.farTooMany)) {
			score = 6;
		}

		if (percentage > this._config.farTooMany) {
			score = 3;
		}

		return score;
	}

	getTooLongSentences(sentences) {
		return (0, _checkForTooLongSentences2.default)(sentences, this._config.recommendedWordCount);
	}

	countTooLongSentences(sentences) {
		return this.getTooLongSentences(sentences).length;
	}
}

exports.default = SentenceLengthInTextAssessment;
