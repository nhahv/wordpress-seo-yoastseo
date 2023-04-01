"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	textArray = [];
	parser.write(text);
	return textArray.join("");
};

var _htmlparser = require("htmlparser2");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let textArray;

let inScriptBlock = false;

const inlineTags = ["script", "style", "code", "pre"];

const parser = new _htmlparser2.default.Parser({
	onopentag: function onopentag(tagName, nodeValue) {
		if ((0, _lodashEs.includes)(inlineTags, tagName)) {
			inScriptBlock = true;
			return;
		}

		const nodeValueType = Object.keys(nodeValue);
		let nodeValueString = "";

		nodeValueType.forEach(function (node) {
			nodeValueString += " " + node + "='" + nodeValue[node] + "'";
		});

		textArray.push("<" + tagName + nodeValueString + ">");
	},

	ontext: function ontext(text) {
		if (!inScriptBlock) {
			textArray.push(text);
		}
	},

	onclosetag: function onclosetag(tagName) {
		if ((0, _lodashEs.includes)(inlineTags, tagName)) {
			inScriptBlock = false;
			return;
		}

		textArray.push("</" + tagName + ">");
	}
}, { decodeEntities: true });
