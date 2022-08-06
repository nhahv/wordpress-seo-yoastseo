"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

class SourceCodeLocation {
	constructor({ startTag, endTag, startOffset, endOffset }) {
		if (startTag) {
			this.startTag = { startOffset: startTag.startOffset, endOffset: startTag.endOffset };
		}
		if (endTag) {
			this.endTag = { startOffset: endTag.startOffset, endOffset: endTag.endOffset };
		}
		this.startOffset = startOffset;
		this.endOffset = endOffset;
	}
}

exports.default = SourceCodeLocation;
