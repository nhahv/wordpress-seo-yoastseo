"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePartText, sentencePartAuxiliaries, language) {
	let participles = [];

	if (language === "de" || language === "nl" || language === "pl" || language === "hu") {
		if (!sentencePartAuxiliaries.some(auxiliary => languageVariables[language].auxiliaries.includes(auxiliary))) {
			return false;
		}

		if (language === "de") {
			participles = (0, _getParticiples4.default)(sentencePartText, sentencePartAuxiliaries, language);
		}

		if (language === "nl" || language === "pl") {
			participles = (0, _getParticiples2.default)(sentencePartText, sentencePartAuxiliaries, language);
		}
		if (language === "hu") {
			participles = (0, _getParticiples6.default)(sentencePartText, sentencePartAuxiliaries, language);
		}
	} else {
		participles = (0, _getParticiples2.default)(sentencePartText, sentencePartAuxiliaries, language);
	}

	return (0, _determineSentencePartIsPassive2.default)(participles);
};

var _determineSentencePartIsPassive = require("./determineSentencePartIsPassive.js");

var _determineSentencePartIsPassive2 = _interopRequireDefault(_determineSentencePartIsPassive);

var _getParticiples = require("./getParticiples.js");

var _getParticiples2 = _interopRequireDefault(_getParticiples);

var _auxiliaries = require("../../german/passiveVoice/auxiliaries.js");

var _auxiliaries2 = _interopRequireDefault(_auxiliaries);

var _getParticiples3 = require("../../german/passiveVoice/getParticiples.js");

var _getParticiples4 = _interopRequireDefault(_getParticiples3);

var _auxiliaries3 = require("../../dutch/passiveVoice/auxiliaries.js");

var _auxiliaries4 = _interopRequireDefault(_auxiliaries3);

var _auxiliaries5 = require("../../polish/passiveVoice/auxiliaries.js");

var _auxiliaries6 = _interopRequireDefault(_auxiliaries5);

var _getParticiples5 = require("../../hungarian/passiveVoice/getParticiples.js");

var _getParticiples6 = _interopRequireDefault(_getParticiples5);

var _auxiliaries7 = require("../../hungarian/passiveVoice/auxiliaries.js");

var _auxiliaries8 = _interopRequireDefault(_auxiliaries7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const auxiliariesGerman = (0, _auxiliaries2.default)().allAuxiliaries;

const auxiliariesDutch = (0, _auxiliaries4.default)();

const auxiliariesPolish = (0, _auxiliaries6.default)();

const auxiliariesHungarian = (0, _auxiliaries8.default)().allAuxiliaries;

const languageVariables = {
	de: {
		auxiliaries: auxiliariesGerman
	},
	nl: {
		auxiliaries: auxiliariesDutch
	},
	pl: {
		auxiliaries: auxiliariesPolish
	},
	hu: {
		auxiliaries: auxiliariesHungarian
	}
};
