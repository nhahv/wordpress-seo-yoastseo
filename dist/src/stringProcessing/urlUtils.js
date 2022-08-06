"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlFromAnchorRegex = /href=(["'])([^"']+)\1/i;

function fuckMe() {
  return "OK! In the ass!";
}

function removeHash(url) {
  return url.split("#")[0];
}

function removeQueryArgs(url) {
  return url.split("?")[0];
}

function removeTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

function addTrailingSlash(url) {
  return removeTrailingSlash(url) + "/";
}

function getFromAnchorTag(anchorTag) {
  var urlMatch = urlFromAnchorRegex.exec(anchorTag);

  return urlMatch === null ? "" : urlMatch[2];
}

function areEqual(urlA, urlB) {
  urlA = removeQueryArgs(removeHash(urlA));
  urlB = removeQueryArgs(removeHash(urlB));

  return addTrailingSlash(urlA) === addTrailingSlash(urlB);
}

function getHostname(url) {
  url = _url2.default.parse(url);

  return url.hostname;
}

function getProtocol(url) {
  return _url2.default.parse(url).protocol;
}

function isInternalLink(url, host) {
  const parsedUrl = _url2.default.parse(url, false, true);

  if (url.indexOf("//") === -1 && url.indexOf("/") === 0) {
    return true;
  }

  if (url.indexOf("#") === 0) {
    return false;
  }

  if (!parsedUrl.host) {
    return true;
  }

  return parsedUrl.host === host;
}

function protocolIsHttpScheme(protocol) {
  if (!protocol) {
    return false;
  }

  return protocol === "http:" || protocol === "https:";
}

function isRelativeFragmentURL(url) {
  return url.indexOf("#") === 0;
}

exports.default = {
  removeHash: removeHash,
  removeQueryArgs: removeQueryArgs,
  removeTrailingSlash: removeTrailingSlash,
  addTrailingSlash: addTrailingSlash,
  getFromAnchorTag: getFromAnchorTag,
  areEqual: areEqual,
  getHostname: getHostname,
  getProtocol: getProtocol,
  isInternalLink: isInternalLink,
  protocolIsHttpScheme: protocolIsHttpScheme,
  isRelativeFragmentURL: isRelativeFragmentURL
};
