"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
class ParsedPaper {
	constructor() {
		this._metaData = {};

		this._tree = {};
	}

	setTree(tree) {
		this._tree = tree;
	}

	getTree() {
		return this._tree;
	}

	setMetaProperty(key, value) {
		this._metaData[key] = value;
	}

	getMetaProperty(key) {
		return this._metaData[key];
	}

	setMetaData(metaData) {
		this._metaData = metaData;
	}

	getMetaData() {
		return this._metaData;
	}
}
exports.default = ParsedPaper;
