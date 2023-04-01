"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, url) {
	const anchorUrl = _urlUtils2.default.getFromAnchorTag(text);

	/**
  * A link is "Other" if:
  * - The protocol is neither null, nor http, nor https.
  * - The link is a relative fragment URL (starts with #), because it won't navigate to another page.
  */
	const protocol = _urlUtils2.default.getProtocol(anchorUrl);
	if (protocol && !_urlUtils2.default.protocolIsHttpScheme(protocol) || _urlUtils2.default.isRelativeFragmentURL(anchorUrl)) {
		return "other";
	}

	if (_urlUtils2.default.isInternalLink(anchorUrl, _urlUtils2.default.getHostname(url))) {
		return "internal";
	}

	return "external";
};

var _urlUtils = require("./urlUtils");

var _urlUtils2 = _interopRequireDefault(_urlUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=getLinkType.js.map
