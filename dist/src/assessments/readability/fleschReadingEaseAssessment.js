"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _getLanguageAvailability = require("../../helpers/getLanguageAvailability");

var _getLanguageAvailability2 = _interopRequireDefault(_getLanguageAvailability);

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const availableLanguages = ["en", "nl", "de", "it", "ru", "fr", "es", "pt"];

class FleschReadingEaseAssessment extends _assessment2.default {
	constructor(config) {
		super();

		const defaultConfig = {
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34r"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34s")
		};

		this.identifier = "fleschReadingEase";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this.fleschReadingResult = researcher.getResearch("calculateFleschReading");
		if (this.isApplicable(paper)) {
			const assessmentResult = new _AssessmentResult2.default(i18n);
			const calculatedResult = this.calculateResult(i18n);
			assessmentResult.setScore(calculatedResult.score);
			assessmentResult.setText(calculatedResult.resultText);

			return assessmentResult;
		}
		return null;
	}

	calculateResult(i18n) {
		if (this.fleschReadingResult < 0) {
			this.fleschReadingResult = 0;
		}

		if (this.fleschReadingResult > 100) {
			this.fleschReadingResult = 100;
		}

		let score = 0;
		let feedback = "";
		let note = i18n.dgettext("js-text-analysis", "Good job!");

		if (this.fleschReadingResult >= this._config.borders.veryEasy) {
			score = this._config.scores.veryEasy;
			feedback = i18n.dgettext("js-text-analysis", "very easy");
		} else if ((0, _lodashEs.inRange)(this.fleschReadingResult, this._config.borders.easy, this._config.borders.veryEasy)) {
			score = this._config.scores.easy;
			feedback = i18n.dgettext("js-text-analysis", "easy");
		} else if ((0, _lodashEs.inRange)(this.fleschReadingResult, this._config.borders.fairlyEasy, this._config.borders.easy)) {
			score = this._config.scores.fairlyEasy;
			feedback = i18n.dgettext("js-text-analysis", "fairly easy");
		} else if ((0, _lodashEs.inRange)(this.fleschReadingResult, this._config.borders.okay, this._config.borders.fairlyEasy)) {
			score = this._config.scores.okay;
			feedback = i18n.dgettext("js-text-analysis", "ok");
		} else if ((0, _lodashEs.inRange)(this.fleschReadingResult, this._config.borders.fairlyDifficult, this._config.borders.okay)) {
			score = this._config.scores.fairlyDifficult;
			feedback = i18n.dgettext("js-text-analysis", "fairly difficult");
			note = i18n.dgettext("js-text-analysis", "Try to make shorter sentences to improve readability");
		} else if ((0, _lodashEs.inRange)(this.fleschReadingResult, this._config.borders.difficult, this._config.borders.fairlyDifficult)) {
			score = this._config.scores.difficult;
			feedback = i18n.dgettext("js-text-analysis", "difficult");
			note = i18n.dgettext("js-text-analysis", "Try to make shorter sentences, using less difficult words to improve readability");
		} else {
			score = this._config.scores.veryDifficult;
			feedback = i18n.dgettext("js-text-analysis", "very difficult");
			note = i18n.dgettext("js-text-analysis", "Try to make shorter sentences, using less difficult words to improve readability");
		}

		if (score >= this._config.scores.okay) {
			return {
				score: score,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sFlesch Reading Ease%2$s: The copy scores %3$s in the test, which is considered %4$s to read. %5$s"), this._config.urlTitle, "</a>", this.fleschReadingResult, feedback, note)
			};
		}

		return {
			score: score,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sFlesch Reading Ease%2$s: The copy scores %3$s in the test, which is considered %4$s to read. %5$s%6$s%7$s"), this._config.urlTitle, "</a>", this.fleschReadingResult, feedback, this._config.urlCallToAction, note, "</a>.")
		};
	}

	isApplicable(paper) {
		const isLanguageAvailable = (0, _getLanguageAvailability2.default)(paper.getLocale(), availableLanguages);
		return isLanguageAvailable && paper.hasText();
	}
}

exports.default = FleschReadingEaseAssessment;
