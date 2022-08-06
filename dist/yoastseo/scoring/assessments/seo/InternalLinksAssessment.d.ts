export default InternalLinksAssessment;
/**
 * Assessment to check whether the text has internal links and whether they are followed or no-followed.
 */
declare class InternalLinksAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.parameters.recommendedMinimum] The recommended minimum number of internal links in the text.
     * @param {number} [config.scores.allInternalFollow] The score to return if all internal links are do-follow.
     * @param {number} [config.scores.someInternalFollow] The score to return if some but not all internal links are do-follow.
     * @param {number} [config.scores.noneInternalFollow] The score to return if all internal links are no-follow.
     * @param {number} [config.scores.noInternal] The score to return if there are no internal links.
     * @param {string} [config.url] The URL to the relevant KB article.
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
            allInternalFollow: number;
            someInternalFollow: number;
            noneInternalFollow: number;
            noInternal: number;
        };
        urlTitle: string;
        urlCallToAction: string;
    } & Object;
    linkStatistics: any;
    /**
     * Returns a score and text based on the linkStatistics object.
     *
     * @returns {Object} ResultObject with score and text
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
