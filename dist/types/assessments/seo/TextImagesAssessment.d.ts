/**
 * Represents the assessment that will look if the images have alt-tags and checks if the keyword is present in one of them.
 */
export default class TextImagesAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object} config The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: object);
    identifier: string;
    _config: any;
    /**
     * Execute the Assessment and return a result.
     *
     * @param {Paper} paper The Paper object to assess.
     * @param {Researcher} researcher The Researcher object containing all available researches.
     * @param {Jed} i18n The locale object.
     *
     * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    imageCount: any;
    altProperties: any;
    _minNumberOfKeywordMatches: number;
    _maxNumberOfKeywordMatches: number;
    /**
     * Checks whether there are too few alt tags with keywords. This check is applicable when there are
     * 5 or more images.
     *
     * @returns {boolean} Returns true if there are at least 5 images and the number of alt tags
     * with keywords is under the specified recommended minimum.
     */
    hasTooFewMatches(): boolean;
    /**
     * Checks whether there is a sufficient number of alt tags with keywords. There are different recommended
     * ranges for less than 5 keywords, exactly 5 keywords, and more than 5 keywords.
     *
     * @returns {boolean} Returns true if the number of alt tags with keywords is within the recommended range.
     */
    hasGoodNumberOfMatches(): boolean;
    /**
     * Checks whether there is a sufficient number of alt tags with keywords. This check is applicable when there are
     * 5 or more images.
     *
     * @returns {boolean} Returns true if there are at least 5 images and the number of alt tags with keywords
     * is within the recommended range.
     */
    hasTooManyMatches(): boolean;
    /**
     * Calculate the result based on the current image count and current image alt-tag count.
     *
     * @param {Object} i18n The object used for translations.
     *
     * @returns {Object} The calculated result.
     */
    calculateResult(i18n: Object): Object;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
