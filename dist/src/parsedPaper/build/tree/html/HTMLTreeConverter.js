"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tree = require("../../../structure/tree");

var _LeafNode = require("../../../structure/tree/nodes/LeafNode");

var _LeafNode2 = _interopRequireDefault(_LeafNode);

var _htmlConstants = require("./htmlConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HTMLTreeConverter {
	convert(parse5Tree) {
		const root = new _tree.StructuredNode("root", null);
		this._convert(parse5Tree, root);
		return root;
	}

	_convert(parse5Tree, parent) {
		if (_htmlConstants.ignoredHtmlElements.includes(parse5Tree.nodeName)) {
			return;
		}
		if (parse5Tree.childNodes) {
			for (const node of parse5Tree.childNodes) {
				const child = this._createChild(node, parent);

				if (child) {
					parent.addChild(child);
					this._convert(node, child);
				} else {
					this._convert(node, parent);
				}
			}
		}
	}

	_createChild(parse5Node, parentNode) {
		let child = null;

		const nodeType = parse5Node.nodeName;

		if (_htmlConstants.ignoredHtmlElements.includes(nodeType)) {
			const formatting = new _tree.FormattingElement(nodeType, parse5Node.sourceCodeLocation, this._parseAttributes(parse5Node.attrs));
			this._addLeafNodeContent(formatting, this._addFormatting, parentNode, parse5Node.sourceCodeLocation);
		} else if (nodeType === "p") {
			child = new _tree.Paragraph(parse5Node.sourceCodeLocation);
		} else if (_htmlConstants.headings.includes(nodeType)) {
			child = new _tree.Heading(parseInt(nodeType[1], 10), parse5Node.sourceCodeLocation);
		} else if (nodeType === "li") {
			child = new _tree.ListItem(parse5Node.sourceCodeLocation);
		} else if (nodeType === "ol" || nodeType === "ul") {
			child = new _tree.List(nodeType === "ol", parse5Node.sourceCodeLocation);
		} else if (nodeType === "#text") {
			child = this._addLeafNodeContent(parse5Node.value, this._addText, parentNode, parse5Node.sourceCodeLocation);
		} else if (_htmlConstants.formattingElements.includes(nodeType)) {
			const formatting = new _tree.FormattingElement(nodeType, parse5Node.sourceCodeLocation, this._parseAttributes(parse5Node.attrs));
			child = this._addLeafNodeContent(formatting, this._addFormatting, parentNode, parse5Node.sourceCodeLocation);
		} else {
			child = new _tree.StructuredNode(nodeType, parse5Node.sourceCodeLocation);
		}

		return child;
	}

	_addLeafNodeContent(contentToAdd, add, parent, location) {
		if (parent instanceof _LeafNode2.default) {
			add(parent, contentToAdd);
			return null;
		}

		const previousChild = this._previousChild(parent);
		const leafNodeAncestor = this._leafNodeAncestor(parent);

		if (leafNodeAncestor instanceof _tree.Paragraph) {
			add(leafNodeAncestor, contentToAdd);
			return null;
		} else if (previousChild && previousChild instanceof _tree.Paragraph && previousChild.isImplicit) {
			add(previousChild, contentToAdd);
			return null;
		}

		if (/^\s*$/.exec(contentToAdd)) {
			return null;
		}

		const child = new _tree.Paragraph(location, true);
		add(child, contentToAdd);
		return child;
	}

	_addText(parent, text) {
		parent.appendText(text);
	}

	_addFormatting(parent, formatting) {
		parent.addFormatting(formatting);
	}

	_parseAttributes(parse5attributes) {
		if (parse5attributes && parse5attributes.length > 0) {
			return parse5attributes.reduce((attributes, attribute) => {
				attributes[attribute.name] = attribute.value;
				return attributes;
			}, {});
		}
		return null;
	}

	_previousChild(parent) {
		if (parent.children) {
			return parent.children[parent.children.length - 1];
		}
		return null;
	}

	_leafNodeAncestor(element) {
		const parent = element.parent;

		if (!parent) {
			return null;
		}

		if (element instanceof _LeafNode2.default) {
			return parent;
		}

		return this._leafNodeAncestor(parent);
	}
}

exports.default = HTMLTreeConverter;
