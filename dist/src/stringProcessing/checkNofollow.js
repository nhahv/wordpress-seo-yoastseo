"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (anchorHTML) {
	let linkFollow = "Dofollow";

	const parser = new _htmlparser2.default.Parser({
		onopentag: function onopentag(tagName, attributes) {
			if (tagName !== "a" || !attributes.rel) {
				return;
			}

			if (attributes.rel.toLowerCase().split(/\s/).includes("nofollow")) {
				linkFollow = "Nofollow";
			}
		}
	});

	parser.write(anchorHTML);
	parser.end();

	return linkFollow;
};

var _htmlparser = require("htmlparser2");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
