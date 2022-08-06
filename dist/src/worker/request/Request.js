"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Result = require("./Result");

var _Result2 = _interopRequireDefault(_Result);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Request {
	constructor(resolve, reject, data = {}) {
		this._resolve = resolve;
		this._reject = reject;
		this._data = data;
	}

	resolve(payload = {}) {
		const result = new _Result2.default(payload, this._data);
		this._resolve(result);
	}

	reject(payload = {}) {
		const result = new _Result2.default(payload, this._data);
		this._reject(result);
	}
}
exports.default = Request;
