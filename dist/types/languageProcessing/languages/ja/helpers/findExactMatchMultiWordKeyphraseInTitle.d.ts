/**
 * Checks whether an exact match of a multiword keyphrase is at the beginning of the page title. If the title begins with function words followed by
 * the keyphrase, it is still counted as being at the beginning.
 *
 * @param {string}     title      The page title.
 * @param {string}     keyphrase    The keyphrase.
 * @param {string[]}  functionWords  The list of function words.
 *
 * @returns {Object}  Object with information about the found exact match; or an empty object if no exact match is found.
 */
export default function _default(title: string, keyphrase: string, functionWords: string[]): Object;
