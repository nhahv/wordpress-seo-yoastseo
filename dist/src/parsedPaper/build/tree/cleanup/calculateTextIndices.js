"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _htmlConstants = require("../html/htmlConstants");

const elementsThatCanBeClosed = function elementsThatCanBeClosed(currentElement, openElements) {
	return openElements.filter(el => {
		const endTag = el.sourceCodeLocation.endTag;
		return endTag.endOffset <= currentElement.sourceCodeLocation.startOffset;
	});
};

const closeElements = function closeElements(elementsToClose, currentOffset) {
	elementsToClose.sort((a, b) => a.sourceCodeLocation.endTag.endOffset - b.sourceCodeLocation.endTag.endOffset);

	elementsToClose.forEach(elementToClose => {
		const endTag = elementToClose.sourceCodeLocation.endTag;

		elementToClose.textEndIndex = endTag.startOffset - currentOffset;

		const endTagLength = endTag.endOffset - endTag.startOffset;
		currentOffset += endTagLength;
	});

	return currentOffset;
};

const handleIgnoredContent = function handleIgnoredContent(element, currentOffset) {
	element.textEndIndex = element.textStartIndex;

	const end = element.sourceCodeLocation.endTag ? element.sourceCodeLocation.endTag.startOffset : element.sourceCodeLocation.endOffset;
	const start = element.sourceCodeLocation.startTag ? element.sourceCodeLocation.startTag.endOffset : element.sourceCodeLocation.startOffset;

	currentOffset += end - start;

	return currentOffset;
};

const computeCommentStartEndTextIndices = function computeCommentStartEndTextIndices(element, currentOffset) {
	element.textStartIndex = element.sourceCodeLocation.startOffset - currentOffset;
	element.textEndIndex = element.textStartIndex;

	return element.sourceCodeLocation.endOffset - element.sourceCodeLocation.startOffset;
};

const computeElementStartTextIndex = function computeElementStartTextIndex(element, currentOffset) {
	const startTag = element.sourceCodeLocation.startTag;

	const startTagLength = startTag.endOffset - startTag.startOffset;

	currentOffset += startTagLength;

	element.textStartIndex = startTag.endOffset - currentOffset;

	if (!element.sourceCodeLocation.endTag) {
		element.textEndIndex = element.textStartIndex;
	}

	return currentOffset;
};

const calculateTextIndices = function calculateTextIndices(node) {
	if (!node.textContainer.formatting || node.textContainer.formatting.length === 0) {
		return;
	}

	const openElements = [];

	let currentOffset = node.sourceCodeLocation.startTag ? node.sourceCodeLocation.startTag.endOffset : node.sourceCodeLocation.startOffset;

	node.textContainer.formatting.forEach(element => {
		const elementsToClose = elementsThatCanBeClosed(element, openElements);
		currentOffset = closeElements(elementsToClose, currentOffset);
		(0, _lodashEs.pullAll)(openElements, elementsToClose);

		if (element.type === "#comment") {
			currentOffset += computeCommentStartEndTextIndices(element, currentOffset);
			return;
		}

		currentOffset = computeElementStartTextIndex(element, currentOffset);

		if (element.sourceCodeLocation.endTag) {
			openElements.push(element);
		}

		if (_htmlConstants.ignoredHtmlElements.includes(element.type)) {
			currentOffset = handleIgnoredContent(element, currentOffset);
		}
	});

	closeElements(openElements, currentOffset);
};

exports.default = calculateTextIndices;
