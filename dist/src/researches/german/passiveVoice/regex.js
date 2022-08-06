"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exceptions = exceptions;

exports.default = function () {
  return {
    verbsBeginningWithGe: verbsBeginningWithGe,
    verbsBeginningWithErVerEntBeZerHerUber: verbsBeginningWithErVerEntBeZerHerUber,
    verbsWithGeInMiddle: verbsWithGeInMiddle,
    verbsWithErVerEntBeZerHerUberInMiddle: verbsWithErVerEntBeZerHerUberInMiddle,
    verbsEndingWithIert: verbsEndingWithIert,
    exceptions: exceptions
  };
};

var verbsBeginningWithGeRegex = /^((ge)\S+t($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>]))/ig;
var verbsBeginningWithErVerEntBeZerHerUberRegex = /^(((be|ent|er|her|ver|zer|über|ueber)\S+([^s]t|sst))($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>]))/ig;
var verbsWithGeInMiddleRegex = /(ab|an|auf|aus|vor|wieder|zurück)(ge)\S+t($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;
var verbsWithErVerEntBeZerHerUberInMiddleRegex = /((ab|an|auf|aus|vor|wieder|zurück)(be|ent|er|her|ver|zer|über|ueber)\S+([^s]t|sst))($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;
var verbsEndingWithIertRegex = /\S+iert($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;
var exceptionsRegex = /\S+(apparat|arbeit|dienst|haft|halt|kraft|not|pflicht|schaft|schrift|tät|wert|zeit)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;

var verbsBeginningWithGe = function verbsBeginningWithGe(word) {
  return word.match(verbsBeginningWithGeRegex) || [];
};

var verbsBeginningWithErVerEntBeZerHerUber = function verbsBeginningWithErVerEntBeZerHerUber(word) {
  return word.match(verbsBeginningWithErVerEntBeZerHerUberRegex) || [];
};

var verbsWithGeInMiddle = function verbsWithGeInMiddle(word) {
  return word.match(verbsWithGeInMiddleRegex) || [];
};

var verbsWithErVerEntBeZerHerUberInMiddle = function verbsWithErVerEntBeZerHerUberInMiddle(word) {
  return word.match(verbsWithErVerEntBeZerHerUberInMiddleRegex) || [];
};

var verbsEndingWithIert = function verbsEndingWithIert(word) {
  return word.match(verbsEndingWithIertRegex) || [];
};

function exceptions(word) {
  return word.match(exceptionsRegex) || [];
}
