"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function normalizeSingleQuotes(text) {
  return text.replace(/[‘’‛`]/g, "'");
}

function normalizeDoubleQuotes(text) {
  return text.replace(/[“”〝〞〟‟„]/g, "\"");
}

function normalizeQuotes(text) {
  return normalizeDoubleQuotes(normalizeSingleQuotes(text));
}

exports.normalizeSingle = normalizeSingleQuotes;
exports.normalizeDouble = normalizeDoubleQuotes;
exports.normalize = normalizeQuotes;
exports.default = {
  normalizeSingle: normalizeSingleQuotes,
  normalizeDouble: normalizeDoubleQuotes,
  normalize: normalizeQuotes
};
