export default SentenceLengthInTextAssessment;
/**
 * Represents the assessment that will calculate the length of sentences in the text.
 */
declare class SentenceLengthInTextAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object} config The configuration to use.
     * @returns {void}
     */
    constructor(config?: object);
    identifier: string;
    _config: any;
    /**
     * Scores the percentage of sentences including more than the recommended number of words.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {object} i18n The object used for translations.
     * @returns {AssessmentResult} The Assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: object): AssessmentResult;
    /**
     * Mark the sentences.
     *
     * @param {Paper} paper The paper to use for the marking.
     * @param {Researcher} researcher The researcher to use.
     *
     * @returns {Array} Array with all the marked sentences.
     */
    getMarks(paper: Paper, researcher: Researcher): any[];
    /**
     * Translates the score to a message the user can understand.
     *
     * @param {number} score The score.
     * @param {number} percentage The percentage.
     * @param {object} i18n The object used for translations.
     *
     * @returns {string} A string.
     */
    translateScore(score: number, percentage: number, i18n: object): string;
    /**
     * Calculates the percentage of sentences that are too long.
     *
     * @param {Array} sentences The sentences to calculate the percentage for.
     * @returns {number} The calculates percentage of too long sentences.
     */
    calculatePercentage(sentences: any[]): number;
    /**
     * Calculates the score for the given percentage.
     *
     * @param {number} percentage The percentage to calculate the score for.
     * @returns {number} The calculated score.
     */
    calculateScore(percentage: number): number;
    /**
     * Gets the sentences that are qualified as being too long.
     *
     * @param {array} sentences The sentences to filter through.
     * @returns {array} Array with all the sentences considered to be too long.
     */
    getTooLongSentences(sentences: array): array;
    /**
     * Get the total amount of sentences that are qualified as being too long.
     *
     * @param {Array} sentences The sentences to filter through.
     * @returns {Number} The amount of sentences that are considered too long.
     */
    countTooLongSentences(sentences: any[]): number;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
