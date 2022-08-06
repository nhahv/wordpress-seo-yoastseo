export function getTextLengthAssessment(): TextLengthAssessment;
export default CollectionCornerstoneSEOAssessor;
import TextLengthAssessment from "../../assessments/seo/TextLengthAssessment";
/**
 * Creates the Assessor used for collection pages.
 *
 * @param {object} researcher   The researcher used for the analysis.
 * @param {Object} options      The options for this assessor.
 * @constructor
 */
declare class CollectionCornerstoneSEOAssessor extends Assessor {
    constructor(researcher: any, options: any);
}
import Assessor from "../../assessor";
