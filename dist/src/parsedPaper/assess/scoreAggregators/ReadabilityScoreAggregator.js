"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.READABILITY_SCORES = undefined;

var _getLanguage = require("../../../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _interpreters = require("../../../interpreters");

var _ScoreAggregator = require("./ScoreAggregator");

var _ScoreAggregator2 = _interopRequireDefault(_ScoreAggregator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PENALTY_MAPPING_FULL_SUPPORT = {
	bad: 3,
	ok: 2,
	good: 0
};

const PENALTY_MAPPING_PARTIAL_SUPPORT = {
	bad: 4,
	ok: 2,
	good: 0
};

const READABILITY_SCORES = exports.READABILITY_SCORES = {
	GOOD: 90,
	OKAY: 60,
	NEEDS_IMPROVEMENT: 30,
	NOT_AVAILABLE: 0
};

const FULLY_SUPPORTED_LANGUAGES = ["en", "nl", "de", "it", "ru", "fr", "es"];

class ReadabilityScoreAggregator extends _ScoreAggregator2.default {
	isFullySupported(locale) {
		if (locale && locale.includes("_")) {
			const language = (0, _getLanguage2.default)(locale);
			return FULLY_SUPPORTED_LANGUAGES.includes(language);
		}

		return false;
	}

	calculateScore(isFullySupported, penalty) {
		if (isFullySupported) {
			if (penalty > 6) {
				return READABILITY_SCORES.NEEDS_IMPROVEMENT;
			}

			if (penalty > 4) {
				return READABILITY_SCORES.OKAY;
			}
		} else {
			if (penalty > 4) {
				return READABILITY_SCORES.NEEDS_IMPROVEMENT;
			}

			if (penalty > 2) {
				return READABILITY_SCORES.OKAY;
			}
		}
		return READABILITY_SCORES.GOOD;
	}

	calculatePenalty(results) {
		return results.reduce((sum, result) => {
			const rating = (0, _interpreters.scoreToRating)(result.getScore());

			const penalty = this.isFullySupported(this.locale) ? PENALTY_MAPPING_FULL_SUPPORT[rating] : PENALTY_MAPPING_PARTIAL_SUPPORT[rating];

			return penalty ? sum + penalty : sum;
		}, 0);
	}

	getValidResults(results) {
		return results.filter(result => result.hasScore() && result.hasText());
	}

	setLocale(locale) {
		this.locale = locale;
	}

	aggregate(results) {
		const validResults = this.getValidResults(results);

		if (validResults.length <= 1) {
			return READABILITY_SCORES.NOT_AVAILABLE;
		}

		const penalty = this.calculatePenalty(validResults);
		const isFullySupported = this.isFullySupported(this.locale);
		return this.calculateScore(isFullySupported, penalty);
	}
}

exports.default = ReadabilityScoreAggregator;
