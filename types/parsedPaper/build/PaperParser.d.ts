export default PaperParser;
/**
 * A class responsible for pre-processing the Paper, returning a ParsedPaper.
 *
 * @module parsedPaper
 *
 * @see module:parsedPaper/builder
 * @see module:parsedPaper/structure
 */
declare class PaperParser {
    /**
     * Constructs a PaperParser class.
     *
     * @param {Function} treeBuilder A function that receives text and returns a tree.
     *
     * @constructor
     */
    constructor(treeBuilder: Function);
    _parsedPaper: ParsedPaper;
    _treeBuilder: Function;
    _metaDataModifiers: {};
    /**
     * Processes a Paper resulting in a ParsedPaper.
     *
     * @param {Paper} paper The Paper to parse.
     *
     * @returns {ParsedPaper} A parsedPaper instance.
     */
    parse(paper: any): ParsedPaper;
    /**
     * Constructs the metaData from the Paper.
     *
     * @param {Paper} paper The paper to construct the metaData from.
     *
     * @returns {Object} The metaData.
     */
    constructMetaData(paper: any): Object;
    /**
     * Sets a metaData modifying function behind a function name on the internal metaDataModifiers object.
     *
     * @param {string}   modifierName       The name of the to be registered function.
     * @param {Function} modifierFunction   The function that modifies the metaData. Should accept a metaData object
     * 									    and optionally the paper.
     * @returns {void}
     */
    registerMetaDataModifier(modifierName: string, modifierFunction: Function): void;
    /**
     * Runs all registered metaDataModifiers.
     * If one of the functions errors, it is skipped and its metaData changes are discarded.
     *
     * @param {Object} metaData The initial state of the metaData, that should be modified.
     * @param {Paper}  paper    The paper.
     *
     * @returns {Object} A modified metaData object.
     */
    runMetaDataModifiers(metaData: Object, paper: any): Object;
}
import ParsedPaper from "../ParsedPaper";
