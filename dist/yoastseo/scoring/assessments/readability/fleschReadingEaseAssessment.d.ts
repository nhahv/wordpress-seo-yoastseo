declare namespace _default {
    export const identifier: string;
    export { getFleschReadingResult as getResult };
    export { isApplicable };
}
export default _default;
/**
 * The assessment that runs the FleschReading on the paper.
 *
 * @param {Paper}       paper       The paper to run this assessment on.
 * @param {Researcher}  researcher  The researcher used for the assessment.
 *
 * @returns {Object} An assessmentResult with the score and formatted text.
 */
declare function getFleschReadingResult(paper: any, researcher: any): Object;
/**
 * Checks if Flesch reading analysis is available.
 *
 * @param {Paper}       paper       The paper to check.
 * @param {Researcher}  researcher  The researcher object.
 *
 * @returns {boolean} Returns true if the assessment is available and paper not empty.
 */
declare function isApplicable(paper: any, researcher: any): boolean;
