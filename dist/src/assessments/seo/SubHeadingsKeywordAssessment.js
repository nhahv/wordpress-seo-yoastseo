"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _shortlinker = require("../../helpers/shortlinker");

var _inRange = require("../../helpers/inRange.js");

var _getSubheadings = require("../../stringProcessing/getSubheadings");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubHeadingsKeywordAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				lowerBoundary: 0.3,
				upperBoundary: 0.75
			},
			scores: {
				noMatches: 3,
				tooFewMatches: 3,
				goodNumberOfMatches: 9,
				tooManyMatches: 3
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33m"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33n")
		};

		this.identifier = "subheadingsKeyword";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._subHeadings = researcher.getResearch("matchKeywordInSubheadings");

		const assessmentResult = new _AssessmentResult2.default();

		this._minNumberOfSubheadings = Math.ceil(this._subHeadings.count * this._config.parameters.lowerBoundary);
		this._maxNumberOfSubheadings = Math.floor(this._subHeadings.count * this._config.parameters.upperBoundary);
		const calculatedResult = this.calculateResult(i18n);

		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	hasSubheadings(paper) {
		const subheadings = (0, _getSubheadings.getSubheadingsTopLevel)(paper.getText());
		return subheadings.length > 0;
	}

	isApplicable(paper) {
		return paper.hasText() && paper.hasKeyword() && this.hasSubheadings(paper);
	}

	hasTooFewMatches() {
		return this._subHeadings.matches > 0 && this._subHeadings.matches < this._minNumberOfSubheadings;
	}

	hasTooManyMatches() {
		return this._subHeadings.count > 1 && this._subHeadings.matches > this._maxNumberOfSubheadings;
	}

	isOneOfOne() {
		return this._subHeadings.count === 1 && this._subHeadings.matches === 1;
	}

	hasGoodNumberOfMatches() {
		return (0, _inRange.inRangeStartEndInclusive)(this._subHeadings.matches, this._minNumberOfSubheadings, this._maxNumberOfSubheadings);
	}

	calculateResult(i18n) {
		if (this.hasTooFewMatches()) {
			return {
				score: this._config.scores.tooFewMatches,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in subheading%3$s: %2$sUse more keyphrases or synonyms in your H2 and H3 subheadings%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.hasTooManyMatches()) {
			return {
				score: this._config.scores.tooManyMatches,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in subheading%3$s: More than 75%% of your H2 and H3 subheadings reflect the topic of your copy. " + "That's too much. %2$sDon't over-optimize%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.isOneOfOne()) {
			return {
				score: this._config.scores.goodNumberOfMatches,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in subheading%2$s: Your H2 or H3 subheading reflects the topic of your copy. Good job!", this._subHeadings.matches), this._config.urlTitle, "</a>")
			};
		}

		if (this.hasGoodNumberOfMatches()) {
			return {
				score: this._config.scores.goodNumberOfMatches,
				resultText: i18n.sprintf(i18n.dngettext("js-text-analysis", "%1$sKeyphrase in subheading%2$s: %3$s of your H2 and H3 subheadings reflects the topic of your copy. Good job!", "%1$sKeyphrase in subheading%2$s: %3$s of your H2 and H3 subheadings reflect the topic of your copy. Good job!", this._subHeadings.matches), this._config.urlTitle, "</a>", this._subHeadings.matches)
			};
		}

		return {
			score: this._config.scores.noMatches,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in subheading%3$s: %2$sUse more keyphrases or synonyms in your H2 and H3 subheadings%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
		};
	}
}
exports.default = SubHeadingsKeywordAssessment;
