"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentencePart, participle, auxiliaries, language) {
	const auxiliariesUnique = (0, _lodashEs.uniq)(auxiliaries);

	const auxiliaryIndices = (0, _indices.getIndicesByWordListSorted)(auxiliariesUnique, sentencePart);

	const participleIndex = sentencePart.indexOf(participle);
	let nonDirectParticiplePrecendenceExceptionRegex;

	switch (language) {
		case "pl":
			nonDirectParticiplePrecendenceExceptionRegex = (0, _createRegexFromArray2.default)(cannotBeBetweenAuxiliaryAndParticiplePolish);
			break;
	}

	const matches = auxiliaryIndices.filter(auxiliaryIndex => auxiliaryIndex.index < participleIndex);

	if (matches.length === 0) {
		return false;
	}

	const participleAuxiliary = matches[matches.length - 1];

	const precedenceExceptionIndices = (0, _getIndicesWithRegex2.default)(sentencePart, nonDirectParticiplePrecendenceExceptionRegex);

	const remaningPrecedenceExceptionIndices = precedenceExceptionIndices.filter(precedenceExceptionIndex => precedenceExceptionIndex.index > participleAuxiliary.index && precedenceExceptionIndex.index < participleIndex);

	return remaningPrecedenceExceptionIndices.length > 0;
};

var _lodashEs = require("lodash-es");

var _createRegexFromArray = require("../../../../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _getIndicesWithRegex = require("../getIndicesWithRegex.js");

var _getIndicesWithRegex2 = _interopRequireDefault(_getIndicesWithRegex);

var _functionWords = require("../../../polish/functionWords.js");

var _functionWords2 = _interopRequireDefault(_functionWords);

var _indices = require("../../../../stringProcessing/indices.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cannotBeBetweenAuxiliaryAndParticiplePolish = (0, _functionWords2.default)().cannotBeBetweenPassiveAuxiliaryAndParticiple;
