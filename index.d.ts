import helpers from './types/helpers';
import AbstractResearcher from './types/languageProcessing/AbstractResearcher';
import ContentAssessor from './types/scoring/contentAssessor';
import { scoreToRating } from './types/scoring/interpreters';
import SEOAssessor from './types/scoring/seoAssessor';
import Paper, { PaperAttributes } from './types/values/Paper';
import { AnalysisWorkerWrapper, createWorker, AnalysisWebWorker } from "./types/worker";
export {
    AnalysisWebWorker,
    AnalysisWorkerWrapper,
    createWorker,
    Paper,
    ContentAssessor,
    SEOAssessor,
    AbstractResearcher,
    helpers,
    scoreToRating,
    createWorker,
    PaperAttributes
};
