/**
 * Class for tokenizing a (html) text into sentences.
 */
export default class SentenceTokenizer {
    /**
     * Returns whether or not a certain character is a number.
     *
     * @param {string} character The character to check.
     * @returns {boolean} Whether or not the character is a capital letter.
     */
    isNumber(character: string): boolean;
    /**
     * Returns whether or not a given character is quotation mark.
     *
     * @param {string} character The character to check.
     *
     * @returns {boolean} Whether or not the given character is a quotation mark.
     */
    isQuotation(character: string): boolean;
    /**
     * Returns whether or not a given character is a punctuation mark that can be at the beginning
     * of a sentence, like ¿ and ¡ used in Spanish.
     *
     * @param {string} character The character to check.
     *
     * @returns {boolean} Whether or not the given character is a punctuation mark.
     */
    isPunctuation(character: string): boolean;
    /**
     * Removes duplicate whitespace from a given text.
     *
     * @param {string} text The text with duplicate whitespace.
     * @returns {string} The text without duplicate whitespace.
     */
    removeDuplicateWhitespace(text: string): string;
    /**
     * Returns whether or not a certain character is a capital letter.
     *
     * @param {string} character The character to check.
     *
     * @returns {boolean} Whether or not the character is a capital letter.
     */
    isCapitalLetter(character: string): boolean;
    /**
     * Retrieves the next two characters from an array with the two next tokens.
     *
     * @param {Array} nextTokens The two next tokens. Might be undefined.
     *
     * @returns {string} The next two characters.
     */
    getNextTwoCharacters(nextTokens: any[]): string;
    /**
     * Checks if the sentenceBeginning beginning is a valid beginning.
     *
     * @param {string} sentenceBeginning The beginning of the sentence to validate.
     *
     * @returns {boolean} Returns true if it is a valid beginning, false if it is not.
     */
    isValidSentenceBeginning(sentenceBeginning: string): boolean;
    /**
     * Checks if the token is a valid sentence ending.
     *
     * @param {Object} token The token to validate.
     *
     * @returns {boolean} Returns true if the token is valid ending, false if it is not.
     */
    isSentenceStart(token: any): boolean;
    /**
     * Creates a tokenizer.
     *
     * @returns {Object} The tokenizer and the tokens.
     */
    createTokenizer(): any;
    /**
     * Tokenizes the given text using the given tokenizer.
     *
     * @param {Tokenizer} tokenizer The tokenizer to use.
     * @param {string}    text      The text to tokenize.
     *
     * @returns {void}
     */
    tokenize(tokenizer: Tokenizer, text: string): void;
    /**
     * Determines the start and end indices of a set of sentences form a text.
     *
     * @param {Sentence[]} sentences A set of sentences for which to determine indices.
     *
     * @returns {void}
     */
    determineIndices(sentences: Sentence[]): void;
    /**
     * Trims the white space from the beginning of a sentence and adjusts the sentence start index accordingly.
     *
     * @param {Sentence} sentence The sentence for which to trim the white space at the start.
     *
     * @returns {void}
     */
    trimWhiteSpaceAtStart(sentence: Sentence): void;
    /**
     * Trims the white space from the end of a sentence and adjusts the sentence end index accordingly.
     *
     * @param {Sentence} sentence The sentence for which to trim the white space at the end.
     *
     * @returns {void}
     */
    trimWhiteSpaceAtEnd(sentence: Sentence): void;
    /**
     * Trims white space from the beginning and end of sentences and adjusts the indices
     * of the sentence beginnings and ends accordingly.
     *
     * @param {Sentence[]} sentences The sentences for which to trim the whitespace.
     *
     * @returns {void}
     */
    trimWhiteSpaces(sentences: Sentence[]): void;
    /**
     * Returns an array of sentence objects for a given array of tokens; assumes that the text has already been split into blocks.
     *
     * @param {Object[]} tokenArray The tokens from the sentence tokenizer.
     *
     * @returns {Sentence[]} An array of sentence objects.
     */
    getSentencesFromTokens(tokenArray: any[]): Sentence[];
}
import Sentence from "./Sentence";
//# sourceMappingURL=SentenceTokenizer.d.ts.map