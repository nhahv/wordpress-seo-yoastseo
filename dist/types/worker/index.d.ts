import AnalysisWebWorker from "./AnalysisWebWorker";
import AnalysisWorkerWrapper from "./AnalysisWorkerWrapper";
import createWorker from "./createWorker";
type Configuration = {
    defaultQueryParams?: any;
    enabledFeatures?: string[];
    researchData?: any;
    locale?: string;
    contentAnalysisActive?: boolean;
    keywordAnalysisActive?: boolean;
    useCornerstone?: boolean;
    useTaxonomy?: boolean;
    useKeywordDistribution?: boolean;
    logLevel?: "debug" | "info" | "warn" | "error";
    translations?: any;
    previouslyUsedKeywords: {
        postUrl: string,
        searchUrl: string,
        usedKeywords: Record<string, Array<string | number>>,
    },
}
export { AnalysisWebWorker, AnalysisWorkerWrapper, createWorker, Configuration };
