export default Assessment;
/**
 * Represents the defaults of an assessment.
 */
declare class Assessment {
    /**
     * Executes the assessment and return its result.
     *
     * @param {Paper} paper The paper to run this assessment on.
     * @param {Researcher} researcher The researcher used for the assessment.
     * @param {object} i18n The i18n-object used for parsing translations.
     *
     * @returns {AssessmentResult} The result of the assessment.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: object): AssessmentResult;
    /**
     * Checks whether the assessment is applicable
     *
     * @param {Paper} paper The paper to use for the assessment.
     *
     * @returns {boolean} True.
     */
    isApplicable(paper: Paper): boolean;
}
//# sourceMappingURL=assessment.d.ts.map