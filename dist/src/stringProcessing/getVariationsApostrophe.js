"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVariationsApostropheInArray = exports.getVariationsApostrophe = undefined;

var _lodashEs = require("lodash-es");

const getVariationsApostrophe = function getVariationsApostrophe(word) {
  const apostrophes = ["'", "‘", "’", "‛", "`"];

  return (0, _lodashEs.uniq)((0, _lodashEs.flatten)([].concat(apostrophes.map(function (apostropheOuter) {
    return [].concat(apostrophes.map(function (apostropheInner) {
      return word.replace(apostropheOuter, apostropheInner);
    }));
  }))));
};

const getVariationsApostropheInArray = function getVariationsApostropheInArray(forms) {
  return [].concat(forms.map(function (form) {
    return getVariationsApostrophe(form);
  })).filter(Boolean);
};

exports.getVariationsApostrophe = getVariationsApostrophe;
exports.getVariationsApostropheInArray = getVariationsApostropheInArray;
