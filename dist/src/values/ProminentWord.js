"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function ProminentWord(word, stem, occurrences) {
  this._word = word;
  this._stem = stem ? stem : word;
  this._occurrences = occurrences || 0;
}

ProminentWord.prototype.setWord = function (word) {
  this._word = word;
};

ProminentWord.prototype.getWord = function () {
  return this._word;
};

ProminentWord.prototype.getStem = function () {
  return this._stem;
};

ProminentWord.prototype.setOccurrences = function (numberOfOccurrences) {
  this._occurrences = numberOfOccurrences;
};

ProminentWord.prototype.getOccurrences = function () {
  return this._occurrences;
};

ProminentWord.prototype.serialize = function () {
  return {
    _parseClass: "ProminentWord",
    word: this._word,
    stem: this._stem,
    occurrences: this._occurrences
  };
};

ProminentWord.parse = function (serialized) {
  return new ProminentWord(serialized.word, serialized.stem, serialized.occurrences);
};

exports.default = ProminentWord;
