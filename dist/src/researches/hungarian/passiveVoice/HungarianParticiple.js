"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Participle = require("../../../values/Participle.js");

var _Participle2 = _interopRequireDefault(_Participle);

var _checkException = require("../../passiveVoice/periphrastic/checkException.js");

var _checkException2 = _interopRequireDefault(_checkException);

var _nonPassivesInVaAndVe = require("./nonPassivesInVaAndVe.js");

var _nonPassivesInVaAndVe2 = _interopRequireDefault(_nonPassivesInVaAndVe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HungarianParticiple = function HungarianParticiple(participle, sentencePart, attributes) {
  _Participle2.default.call(this, participle, sentencePart, attributes);
  _checkException2.default.call(this);
};

require("util").inherits(HungarianParticiple, _Participle2.default);

HungarianParticiple.prototype.isNonPassivesInVaAndVe = function () {
  return _nonPassivesInVaAndVe2.default.includes(this.getParticiple());
};

HungarianParticiple.prototype.isPassive = function () {
  return !this.isNonPassivesInVaAndVe();
};

exports.default = HungarianParticiple;
