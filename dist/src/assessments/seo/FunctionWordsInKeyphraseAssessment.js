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

class FunctionWordsInKeyphraseAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			scores: {
				onlyFunctionWords: 0
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/functionwordskeyphrase-1"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/functionwordskeyphrase-2")
		};

		this.identifier = "functionWordsInKeyphrase";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._functionWordsInKeyphrase = researcher.getResearch("functionWordsInKeyphrase");
		this._keyword = (0, _lodashEs.escape)(paper.getKeyword());
		const assessmentResult = new _AssessmentResult2.default();

		if (this._functionWordsInKeyphrase) {
			assessmentResult.setScore(this._config.scores.onlyFunctionWords);
			assessmentResult.setText(i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sFunction words in keyphrase%3$s: " + "Your keyphrase \"%4$s\" contains function words only. " + "%2$sLearn more about what makes a good keyphrase.%3$s"), this._config.urlTitle, this._config.urlCallToAction, "</a>", this._keyword));
		} else {
			assessmentResult.setText(i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sFunction words in keyphrase%3$s: Your keyphrase \"%4$s\" not contains function words only."), this._config.urlTitle, this._config.urlCallToAction, "</a>", this._keyword));
		}

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasKeyword();
	}
}

exports.default = FunctionWordsInKeyphraseAssessment;
