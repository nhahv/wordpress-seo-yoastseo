/**
 * A parsed version of the paper, containing a tree representation of the text,
 * and parsed metaData pertaining to the tree's context.
 *
 * @class ParsedPaper
 *
 * @memberOf module:parsedPaper
 * */
export default class ParsedPaper {
    /**
     * Stores the metadata (e.g. the keywords, metadescription, title of the document).
     *
     * @type{Object}
     * @private
     */
    private _metaData;
    /**
     * Stores the tree representation of a Paper's text.
     *
     * @type{module:parsedPaper/structure.Node|Object}
     * @private
     */
    private _tree;
    /**
     * Sets a tree structure on the ParsedPaper.
     *
     * @param {module:parsedPaper/structure.Node} tree A tree representation of the paper's text.
     *
     * @returns {void}
     */
    setTree(tree: any): void;
    /**
     * Returns the tree from the ParsedPaper.
     *
     * @returns {module:parsedPaper/structure.Node|Object} The tree.
     */
    getTree(): any;
    /**
     * Sets a metadata value on the ParsedPaper under the passed key.
     *
     * @param {string} key   The key for the metaData key-value pair.
     * @param {*}      value The value for the metaData key-value pair.
     *
     * @returns {void}
     */
    setMetaProperty(key: string, value: any): void;
    /**
     * Returns the metadata value for a specific key from the ParsedPaper.
     *
     * @param   {string} key The key to return the value for.
     * @returns {*}          The value belonging to this key.
     */
    getMetaProperty(key: string): any;
    /**
     * Sets the metaData on the ParsedPaper.
     *
     * @param {Object} metaData The metaData pertaining to tree.
     *
     * @returns {void}
     */
    setMetaData(metaData: Object): void;
    /**
     * Returns the current metaData of the ParsedPaper.
     *
     * @returns {Object} The metaData.
     */
    getMetaData(): Object;
}
