"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function inRangeEndInclusive(number, start, end) {
  return number > start && number <= end;
}

function inRangeStartInclusive(number, start, end) {
  return number >= start && number < end;
}

function inRangeStartEndInclusive(number, start, end) {
  return number >= start && number <= end;
}

exports.inRange = inRangeEndInclusive;
exports.inRangeStartInclusive = inRangeStartInclusive;
exports.inRangeEndInclusive = inRangeEndInclusive;
exports.inRangeStartEndInclusive = inRangeStartEndInclusive;
exports.default = {
  inRange: inRangeEndInclusive,
  inRangeStartInclusive: inRangeStartInclusive,
  inRangeEndInclusive: inRangeEndInclusive,
  inRangeStartEndInclusive: inRangeStartEndInclusive
};
