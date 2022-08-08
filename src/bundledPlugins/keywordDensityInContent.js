import Assessment from "../assessment.js";
import AssessmentResult from "../values/AssessmentResult.js";

class KeywordDensityInContent extends Assessment {
    constructor(config = {}) {
        super();

        // const defaultConfig = {
        //     scores: {
        //         textContainsSuperfluousH1: 1,
        //     },
        //     urlTitle: createAnchorOpeningTag("https://yoa.st/3a6"),
        //     urlCallToAction: createAnchorOpeningTag("https://yoa.st/3a7"),
        // };

        this.identifier = "keywordDensityInContent";
        // this._config = merge(defaultConfig, config);
    }
    /**
     * 
     * @param {import ("../values/Paper.js").default} paper
     * @returns 
     */
    isApplicable(paper) {
        return paper.hasKeyword();
    };
    /**
     * 
     * @param {import ("../values/Paper.js").default} paper 
     * @param {import ("../researcher").default} researcher 
     * @param {import ("jed").Jed} i18n
     * @returns 
     */
    getResult(paper, researcher, i18n) {
        const result = new AssessmentResult();
        const _keywordCount = researcher.getResearch("keywordCount");
        const wordCount = researcher.getResearch("wordCountInText");
        console.log("keywordDensityInContent", _keywordCount, wordCount, paper);
        result.setScore(9);
        result.setText("Excellent");
        return result;
    }
}

export default KeywordDensityInContent;