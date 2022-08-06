/**
 * Represents the assessment that will look if the text has a list (only applicable for product pages).
 */
export default class ListAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object} config The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: object);
    _config: {
        urlTitle: string;
        urlCallToAction: string;
        scores: {
            bad: number;
            good: number;
        };
    } & object;
    identifier: string;
    textContainsList: any;
    /**
     * Calculate the result based on the availability of lists in the text.
     *
     * @returns {Object} The calculated result.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
