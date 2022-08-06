import App from "./types/app.d"
import Assessor from './types/scoring/assessor';
import ContentAssessor from './types/scoring/contentAssessor';
import SeoAssessor from './types/scoring/seoAssessor';
import TaxonomyAssessor from './types/scoring/taxonomyAssessor'
import Pluggable from "./types/pluggable";
import Researcher from "./types/languageProcessing/languages/_default/Researcher";
import SnippetPreview from "./types/snippetPreview/snippetPreview"
import Paper from './types/values/Paper';
import AssessmentResult from "./types/values/AssessmentResult";
import Assessment from "./types/scoring/assessments/assessment";

import { AnalysisWorkerWrapper, createWorker, AnalysisWebWorker } from "./types/worker";


import bundledPlugins 


import helpers from './types/helpers';
import AbstractResearcher from './types/languageProcessing/AbstractResearcher';


export {
    App,
    Assessor,
    ContentAssessor,
    SeoAssessor,
    TaxonomyAssessor,
    Pluggable,
    Researcher,
    SnippetPreview,

    Paper,
    AssessmentResult,
    Assessment,

    AnalysisWebWorker,
    AnalysisWorkerWrapper,
    createWorker,

    assessments,
    bundledPlugins,
    config,
    helpers,
    markers,
    string,
    interpreters,
};


export default {
    App,
    Assessor,
    ContentAssessor,
    TaxonomyAssessor,
    Pluggable,
    Researcher,
    SnippetPreview,

    Paper,
    AssessmentResult,

    AnalysisWebWorker,
    AnalysisWorkerWrapper,
    createWorker,

    assessments,
    bundledPlugins,
    config,
    helpers,
    markers,
    string,
    interpreters,
};
