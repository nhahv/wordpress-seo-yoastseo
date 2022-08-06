"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = wrapTryCatchAroundAction;

var _formatString = require("../helpers/formatString");

var _formatString2 = _interopRequireDefault(_formatString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleError = function handleError(logger, error, payload, errorMessagePrefix = "") {
	if (payload) {
		errorMessagePrefix = (0, _formatString2.default)(errorMessagePrefix, payload);
	}

	let errorMessage = errorMessagePrefix ? [errorMessagePrefix] : [];

	if (error.name && error.message) {
		if (error.stack) {
			logger.debug(error.stack);
		}

		errorMessage.push(`${error.name}: ${error.message}`);
	}

	errorMessage = errorMessage.join("\n\t");
	logger.error(errorMessage);
	return errorMessage;
};

function wrapTryCatchAroundAction(logger, action, errorMessagePrefix = "") {
	return async (...args) => {
		try {
			return await action(...args);
		} catch (error) {
			const errorMessage = handleError(logger, error, args[1], errorMessagePrefix);
			return { error: errorMessage };
		}
	};
}
