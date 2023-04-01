"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = serialize;

var _lodashEs = require("lodash-es");

function serialize(thing) {
	if ((0, _lodashEs.isArray)(thing)) {
		return thing.map(serialize);
	}

	const thingIsObject = (0, _lodashEs.isObject)(thing);

	if (thingIsObject && thing.serialize) {
		return thing.serialize();
	}

	if (thingIsObject) {
		return (0, _lodashEs.mapValues)(thing, value => serialize(value));
	}

	return thing;
}
