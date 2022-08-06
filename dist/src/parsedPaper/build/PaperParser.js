"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ParsedPaper = require("../ParsedPaper");

var _ParsedPaper2 = _interopRequireDefault(_ParsedPaper);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaperParser {
	constructor(treeBuilder) {
		this._parsedPaper = new _ParsedPaper2.default();
		this._treeBuilder = treeBuilder;

		this._metaDataModifiers = {};
	}

	parse(paper) {
		this._parsedPaper.setTree(this._treeBuilder(paper.getText()));

		this._parsedPaper.setMetaData(this.constructMetaData(paper));

		return this._parsedPaper;
	}

	constructMetaData(paper) {
		let metaData = {};

		metaData = Object.assign({}, this.runMetaDataModifiers(metaData, paper));

		return metaData;
	}

	registerMetaDataModifier(modifierName, modifierFunction) {
		this._metaDataModifiers[modifierName] = modifierFunction;
	}

	runMetaDataModifiers(metaData, paper) {
		let modifiedMetaData = metaData;
		(0, _lodashEs.forEach)(this._metaDataModifiers, (modifierFunction, modifierName) => {
			try {
				const previousMetaData = Object.assign({}, modifiedMetaData);
				modifiedMetaData = modifierFunction(previousMetaData, paper);
			} catch (modifierError) {
				console.warn(`An error with message "${modifierError.message}" occurred in metaData modifier ` + `function called ${modifierName}. Skipping that function...`);
			}
		});
		return modifiedMetaData;
	}
}

exports.default = PaperParser;
