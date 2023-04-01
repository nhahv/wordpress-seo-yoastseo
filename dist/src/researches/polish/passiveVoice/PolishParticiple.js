"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

var _nonDirectParticiplePrecedenceException = require("../../passiveVoice/periphrastic/freeAuxiliaryParticipleOrder/nonDirectParticiplePrecedenceException");

var _nonDirectParticiplePrecedenceException2 = _interopRequireDefault(_nonDirectParticiplePrecedenceException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PolishParticiple = function PolishParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(PolishParticiple, _Participle2.default);

PolishParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const auxiliaries = this.getAuxiliaries();
  const language = this.getLanguage();

  return !this.directPrecedenceException(sentencePart, participle, language) && !this.nonDirectPrecedenceException(sentencePart, participle, auxiliaries, language);
};

PolishParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

PolishParticiple.prototype.nonDirectPrecedenceException = _nonDirectParticiplePrecedenceException2.default;

exports.default = PolishParticiple;
