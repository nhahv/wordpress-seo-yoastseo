export default ListItem;
/**
 * Represents an item within a list.
 *
 * @extends module:parsedPaper/structure.Node
 *
 * @memberOf module:parsedPaper/structure
 */
declare class ListItem {
    /**
     * Represents an item within a list.
     *
     * @param {Object} sourceCodeLocation The parse5 formatted location of the element inside of the source code.
     *
     * @returns {void}
     */
    constructor(sourceCodeLocation: any);
    /**
     * This ListItem's child nodes.
     * @type {Node[]}
     */
    children: Node[];
}
//# sourceMappingURL=ListItem.d.ts.map