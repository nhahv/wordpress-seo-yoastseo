"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, participleIndex, language) {
	let precedenceExceptionRegex;
	switch (language) {
		case "fr":
			precedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotBeBetweenAuxiliaryAndParticipleFrench);
			break;
		case "es":
			precedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotBeBetweenAuxiliaryAndParticipleSpanish);
			break;
		case "it":
			precedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotBeBetweenAuxiliaryAndParticipleItalian);
			break;
		case "en":
		default:
			precedenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotBeBetweenAuxiliaryAndParticipleEnglish);
			break;
	}

	const precedenceExceptionMatch = (0, _getIndicesWithRegex2.default)(sentencePart, precedenceExceptionRegex);
	return (0, _precedesIndex2.default)(precedenceExceptionMatch, participleIndex);
};

var _getIndicesWithRegex = require("../researches/passiveVoice/periphrastic/getIndicesWithRegex.js");

var _getIndicesWithRegex2 = _interopRequireDefault(_getIndicesWithRegex);

var _precedesIndex = require("./precedesIndex");

var _precedesIndex2 = _interopRequireDefault(_precedesIndex);

var _createRegexFromArray = require("./createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _functionWords = require("../researches/french/functionWords.js");

var _functionWords2 = _interopRequireDefault(_functionWords);

var _functionWords3 = require("../researches/english/functionWords.js");

var _functionWords4 = _interopRequireDefault(_functionWords3);

var _functionWords5 = require("../researches/spanish/functionWords.js");

var _functionWords6 = _interopRequireDefault(_functionWords5);

var _functionWords7 = require("../researches/italian/functionWords.js");

var _functionWords8 = _interopRequireDefault(_functionWords7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cannotBeBetweenAuxiliaryAndParticipleFrench = (0, _functionWords2.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple;

const cannotBeBetweenAuxiliaryAndParticipleEnglish = (0, _functionWords4.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple;

const cannotBeBetweenAuxiliaryAndParticipleSpanish = (0, _functionWords6.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple;

const cannotBeBetweenAuxiliaryAndParticipleItalian = (0, _functionWords8.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple;
