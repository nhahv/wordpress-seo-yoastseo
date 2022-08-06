"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var paragraphs = getParagraphsInTags(text);

	if (paragraphs.length > 0) {
		return paragraphs;
	}

	var blocks = (0, _html.getBlocks)(text);

	blocks = (0, _lodashEs.filter)(blocks, function (block) {
		return 0 !== block.indexOf("<h");
	});

	paragraphs = (0, _lodashEs.flatMap)(blocks, function (block) {
		return block.split("\n\n");
	});

	if (paragraphs.length > 0) {
		return paragraphs;
	}

	return [text];
};

var _lodashEs = require("lodash-es");

var _html = require("../helpers/html");

var getParagraphsInTags = function getParagraphsInTags(text) {
	var paragraphs = [];

	var regex = /<p(?:[^>]+)?>(.*?)<\/p>/ig;
	var match;

	while ((match = regex.exec(text)) !== null) {
		paragraphs.push(match);
	}

	return (0, _lodashEs.map)(paragraphs, function (paragraph) {
		return paragraph[1];
	});
};
