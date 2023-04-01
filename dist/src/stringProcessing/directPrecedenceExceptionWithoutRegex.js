"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, participle, language) {
	const wordsInSentencePart = (0, _getWords2.default)(sentencePart).map(word => word.toLowerCase());

	const participleIndex = wordsInSentencePart.indexOf(participle.toLowerCase());

	if (participleIndex < 1) {
		return false;
	}

	const wordPrecedingParticiple = wordsInSentencePart[participleIndex - 1];

	const directPrecedenceExceptions = (0, _lodashEs.get)(cannotDirectlyPrecedePassiveParticiples, language, []);

	return (0, _lodashEs.includes)(directPrecedenceExceptions, wordPrecedingParticiple);
};

var _lodashEs = require("lodash-es");

var _functionWords = require("../researches/dutch/functionWords");

var _functionWords2 = _interopRequireDefault(_functionWords);

var _functionWords3 = require("../researches/english/functionWords");

var _functionWords4 = _interopRequireDefault(_functionWords3);

var _functionWords5 = require("../researches/french/functionWords");

var _functionWords6 = _interopRequireDefault(_functionWords5);

var _functionWords7 = require("../researches/italian/functionWords");

var _functionWords8 = _interopRequireDefault(_functionWords7);

var _functionWords9 = require("../researches/polish/functionWords");

var _functionWords10 = _interopRequireDefault(_functionWords9);

var _functionWords11 = require("../researches/spanish/functionWords");

var _functionWords12 = _interopRequireDefault(_functionWords11);

var _functionWords13 = require("../researches/portuguese/functionWords");

var _functionWords14 = _interopRequireDefault(_functionWords13);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cannotDirectlyPrecedePassiveParticiples = {
	nl: (0, _functionWords2.default)().cannotDirectlyPrecedePassiveParticiple,
	en: (0, _functionWords4.default)().cannotDirectlyPrecedePassiveParticiple,
	fr: (0, _functionWords6.default)().cannotDirectlyPrecedePassiveParticiple,
	it: (0, _functionWords8.default)().cannotDirectlyPrecedePassiveParticiple,
	pl: (0, _functionWords10.default)().cannotDirectlyPrecedePassiveParticiple,
	es: (0, _functionWords12.default)().cannotDirectlyPrecedePassiveParticiple,
	pt: (0, _functionWords14.default)().cannotDirectlyPrecedePassiveParticiple
};
