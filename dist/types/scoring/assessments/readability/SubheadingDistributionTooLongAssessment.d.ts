export default SubheadingsDistributionTooLong;
/**
 * Represents the assessment for calculating the text after each subheading.
 */
declare class SubheadingsDistributionTooLong extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} config The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: Object);
    identifier: string;
    _config: {
        parameters: {
            recommendedMaximumWordCount: number;
            slightlyTooMany: number;
            farTooMany: number;
        };
        urlTitle: string;
        urlCallToAction: string;
        scores: {
            goodShortTextNoSubheadings: number;
            goodSubheadings: number;
            okSubheadings: number;
            badSubheadings: number;
            badLongTextNoSubheadings: number;
        };
        shouldNotAppearInShortText: boolean;
    } & Object;
    _subheadingTextsLength: any;
    _tooLongTextsNumber: number | undefined;
    _hasSubheadings: boolean | undefined;
    _textLength: number | undefined;
    /**
     * Checks whether the paper has subheadings.
     *
     * @param {Paper} paper The paper to use for the assessment.
     *
     * @returns {boolean} True when there is at least one subheading.
     */
    hasSubheadings(paper: any): boolean;
    /**
     * Counts the number of subheading texts that are too long.
     *
     * @returns {Array} The array containing subheading texts that are too long.
     */
    getTooLongSubheadingTexts(): any[];
    /**
     * Calculates the score and creates a feedback string based on the subheading texts length.
     *
     * @returns {Object} The calculated result.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
