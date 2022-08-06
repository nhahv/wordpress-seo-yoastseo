"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _nonParticiples = require("./nonParticiples");

var _nonParticiples2 = _interopRequireDefault(_nonParticiples);

var _directPrecedenceExceptionWithoutRegex = require("../../../stringProcessing/directPrecedenceExceptionWithoutRegex");

var _directPrecedenceExceptionWithoutRegex2 = _interopRequireDefault(_directPrecedenceExceptionWithoutRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DutchParticiple = function DutchParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(DutchParticiple, _Participle2.default);

DutchParticiple.prototype.isPassive = function () {
  const sentencePart = this.getSentencePart();
  const participle = this.getParticiple();
  const language = this.getLanguage();

  return !this.isOnNonParticiplesList() && !this.hasNonParticipleEnding() && !this.directPrecedenceException(sentencePart, participle, language);
};

DutchParticiple.prototype.isOnNonParticiplesList = function () {
  if (this.getType() === "irregular") {
    return false;
  }

  return (0, _lodashEs.includes)((0, _nonParticiples2.default)(), this.getParticiple());
};

DutchParticiple.prototype.hasNonParticipleEnding = function () {
  return (/\S+(heid|teit|tijd)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig.test(this.getParticiple())
  );
};

DutchParticiple.prototype.directPrecedenceException = _directPrecedenceExceptionWithoutRegex2.default;

exports.default = DutchParticiple;
