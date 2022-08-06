/**
 * Represents the assessment that will calculate if the width of the page title is correct.
 */
export default class PageTitleWidthAssessment extends Assessment {
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
     * Runs the pageTitleWidth module, based on this returns an assessment result with score.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed} i18n The object used for translations
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    /**
     * Returns the score for the pageTitleWidth
     *
     * @param {number} pageTitleWidth The width of the pageTitle.
     *
     * @returns {number} The calculated score.
     */
    calculateScore(pageTitleWidth: number): number;
    /**
     * Translates the pageTitleWidth score to a message the user can understand.
     *
     * @param {number} pageTitleWidth The width of the pageTitle.
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {string} The translated string.
     */
    translateScore(pageTitleWidth: number, i18n: Jed): string;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
//# sourceMappingURL=PageTitleWidthAssessment.d.ts.map