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
    constructor(config?: any);
    identifier: string;
    _config: any;
    /**
     * Returns the maximum length.
     *
     * @returns {number} The maximum length.
     */
    getMaximumLength(): number;
    /**
     * Runs the metaDescriptionLength module, based on this returns an assessment result with score.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed} i18n The object used for translations
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
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
     * @param {number} descriptionLength The length of the metadescription.
     * @param {object} i18n The object used for translations.
     *
     * @returns {string} The translated string.
     */
    translateScore(descriptionLength: number, i18n: object): string;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
//# sourceMappingURL=MetaDescriptionLengthAssessment.d.ts.map