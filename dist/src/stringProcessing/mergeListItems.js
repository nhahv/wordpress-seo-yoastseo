"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mergeListItems = mergeListItems;
function mergeListItems(text) {
	const listTags = /<\/?(o|ul)(?:[^>]+)?>/g;
	const listItemTags = /\s?<\/?li(?:[^>]+)?>\s?/g;

	text = text.replace(listTags, "");
	text = text.replace(listItemTags, " ");
	text = text.replace(/\s+/g, " ");

	return text;
}
