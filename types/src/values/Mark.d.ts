export default Mark;
/**
 * Represents a marked piece of text
 *
 * @param {Object} properties The properties of this Mark.
 * @param {string} properties.original The original text that should be marked.
 * @param {string} properties.marked The new text including marks.
 * @constructor
 */
declare function Mark(properties: {
    original: string;
    marked: string;
}): void;
declare class Mark {
    /**
     * Represents a marked piece of text
     *
     * @param {Object} properties The properties of this Mark.
     * @param {string} properties.original The original text that should be marked.
     * @param {string} properties.marked The new text including marks.
     * @constructor
     */
    constructor(properties: {
        original: string;
        marked: string;
    });
    _properties: {
        original: string;
        marked: string;
    };
    /**
     * Returns the original text
     *
     * @returns {string} The original text.
     */
    getOriginal(): string;
    /**
     * Returns the marked text
     *
     * @returns {string} The replaced text.
     */
    getMarked(): string;
    /**
     * Applies this mark to the given text
     *
     * @param {string} text The original text without the mark applied.
     * @returns {string} The A new text with the mark applied to it.
     */
    applyWithReplace(text: string): string;
    /**
     * Serializes the Mark instance to an object.
     *
     * @returns {Object} The serialized Mark.
     */
    serialize(): Object;
}
declare namespace Mark {
    /**
     * Parses the object to a Mark.
     *
     * @param {Object} serialized The serialized object.
     *
     * @returns {Mark} The parsed Mark.
     */
    function parse(serialized: Object): Mark;
}
