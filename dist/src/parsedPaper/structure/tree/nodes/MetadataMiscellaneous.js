"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MetadataMiscellaneous extends _Node2.default {
	constructor(type = "MetadataMiscellaneous", data = null) {
		super(type, null);

		this._data = data;
	}

	get data() {
		return this._data;
	}

	set data(data) {
		this._data = data;
	}
}

exports.default = MetadataMiscellaneous;
