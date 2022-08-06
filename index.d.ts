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

import * as assessments from "./types/scoring/assessments";
import * as bundledPlugins from "./types/bundledPlugins";
import * as config from "./types/config";
import * as helpers from "./types/helpers";
import * as markers from "./types/markers";
import * as string from "./types/stringProcessing";
import * as interpreters from "./types/scoring/interpreters";

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
