"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const text = paper.getText();

	let blocks = (0, _html.getBlocks)(text);
	blocks = (0, _lodashEs.reject)(blocks, emptyBlock);

	const h1s = [];
	blocks.forEach((block, index) => {
		const match = h1Regex.exec(block);
		if (match) {
			h1s.push({
				tag: "h1",
				content: match[1],
				position: index
			});
		}
	});

	return h1s;
};

var _html = require("../helpers/html");

var _lodashEs = require("lodash-es");

const h1Regex = /<h1.*?>(.*?)<\/h1>/;

const emptyBlock = function emptyBlock(block) {
	block = block.trim();
	return block === "<p></p>" || block === "";
};
