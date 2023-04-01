"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _parseText = require("../../build/linguisticParsing/parseText");

class TextContainer {
	constructor() {
		this.text = "";

		this.formatting = [];

		this._tree = {};
	}

	appendText(text) {
		this.text += text;
		this._tree = {};
	}

	getTree() {
		if (!(0, _lodashEs.isEmpty)(this._tree)) {
			return this._tree;
		}

		this._tree = (0, _parseText.parseTextIntoSentences)(this.text);
		return this._tree;
	}
}

exports.default = TextContainer;
