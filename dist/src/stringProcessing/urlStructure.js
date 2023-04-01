"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _core = require("tokenizer2/core");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlTokenizer;

let tokens;

const staticRegex = /^[^%]+$/;

const variableRegex = /^%%[^%]+%%$/;

function createTokenizer() {
	tokens = [];

	urlTokenizer = (0, _core2.default)(function (token) {
		tokens.push(token);
	});

	urlTokenizer.addRule(staticRegex, "static");
	urlTokenizer.addRule(variableRegex, "variable");
}

class UrlStructure {
	constructor(structure) {
		this._structure = structure;
	}

	buildUrl(data) {
		return this._structure.reduce((url, urlPart) => {
			if ("variable" === urlPart.type) {
				urlPart = this._buildVariablePart(data, urlPart);
			} else {
				urlPart = urlPart.value;
			}

			return url + urlPart;
		}, "");
	}

	_buildVariablePart(data, urlPartConfig) {
		if (!data.hasOwnProperty(urlPartConfig.name)) {
			throw new TypeError('Data doesn\'t have required property "' + urlPartConfig.name + '"');
		}

		return data[urlPartConfig.name];
	}

	getStructure() {
		return this._structure;
	}

	static fromUrl(url) {
		createTokenizer();

		urlTokenizer.onText(url);
		urlTokenizer.end();

		tokens = tokens.map(token => {
			const urlPart = {
				type: token.type,
				value: token.src
			};

			if ("variable" === token.type) {
				urlPart.name = urlPart.value.substr(2, urlPart.value.length - 4);
			}

			return urlPart;
		});

		return new UrlStructure(tokens);
	}
}

exports.default = UrlStructure;
