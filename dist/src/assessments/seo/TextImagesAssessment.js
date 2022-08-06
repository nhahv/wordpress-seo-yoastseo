"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _inRange = require("../../helpers/inRange.js");

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextImagesAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				lowerBoundary: 0.3,
				upperBoundary: 0.75
			},
			scores: {
				noImages: 3,
				withAltGoodNumberOfKeywordMatches: 9,
				withAltTooFewKeywordMatches: 6,
				withAltTooManyKeywordMatches: 6,
				withAltNonKeyword: 6,
				withAlt: 6,
				noAlt: 6
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33c"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33d")
		};

		this.identifier = "textImages";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this.imageCount = researcher.getResearch("imageCount");
		this.altProperties = researcher.getResearch("altTagCount");

		this._minNumberOfKeywordMatches = Math.ceil(this.imageCount * this._config.parameters.lowerBoundary);
		this._maxNumberOfKeywordMatches = Math.floor(this.imageCount * this._config.parameters.upperBoundary);

		const calculatedScore = this.calculateResult(i18n);

		const assessmentResult = new _AssessmentResult2.default();
		assessmentResult.setScore(calculatedScore.score);
		assessmentResult.setText(calculatedScore.resultText);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasText();
	}

	hasTooFewMatches() {
		return this.imageCount > 4 && this.altProperties.withAltKeyword > 0 && this.altProperties.withAltKeyword < this._minNumberOfKeywordMatches;
	}

	hasGoodNumberOfMatches() {
		return this.imageCount < 5 && this.altProperties.withAltKeyword > 0 || this.imageCount === 5 && (0, _inRange.inRangeStartEndInclusive)(this.altProperties.withAltKeyword, 2, 4) || this.imageCount > 4 && (0, _inRange.inRangeStartEndInclusive)(this.altProperties.withAltKeyword, this._minNumberOfKeywordMatches, this._maxNumberOfKeywordMatches);
	}

	hasTooManyMatches() {
		return this.imageCount > 4 && this.altProperties.withAltKeyword > this._maxNumberOfKeywordMatches;
	}

	calculateResult(i18n) {
		if (this.imageCount === 0) {
			return {
				score: this._config.scores.noImages,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sImage alt attributes%3$s: No images appear on this page. %2$sAdd some%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.altProperties.withAlt > 0) {
			return {
				score: this._config.scores.withAlt,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sImage alt attributes%3$s: " + "Images on this page have alt attributes, but you have not set your keyphrase. %2$sFix that%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.altProperties.withAltNonKeyword > 0 && this.altProperties.withAltKeyword === 0) {
			return {
				score: this._config.scores.withAltNonKeyword,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sImage alt attributes%3$s: " + "Images on this page do not have alt attributes that reflect the topic of your text. " + "%2$sAdd your keyphrase or synonyms to the alt tags of relevant images%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.hasTooFewMatches()) {
			return {
				score: this._config.scores.withAltTooFewKeywordMatches,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%3$sImage alt attributes%5$s: Out of %2$d images on this page, only %1$d has an alt attribute that " + "reflects the topic of your text. " + "%4$sAdd your keyphrase or synonyms to the alt tags of more relevant images%5$s!", "%3$sImage alt attributes%5$s: Out of %2$d images on this page, only %1$d have alt attributes that " + "reflect the topic of your text. " + "%4$sAdd your keyphrase or synonyms to the alt tags of more relevant images%5$s!", this.altProperties.withAltKeyword), this.altProperties.withAltKeyword, this.imageCount, this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.hasGoodNumberOfMatches()) {
			return {
				score: this._config.scores.withAltGoodNumberOfKeywordMatches,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sImage alt attributes%2$s: Good job!"), this._config.urlTitle, "</a>")
			};
		}

		if (this.hasTooManyMatches()) {
			return {
				score: this._config.scores.withAltTooManyKeywordMatches,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%3$sImage alt attributes%5$s: Out of %2$d images on this page, %1$d have alt attributes with " + "words from your keyphrase or synonyms. " + "That's a bit much. %4$sOnly include the keyphrase or its synonyms when it really fits the image%5$s."), this.altProperties.withAltKeyword, this.imageCount, this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		return {
			score: this._config.scores.noAlt,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sImage alt attributes%3$s: " + "Images on this page do not have alt attributes that reflect the topic of your text. " + "%2$sAdd your keyphrase or synonyms to the alt tags of relevant images%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
		};
	}
}
exports.default = TextImagesAssessment;
