export default HTMLTreeConverter;
/**
 * Converts a parse5 tree to a tree that can be analyzed.
 */
declare class HTMLTreeConverter {
    /**
     * Converts the parse5 tree to a Yoast tree.
     *
     * @param {Object} parse5Tree The parse5 tree to convert.
     *
     * @returns {module:parsedPaper/structure.Node} The converted tree.
     */
    convert(parse5Tree: Object): any;
    /**
     * Converts the tree from a parse5 implementation to a Yoast tree.
     *
     * @param {Object}                                parse5Tree    The parse5 tree to convert.
     * @param {module:parsedPaper/structure.Node}     parent        The tree in progress.
     *
     * @returns {void}
     *
     * @private
     */
    private _convert;
    /**
     * Creates a new node for in the structured tree from the given parse 5 node.
     * Returns `null` if no node should be added to the tree.
     *
     * @param {Object}                            parse5Node The parse5 node that should be parsed.
     * @param {module:parsedPaper/structure.Node} parentNode The parent node.
     *
     * @returns {module:parsedPaper/structure.Node|null} The node that should be added to the tree, or `null` if no node should be added.
     *
     * @private
     */
    private _createChild;
    /**
     * Adds leaf node content (text or formatting) to the tree according to a predefined strategy:
     *
     * If the content has a leaf node (paragraph, heading, list item) parent or ancestor: add it to this leaf node.
     * Else: wrap the content in an implicit paragraph, and add the content to it in such a way that runs
     * of phrasing content make up one implicit paragraph.
     *
     * @param {string|module:parsedPaper/structure.FormattingElement} contentToAdd The content to add.
     * @param {function}                                              add          A function that adds the content to the specified leaf node.
     * @param {module:parsedPaper/structure.Node}                     parent       The parent to which to try to add the content.
     * @param {Object}                                                location     The location of the content as parsed by parse5.
     *
     * @returns {null|module:parsedPaper/structure.Paragraph|null} The implicit paragraph, if one was created.
     *
     * @private
     */
    private _addLeafNodeContent;
    /**
     * Add text to the parent leaf node.
     *
     * @param {module:parsedPaper/structure.LeafNode} parent The leaf node to which to add the text.
     * @param {string}                                text   The text to add to the node.
     *
     * @returns {void}
     *
     * @private
     */
    private _addText;
    /**
     * Add a formatting element to the parent leaf node.
     *
     * @param {module:parsedPaper/structure.LeafNode}          parent     The leaf node to which to add the formatting.
     * @param {module:parsedPaper/structure.FormattingElement} formatting The formatting element to add.
     *
     * @returns {void}
     *
     * @private
     */
    private _addFormatting;
    /**
     * Parses the HTML element attributes from parse5's format to a plain JS object.
     *
     * @example
     *
     * const attributes = _parseAttributes( { name: "id", value: "an-id" } ) // becomes { id: "an-id" }.
     *
     * @param {Array<{ name: string, value: string }>} parse5attributes The attributes as parsed by parse5.
     *
     * @returns {Object} The parsed attributes.
     *
     * @private
     */
    private _parseAttributes;
    /**
     * Returns the last child of the given parent.
     *
     * @param {module:parsedPaper/structure.StructuredNode} parent The parent.
     *
     * @returns {module:parsedPaper/structure.Node} The parent's last child.
     *
     * @private
     */
    private _previousChild;
    /**
     * Try to find the leaf node ancestor of this node. Returns `null` if the node does not have one.
     *
     * @param {module:parsedPaper/structure.Node} element The node for which to find the leaf node ancestor.
     *
     * @returns {null|module:parsedPaper/structure.Node} The leaf node ancestor, if it has one, `null` if not.
     *
     * @private
     */
    private _leafNodeAncestor;
}
