/**
 * All HTML element tags that we treat as formatting / phrasing content.
 * @type {string[]}
 * @const
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
 *
 * @memberOf module:parsedPaper/builder
 */
export const formattingElements: string[];
/**
 * All tags of the HTML element types that are ignored in our analysis.
 * @type {string[]}
 * @const
 *
 * @memberOf module:parsedPaper/builder
 */
export const ignoredHtmlElements: string[];
/**
 * All HTML heading element tags, from `h1` to `h6`.
 * @type {string[]}
 * @const
 *
 * @memberOf module:parsedPaper/builder
 */
export const headings: string[];
