"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _SourceCodeLocation = require("./SourceCodeLocation");

var _SourceCodeLocation2 = _interopRequireDefault(_SourceCodeLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FormattingElement {
	constructor(type, sourceCodeLocation, attributes = null) {
		this.type = type;

		this.attributes = attributes;

		this.sourceCodeLocation = new _SourceCodeLocation2.default(sourceCodeLocation);

		this.textStartIndex = null;

		this.textEndIndex = null;

		this.parent = null;
	}

	getAttribute(name) {
		if (!this.attributes) {
			return false;
		}
		if (name in this.attributes) {
			return this.attributes[name];
		}
		return false;
	}
}

exports.default = FormattingElement;
