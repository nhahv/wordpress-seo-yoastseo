/**
 * Calculates the keyword count, takes morphology into account. Also calculates the total characters of all the keyword forms
 * that are found in the text if the custom helper for it is available in the researcher.
 *
 * @param {object} paper        The paper containing keyword and text.
 * @param {object} researcher   The researcher.
 *
 * @returns {object} An object containing the count for the keyword occurrences, an array of all the matches,
 * markings and the keyphrase length if the custom helper for it is available in the researcher.
 */
export default function _default(paper: object, researcher: object): object;
