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

var _precedenceExceptionWithoutRegex = require("../../../stringProcessing/precedenceExceptionWithoutRegex");

var _precedenceExceptionWithoutRegex2 = _interopRequireDefault(_precedenceExceptionWithoutRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PortugueseParticiple = function PortugueseParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(PortugueseParticiple, _Participle2.default);

PortugueseParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const language = this.getLanguage();

  return !this.directPrecedenceException(sentencePart, participle, language) && !this.precedenceException(sentencePart, participle, language);
};

PortugueseParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

PortugueseParticiple.prototype.precedenceException = _precedenceExceptionWithoutRegex2.default;

exports.default = PortugueseParticiple;
