"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

var _precedenceExceptionWithoutRegex = require("../../../stringProcessing/precedenceExceptionWithoutRegex");

var _precedenceExceptionWithoutRegex2 = _interopRequireDefault(_precedenceExceptionWithoutRegex);

var _Participle = require("../../../values/Participle");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException");

var _checkException2 = _interopRequireDefault(_checkException);

var _exceptionsParticiples = require("./exceptionsParticiples");

var _exceptionsParticiples2 = _interopRequireDefault(_exceptionsParticiples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exceptionsParticiple = (0, _exceptionsParticiples2.default)();

const exceptionsParticiplesAdjectivesVerbs = _exceptionsParticiple.adjectivesVerbs,
      exceptionsParticiplesNounsVowel = _exceptionsParticiple.nounsStartingWithVowel,
      exceptionsParticiplesNounsConsonant = _exceptionsParticiple.nounsStartingWithConsonant,
      exceptionsParticiplesOthers = _exceptionsParticiple.others;

var FrenchParticiple = function FrenchParticiple(participle, sentencePart, attributes) {
	_Participle2.default.call(this, participle, sentencePart, attributes);
	_checkException2.default.call(this);
};

require("util").inherits(FrenchParticiple, _Participle2.default);

var checkIrregular = function checkIrregular() {
	if (this.getType() === "irregular") {
		return true;
	}
};

FrenchParticiple.prototype.isPassive = function () {
	const sentencePart = this.getSentencePart();
	const participle = this.getParticiple();
	const language = this.getLanguage();

	if (checkIrregular.call(this)) {
		return !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
	}

	return !this.isOnAdjectivesVerbsExceptionList() && !this.isOnNounsExceptionList() && !this.isOnOthersExceptionList() && !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
};

var getExceptionsParticiplesAdjectivesVerbsRegexes = (0, _lodashEs.memoize)(function () {
	const exceptionsParticiplesAdjectivesVerbsRegexes = [];
	(0, _lodashEs.forEach)(exceptionsParticiplesAdjectivesVerbs, function (exceptionParticiplesAdjectivesVerbs) {
		exceptionsParticiplesAdjectivesVerbsRegexes.push(new RegExp("^" + exceptionParticiplesAdjectivesVerbs + "(e|s|es)?$", "ig"));
	});
	return exceptionsParticiplesAdjectivesVerbsRegexes;
});

var getExceptionsParticiplesNounsRegexes = (0, _lodashEs.memoize)(function () {
	const exceptionsParticiplesNounsRegexes = [];

	(0, _lodashEs.forEach)(exceptionsParticiplesNounsVowel, function (exceptionParticipleNounVowel) {
		exceptionsParticiplesNounsRegexes.push(new RegExp("^(l'|d')?" + exceptionParticipleNounVowel + "(s)?$", "ig"));
	});

	(0, _lodashEs.forEach)(exceptionsParticiplesNounsConsonant, function (exceptionParticipleNounConsonant) {
		exceptionsParticiplesNounsRegexes.push(new RegExp("^" + exceptionParticipleNounConsonant + "(s)?$", "ig"));
	});

	return exceptionsParticiplesNounsRegexes;
});

var checkParticipleExceptionRegexes = function checkParticipleExceptionRegexes(participleExceptionRegexes) {
	var participle = this.getParticiple();
	var match = [];

	(0, _lodashEs.forEach)(participleExceptionRegexes, function (participleExceptionRegex) {
		var exceptionMatch = participle.match(participleExceptionRegex);
		if (exceptionMatch) {
			match.push(exceptionMatch[0]);
		}
	});

	if (match.length > 0) {
		return true;
	}

	return false;
};

FrenchParticiple.prototype.isOnAdjectivesVerbsExceptionList = function () {
	var exceptionParticiplesAdjectivesVerbs = getExceptionsParticiplesAdjectivesVerbsRegexes();
	return checkParticipleExceptionRegexes.call(this, exceptionParticiplesAdjectivesVerbs);
};

FrenchParticiple.prototype.isOnNounsExceptionList = function () {
	var exceptionsParticiplesNouns = getExceptionsParticiplesNounsRegexes();
	return checkParticipleExceptionRegexes.call(this, exceptionsParticiplesNouns);
};

FrenchParticiple.prototype.isOnOthersExceptionList = function () {
	return (0, _lodashEs.includes)(exceptionsParticiplesOthers, this.getParticiple());
};

FrenchParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

FrenchParticiple.prototype.precedenceException = _precedenceExceptionWithoutRegex2.default;

exports.default = FrenchParticiple;
