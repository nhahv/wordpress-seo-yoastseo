"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showTrace = undefined;

var _lodashEs = require("lodash-es");

function showTrace(errorMessage) {
	if ((0, _lodashEs.isUndefined)(errorMessage)) {
		errorMessage = "";
	}

	if (!(0, _lodashEs.isUndefined)(console) && !(0, _lodashEs.isUndefined)(console.trace)) {
		console.trace(errorMessage);
	}
}

exports.showTrace = showTrace;
exports.default = {
	showTrace: showTrace
};
