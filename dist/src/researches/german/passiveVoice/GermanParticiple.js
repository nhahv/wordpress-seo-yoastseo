"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _indices = require("../../../stringProcessing/indices.js");

var _exceptionsParticiplesActive = require("./exceptionsParticiplesActive.js");

var _exceptionsParticiplesActive2 = _interopRequireDefault(_exceptionsParticiplesActive);

var _auxiliaries = require("./auxiliaries.js");

var _auxiliaries2 = _interopRequireDefault(_auxiliaries);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exceptionsParticiplesActive = (0, _exceptionsParticiplesActive2.default)();

const auxiliaries = (0, _auxiliaries2.default)().participleLike;

const exceptionsRegex = /\S+(apparat|arbeit|dienst|haft|halt|keit|kraft|not|pflicht|schaft|schrift|tät|wert|zeit)($|[ \n\r\t.,'()"+-;!?:/»«‹›<>])/ig;

const GermanParticiple = function GermanParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  this.setSentencePartPassiveness(this.isPassive());
};

require("util").inherits(GermanParticiple, _Participle2.default);

GermanParticiple.prototype.isPassive = function () {
  return !this.hasNounSuffix() && !this.isInExceptionList() && !this.hasHabenSeinException() && !this.isAuxiliary();
};

GermanParticiple.prototype.isInExceptionList = function () {
  return (0, _lodashEs.includes)(exceptionsParticiplesActive, this.getParticiple());
};

GermanParticiple.prototype.hasNounSuffix = function () {
  return this.getParticiple().match(exceptionsRegex) !== null;
};

GermanParticiple.prototype.hasHabenSeinException = function () {
  const participleIndices = (0, _indices.getIndicesByWord)(this.getParticiple(), this.getSentencePart());
  let habenSeinIndices = (0, _indices.getIndicesByWordList)(["haben", "sein"], this.getSentencePart());

  if (participleIndices.length === 0 || habenSeinIndices.length === 0) {
    return false;
  }

  habenSeinIndices = (0, _lodashEs.map)(habenSeinIndices, "index");
  const currentParticiple = participleIndices[0];

  return (0, _lodashEs.includes)(habenSeinIndices, currentParticiple.index + currentParticiple.match.length + 1);
};

GermanParticiple.prototype.isAuxiliary = function () {
  return (0, _lodashEs.includes)(auxiliaries, this.getParticiple());
};

exports.default = GermanParticiple;
