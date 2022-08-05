/**
 * Represents the assessment that checks if all images have alt tags (only applicable for product pages).
 */
export default class ImageAltTagsAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object}  config      The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: object);
    identifier: string;
    _config: {
        scores: {
            bad: number;
            good: number;
        };
        urlTitle: string;
        urlCallToAction: string;
    } & object;
    altTagsProperties: any;
    imageCount: any;
    /**
     * Calculate the result based on the availability of images in the text, including videos in product pages.
     *
     * @returns {Object} The calculated result.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
