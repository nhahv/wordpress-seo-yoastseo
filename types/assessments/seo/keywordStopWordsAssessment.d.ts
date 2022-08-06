declare namespace _default {
    export const identifier: string;
    export { keywordHasStopWordsAssessment as getResult };
    export { isApplicable };
}
export default _default;
/**
 * Execute the Assessment and return a result.
 *
 * @param {Paper} paper The Paper object to assess.
 * @param {Researcher} researcher The Researcher object containing all available researches.
 * @param {Jed} i18n The locale object.
 *
 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
 */
declare function keywordHasStopWordsAssessment(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
/**
 * Checks if the keyword stopwords assessment is applicable to the paper.
 *
 * @param {Object} paper The paper to check.
 *
 * @returns {boolean} Returns true if the language is available and the paper has a keyword.
 */
declare function isApplicable(paper: Object): boolean;
import AssessmentResult from "../../values/AssessmentResult";
