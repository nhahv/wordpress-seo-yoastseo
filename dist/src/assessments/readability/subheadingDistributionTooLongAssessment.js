"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _inRange = require("../../helpers/inRange");

var _isValueTooLong = require("../../helpers/isValueTooLong");

var _isValueTooLong2 = _interopRequireDefault(_isValueTooLong);

var _shortlinker = require("../../helpers/shortlinker");

var _getSubheadings = require("../../stringProcessing/getSubheadings");

var _getWords = require("../../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubheadingsDistributionTooLong extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMaximumWordCount: 300,
				slightlyTooMany: 300,
				farTooMany: 350
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34x"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34y"),
			scores: {
				goodShortTextNoSubheadings: 9,
				goodSubheadings: 9,
				okSubheadings: 6,
				badSubheadings: 3,
				badLongTextNoSubheadings: 2
			}
		};

		this.identifier = "subheadingsTooLong";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._subheadingTextsLength = researcher.getResearch("getSubheadingTextLengths");

		this._subheadingTextsLength = this._subheadingTextsLength.sort(function (a, b) {
			return b.wordCount - a.wordCount;
		});

		this._tooLongTextsNumber = this.getTooLongSubheadingTexts().length;

		const assessmentResult = new _AssessmentResult2.default();
		assessmentResult.setIdentifier(this.identifier);

		this._hasSubheadings = this.hasSubheadings(paper);

		this._textLength = (0, _getWords2.default)(paper.getText()).length;

		const calculatedResult = this.calculateResult(i18n);
		calculatedResult.resultTextPlural = calculatedResult.resultTextPlural || "";
		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasText();
	}

	hasSubheadings(paper) {
		const subheadings = (0, _getSubheadings.getSubheadings)(paper.getText());
		return subheadings.length > 0;
	}

	getTooLongSubheadingTexts() {
		return (0, _lodashEs.filter)(this._subheadingTextsLength, function (subheading) {
			return (0, _isValueTooLong2.default)(this._config.parameters.recommendedMaximumWordCount, subheading.wordCount);
		}.bind(this));
	}

	calculateResult(i18n) {
		if (this._textLength > 300) {
			if (this._hasSubheadings) {
				const longestSubheadingTextLength = this._subheadingTextsLength[0].wordCount;
				if (longestSubheadingTextLength <= this._config.parameters.slightlyTooMany) {
					return {
						score: this._config.scores.goodSubheadings,
						resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSubheading distribution%2$s: Great job!"), this._config.urlTitle, "</a>")
					};
				}

				if ((0, _inRange.inRangeEndInclusive)(longestSubheadingTextLength, this._config.parameters.slightlyTooMany, this._config.parameters.farTooMany)) {
					return {
						score: this._config.scores.okSubheadings,
						resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sSubheading distribution%2$s: %3$d section of your text is longer than %4$d words and" + " is not separated by any subheadings. %5$sAdd subheadings to improve readability%2$s.", "%1$sSubheading distribution%2$s: %3$d sections of your text are longer than %4$d words " + "and are not separated by any subheadings. %5$sAdd subheadings to improve readability%2$s.", this._tooLongTextsNumber), this._config.urlTitle, "</a>", this._tooLongTextsNumber, this._config.parameters.recommendedMaximumWordCount, this._config.urlCallToAction)
					};
				}

				return {
					score: this._config.scores.badSubheadings,
					resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sSubheading distribution%2$s: %3$d section of your text is longer than %4$d words and" + " is not separated by any subheadings. %5$sAdd subheadings to improve readability%2$s.", "%1$sSubheading distribution%2$s: %3$d sections of your text are longer than %4$d words " + "and are not separated by any subheadings. %5$sAdd subheadings to improve readability%2$s.", this._tooLongTextsNumber), this._config.urlTitle, "</a>", this._tooLongTextsNumber, this._config.parameters.recommendedMaximumWordCount, this._config.urlCallToAction)
				};
			}

			return {
				score: this._config.scores.badLongTextNoSubheadings,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSubheading distribution%2$s: You are not using any subheadings, although your text is rather long." + " %3$sTry and add some subheadings%2$s."), this._config.urlTitle, "</a>", this._config.urlCallToAction)
			};
		}
		if (this._hasSubheadings) {
			return {
				score: this._config.scores.goodSubheadings,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSubheading distribution%2$s: Great job!"), this._config.urlTitle, "</a>")
			};
		}

		return {
			score: this._config.scores.goodShortTextNoSubheadings,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSubheading distribution%2$s: You are not using any subheadings, but your text is short enough" + " and probably doesn't need them."), this._config.urlTitle, "</a>")
		};
	}
}

exports.default = SubheadingsDistributionTooLong;
