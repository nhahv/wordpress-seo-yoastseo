export default relatedKeywordAssessor;
/**
 * Creates the Assessor
 *
 * @param {object}  researcher      The researcher to use for the analysis.
 * @param {Object}  options         The options for this assessor.
 * @param {Object}  options.marker  The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class relatedKeywordAssessor extends Assessor {
    constructor(researcher: any, options: any);
}
import Assessor from "./assessor.js";
