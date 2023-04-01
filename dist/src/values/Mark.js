"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodashEs = require("lodash-es");

function Mark(properties) {
  (0, _lodashEs.defaults)(properties, { original: "", marked: "" });
  this._properties = properties;
}

Mark.prototype.getOriginal = function () {
  return this._properties.original;
};

Mark.prototype.getMarked = function () {
  return this._properties.marked;
};

Mark.prototype.applyWithReplace = function (text) {
  return text.split(this._properties.original).join(this._properties.marked);
};

Mark.prototype.serialize = function () {
  return _extends({
    _parseClass: "Mark"
  }, this._properties);
};

Mark.parse = function (serialized) {
  delete serialized._parseClass;
  return new Mark(serialized);
};

exports.default = Mark;
