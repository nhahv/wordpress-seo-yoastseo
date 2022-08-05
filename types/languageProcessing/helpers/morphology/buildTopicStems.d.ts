/**
 * Analyzes the focus keyword string or one synonym phrase.
 * Checks if morphology is requested or if the user wants to match exact string.
 * If morphology is required the module finds a stem for all words (if no function words list available) or
 * for all content words (i.e., excluding prepositions, articles, conjunctions, if the function words list is available).
 *
 * @param {string}   keyphrase     The keyphrase of the paper (or a synonym phrase) to get stem for.
 * @param {Function} stemmer       The language-specific stemmer.
 * @param {string[]} functionWords The language-specific function words.
 *
 * @returns {TopicPhrase} Object with an array of StemOriginalPairs of all (content) words in the keyphrase or synonym
 * phrase and information about whether the keyphrase/synonym should be matched exactly.
 */
export function buildStems(keyphrase: string, stemmer: Function, functionWords: string[]): TopicPhrase;
/**
 * Retrieves stems of words of the keyphrase and of each synonym phrase using the function that caches
 * the results of previous calls of this function.
 *
 * @param {string}      keyphrase       The paper's keyphrase.
 * @param {string}      synonyms        The paper's synonyms.
 * @param {Function}    stemmer         The language-specific stemmer (if available).
 * @param {string[]}    functionWords   The language-specific function words.
 *
 * @returns {Object} Object with an array of stems of words in the keyphrase and an array of arrays of stems of words in the synonyms.
 */
export function collectStems(keyphrase: string, synonyms: string, stemmer: Function, functionWords: string[]): Object;
/**
 * A topic phrase (i.e., a keyphrase or synonym) with stem-original pairs for the words in the topic phrase.
 *
 * @param {StemOriginalPair[]} stemOriginalPairs The stem-original pairs for the words in the topic phrase.
 * @param {boolean}            exactMatch        Whether the topic phrase is an exact match.
 *
 * @constructor
 */
export class TopicPhrase {
    constructor(stemOriginalPairs?: any[], exactMatch?: boolean);
    stemOriginalPairs: any[];
    exactMatch: boolean;
    /**
     * Returns all stems in the topic phrase.
     *
     * @returns {string[]|[]} The stems in the topic phrase or empty array if the topic phrase is exact match.
     */
    getStems(): string[] | [];
}
/**
 * A stem-original pair ƒor a word in a topic phrase.
 *
 * @param {string} stem     The stem of the topic phrase word.
 * @param {string} original The original word form the topic phrase (unsanitized)
 *
 * @constructor
 */
export class StemOriginalPair {
    constructor(stem: any, original: any);
    stem: any;
    original: any;
}
/**
 * Caches stems depending on the currently available stemmer and functionWords and (separately) keyphrase and synonyms.
 * In this way, if the stemmer and functionWords remain the same in multiple calls of this function, the function
 * that collects actual stems only needs to check if the keyphrase and synonyms also remain the
 * same to return the cached result. The joining of keyphrase and synonyms for this function is needed,
 * because by default memoize caches by the first key only, which in the current case would mean that the function would
 * return the cached forms if the keyphrase has not changed (without checking if synonyms were changed).
 *
 * @param {Function} stemmer       The language-specific stemmer (if available).
 * @param {string[]} functionWords The language-specific function words.
 *
 * @returns {function} The function that collects the stems for a given set of keyphrase, synonyms, stemmer and functionWords.
 */
export const primeLanguageSpecificData: ((stemmer: any, functionWords: any) => ((keyphrase: any, synonyms: any) => Object) & import("lodash").MemoizedFunction) & import("lodash").MemoizedFunction;
