/**
 * Default attributes to be used by the Paper if they are left undefined.
 * @type {{keyword: string, synonyms: string, description: string, title: string, url: string}}
 */
declare var defaultAttributes: {
    /** keyword the fuck keyword */
    keyword: string;
    synonyms: string;
    description: string;
    title: string;
    titleWidth: number;
    url: string;
    locale: string;
    permalink: string;
    date: string;
};
export declare type PaperAttributes = typeof defaultAttributes;
declare type SerializedPaper = {
    _parseClass: 'Paper';
    text: string;
} & PaperAttributes;
/**
 * Construct the Paper object and set the keyword property.
 *
 * @param {string} text                     The text to use in the analysis.
 * @param {object} [attributes]             The object containing all attributes.
 * @param {string} [attributes.keyword]     The main keyword.
 * @param {string} [attributes.synonyms]    The main keyword's synonyms.
 * @param {string} [attributes.title]       The SEO title.
 * @param {string} [attributes.description] The SEO description.
 * @param {number} [attributes.titleWidth]  The width of the title in pixels.
 * @param {string} [attributes.url]         The slug.
 * @param {string} [attributes.permalink]   The base url + slug.
 * @param {string} [attributes.locale]      The locale.
 * @param {Object} [attributes.wpBlocks]    The text, encoded in WordPress block editor blocks.
 * @param {string} [attributes.date]        The date.
 * @constructor
 */
declare class Paper {
    _text: string;
    _attributes: PaperAttributes;
    constructor(text: string, attributes: PaperAttributes);
    /**
     * Check whether a keyword is available.
     * @returns {boolean} Returns true if the Paper has a keyword.
     */
    hasKeyword(): boolean;
    /**
     * Return the associated keyword or an empty string if no keyword is available.
     * @returns {string} Returns Keyword
     */
    getKeyword(): string;
    /**
     * Check whether synonyms is available.
     * @returns {boolean} Returns true if the Paper has synonyms.
     */
    hasSynonyms(): boolean;
    /**
     * Return the associated synonyms or an empty string if no synonyms is available.
     * @returns {string} Returns synonyms.
     */
    getSynonyms(): string;
    /**
     * Check whether the text is available.
     * @returns {boolean} Returns true if the paper has a text.
     */
    hasText(): boolean;
    /**
     * Return the associated text or am empty string if no text is available.
     * @returns {string} Returns text
     */
    getText(): string;
    /**
     * Check whether a description is available.
     * @returns {boolean} Returns true if the paper has a description.
     */
    hasDescription(): boolean;
    /**
     * Return the description or an empty string if no description is available.
     * @returns {string} Returns the description.
     */
    getDescription(): string;
    /**
     * Check whether an title is available
     * @returns {boolean} Returns true if the Paper has a title.
     */
    hasTitle(): boolean;
    /**
     * Return the title, or an empty string of no title is available.
     * @returns {string} Returns the title
     */
    getTitle(): string;
    /**
     * Check whether an title width in pixels is available
     * @returns {boolean} Returns true if the Paper has a title.
     */
    hasTitleWidth(): boolean;
    /**
     * Return the title width in pixels, or an empty string of no title width in pixels is available.
     * @returns {string} Returns the title
     */
    getTitleWidth(): number;
    /**
     * Check whether an url is available
     * @returns {boolean} Returns true if the Paper has an Url.
     */
    hasUrl(): boolean;
    /**
     * Return the url, or an empty string of no url is available.
     * @returns {string} Returns the url
     */
    getUrl(): string;
    /**
     * Check whether a locale is available
     * @returns {boolean} Returns true if the paper has a locale
     */
    hasLocale(): boolean;
    /**
     * Return the locale or an empty string if no locale is available
     * @returns {string} Returns the locale
     */
    getLocale(): string;
    /**
     * Check whether a permalink is available
     * @returns {boolean} Returns true if the Paper has a permalink.
     */
    hasPermalink(): boolean;
    /**
     * Return the permalink, or an empty string if no permalink is available.
     * @returns {string} Returns the permalink.
     */
    getPermalink(): string;
    /**
     * Check whether a date is available.
     * @returns {boolean} Returns true if the Paper has a date.
     */
    hasDate(): boolean;
    /**
     * Returns the date, or an empty string if no date is available.
     * @returns {string} Returns the date.
     */
    getDate(): string;
    serialize(): SerializedPaper;
    /**
     * Checks whether the given paper has the same properties as this instance.
     *
     * @param {Paper} paper The paper to compare to.
     *
     * @returns {boolean} Whether the given paper is identical or not.
     */
    equals(paper: Paper): boolean;
    /**
     * Parses the object to a Paper.
     *
     * @param {Object} serialized The serialized object.
     *
     * @returns {Paper} The parsed Paper.
     */
    static parse(serialized: SerializedPaper): Paper;
}
export default Paper;
