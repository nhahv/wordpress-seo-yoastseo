"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _recommendedKeywordCount = require("../../assessmentHelpers/recommendedKeywordCount.js");

var _recommendedKeywordCount2 = _interopRequireDefault(_recommendedKeywordCount);

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _getLanguage = require("../../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _getLanguagesWithWordFormSupport = require("../../helpers/getLanguagesWithWordFormSupport");

var _getLanguagesWithWordFormSupport2 = _interopRequireDefault(_getLanguagesWithWordFormSupport);

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _inRange = require("../../helpers/inRange");

var _shortlinker = require("../../helpers/shortlinker");

var _keyphraseLengthFactor = require("../../helpers/keyphraseLengthFactor.js");

var _keyphraseLengthFactor2 = _interopRequireDefault(_keyphraseLengthFactor);

var _countWords = require("../../stringProcessing/countWords");

var _countWords2 = _interopRequireDefault(_countWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KeywordDensityAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				noWordForms: {
					overMaximum: 4,
					maximum: 3,
					minimum: 0.5
				},
				multipleWordForms: {
					overMaximum: 4,
					maximum: 3.5,
					minimum: 0.5
				}
			},
			scores: {
				wayOverMaximum: -50,
				overMaximum: -10,
				correctDensity: 9,
				underMinimum: 4
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33v"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33w")
		};

		this.identifier = "keywordDensity";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	setBoundaries(text, keyphraseLength) {
		if (this._hasMorphologicalForms) {
			this._boundaries = this._config.parameters.multipleWordForms;
		} else {
			this._boundaries = this._config.parameters.noWordForms;
		}
		this._minRecommendedKeywordCount = (0, _recommendedKeywordCount2.default)(text, keyphraseLength, this._boundaries.minimum, "min");
		this._maxRecommendedKeywordCount = (0, _recommendedKeywordCount2.default)(text, keyphraseLength, this._boundaries.maximum, "max");
	}

	getResult(paper, researcher, i18n) {
		this._hasMorphologicalForms = researcher.getData("morphology") !== false && (0, _getLanguagesWithWordFormSupport2.default)().includes((0, _getLanguage2.default)(paper.getLocale()));

		this._keywordCount = researcher.getResearch("keywordCount");
		const keyphraseLength = this._keywordCount.length;

		this.setBoundaries(paper.getText(), keyphraseLength);

		const assessmentResult = new _AssessmentResult2.default();

		this._keywordDensity = researcher.getResearch("getKeywordDensity");

		this._keywordDensity = this._keywordDensity * (0, _keyphraseLengthFactor2.default)(keyphraseLength);
		const calculatedScore = this.calculateResult(i18n);

		assessmentResult.setScore(calculatedScore.score);
		assessmentResult.setText(calculatedScore.resultText);
		assessmentResult.setHasMarks(this._keywordCount.count > 0);

		return assessmentResult;
	}

	hasNoMatches() {
		return this._keywordCount.count === 0;
	}

	hasTooFewMatches() {
		return (0, _inRange.inRangeStartInclusive)(this._keywordDensity, 0, this._boundaries.minimum) || this._keywordCount.count === 1;
	}

	hasGoodNumberOfMatches() {
		return (0, _inRange.inRangeStartEndInclusive)(this._keywordDensity, this._boundaries.minimum, this._boundaries.maximum) || this._keywordCount.count === 2 && this._minRecommendedKeywordCount <= 2;
	}

	hasTooManyMatches() {
		return (0, _inRange.inRangeEndInclusive)(this._keywordDensity, this._boundaries.maximum, this._boundaries.overMaximum);
	}

	calculateResult(i18n) {
		if (this.hasNoMatches()) {
			return {
				score: this._config.scores.underMinimum,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase density%2$s: The focus keyphrase was found 0 times. " + "That's less than the recommended minimum of %3$d times for a text of this length. " + "%4$sFocus on your keyphrase%2$s!"), this._config.urlTitle, "</a>", this._minRecommendedKeywordCount, this._config.urlCallToAction)
			};
		}

		if (this.hasTooFewMatches()) {
			return {
				score: this._config.scores.underMinimum,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sKeyphrase density%2$s: The focus keyphrase was found %5$d time. That's less than the " + "recommended minimum of %3$d times for a text of this length. %4$sFocus on your keyphrase%2$s!", "%1$sKeyphrase density%2$s: The focus keyphrase was found %5$d times. That's less than the " + "recommended minimum of %3$d times for a text of this length. %4$sFocus on your keyphrase%2$s!", this._keywordCount.count), this._config.urlTitle, "</a>", this._minRecommendedKeywordCount, this._config.urlCallToAction, this._keywordCount.count)
			};
		}

		if (this.hasGoodNumberOfMatches()) {
			return {
				score: this._config.scores.correctDensity,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sKeyphrase density%2$s: The focus keyphrase was found %3$d time. This is great!", "%1$sKeyphrase density%2$s: The focus keyphrase was found %3$d times. This is great!", this._keywordCount.count), this._config.urlTitle, "</a>", this._keywordCount.count)
			};
		}

		if (this.hasTooManyMatches()) {
			return {
				score: this._config.scores.overMaximum,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sKeyphrase density%2$s: The focus keyphrase was found %5$d time. That's more than the " + "recommended maximum of %3$d times for a text of this length. %4$sDon't overoptimize%2$s!", "%1$sKeyphrase density%2$s: The focus keyphrase was found %5$d times. That's more than the " + "recommended maximum of %3$d times for a text of this length. %4$sDon't overoptimize%2$s!", this._keywordCount.count), this._config.urlTitle, "</a>", this._maxRecommendedKeywordCount, this._config.urlCallToAction, this._keywordCount.count)
			};
		}

		return {
			score: this._config.scores.wayOverMaximum,
			resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sKeyphrase density%2$s: The focus keyphrase was found %5$d time. That's way more than the " + "recommended maximum of %3$d times for a text of this length. %4$sDon't overoptimize%2$s!", "%1$sKeyphrase density%2$s: The focus keyphrase was found %5$d times. That's way more than the " + "recommended maximum of %3$d times for a text of this length. %4$sDon't overoptimize%2$s!", this._keywordCount.count), this._config.urlTitle, "</a>", this._maxRecommendedKeywordCount, this._config.urlCallToAction, this._keywordCount.count)
		};
	}

	getMarks() {
		return this._keywordCount.markings;
	}

	isApplicable(paper) {
		return paper.hasText() && paper.hasKeyword() && (0, _countWords2.default)(paper.getText()) >= 100;
	}
}

exports.default = KeywordDensityAssessment;
