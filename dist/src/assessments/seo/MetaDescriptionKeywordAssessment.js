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

class MetaDescriptionKeywordAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMinimum: 1
			},
			scores: {
				good: 9,
				ok: 6,
				bad: 3
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33k"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33l")
		};

		this.identifier = "metaDescriptionKeyword";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._keyphraseCounts = researcher.getResearch("metaDescriptionKeyword");
		const assessmentResult = new _AssessmentResult2.default();
		const calculatedResult = this.calculateResult(i18n);

		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	calculateResult(i18n) {
		if (this._keyphraseCounts === 1 || this._keyphraseCounts === 2) {
			return {
				score: this._config.scores.good,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in meta description%2$s: Keyphrase or synonym appear in the meta description. Well done!"), this._config.urlTitle, "</a>")
			};
		}

		if (this._keyphraseCounts >= 3) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in meta description%2$s: The meta description contains the keyphrase %3$s times, " + "which is over the advised maximum of 2 times. %4$sLimit that%5$s!"), this._config.urlTitle, "</a>", this._keyphraseCounts, this._config.urlCallToAction, "</a>")
			};
		}

		return {
			score: this._config.scores.bad,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in meta description%2$s: The meta description has been specified, " + "but it does not contain the keyphrase. %3$sFix that%4$s!"), this._config.urlTitle, "</a>", this._config.urlCallToAction, "</a>")
		};
	}

	isApplicable(paper) {
		return paper.hasKeyword() && paper.hasDescription();
	}
}

exports.default = MetaDescriptionKeywordAssessment;
