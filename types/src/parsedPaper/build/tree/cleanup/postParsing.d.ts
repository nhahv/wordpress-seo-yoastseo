export default cleanUpTree;
/**
 * Cleans up the given tree after parsing of the HTML source code
 * by setting the start and end index of each formatting element in a leaf node's text.
 *
 * @param {module:parsedPaper/structure.Node} tree The tree structure to be cleaned.
 *
 * @returns {module:parsedPaper/structure.Node} The cleaned up tree.
 *
 * @private
 */
declare function cleanUpTree(tree: any): any;
