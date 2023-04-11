/**
 * Represents the assessment that will calculate if the width of the page title is correct.
 */
export default class PageTitleWidthAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object}  [config]        The configuration to use.
     * @param {boolean} allowShortTitle Whether the short title width is penalized with a bad score or not.
     *
     * @returns {void}
     */
    constructor(config?: Object | undefined, allowShortTitle?: boolean);
    _allowShortTitle: boolean;
    identifier: string;
    _config: {
        minLength: number;
        maxLength: number;
        scores: {
            noTitle: number;
            widthTooShort: number;
            widthTooLong: number;
            widthCorrect: number;
        };
        urlTitle: string;
        urlCallToAction: string;
    } & Object;
    /**
     * Returns the maximum length.
     *
     * @returns {number} The maximum length.
     */
    getMaximumLength(): number;
    /**
     * Returns the score for the pageTitleWidth
     *
     * @param {number} pageTitleWidth The width of the pageTitle.
     *
     * @returns {number} The calculated score.
     */
    calculateScore(pageTitleWidth: number): number;
    /**
     * Translates the pageTitleWidth score to a message the user can understand.
     *
     * @param {number} pageTitleWidth The width of the pageTitle.
     *
     * @returns {string} The translated string.
     */
    translateScore(pageTitleWidth: number): string;
}
import Assessment from "../assessment";
