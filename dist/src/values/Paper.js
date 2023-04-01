"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodashEs = require("lodash-es");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultAttributes = {
  keyword: "",
  synonyms: "",
  description: "",
  title: "",
  titleWidth: 0,
  url: "",
  locale: "en_US",
  permalink: ""
};

var Paper = function Paper(text, attributes) {
  this._text = text || "";

  attributes = attributes || {};
  (0, _lodashEs.defaults)(attributes, defaultAttributes);

  if (attributes.locale === "") {
    attributes.locale = defaultAttributes.locale;
  }

  const onlyLetters = attributes.keyword.replace(/[‘’“”"'.?!:;,¿¡«»&*@#±^%|~`[\](){}⟨⟩<>/\\–\-\u2014\u00d7\u002b\u0026\s]/g, "");

  if ((0, _lodashEs.isEmpty)(onlyLetters)) {
    attributes.keyword = defaultAttributes.keyword;
  }

  this._attributes = attributes;
};

Paper.prototype.hasKeyword = function () {
  return this._attributes.keyword !== "";
};

Paper.prototype.getKeyword = function () {
  return this._attributes.keyword;
};

Paper.prototype.hasSynonyms = function () {
  return this._attributes.synonyms !== "";
};

Paper.prototype.getSynonyms = function () {
  return this._attributes.synonyms;
};

Paper.prototype.hasText = function () {
  return this._text !== "";
};

Paper.prototype.getText = function () {
  return this._text;
};

Paper.prototype.hasDescription = function () {
  return this._attributes.description !== "";
};

Paper.prototype.getDescription = function () {
  return this._attributes.description;
};

Paper.prototype.hasTitle = function () {
  return this._attributes.title !== "";
};

Paper.prototype.getTitle = function () {
  return this._attributes.title;
};

Paper.prototype.hasTitleWidth = function () {
  return this._attributes.titleWidth !== 0;
};

Paper.prototype.getTitleWidth = function () {
  return this._attributes.titleWidth;
};

Paper.prototype.hasUrl = function () {
  return this._attributes.url !== "";
};

Paper.prototype.getUrl = function () {
  return this._attributes.url;
};

Paper.prototype.hasLocale = function () {
  return this._attributes.locale !== "";
};

Paper.prototype.getLocale = function () {
  return this._attributes.locale;
};

Paper.prototype.hasPermalink = function () {
  return this._attributes.permalink !== "";
};

Paper.prototype.getPermalink = function () {
  return this._attributes.permalink;
};

Paper.prototype.serialize = function () {
  return _extends({
    _parseClass: "Paper",
    text: this._text
  }, this._attributes);
};

Paper.prototype.equals = function (paper) {
  return this._text === paper.getText() && (0, _lodashEs.isEqual)(this._attributes, paper._attributes);
};

Paper.parse = function (serialized) {
  const text = serialized.text,
        _parseClass = serialized._parseClass,
        attributes = _objectWithoutProperties(serialized, ["text", "_parseClass"]);

  return new Paper(text, attributes);
};

exports.default = Paper;
