export default Sentence;
/**
 * Represents a sentence in a text.
 */
declare class Sentence {
    /**
     * Represents a sentence within a text.
     *
     * @param {string} text     The text of this sentence.
     * @param {number} startIndex   The start index of this sentence.
     * @param {number} endIndex     The end index of this sentence.
     */
    constructor(text: string, startIndex?: number, endIndex?: number);
    text: string;
    words: any[];
    startIndex: number;
    endIndex: number;
    /**
     * Sets a text for this sentence.
     *
     * @param {string} text The text to be set for the sentence.
     *
     * @returns {void}
     */
    setText(text: string): void;
    /**
     * Appends text to this sentence.
     *
     * @param {string} text The text to be added to the sentence.
     *
     * @returns {void}
     */
    appendText(text: string): void;
    /**
     * Returns the text of this sentence.
     *
     * @returns {string} The text of this senence.
     */
    getText(): string;
    /**
     * Sets the start index of this sentence.
     *
     * @param {number} startIndex The start index of this sentence.
     * @returns {void}
     */
    setStartIndex(startIndex: number): void;
    /**
     * Sets the end index of this sentence.
     *
     * @param {number} endIndex The end index of this sentence.
     * @returns {void}
     */
    setEndIndex(endIndex: number): void;
    /**
     * Returns the start index of this sentence.
     *
     * @returns {number} The start index of this sentence.
     */
    getStartIndex(): number;
    /**
     * Returns the end index of this sentence.
     *
     * @returns {number} The end index of this sentence.
     */
    getEndIndex(): number;
}
