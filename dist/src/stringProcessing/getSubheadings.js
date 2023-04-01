"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function getSubheadings(text) {
  const subheadings = [];
  const regex = /<h([1-6])(?:[^>]+)?>(.*?)<\/h\1>/ig;
  let match;

  while ((match = regex.exec(text)) !== null) {
    subheadings.push(match);
  }

  return subheadings;
}

function getSubheadingsTopLevel(text) {
  const subheadings = [];
  const regex = /<h([2-3])(?:[^>]+)?>(.*?)<\/h\1>/ig;
  let match;

  while ((match = regex.exec(text)) !== null) {
    subheadings.push(match);
  }

  return subheadings;
}

function getSubheadingContents(text) {
  const subheadings = getSubheadings(text);

  return subheadings.map(subheading => subheading[0]);
}

function getSubheadingContentsTopLevel(text) {
  const subheadings = getSubheadingsTopLevel(text);

  return subheadings.map(subheading => subheading[0]);
}

function removeSubheadingsTopLevel(text) {
  const regex = /<h([2-3])(?:[^>]+)?>(.*?)<\/h\1>/ig;

  return text.replace(regex, "");
}

exports.getSubheadings = getSubheadings;
exports.getSubheadingsTopLevel = getSubheadingsTopLevel;
exports.getSubheadingContents = getSubheadingContents;
exports.getSubheadingContentsTopLevel = getSubheadingContentsTopLevel;
exports.removeSubheadingsTopLevel = removeSubheadingsTopLevel;
exports.default = {
  getSubheadings: getSubheadings,
  getSubheadingsTopLevel: getSubheadingsTopLevel,
  getSubheadingContents: getSubheadingContents,
  getSubheadingContentsTopLevel: getSubheadingContentsTopLevel,
  removeSubheadingsTopLevel: removeSubheadingsTopLevel
};
