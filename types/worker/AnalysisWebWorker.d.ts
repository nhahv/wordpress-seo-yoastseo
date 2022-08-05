/**
 * Analysis Web Worker.
 *
 * Worker API:     https://developer.mozilla.org/en-US/docs/Web/API/Worker
 * Webpack loader: https://github.com/webpack-contrib/worker-loader
 */
export default class AnalysisWebWorker {
    /**
     * Checks which assessors should update giving a configuration.
     *
     * @param {Object}   configuration          The configuration to check.
     * @param {Assessor} [contentAssessor=null] The content assessor.
     * @param {Assessor} [seoAssessor=null]     The SEO assessor.
     *
     * @returns {Object} Containing seo and readability with true or false.
     */
    static shouldAssessorsUpdate(configuration: Object, contentAssessor?: any, seoAssessor?: any): Object;
    /**
     * Initializes the AnalysisWebWorker class.
     *
     * @param {Object}      scope       The scope for the messaging. Expected to have the
     *                                  `onmessage` event and the `postMessage` function.
     * @param {Researcher}  researcher  The researcher to use.
     */
    constructor(scope: Object, researcher: any);
    _scope: Object;
    _configuration: {
        contentAnalysisActive: boolean;
        keywordAnalysisActive: boolean;
        useCornerstone: boolean;
        useTaxonomy: boolean;
        useKeywordDistribution: boolean;
        locale: string;
        customAnalysisType: string;
    };
    _scheduler: Scheduler;
    _paper: Object | null;
    _relatedKeywords: {};
    _researcher: any;
    _contentAssessor: any;
    _seoAssessor: any;
    _relatedKeywordAssessor: any;
    _results: {
        readability: {
            results: never[];
            score: number;
        };
        seo: {
            '': {
                results: never[];
                score: number;
            };
        };
    };
    _registeredAssessments: any[];
    _registeredMessageHandlers: {};
    _registeredParsers: any[];
    /**
     * Assesses the SEO of a paper and tree combination on the given related keyphrases and their synonyms.
     *
     * The old assessor as well as the new tree assessor are used and their results are combined.
     *
     * @param {Paper}                 paper           The paper to analyze.
     * @param {module:parsedPaper/structure} tree            The tree to analyze.
     * @param {Object}                relatedKeywords The related keyphrases to use in the analysis.
     *
     * @returns {Promise<[{results: {score: number, results: AssessmentResult[]}, key: string}]>} The results, one for each keyphrase.
     */
    assessRelatedKeywords(paper: Paper, tree: any, relatedKeywords: Object): Promise<[{
        results: {
            score: number;
            results: AssessmentResult[];
        };
        key: string;
    }]>;
    /**
     * Register an assessment for a specific plugin.
     *
     * @param {string}   name       The name of the assessment.
     * @param {function} assessment The function to run as an assessment.
     * @param {string}   pluginName The name of the plugin associated with the assessment.
     *
     * @returns {boolean} Whether registering the assessment was successful.
     */
    registerAssessment(name: string, assessment: Function, pluginName: string): boolean;
    /**
     * Register a message handler for a specific plugin.
     *
     * @param {string}   name       The name of the message handler.
     * @param {function} handler    The function to run as an message handler.
     * @param {string}   pluginName The name of the plugin associated with the message handler.
     *
     * @returns {boolean} Whether registering the message handler was successful.
     */
    registerMessageHandler(name: string, handler: Function, pluginName: string): boolean;
    /**
     * Refreshes an assessment in the analysis.
     *
     * Custom assessments can use this to mark their assessment as needing a
     * refresh.
     *
     * @param {string} name The name of the assessment.
     * @param {string} pluginName The name of the plugin associated with the assessment.
     *
     * @returns {boolean} Whether refreshing the assessment was successful.
     */
    refreshAssessment(name: string, pluginName: string): boolean;
    /**
     * Sets a custom content assessor class.
     *
     * @param {Class}  ContentAssessorClass     A content assessor class.
     * @param {string} customAnalysisType       The type of analysis.
     * @param {Object} customAssessorOptions    The options to use.
     *
     * @returns {void}
     */
    setCustomContentAssessorClass(ContentAssessorClass: any, customAnalysisType: string, customAssessorOptions: Object): void;
    /**
     * Sets a custom cornerstone content assessor class.
     *
     * @param {Class}  CornerstoneContentAssessorClass  A cornerstone content assessor class.
     * @param {string} customAnalysisType               The type of analysis.
     * @param {Object} customAssessorOptions            The options to use.
     *
     * @returns {void}
     */
    setCustomCornerstoneContentAssessorClass(CornerstoneContentAssessorClass: any, customAnalysisType: string, customAssessorOptions: Object): void;
    /**
     * Sets a custom SEO assessor class.
     *
     * @param {Class}   SEOAssessorClass         An SEO assessor class.
     * @param {string}  customAnalysisType       The type of analysis.
     * @param {Object}  customAssessorOptions    The options to use.
     *
     * @returns {void}
     */
    setCustomSEOAssessorClass(SEOAssessorClass: any, customAnalysisType: string, customAssessorOptions: Object): void;
    /**
     * Sets a custom cornerstone SEO assessor class.
     *
     * @param {Class}   CornerstoneSEOAssessorClass  A cornerstone SEO assessor class.
     * @param {string}  customAnalysisType           The type of analysis.
     * @param {Object}  customAssessorOptions        The options to use.
     *
     * @returns {void}
     */
    setCustomCornerstoneSEOAssessorClass(CornerstoneSEOAssessorClass: any, customAnalysisType: string, customAssessorOptions: Object): void;
    /**
     * Sets a custom related keyword assessor class.
     *
     * @param {Class}   RelatedKeywordAssessorClass A related keyword assessor class.
     * @param {string}  customAnalysisType          The type of analysis.
     * @param {Object}  customAssessorOptions       The options to use.
     *
     * @returns {void}
     */
    setCustomRelatedKeywordAssessorClass(RelatedKeywordAssessorClass: any, customAnalysisType: string, customAssessorOptions: Object): void;
    /**
     * Sets a custom cornerstone related keyword assessor class.
     *
     * @param {Class}   CornerstoneRelatedKeywordAssessorClass  A cornerstone related keyword assessor class.
     * @param {string}  customAnalysisType                      The type of analysis.
     * @param {Object}  customAssessorOptions                   The options to use.
     *
     * @returns {void}
     */
    setCustomCornerstoneRelatedKeywordAssessorClass(CornerstoneRelatedKeywordAssessorClass: any, customAnalysisType: string, customAssessorOptions: Object): void;
    /**
     * Receives the post message and determines the action.
     *
     * See: https://developer.mozilla.org/en-US/docs/Web/API/Worker/onmessage
     *
     * @param {MessageEvent} event              The post message event.
     * @param {Object}       event.data         The data object.
     * @param {string}       event.data.type    The action type.
     * @param {string}       event.data.id      The request id.
     * @param {string}       event.data.payload The payload of the action.
     *
     * @returns {void}
     */
    handleMessage({ data: { type, id, payload } }: MessageEvent): void;
    analyzeRelatedKeywords: Function;
    /**
     * Runs analyses on a paper.
     *
     * The paper includes the keyword and synonyms data. However, this is
     * possibly just one instance of these. From here we are going to split up
     * this data and keep track of the different sets of keyword-synonyms and
     * their results.
     *
     * @param {number} id                        The request id.
     * @param {Object} payload                   The payload object.
     * @param {Object} payload.paper             The paper to analyze.
     * @param {Object} [payload.relatedKeywords] The related keywords.
     *
     * @returns {Object} The result, may not contain readability or seo.
     */
    analyze(id: number, { paper, relatedKeywords }: {
        paper: Object;
        relatedKeywords: Object;
    }): Object;
    /**
     * Runs the specified research in the worker. Optionally pass a paper.
     *
     * @param {number} id     The request id.
     * @param {string} name   The name of the research to run.
     * @param {Paper} [paper] The paper to run the research on if it shouldn't
     *                        be run on the latest paper.
     *
     * @returns {Object} The result of the research.
     */
    runResearch(id: number, { name, paper }: string): Object;
    /**
     * Binds actions to this scope.
     *
     * @returns {void}
     */
    bindActions(): void;
    /**
     * Sends the analyze result back.
     *
     * @param {number} id     The request id.
     * @param {Object} result The result.
     *
     * @returns {void}
     */
    analyzeDone(id: number, result: Object): void;
    /**
     * Sends the analyze related keywords result back.
     *
     * @param {number} id     The request id.
     * @param {Object} result The result.
     *
     * @returns {void}
     */
    analyzeRelatedKeywordsDone(id: number, result: Object): void;
    /**
     * Loads a new script from an external source.
     *
     * @param {number} id  The request id.
     * @param {string} url The url of the script to load;
     *
     * @returns {Object} An object containing whether or not the url was loaded, the url and possibly an error message.
     */
    loadScript(id: number, { url }: string): Object;
    /**
     * Sends the load script result back.
     *
     * @param {number} id     The request id.
     * @param {Object} result The result.
     *
     * @returns {void}
     */
    loadScriptDone(id: number, result: Object): void;
    /**
     * Handle a custom message using the registered handler.
     *
     * @param {number} id   The request id.
     * @param {string} name The name of the message.
     * @param {Object} data The data of the message.
     *
     * @returns {Object} An object containing either success and data or an error.
     */
    customMessage(id: number, { name, data }: string): Object;
    /**
     * Send the result of a custom message back.
     *
     * @param {number} id     The request id.
     * @param {Object} result The result.
     *
     * @returns {void}
     */
    customMessageDone(id: number, result: Object): void;
    /**
     * Clears the worker cache to force a new analysis.
     *
     * @returns {void}
     */
    clearCache(): void;
    /**
     * Send the result of a custom message back.
     *
     * @param {number} id     The request id.
     * @param {Object} result The result.
     *
     * @returns {void}
     */
    runResearchDone(id: number, result: Object): void;
    /**
     * Sets up the web worker for running the tree readability and SEO analysis.
     *
     * @returns {void}
     */
    setupTreeAnalysis(): void;
    _treeResearcher: any;
    _contentTreeAssessor: any;
    _seoTreeAssessor: any;
    _relatedKeywordTreeAssessor: any;
    _CustomSEOAssessorClasses: {} | undefined;
    _CustomCornerstoneSEOAssessorClasses: {} | undefined;
    _CustomContentAssessorClasses: {} | undefined;
    _CustomCornerstoneContentAssessorClasses: {} | undefined;
    _CustomRelatedKeywordAssessorClasses: {} | undefined;
    _CustomCornerstoneRelatedKeywordAssessorClasses: {} | undefined;
    _CustomSEOAssessorOptions: {} | undefined;
    _CustomCornerstoneSEOAssessorOptions: {} | undefined;
    _CustomContentAssessorOptions: {} | undefined;
    _CustomCornerstoneContentAssessorOptions: {} | undefined;
    _CustomRelatedKeywordAssessorOptions: {} | undefined;
    _CustomCornerstoneRelatedKeywordAssessorOptions: {} | undefined;
    _registeredTreeAssessments: any[] | undefined;
    _seoScoreAggregator: SEOScoreAggregator | undefined;
    _contentScoreAggregator: ReadabilityScoreAggregator | undefined;
    _tree: any;
    _treeBuilder: any;
    /**
     * Registers this web worker with the scope passed to it's constructor.
     *
     * @returns {void}
     */
    register(): void;
    /**
     * Initializes the appropriate content assessor.
     *
     * @returns {null|Assessor} The chosen content assessor.
     */
    createContentAssessor(): null | any;
    /**
     * Initializes the appropriate SEO assessor.
     *
     * @returns {null|Assessor} The chosen SEO assessor.
     */
    createSEOAssessor(): null | any;
    /**
     * Initializes the appropriate SEO assessor for related keywords.
     *
     * @returns {null|Assessor} The chosen related keywords assessor.
     */
    createRelatedKeywordsAssessor(): null | any;
    /**
     * Creates an SEO assessor for a tree, based on the given combination of cornerstone, taxonomy and related keyphrase flags.
     *
     * @param {Object}  assessorConfig                    The assessor configuration.
     * @param {boolean} [assessorConfig.relatedKeyphrase] If this assessor is for a related keyphrase, instead of the main one.
     * @param {boolean} [assessorConfig.taxonomy]         If this assessor is for a taxonomy page, instead of a regular page.
     * @param {boolean} [assessorConfig.cornerstone]      If this assessor is for cornerstone content.
     *
     * @returns {module:parsedPaper/assess.TreeAssessor} The created tree assessor.
     */
    /**
     * Sends a message.
     *
     * @param {string} type      The message type.
     * @param {number} id        The request id.
     * @param {Object} [payload] The payload to deliver.
     *
     * @returns {void}
     */
    send(type: string, id: number, payload?: Object | undefined): void;
    /**
     * Configures the analysis worker.
     *
     * @param {number}   id                                     The request id.
     * @param {Object}   configuration                          The configuration object.
     * @param {boolean}  [configuration.contentAnalysisActive]  Whether the content analysis is active.
     * @param {boolean}  [configuration.keywordAnalysisActive]  Whether the keyword analysis is active.
     * @param {boolean}  [configuration.useCornerstone]         Whether the paper is cornerstone or not.
     * @param {boolean}  [configuration.useTaxonomy]            Whether the taxonomy assessor should be used.
     * @param {boolean}  [configuration.useKeywordDistribution] Whether the keyphraseDistribution assessment should run.
     * @param {string}   [configuration.locale]                 The locale used in the seo assessor.
     * @param {Object}   [configuration.translations]           The translation strings.
     * @param {Object}   [configuration.researchData]           Extra research data.
     * @param {Object}   [configuration.defaultQueryParams]     The default query params for the Shortlinker.
     * @param {string}   [configuration.logLevel]               Log level, see: https://github.com/pimterry/loglevel#documentation
     * @param {string[]} [configuration.enabledFeatures]        A list of feature name flags of the experimental features to enable.
     *
     * @returns {void}
     */
    initialize(id: number, configuration: {
        contentAnalysisActive: boolean;
        keywordAnalysisActive: boolean;
        useCornerstone: boolean;
        useTaxonomy: boolean;
        useKeywordDistribution: boolean;
        locale: string;
        translations: Object;
        researchData: Object;
        defaultQueryParams: Object;
        logLevel: string;
        enabledFeatures: string[];
    }): void;
    /**
     * Register a parser that parses a formatted text
     * to a structured tree representation that can be further analyzed.
     *
     * @param {Object}   parser                              The parser to register.
     * @param {function(Paper): boolean} parser.isApplicable A method that checks whether this parser is applicable for a paper.
     * @param {function(Paper): module:parsedPaper/structure.Node } parser.parse A method that parses a paper to a structured tree representation.
     *
     * @returns {void}
     */
    registerParser(parser: {
        isApplicable: (arg0: Paper) => boolean;
    }): void;
    /**
     * Changes the locale in the configuration.
     *
     * If the locale is different:
     * - Update the configuration locale.
     * - Create the content assessor.
     *
     * @param {string} locale The locale to set.
     *
     * @returns {void}
     */
    setLocale(locale: string): void;
    /**
     * Checks if the paper contains changes that are used for readability.
     *
     * @param {Paper} paper The paper to check against the cached paper.
     *
     * @returns {boolean} True if there are changes detected.
     */
    shouldReadabilityUpdate(paper: Paper): boolean;
    /**
     * Checks if the related keyword contains changes that are used for seo.
     *
     * @param {string} key                     The identifier of the related keyword.
     * @param {Object} relatedKeyword          The related keyword object.
     * @param {string} relatedKeyword.keyword  The keyword.
     * @param {string} relatedKeyword.synonyms The synonyms.
     *
     * @returns {boolean} True if there are changes detected.
     */
    shouldSeoUpdate(key: string, { keyword, synonyms }: {
        keyword: string;
        synonyms: string;
    }): boolean;
    /**
     * Assesses a given paper and tree combination
     * using an original Assessor (that works on a string representation of the text)
     * and a new Tree Assessor (that works on a tree representation).
     *
     * The results of both analyses are combined using the given score aggregator.
     *
     * @param {Paper}                      paper The paper to analyze.
     * @param {module:parsedPaper/structure.Node} tree  The tree to analyze.
     *
     * @param {Object}                             analysisCombination                 Which assessors and score aggregator to use.
     * @param {Assessor}                           analysisCombination.oldAssessor     The original assessor.
     * @param {module:parsedPaper/assess.TreeAssessor}    analysisCombination.treeAssessor    The new assessor.
     * @param {module:parsedPaper/assess.ScoreAggregator} analysisCombination.scoreAggregator The score aggregator to use.
     *
     * @returns {Promise<{score: number, results: AssessmentResult[]}>} The analysis results.
     */
    assess(paper: Paper, tree: any, analysisCombination: {
        oldAssessor: any;
        treeAssessor: any;
        scoreAggregator: any;
    }): Promise<{
        score: number;
        results: AssessmentResult[];
    }>;
    /**
     * Generates an error message ("grey bullet") for the given assessment.
     *
     * @param {module:parsedPaper/assess.Assessment} assessment The assessment to generate an error message for.
     *
     * @returns {AssessmentResult} The generated assessment result.
     */
    generateAssessmentError(assessment: any): AssessmentResult;
}
import Scheduler from "./scheduler";
import Paper from "../values/Paper";
import AssessmentResult from "../values/AssessmentResult";
import { SEOScoreAggregator } from "../parsedPaper/assess/scoreAggregators";
import { ReadabilityScoreAggregator } from "../parsedPaper/assess/scoreAggregators";
