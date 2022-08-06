/**
 * Checks whether a word from the precedence exception list occurs anywhere in the sentence part before the participle.
 * If this is the case, the sentence part is not passive.
 *
 * @param {string} sentencePart The sentence part that contains the participle.
 * @param {number} participleIndex The index of the participle.
 * @param {string} language The language of the participle.
 *
 * @returns {boolean} Returns true if a word from the precedence exception list occurs anywhere in the
 * sentence part before the participle, otherwise returns false.
 */
export default function _default(sentencePart: string, participleIndex: number, language: string): boolean;
