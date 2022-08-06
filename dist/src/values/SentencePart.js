"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SentencePart = function SentencePart(sentencePartText, auxiliaries, locale) {
  this._sentencePartText = sentencePartText;
  this._auxiliaries = auxiliaries;
  this._locale = locale;
  this._isPassive = false;
};

SentencePart.prototype.getSentencePartText = function () {
  return this._sentencePartText;
};

SentencePart.prototype.isPassive = function () {
  return this._isPassive;
};

SentencePart.prototype.getAuxiliaries = function () {
  return this._auxiliaries;
};

SentencePart.prototype.getLocale = function () {
  return this._locale;
};

SentencePart.prototype.setPassive = function (passive) {
  this._isPassive = passive;
};

SentencePart.prototype.serialize = function () {
  return {
    _parseClass: "SentencePart",
    sentencePartText: this._sentencePartText,
    auxiliaries: this._auxiliaries,
    locale: this._locale,
    isPassive: this._isPassive
  };
};

SentencePart.parse = function (serialized) {
  const sentencePart = new SentencePart(serialized.sentencePartText, serialized.auxiliaries, serialized.locale);
  sentencePart.setPassive(serialized.isPassive);

  return sentencePart;
};

exports.default = SentencePart;
