export default SubheadingsDistributionTooLong;
/**
 * Represents the assessment for calculating the text after each subheading.
 */
declare class SubheadingsDistributionTooLong extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} config The configuration to use.
     * @returns {void}
     */
    constructor(config?: any);
    identifier: string;
    _config: any;
    /**
     * Runs the getSubheadingTextLength research and checks scores based on length.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Object} i18n The object used for translations.
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: any): AssessmentResult;
    _subheadingTextsLength: any;
    _tooLongTextsNumber: any;
    _hasSubheadings: boolean;
    _textLength: number;
    /**
     * Checks whether the paper has subheadings.
     *
     * @param {Paper} paper The paper to use for the assessment.
     *
     * @returns {boolean} True when there is at least one subheading.
     */
    hasSubheadings(paper: Paper): boolean;
    /**
     * Counts the number of subheading texts that are too long.
     *
     * @returns {number} The number of subheading texts that are too long.
     */
    getTooLongSubheadingTexts(): number;
    /**
     * Calculates the score and creates a feedback string based on the subheading texts length.
     *
     * @param {Object} i18n The object used for translations.
     *
     * @returns {Object} The calculated result.
     */
    calculateResult(i18n: any): any;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
//# sourceMappingURL=subheadingDistributionTooLongAssessment.d.ts.map