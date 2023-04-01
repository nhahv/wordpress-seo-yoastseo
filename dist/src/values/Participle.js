"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _types = require("./../helpers/types");

var defaultAttributes = {
  auxiliaries: [],
  type: "",
  language: ""
};

var validateAttributes = function validateAttributes(attributes) {
  (0, _lodashEs.forEach)(attributes, function (attributeValue, attributeName) {
    var expectedType = (0, _types.getType)(defaultAttributes[attributeName]);
    if ((0, _types.isSameType)(attributeValue, expectedType) === false) {
      throw Error("Attribute " + attributeName + " has invalid type. Expected " + expectedType + ", got " + (0, _types.getType)(attributeValue) + ".");
    }
  });
};

var Participle = function Participle(participle, sentencePart, attributes) {
  this.setParticiple(participle);
  this.setSentencePart(sentencePart);
  this._determinesSentencePartIsPassive = false;

  attributes = attributes || {};

  (0, _lodashEs.defaults)(attributes, defaultAttributes);

  validateAttributes(attributes);

  this._attributes = attributes;
};

Participle.prototype.setParticiple = function (participle) {
  if (participle === "") {
    throw Error("The participle should not be empty.");
  }
  if (!(0, _lodashEs.isString)(participle)) {
    throw Error("The participle should be a string.");
  }
  this._participle = participle;
};

Participle.prototype.getParticiple = function () {
  return this._participle;
};

Participle.prototype.setSentencePart = function (sentencePart) {
  if (sentencePart === "") {
    throw Error("The sentence part should not be empty.");
  }
  this._sentencePart = sentencePart;
};

Participle.prototype.getSentencePart = function () {
  return this._sentencePart;
};

Participle.prototype.getType = function () {
  return this._attributes.type;
};

Participle.prototype.getAuxiliaries = function () {
  return this._attributes.auxiliaries;
};

Participle.prototype.getLanguage = function () {
  return this._attributes.language;
};

Participle.prototype.determinesSentencePartIsPassive = function () {
  return this._determinesSentencePartIsPassive;
};

Participle.prototype.setSentencePartPassiveness = function (passive) {
  if (!(0, _types.isSameType)(passive, "boolean")) {
    throw Error("Passiveness had invalid type. Expected boolean, got " + (0, _types.getType)(passive) + ".");
  }
  this._determinesSentencePartIsPassive = passive;
};

Participle.prototype.serialize = function () {
  return {
    _parseClass: "Participle",
    attributes: this._attributes,
    participle: this._participle,
    sentencePart: this._sentencePart,
    determinesSentencePartIsPassive: this._determinesSentencePartIsPassive
  };
};

Participle.parse = function (serialized) {
  const participle = new Participle(serialized.participle, serialized.sentencePart, serialized.attributes);
  participle.setSentencePartPassiveness(serialized.determinesSentencePartIsPassive);

  return participle;
};

exports.default = Participle;
