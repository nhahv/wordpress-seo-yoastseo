/**
 * The researches contains all the researches
 */
export default class AbstractResearcher {
    /**
     * Constructor
     * @param {Paper} paper The Paper object that is needed within the researches.
     *
     * @constructor
     */
    constructor(paper: any);
    paper: any;
    defaultResearches: {
        altTagCount: typeof altTagCount;
        countSentencesFromText: typeof countSentencesFromText;
        findKeywordInFirstParagraph: typeof findKeywordInFirstParagraph;
        findKeywordInPageTitle: (paper: Object, researcher: any) => Object;
        findList: typeof findList;
        findTransitionWords: typeof findTransitionWords;
        functionWordsInKeyphrase: typeof functionWordsInKeyphrase;
        getFleschReadingScore: typeof getFleschReadingScore;
        getKeywordDensity: typeof getKeywordDensity;
        getLinks: typeof getLinks;
        getLinkStatistics: (paper: any, researcher: any) => object;
        getParagraphLength: typeof getParagraphLength;
        getProminentWordsForInsights: typeof getProminentWordsForInsights;
        getProminentWordsForInternalLinking: typeof getProminentWordsForInternalLinking;
        getSentenceBeginnings: typeof getSentenceBeginnings;
        getSubheadingTextLengths: typeof getSubheadingTextLengths;
        h1s: typeof h1s;
        imageCount: typeof imageCount;
        keyphraseDistribution: (paper: any, researcher: any) => Object;
        keyphraseLength: typeof keyphraseLength;
        keywordCount: typeof keywordCount;
        keywordCountInUrl: typeof keywordCountInUrl;
        matchKeywordInSubheadings: typeof matchKeywordInSubheadings;
        metaDescriptionKeyword: typeof metaDescriptionKeyword;
        metaDescriptionLength: typeof metaDescriptionLength;
        morphology: typeof morphology;
        pageTitleWidth: typeof pageTitleWidth;
        readingTime: typeof readingTime;
        sentences: typeof sentences;
        wordCountInText: typeof wordCountInText;
        videoCount: typeof videoCount;
        getPassiveVoiceResult: typeof getPassiveVoiceResult;
    };
    _data: {};
    customResearches: {};
    helpers: {};
    config: {};
    /**
     * Set the Paper associated with the Researcher.
     *
     * @param {Paper} paper The Paper to use within the Researcher.
     *
     * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
     *
     * @returns {void}
     */
    setPaper(paper: any): void;
    /**
     * Add a custom research that will be available within the Researcher.
     *
     * @param {string}   name     A name to reference the research by.
     * @param {function} research The function to be added to the Researcher.
     *
     * @throws {MissingArgument}  Research name cannot be empty.
     * @throws {InvalidTypeError} The research requires a valid Function callback.
     *
     * @returns {void}
     */
    addResearch(name: string, research: Function): void;
    /**
     * Check whether or not the research is known by the Researcher.
     *
     * @param {string} name The name to reference the research by.
     *
     * @returns {boolean} Whether or not the research is known by the Researcher.
     */
    hasResearch(name: string): boolean;
    /**
     * Return all available researches.
     *
     * @returns {Object} An object containing all available researches.
     */
    getAvailableResearches(): Object;
    /**
     * Return the Research by name.
     *
     * @param {string} name The name to reference the research by.
     *
     * @returns {*} Returns the result of the research or false if research does not exist.
     *
     * @throws {MissingArgument} Research name cannot be empty.
     */
    getResearch(name: string): any;
    /**
     * Add research data to the researcher by the research name.
     *
     * @param {string} research The identifier of the research.
     * @param {Object} data     The data object.
     *
     * @returns {void}.
     */
    addResearchData(research: string, data: Object): void;
    /**
     * Return the research data from a research data provider by research name.
     *
     * @param {string} research The identifier of the research.
     *
     * @returns {*} The data provided by the provider, false if the data do not exist
     */
    getData(research: string): any;
    /**
     * Return language specific configuration by configuration name.
     *
     * @param {string} name The name of the configuration.
     *
     * @returns {*} The configuration, false if the configuration does not exist.
     */
    getConfig(name: string): any;
    /**
     * Return language specific helper by helper name.
     *
     * @param {string} name The name of the helper.
     *
     * @returns {*} The helper, false if the helper does not exist.
     */
    getHelper(name: string): any;
}
import altTagCount from "./researches/altTagCount";
import countSentencesFromText from "./researches/countSentencesFromText";
import findKeywordInFirstParagraph from "./researches/findKeywordInFirstParagraph";
import findList from "./researches/findList";
import findTransitionWords from "./researches/findTransitionWords";
import functionWordsInKeyphrase from "./researches/functionWordsInKeyphrase";
import getFleschReadingScore from "./researches/getFleschReadingScore";
import getKeywordDensity from "./researches/getKeywordDensity";
import getLinks from "./researches/getLinks";
import getParagraphLength from "./researches/getParagraphLength";
import getProminentWordsForInsights from "./researches/getProminentWordsForInsights";
import getProminentWordsForInternalLinking from "./researches/getProminentWordsForInternalLinking";
import getSentenceBeginnings from "./researches/getSentenceBeginnings";
import getSubheadingTextLengths from "./researches/getSubheadingTextLengths";
import h1s from "./researches/h1s";
import imageCount from "./researches/imageCount";
import keyphraseLength from "./researches/keyphraseLength";
import keywordCount from "./researches/keywordCount";
import keywordCountInUrl from "./researches/keywordCountInUrl";
import matchKeywordInSubheadings from "./researches/matchKeywordInSubheadings";
import metaDescriptionKeyword from "./researches/metaDescriptionKeyword";
import metaDescriptionLength from "./researches/metaDescriptionLength";
import morphology from "./researches/getWordForms";
import pageTitleWidth from "./researches/pageTitleWidth";
import readingTime from "./researches/readingTime";
import sentences from "./researches/sentences";
import wordCountInText from "./researches/wordCountInText";
import videoCount from "./researches/videoCount";
import getPassiveVoiceResult from "./researches/getPassiveVoiceResult";
