/**
 * Represents the assessment that checks if the text has any images present, including videos in product pages.
 */
export default class TextImagesAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object}  config      The configuration to use.
     * @param {boolean} countVideos Whether videos are also included in the assessment or not.
     *
     * @returns {void}
     */
    constructor(config?: object, countVideos?: boolean);
    identifier: string;
    _config: {
        scores: {
            bad: number;
            good: number;
        };
        recommendedCount: number;
        urlTitle: string;
        urlCallToAction: string;
    } & object;
    _countVideos: boolean;
    imageCount: any;
    videoCount: any;
    /**
     * Calculate the result based on the availability of images in the text, including videos in product pages.
     *
     * @returns {Object} The calculated result.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
