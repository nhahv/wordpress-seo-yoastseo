"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

class TreeResearcher {
	constructor() {
		this._researches = {};
		this._data = {};
	}

	addResearch(name, research) {
		this._researches[name] = research;
	}

	getResearches() {
		return this._researches;
	}

	hasResearch(name) {
		return (0, _lodashEs.has)(this._researches, name);
	}

	getResearch(name) {
		if (this.hasResearch(name)) {
			return this._researches[name];
		}
		throw new Error(`'${name}' research does not exist.`);
	}

	async doResearch(name, node, metadata, bustCache = false) {
		const research = this.getResearch(name);
		let researchResult = Promise.resolve();

		if (research.isLeafNode(node)) {
			if (!node.hasResearchResult(name) || bustCache) {
				node.setResearchResult(name, (await research.calculateFor(node, metadata)));
			}
			researchResult = node.getResearchResult(name);
		} else {
			const children = node.children;

			if (children) {
				const resultsForChildren = await Promise.all(children.map(child => {
					return this.doResearch(name, child, metadata);
				}));

				researchResult = research.mergeChildrenResults(resultsForChildren);
			}
		}

		return researchResult;
	}

	addResearchData(researchName, data) {
		this._data[researchName] = data;
	}

	getData(researchName) {
		return (0, _lodashEs.get)(this._data, researchName, false);
	}
}

exports.default = TreeResearcher;
