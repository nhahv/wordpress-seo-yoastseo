"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

class Sentence {
	constructor(text, startIndex = 0, endIndex = 0) {
		this.text = text;
		this.words = [];
		this.startIndex = startIndex;
		this.endIndex = endIndex;
	}

	setText(text) {
		this.text = text;
	}

	appendText(text) {
		this.text += text;
	}

	getText() {
		return this.text;
	}

	setStartIndex(startIndex) {
		this.startIndex = startIndex;
	}

	setEndIndex(endIndex) {
		this.endIndex = endIndex;
	}

	getStartIndex() {
		return this.startIndex;
	}

	getEndIndex() {
		return this.endIndex;
	}
}

exports.default = Sentence;
