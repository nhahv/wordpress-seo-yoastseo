export default UrlKeywordAssessment;
/**
 * Represents the URL keyword assessments. This assessments will check if the keyword is present in the url.
 */
declare class UrlKeywordAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} config                           The configuration to use.
     * @param {number} [config.scores.noKeywordInUrl]   The score to return if the keyword is not in the URL.
     * @param {number} [config.scores.good]             The score to return if the keyword is in the URL.
     * @param {string} [config.url]                     The URL to the relevant KB article.
     *
     * @returns {void}
     */
    constructor(config?: Object);
    identifier: string;
    _config: {
        scores: {
            okay: number;
            good: number;
        };
        urlTitle: string;
        urlCallToAction: string;
    } & Object;
    _keywordInURL: any;
    /**
     * Determines the score and the result text based on whether or not there's a keyword in the url.
     *
     *
     * @returns {Object} The object with calculated score and resultText.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
