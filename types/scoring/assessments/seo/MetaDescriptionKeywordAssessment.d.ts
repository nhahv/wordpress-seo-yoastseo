export default MetaDescriptionKeywordAssessment;
/**
 * Assessment for checking the keyword matches in the meta description.
 */
declare class MetaDescriptionKeywordAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.parameters.recommendedMinimum] The recommended minimum of keyword occurrences in the meta description.
     * @param {number} [config.scores.good] The score to return if there are enough keyword occurrences in the meta description.
     * @param {number} [config.scores.bad] The score to return if there aren't enough keyword occurrences in the meta description.
     * @param {string} [config.url] The URL to the relevant article on Yoast.com.
     *
     * @returns {void}
     */
    constructor(config?: Object | undefined);
    identifier: string;
    _config: {
        parameters: {
            recommendedMinimum: number;
        };
        scores: {
            good: number;
            ok: number;
            bad: number;
        };
        urlTitle: string;
        urlCallToAction: string;
    } & Object;
    _keyphraseCounts: any;
    /**
     * Returns the result object based on the number of keyword matches in the meta description.
     *
     * @returns {Object} Result object with score and text.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
