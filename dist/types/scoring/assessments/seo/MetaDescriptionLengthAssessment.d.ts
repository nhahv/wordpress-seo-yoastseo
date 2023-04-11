/**
 * Assessment for calculating the length of the meta description.
 */
export default class MetaDescriptionLengthAssessment extends Assessment {
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
        recommendedMaximumLength: number;
        maximumLength: number;
        scores: {
            noMetaDescription: number;
            tooLong: number;
            tooShort: number;
            correctLength: number;
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
     * Returns the score for the descriptionLength.
     *
     * @param {number} descriptionLength The length of the metadescription.
     *
     * @returns {number} The calculated score.
     */
    calculateScore(descriptionLength: number): number;
    /**
     * Translates the descriptionLength to a message the user can understand.
     *
     * @param {number} descriptionLength    The length of the metadescription.
     *
     * @returns {string} The translated string.
     */
    translateScore(descriptionLength: number): string;
}
import Assessment from "../assessment";
