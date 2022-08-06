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

class UrlKeywordAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			scores: {
				okay: 6,
				good: 9
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33o"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33p")
		};

		this.identifier = "urlKeyword";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._keywordInURL = researcher.getResearch("keywordCountInUrl");

		const assessmentResult = new _AssessmentResult2.default();

		const calculatedResult = this.calculateResult(i18n);
		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasKeyword() && paper.hasUrl();
	}

	calculateResult(i18n) {
		if (this._keywordInURL.keyphraseLength < 3) {
			if (this._keywordInURL.percentWordMatches === 100) {
				return {
					score: this._config.scores.good,
					resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in slug%2$s: Great work!"), this._config.urlTitle, "</a>")
				};
			}

			return {
				score: this._config.scores.okay,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in slug%3$s: (Part of) your keyphrase does not appear in the slug. %2$sChange that%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this._keywordInURL.percentWordMatches > 50) {
			return {
				score: this._config.scores.good,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in slug%2$s: More than half of your keyphrase appears in the slug. That's great!"), this._config.urlTitle, "</a>")
			};
		}
		return {
			score: this._config.scores.okay,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in slug%3$s: (Part of) your keyphrase does not appear in the slug. %2$sChange that%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
		};
	}
}

exports.default = UrlKeywordAssessment;
