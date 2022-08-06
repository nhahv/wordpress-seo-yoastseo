export default WordCombination;
/**
 * Represents a word combination in the context of relevant words.
 *
 * @constructor
 *
 * @param {string[]} words The list of words that this combination consists of.
 * @param {number} [occurrences] The number of occurrences, defaults to 0.
 * @param {Function} functionWords The function containing the lists of function words.
 */
declare function WordCombination(words: string[], occurrences?: number, functionWords: Function): void;
declare class WordCombination {
    /**
     * Represents a word combination in the context of relevant words.
     *
     * @constructor
     *
     * @param {string[]} words The list of words that this combination consists of.
     * @param {number} [occurrences] The number of occurrences, defaults to 0.
     * @param {Function} functionWords The function containing the lists of function words.
     */
    constructor(words: string[], occurrences?: number, functionWords: Function);
    _words: string[];
    _length: number;
    _occurrences: number;
    _functionWords: Function;
    /**
     * Returns the base relevance based on the length of this combination.
     *
     * @returns {number} The base relevance based on the length.
     */
    getLengthBonus(): number;
    /**
     * Returns the list with words.
     *
     * @returns {array} The list with words.
     */
    getWords(): array;
    /**
     * Returns the word combination length.
     *
     * @returns {number} The word combination length.
     */
    getLength(): number;
    /**
     * Returns the combination as it occurs in the text.
     *
     * @returns {string} The combination.
     */
    getCombination(): string;
    /**
     * Returns the amount of occurrences of this word combination.
     *
     * @returns {number} The amount of occurrences.
     */
    getOccurrences(): number;
    /**
     * Increments the occurrences.
     *
     * @returns {void}
     */
    incrementOccurrences(): void;
    /**
     * Returns the relevance of the length.
     *
     * @param {number} relevantWordPercentage The relevance of the words within the combination.
     * @returns {number} The relevance based on the length and the word relevance.
     */
    getMultiplier(relevantWordPercentage: number): number;
    /**
     * Returns if the given word is a relevant word based on the given word relevance.
     *
     * @param {string} word The word to check if it is relevant.
     * @returns {boolean} Whether or not it is relevant.
     */
    isRelevantWord(word: string): boolean;
    /**
     * Returns the relevance of the words within this combination.
     *
     * @returns {number} The percentage of relevant words inside this combination.
     */
    getRelevantWordPercentage(): number;
    /**
     * Returns the relevance for this word combination.
     *
     * @returns {number} The relevance of this word combination.
     */
    getRelevance(): number;
    /**
     * Sets the relevance of single words
     *
     * @param {Object} relevantWords A mapping from a word to a relevance.
     * @returns {void}
     */
    setRelevantWords(relevantWords: Object): void;
    _relevantWords: Object;
    /**
     * Returns the density of this combination within the text.
     *
     * @param {number} wordCount The word count of the text this combination was found in.
     * @returns {number} The density of this combination.
     */
    getDensity(wordCount: number): number;
    /**
     * Serializes the WordCombination instance to an object.
     *
     * @returns {Object} The serialized WordCombination.
     */
    serialize(): Object;
}
declare namespace WordCombination {
    const lengthBonus: {
        2: number;
        3: number;
        4: number;
        5: number;
    };
    /**
     * Parses the object to a WordCombination.
     *
     * @param {Object} serialized The serialized object.
     *
     * @returns {WordCombination} The parsed WordCombination.
     */
    function parse(serialized: Object): WordCombination;
}
