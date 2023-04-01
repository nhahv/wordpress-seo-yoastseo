"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _Research = require("./Research");

var _Research2 = _interopRequireDefault(_Research);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LinkStatistics extends _Research2.default {
	_isNoFollow(linkElement) {
		const rel = linkElement.getAttribute("rel");

		if (!rel) {
			return false;
		}

		return rel.split(/\s+/).includes("nofollow");
	}

	_isHttp(protocol) {
		if (!protocol) {
			return false;
		}

		return protocol === "http:" || protocol === "https:";
	}

	_whichTarget(linkElement, domain) {
		const link = linkElement.getAttribute("href");

		if (!link) {
			return "other";
		}

		const url = _url2.default.parse(link);

		if (!this._isHttp(url.protocol) || url.hash) {
			return "other";
		}

		if (url.hostname === domain) {
			return "internal";
		}

		return "external";
	}

	_getPermalink(metadata) {
		const permalinkElement = metadata.children.find(child => child.tag === "permalink");
		const paragraph = permalinkElement.children[0];
		return paragraph.textContainer.text;
	}

	calculateFor(node, metadata) {
		const links = node.textContainer.formatting.filter(element => element.type === "a");

		const permalink = this._getPermalink(metadata);
		const url = _url2.default.parse(permalink);

		const results = links.map(link => {
			const noFollow = this._isNoFollow(link);
			const target = this._whichTarget(link, url.hostname);

			return { link, noFollow, target };
		});

		return Promise.resolve(results);
	}
}

exports.default = LinkStatistics;
