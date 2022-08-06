"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _parseSynonyms = require("../../../../stringProcessing/parseSynonyms");

var _parseSynonyms2 = _interopRequireDefault(_parseSynonyms);

var _nodes = require("../../../structure/tree/nodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildTree = function buildTree(paper) {
	const metadata = new _nodes.StructuredNode("metadata", null);

	metadata.addChild(new _nodes.MetadataText("title", paper.getTitle()));
	metadata.addChild(new _nodes.MetadataText("description", paper.getDescription()));

	metadata.addChild(new _nodes.MetadataMiscellaneous("keyphrase", paper.getKeyword()));
	metadata.addChild(new _nodes.MetadataMiscellaneous("synonyms", (0, _parseSynonyms2.default)(paper.getSynonyms())));
	metadata.addChild(new _nodes.MetadataMiscellaneous("slug", paper.getUrl()));
	metadata.addChild(new _nodes.MetadataMiscellaneous("titleWidth", paper.getTitleWidth()));
	metadata.addChild(new _nodes.MetadataMiscellaneous("permalink", paper.getPermalink()));
	metadata.addChild(new _nodes.MetadataMiscellaneous("locale", paper.getLocale()));

	return metadata;
};

exports.default = buildTree;
