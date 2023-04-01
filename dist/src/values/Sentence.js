"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultAttributes = {
  locale: "en_US"
};

var Sentence = function Sentence(sentence, locale) {
  this._sentenceText = sentence || "";
  this._locale = locale || defaultAttributes.locale;
  this._isPassive = false;
};

Sentence.prototype.getSentenceText = function () {
  return this._sentenceText;
};

Sentence.prototype.getLocale = function () {
  return this._locale;
};

Sentence.prototype.isPassive = function () {
  return this._isPassive;
};

Sentence.prototype.setPassive = function (passive) {
  this._isPassive = passive;
};

Sentence.prototype.serialize = function () {
  return {
    _parseClass: "Sentence",
    sentenceText: this._sentenceText,
    locale: this._locale,
    isPassive: this._isPassive
  };
};

Sentence.parse = function (serialized) {
  const sentence = new Sentence(serialized.sentenceText, serialized.locale);
  sentence.setPassive(serialized.isPassive);

  return sentence;
};

exports.default = Sentence;
