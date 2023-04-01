"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _nonVerbEndingEd = require("./non-verb-ending-ed.js");

var _nonVerbEndingEd2 = _interopRequireDefault(_nonVerbEndingEd);

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

var _precedenceExceptionWithoutRegex = require("../../../stringProcessing/precedenceExceptionWithoutRegex");

var _precedenceExceptionWithoutRegex2 = _interopRequireDefault(_precedenceExceptionWithoutRegex);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nonVerbsEndingEd = (0, _nonVerbEndingEd2.default)();


var irregularExclusionArray = ["get", "gets", "getting", "got", "gotten"];

var EnglishParticiple = function EnglishParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(EnglishParticiple, _Participle2.default);

EnglishParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const language = this.getLanguage();

  return !this.isNonVerbEndingEd() && !this.hasRidException() && !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
};

EnglishParticiple.prototype.isNonVerbEndingEd = function () {
  if (this.getType() === "irregular") {
    return false;
  }
  return (0, _lodashEs.includes)(nonVerbsEndingEd, this.getParticiple());
};

EnglishParticiple.prototype.hasRidException = function () {
  if (this.getParticiple() === "rid") {
    var auxiliaries = this.getAuxiliaries();
    return !(0, _lodashEs.isEmpty)((0, _lodashEs.intersection)(irregularExclusionArray, auxiliaries));
  }
  return false;
};

EnglishParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

EnglishParticiple.prototype.precedenceException = _precedenceExceptionWithoutRegex2.default;

exports.default = EnglishParticiple;
