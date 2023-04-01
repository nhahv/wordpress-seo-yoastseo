"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InvalidTypeError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
}

_util2.default.inherits(InvalidTypeError, Error);

exports.default = InvalidTypeError;
