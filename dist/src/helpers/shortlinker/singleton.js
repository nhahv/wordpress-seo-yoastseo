"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureShortlinker = configureShortlinker;
exports.createShortlink = createShortlink;
exports.createAnchorOpeningTag = createAnchorOpeningTag;

var _Shortlinker = require("./Shortlinker");

var _Shortlinker2 = _interopRequireDefault(_Shortlinker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let globalScope;

if (typeof window === "undefined") {
  if (typeof self === "undefined") {
    globalScope = global;
  } else {
    globalScope = self;
  }
} else {
  globalScope = window;
}

globalScope.yoast = globalScope.yoast || {};
globalScope.yoast.shortlinker = null;

function getShortlinker() {
  if (globalScope.yoast.shortlinker === null) {
    globalScope.yoast.shortlinker = new _Shortlinker2.default();
  }
  return globalScope.yoast.shortlinker;
}

function configureShortlinker(config) {
  getShortlinker().configure(config);
}

function createShortlink(url, params = {}) {
  return getShortlinker().append(url, params);
}

function createAnchorOpeningTag(url, params = {}) {
  return getShortlinker().createAnchorOpeningTag(url, params);
}
