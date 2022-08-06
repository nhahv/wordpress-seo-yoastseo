"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

class Shortlinker {
	constructor(config = {}) {
		this.configure(config);
	}

	configure(config) {
		this._config = _extends({
			params: {}
		}, config);
	}

	static createQueryString(params) {
		return Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
	}

	append(url, params = {}) {
		let link = encodeURI(url);
		const queryString = Shortlinker.createQueryString(_extends({}, this._config.params, params));

		if (queryString !== "") {
			link += "?" + queryString;
		}

		return link;
	}

	createAnchorOpeningTag(url, params = {}) {
		return `<a href='${this.append(url, params)}' target='_blank'>`;
	}
}
exports.default = Shortlinker;
