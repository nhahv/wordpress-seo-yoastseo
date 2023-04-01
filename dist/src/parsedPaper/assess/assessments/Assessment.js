"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

class Assessment {
	constructor(name, researcher) {
		this.name = name;

		this._researcher = researcher;
	}

	setResearcher(researcher) {
		this._researcher = researcher;
	}

	getResearcher() {
		return this._researcher;
	}

	async isApplicable(parsedPaper) {
		console.warn("`isApplicable` should be implemented by a child class of `Assessment`.");
	}

	async apply(parsedPaper) {
		console.warn("`apply` should be implemented by a child class of `Assessment`.");
	}
}

exports.default = Assessment;
