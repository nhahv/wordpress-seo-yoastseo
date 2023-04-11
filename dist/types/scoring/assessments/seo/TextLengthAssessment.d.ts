/**
 * Assessment that will test if the text is long enough.
 */
export default class TextLengthAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: Object | undefined);
    identifier: string;
    _config: {
        recommendedMinimum: number;
        slightlyBelowMinimum: number;
        belowMinimum: number;
        veryFarBelowMinimum: number;
        scores: {
            recommendedMinimum: number;
            slightlyBelowMinimum: number;
            belowMinimum: number;
            farBelowMinimum: number;
            veryFarBelowMinimum: number;
        };
        urlTitle: string;
        urlCallToAction: string;
        cornerstoneContent: boolean;
    } & Object;
    /**
     * Returns the score and the appropriate feedback string based on the current word count.
     *
     * @param {number}  wordCount   The amount of words to be checked against.
     *
     * @returns {Object} The score and the feedback string.
     */
    calculateResult(wordCount: number): Object;
}
import Assessment from "../assessment";
