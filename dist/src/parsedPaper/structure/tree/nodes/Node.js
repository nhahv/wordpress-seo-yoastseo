"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _SourceCodeLocation = require("../SourceCodeLocation");

var _SourceCodeLocation2 = _interopRequireDefault(_SourceCodeLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Node {
	constructor(type, sourceCodeLocation) {
		this.type = type;

		if (sourceCodeLocation) {
			this.sourceCodeLocation = new _SourceCodeLocation2.default(sourceCodeLocation);
		}

		this.parent = null;

		this._researchResult = {};
	}

	setResearchResult(researchName, researchResult) {
		this._researchResult[researchName] = researchResult;
	}

	getResearchResult(researchName) {
		return (0, _lodashEs.get)(this._researchResult, researchName, null);
	}

	hasResearchResult(researchName) {
		return (0, _lodashEs.has)(this._researchResult, researchName);
	}

	map(mapFunction) {
		const node = mapFunction(this);
		if (node.children && node.children.length > 0) {
			node.children = node.children.map(child => child.map(mapFunction));
		}
		return node;
	}

	forEach(fun) {
		fun(this);
		if (this.children && this.children.length > 0) {
			this.children.forEach(fun);
		}
	}

	static _removeParent(key, value) {
		if (key === "parent") {
			return;
		}
		return value;
	}

	toString(indentation = 2) {
		return JSON.stringify(this, Node._removeParent, indentation);
	}
}

exports.default = Node;
