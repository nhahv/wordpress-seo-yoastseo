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

class TitleKeywordAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedPosition: 0
			},
			scores: {
				good: 9,
				okay: 6,
				bad: 2
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33g"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33h")
		};

		this.identifier = "titleKeyword";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._keywordMatches = researcher.getResearch("findKeywordInPageTitle");
		this._keyword = (0, _lodashEs.escape)(paper.getKeyword());

		const assessmentResult = new _AssessmentResult2.default();

		const calculatedResult = this.calculateResult(i18n, this._keyword);
		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasKeyword() && paper.hasTitle();
	}

	calculateResult(i18n, keyword) {
		const exactMatchFound = this._keywordMatches.exactMatchFound;
		const position = this._keywordMatches.position;
		const allWordsFound = this._keywordMatches.allWordsFound;
		const exactMatchKeyphrase = this._keywordMatches.exactMatchKeyphrase;

		if (exactMatchFound === true) {
			if (position === 0) {
				return {
					score: this._config.scores.good,
					resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in title%2$s: The exact match of the focus keyphrase appears at the beginning " + "of the SEO title. Good job!"), this._config.urlTitle, "</a>")
				};
			}
			return {
				score: this._config.scores.okay,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in title%3$s: The exact match of the focus keyphrase appears in the SEO title, but not " + "at the beginning. %2$sMove it to the beginning for the best results%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (allWordsFound) {
			return {
				score: this._config.scores.okay,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in title%3$s: Does not contain the exact match. %2$sTry to write the exact match of " + "your keyphrase in the SEO title and put it at the beginning of the title%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (exactMatchKeyphrase) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in title%3$s: Does not contain the exact match. %2$sTry to write the exact match of " + "your keyphrase in the SEO title and put it at the beginning of the title%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>", keyword)
			};
		}

		return {
			score: this._config.scores.bad,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in title%3$s: Not all the words from your keyphrase \"%4$s\" appear in the SEO title. " + "%2$sFor the best SEO results write the exact match of your keyphrase in the SEO title, and put " + "the keyphrase at the beginning of the title%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>", keyword)
		};
	}
}

exports.default = TitleKeywordAssessment;
