"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextLengthAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			recommendedMinimum: 300,
			slightlyBelowMinimum: 250,
			belowMinimum: 200,
			veryFarBelowMinimum: 100,

			scores: {
				recommendedMinimum: 9,
				slightlyBelowMinimum: 6,
				belowMinimum: 3,
				farBelowMinimum: -10,
				veryFarBelowMinimum: -20
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34n"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34o"),

			cornerstoneContent: false
		};

		this.identifier = "textLength";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		const wordCount = researcher.getResearch("wordCountInText");
		const assessmentResult = new _AssessmentResult2.default();
		const calculatedResult = this.calculateResult(wordCount, i18n);

		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	calculateResult(wordCount, i18n) {
		if (wordCount >= this._config.recommendedMinimum) {
			return {
				score: this._config.scores.recommendedMinimum,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%3$s: The text contains %1$d word. Good job!", "%2$sText length%3$s: The text contains %1$d words. Good job!", wordCount), wordCount, this._config.urlTitle, "</a>")
			};
		}

		if ((0, _lodashEs.inRange)(wordCount, 0, this._config.belowMinimum)) {
			let badScore = this._config.scores.farBelowMinimum;

			if ((0, _lodashEs.inRange)(wordCount, 0, this._config.veryFarBelowMinimum)) {
				badScore = this._config.scores.veryFarBelowMinimum;
			}

			return {
				score: badScore,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is far below the recommended minimum of %5$d word. %3$sAdd more content%4$s.", "This is far below the recommended minimum of %5$d words. %3$sAdd more content%4$s.", this._config.recommendedMinimum), wordCount, this._config.urlTitle, this._config.urlCallToAction, "</a>", this._config.recommendedMinimum)
			};
		}

		if ((0, _lodashEs.inRange)(wordCount, this._config.slightlyBelowMinimum, this._config.recommendedMinimum)) {
			if (this._config.cornerstoneContent === false) {
				return {
					score: this._config.scores.slightlyBelowMinimum,
					resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is slightly below the recommended minimum of %5$d word. %3$sAdd a bit more copy%4$s.", "This is slightly below the recommended minimum of %5$d words. %3$sAdd a bit more copy%4$s.", this._config.recommendedMinimum), wordCount, this._config.urlTitle, this._config.urlCallToAction, "</a>", this._config.recommendedMinimum)
				};
			}

			return {
				score: this._config.scores.slightlyBelowMinimum,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is below the recommended minimum of %5$d word. %3$sAdd more content%4$s.", "This is below the recommended minimum of %5$d words. %3$sAdd more content%4$s.", this._config.recommendedMinimum), wordCount, this._config.urlTitle, this._config.urlCallToAction, "</a>", this._config.recommendedMinimum)
			};
		}

		return {
			score: this._config.scores.belowMinimum,
			resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%2$sText length%4$s: The text contains %1$d word.", "%2$sText length%4$s: The text contains %1$d words.", wordCount) + " " + i18n.dngettext("js-text-analysis", "This is below the recommended minimum of %5$d word. %3$sAdd more content%4$s.", "This is below the recommended minimum of %5$d words. %3$sAdd more content%4$s.", this._config.recommendedMinimum), wordCount, this._config.urlTitle, this._config.urlCallToAction, "</a>", this._config.recommendedMinimum)
		};
	}
}
exports.default = TextLengthAssessment;
