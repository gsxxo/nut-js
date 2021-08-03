"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cv = __importStar(require("opencv4nodejs-prebuilt"));
const path = __importStar(require("path"));
const region_class_1 = require("../../region.class");
const scaled_match_result_class_1 = require("../../scaled-match-result.class");
const determine_searchregion_function_1 = require("./determine-searchregion.function");
const image_reader_class_1 = require("./image-reader.class");
const match_image_function_1 = require("./match-image.function");
const scale_image_function_1 = require("./scale-image.function");
const scale_location_function_1 = require("./scale-location.function");
const image_processor_class_1 = require("./image-processor.class");
async function loadNeedle(image) {
    if (image.hasAlphaChannel) {
        return image_processor_class_1.fromImageWithAlphaChannel(image);
    }
    return image_processor_class_1.fromImageWithoutAlphaChannel(image);
}
async function loadHaystack(matchRequest) {
    const searchRegion = determine_searchregion_function_1.determineScaledSearchRegion(matchRequest);
    if (matchRequest.haystack.hasAlphaChannel) {
        return image_processor_class_1.fromImageWithAlphaChannel(matchRequest.haystack, searchRegion);
    }
    else {
        return image_processor_class_1.fromImageWithoutAlphaChannel(matchRequest.haystack, searchRegion);
    }
}
function debugImage(image, filename, suffix) {
    const parsedPath = path.parse(filename);
    let fullFilename = parsedPath.name;
    if (suffix) {
        fullFilename = fullFilename + "_" + suffix;
    }
    fullFilename += parsedPath.ext;
    const fullPath = path.join(parsedPath.dir, fullFilename);
    cv.imwriteAsync(fullPath, image);
}
// function debugResult(image: cv.Mat, result: MatchResult, filename: string, suffix?: string) {
//   const roiRect = new cv.Rect(
//     Math.min(Math.max(result.location.left, 0), image.cols),
//     Math.min(Math.max(result.location.top, 0), image.rows),
//     Math.min(result.location.width, image.cols - result.location.left),
//     Math.min(result.location.height, image.rows - result.location.top));
//   debugImage(image.getRegion(roiRect), filename, suffix);
// }
function isValidSearch(needle, haystack) {
    return (needle.cols <= haystack.cols) && (needle.rows <= haystack.rows);
}
function createResultForInvalidSearch(currentScale) {
    return new scaled_match_result_class_1.ScaledMatchResult(0, currentScale, new region_class_1.Region(0, 0, 0, 0), new Error("The provided image sample is larger than the provided search region"));
}
class TemplateMatchingFinder {
    constructor(source = new image_reader_class_1.ImageReader()) {
        this.source = source;
        this.initialScale = [1.0];
        this.scaleSteps = [0.9, 0.8, 0.7, 0.6, 0.5];
    }
    async findMatches(matchRequest, debug = false) {
        let needle;
        try {
            const needleInput = await this.source.load(matchRequest.pathToNeedle);
            needle = await loadNeedle(needleInput);
        }
        catch (e) {
            throw new Error(`Failed to load ${matchRequest.pathToNeedle}. Reason: '${e}'.`);
        }
        if (!needle || needle.empty) {
            throw new Error(`Failed to load ${matchRequest.pathToNeedle}, got empty image.`);
        }
        const haystack = await loadHaystack(matchRequest);
        if (debug) {
            debugImage(needle, "input_needle.png");
            debugImage(haystack, "input_haystack.png");
        }
        const matchResults = this.initialScale.map(async (currentScale) => {
            if (!isValidSearch(needle, haystack)) {
                return createResultForInvalidSearch(currentScale);
            }
            const matchResult = await match_image_function_1.matchImages(haystack, needle);
            return new scaled_match_result_class_1.ScaledMatchResult(matchResult.confidence, currentScale, matchResult.location);
        });
        if (matchRequest.searchMultipleScales) {
            matchResults.push(...this.searchMultipleScales(needle, haystack));
        }
        return Promise.all(matchResults).then(results => {
            results.forEach(matchResult => {
                matchResult.location.left /= matchRequest.haystack.pixelDensity.scaleX;
                matchResult.location.width /= matchRequest.haystack.pixelDensity.scaleX;
                matchResult.location.top /= matchRequest.haystack.pixelDensity.scaleY;
                matchResult.location.height /= matchRequest.haystack.pixelDensity.scaleY;
            });
            return results.sort((first, second) => second.confidence - first.confidence);
        });
    }
    async findMatch(matchRequest, debug = false) {
        const matches = await this.findMatches(matchRequest, debug);
        const potentialMatches = matches
            .filter(match => match.confidence >= matchRequest.confidence);
        if (potentialMatches.length === 0) {
            matches.sort((a, b) => a.confidence - b.confidence);
            const bestMatch = matches.pop();
            if (bestMatch) {
                if (bestMatch.error) {
                    throw bestMatch.error;
                }
                else {
                    throw new Error(`No match with required confidence ${matchRequest.confidence}. Best match: ${bestMatch.confidence} at ${bestMatch.location}`);
                }
            }
            else {
                throw new Error(`Unable to locate ${matchRequest.pathToNeedle}, no match!`);
            }
        }
        return potentialMatches[0];
    }
    searchMultipleScales(needle, haystack) {
        const scaledNeedleResult = this.scaleSteps.map(async (currentScale) => {
            const scaledNeedle = await scale_image_function_1.scaleImage(needle, currentScale);
            if (!isValidSearch(scaledNeedle, haystack)) {
                return createResultForInvalidSearch(currentScale);
            }
            const matchResult = await match_image_function_1.matchImages(haystack, scaledNeedle);
            return new scaled_match_result_class_1.ScaledMatchResult(matchResult.confidence, currentScale, matchResult.location);
        });
        const scaledHaystackResult = this.scaleSteps.map(async (currentScale) => {
            const scaledHaystack = await scale_image_function_1.scaleImage(haystack, currentScale);
            if (!isValidSearch(needle, scaledHaystack)) {
                return createResultForInvalidSearch(currentScale);
            }
            const matchResult = await match_image_function_1.matchImages(scaledHaystack, needle);
            return new scaled_match_result_class_1.ScaledMatchResult(matchResult.confidence, currentScale, scale_location_function_1.scaleLocation(matchResult.location, currentScale));
        });
        return [...scaledHaystackResult, ...scaledNeedleResult];
    }
}
exports.default = TemplateMatchingFinder;
//# sourceMappingURL=template-matching-finder.class.js.map