/**
 * Represents the assessment that checks whether there are three or more consecutive sentences beginning with the same word.
 */
export default class SentenceBeginningsAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object} config The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: object);
    identifier: string;
    _config: {
        urlTitle: string;
        urlCallToAction: string;
    } & object;
    /**
     * Counts and groups the number too often used sentence beginnings and determines the lowest count within that group.
     *
     * @param {array} sentenceBeginnings The array containing the objects containing the beginning words and counts.
     *
     * @returns {object} The object containing the total number of too often used beginnings and the lowest count within those.
     */
    groupSentenceBeginnings(sentenceBeginnings: any): object;
    /**
     * Calculates the score based on sentence beginnings.
     *
     * @param {object} groupedSentenceBeginnings    The object with grouped sentence beginnings.
     *
     * @returns {{score: number, text: string, hasMarks: boolean}} result object with score and text.
     */
    calculateSentenceBeginningsResult(groupedSentenceBeginnings: object): {
        score: number;
        text: string;
        hasMarks: boolean;
    };
    /**
     * Marks all consecutive sentences with the same beginnings.
     *
     * @param {object} paper        The paper to use for the assessment.
     * @param {object} researcher   The researcher used for calling research.
     *
     * @returns {object} All marked sentences.
     */
    getMarks(paper: object, researcher: object): object;
}
import Assessment from "../assessment";
