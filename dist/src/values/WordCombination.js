"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

function isFunctionWord(word, functionWords) {
  return -1 !== functionWords.indexOf(word.toLocaleLowerCase());
}

function WordCombination(words, occurrences, functionWords) {
  this._words = words;
  this._length = words.length;
  this._occurrences = occurrences || 0;
  this._functionWords = functionWords;
}

WordCombination.lengthBonus = {
  2: 3,
  3: 7,
  4: 12,
  5: 18
};

WordCombination.prototype.getLengthBonus = function () {
  if ((0, _lodashEs.has)(WordCombination.lengthBonus, this._length)) {
    return WordCombination.lengthBonus[this._length];
  }

  return 0;
};

WordCombination.prototype.getWords = function () {
  return this._words;
};

WordCombination.prototype.getLength = function () {
  return this._length;
};

WordCombination.prototype.getCombination = function () {
  return this._words.join(" ");
};

WordCombination.prototype.getOccurrences = function () {
  return this._occurrences;
};

WordCombination.prototype.incrementOccurrences = function () {
  this._occurrences += 1;
};

WordCombination.prototype.getMultiplier = function (relevantWordPercentage) {
  var lengthBonus = this.getLengthBonus();

  return 1 + relevantWordPercentage * lengthBonus;
};

WordCombination.prototype.isRelevantWord = function (word) {
  return (0, _lodashEs.has)(this._relevantWords, word);
};

WordCombination.prototype.getRelevantWordPercentage = function () {
  var relevantWordCount = 0,
      wordRelevance = 1;

  if (this._length > 1) {
    (0, _lodashEs.forEach)(this._words, function (word) {
      if (this.isRelevantWord(word)) {
        relevantWordCount += 1;
      }
    }.bind(this));

    wordRelevance = relevantWordCount / this._length;
  }

  return wordRelevance;
};

WordCombination.prototype.getRelevance = function () {
  if (this._words.length === 1 && isFunctionWord(this._words[0], this._functionWords)) {
    return 0;
  }

  var wordRelevance = this.getRelevantWordPercentage();
  if (wordRelevance === 0) {
    return 0;
  }

  return this.getMultiplier(wordRelevance) * this._occurrences;
};

WordCombination.prototype.setRelevantWords = function (relevantWords) {
  this._relevantWords = relevantWords;
};

WordCombination.prototype.getDensity = function (wordCount) {
  return this._occurrences / wordCount;
};

WordCombination.prototype.serialize = function () {
  return {
    _parseClass: "WordCombination",
    words: this._words,
    occurrences: this._occurrences,
    functionWords: this._functionWords,
    relevantWords: this._relevantWords
  };
};

WordCombination.parse = function (serialized) {
  const wordCombination = new WordCombination(serialized.words, serialized.occurrences, serialized.functionWords);
  wordCombination.setRelevantWords(serialized.relevantWords);

  return wordCombination;
};

exports.default = WordCombination;
