/**
 * Represents the assessment that will look if the text has too long paragraphs.
 */
export default class ParagraphTooLongAssessment extends Assessment {
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
        parameters: {
            recommendedLength: number;
            maximumRecommendedLength: number;
        };
    } & object;
    /**
     * Returns an array containing only the paragraphs longer than the recommended length.
     *
     * @param {array} paragraphsLength The array containing the lengths of individual paragraphs.
     *
     * @returns {array} The number of too long paragraphs.
     */
    getTooLongParagraphs(paragraphsLength: any): any;
    /**
     * Returns the scores and text for the ParagraphTooLongAssessment.
     *
     * @param {array} paragraphsLength  The array containing the lengths of individual paragraphs.
     * @param {array} tooLongParagraphs The number of too long paragraphs.
     *
     * @returns {{score: number, text: string }} the assessmentResult.
     */
    calculateResult(paragraphsLength: any, tooLongParagraphs: any): {
        score: number;
        text: string;
    };
    /**
     * Sort the paragraphs based on word count.
     *
     * @param {Array} paragraphs The array with paragraphs.
     *
     * @returns {Array} The array sorted on word counts.
     */
    sortParagraphs(paragraphs: any[]): any[];
    /**
     * Creates a marker for the paragraphs.
     *
     * @param {object} paper        The paper to use for the assessment.
     * @param {object} researcher   The researcher used for calling research.
     *
     * @returns {Array} An array with marked paragraphs.
     */
    getMarks(paper: object, researcher: object): any[];
}
import Assessment from "../assessment";
