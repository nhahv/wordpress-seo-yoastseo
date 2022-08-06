"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _inRange = require("../../helpers/inRange");

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const maximumLength = 600;
class PageTitleWidthAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			minLength: 400,
			maxLength: maximumLength,
			scores: {
				noTitle: 1,
				widthTooShort: 6,
				widthTooLong: 3,
				widthCorrect: 9
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34h"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34i")
		};

		this.identifier = "titleWidth";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getMaximumLength() {
		return maximumLength;
	}

	getResult(paper, researcher, i18n) {
		const pageTitleWidth = researcher.getResearch("pageTitleWidth");
		const assessmentResult = new _AssessmentResult2.default();

		assessmentResult.setScore(this.calculateScore(pageTitleWidth));
		assessmentResult.setText(this.translateScore(pageTitleWidth, i18n));

		assessmentResult.max = this._config.maxLength;
		assessmentResult.actual = pageTitleWidth;
		return assessmentResult;
	}

	calculateScore(pageTitleWidth) {
		if ((0, _inRange.inRangeEndInclusive)(pageTitleWidth, 1, 400)) {
			return this._config.scores.widthTooShort;
		}

		if ((0, _inRange.inRangeEndInclusive)(pageTitleWidth, this._config.minLength, this._config.maxLength)) {
			return this._config.scores.widthCorrect;
		}

		if (pageTitleWidth > this._config.maxLength) {
			return this._config.scores.widthTooLong;
		}

		return this._config.scores.noTitle;
	}

	translateScore(pageTitleWidth, i18n) {
		if ((0, _inRange.inRangeEndInclusive)(pageTitleWidth, 1, 400)) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSEO title width%3$s: The SEO title is too short. " + "%2$sUse the space to add keyphrase variations or create compelling call-to-action copy%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>");
		}

		if ((0, _inRange.inRangeEndInclusive)(pageTitleWidth, this._config.minLength, this._config.maxLength)) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSEO title width%2$s: Good job!"), this._config.urlTitle, "</a>");
		}

		if (pageTitleWidth > this._config.maxLength) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSEO title width%3$s: The SEO title is wider than the viewable limit. %2$sTry to make it shorter%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>");
		}

		return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSEO title width%3$s: %2$sPlease create an SEO title%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>");
	}
}
exports.default = PageTitleWidthAssessment;
