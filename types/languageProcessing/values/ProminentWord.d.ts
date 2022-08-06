export default ProminentWord;
/**
 * Represents a prominent word in the context of relevant words.
 *
 * @constructor
 *
 * @param {string} word             The word.
 * @param {string} [stem]           The stem / base form of the word, defaults to the word.
 * @param {number} [occurrences]    The number of occurrences, defaults to 0.
 */
declare function ProminentWord(word: string, stem?: string | undefined, occurrences?: number | undefined): void;
declare class ProminentWord {
    /**
     * Represents a prominent word in the context of relevant words.
     *
     * @constructor
     *
     * @param {string} word             The word.
     * @param {string} [stem]           The stem / base form of the word, defaults to the word.
     * @param {number} [occurrences]    The number of occurrences, defaults to 0.
     */
    constructor(word: string, stem?: string | undefined, occurrences?: number | undefined);
    _word: string;
    _stem: string;
    _occurrences: number;
    setWord(word: string): void;
    getWord(): string;
    getStem(): string;
    setOccurrences(numberOfOccurrences: any): void;
    getOccurrences(): number;
    serialize(): Object;
}
declare namespace ProminentWord {
    export function parse(serialized: Object): ProminentWord;
}
