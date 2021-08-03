"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const image_class_1 = require("../../image.class");
const match_request_class_1 = require("../../match-request.class");
const region_class_1 = require("../../region.class");
const image_reader_class_1 = require("./image-reader.class");
const template_matching_finder_class_1 = __importDefault(require("./template-matching-finder.class"));
describe("Template-matching finder", () => {
    it("findMatch should return a match when present in image", async () => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const SUT = new template_matching_finder_class_1.default();
        const haystackPath = path.resolve(__dirname, "./__mocks__/mouse.png");
        const needlePath = path.resolve(__dirname, "./__mocks__/needle.png");
        const haystack = await imageLoader.load(haystackPath);
        const needle = await imageLoader.load(needlePath);
        const minConfidence = 0.99;
        const searchRegion = new region_class_1.Region(0, 0, haystack.width, haystack.height);
        const matchRequest = new match_request_class_1.MatchRequest(haystack, needlePath, searchRegion, minConfidence);
        const expectedResult = new region_class_1.Region(16, 31, needle.width, needle.height);
        // WHEN
        const result = await SUT.findMatch(matchRequest);
        // THEN
        expect(result.confidence).toBeGreaterThanOrEqual(minConfidence);
        expect(result.location).toEqual(expectedResult);
    });
    it("findMatch should return a match within a search region when present in image", async () => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const SUT = new template_matching_finder_class_1.default();
        const haystackPath = path.resolve(__dirname, "./__mocks__/mouse.png");
        const needlePath = path.resolve(__dirname, "./__mocks__/needle.png");
        const haystack = await imageLoader.load(haystackPath);
        const needle = await imageLoader.load(needlePath);
        const minConfidence = 0.99;
        const searchRegion = new region_class_1.Region(10, 20, 140, 100);
        const matchRequest = new match_request_class_1.MatchRequest(haystack, needlePath, searchRegion, minConfidence);
        const expectedResult = new region_class_1.Region(6, 11, needle.width, needle.height);
        // WHEN
        const result = await SUT.findMatch(matchRequest);
        // THEN
        expect(result.confidence).toBeGreaterThanOrEqual(minConfidence);
        expect(result.location).toEqual(expectedResult);
    });
    it("findMatch should return confidence and location of best match if no match with sufficient confidence is found", async () => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const SUT = new template_matching_finder_class_1.default();
        const haystackPath = path.resolve(__dirname, "./__mocks__/downloads.png");
        const needlePath = path.resolve(__dirname, "./__mocks__/coverage.png");
        const haystack = await imageLoader.load(haystackPath);
        const minConfidence = 0.99;
        const searchRegion = new region_class_1.Region(0, 0, 320, 72);
        const matchRequest = new match_request_class_1.MatchRequest(haystack, needlePath, searchRegion, minConfidence);
        const expectedRejection = new RegExp(`^No match with required confidence ${minConfidence}. Best match: \\d.\\d* at \\(\\d*, \\d*, \\d*, \\d*\\)$`);
        // WHEN
        // THEN
        await expect(SUT.findMatch(matchRequest))
            .rejects
            .toThrowError(expectedRejection);
    });
    it("findMatch should throw on invalid image paths", async () => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const SUT = new template_matching_finder_class_1.default();
        const pathToNeedle = path.resolve(__dirname, "./__mocks__/mouse.png");
        const pathToHaystack = "./__mocks__/foo.png";
        const needle = await imageLoader.load(pathToNeedle);
        const minConfidence = 0.99;
        const searchRegion = new region_class_1.Region(0, 0, 100, 100);
        const haystack = new image_class_1.Image(needle.width, needle.height, needle.data, 3);
        const matchRequest = new match_request_class_1.MatchRequest(haystack, pathToHaystack, searchRegion, minConfidence);
        // WHEN
        const result = SUT.findMatch(matchRequest);
        // THEN
        await expect(result)
            .rejects
            .toThrowError(`Failed to load ${pathToHaystack}. Reason: 'Failed to load image from '${pathToHaystack}''.`);
    });
    it("findMatch should reject, if needle was way lager than the haystack", async () => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const SUT = new template_matching_finder_class_1.default();
        const haystackPath = path.resolve(__dirname, "./__mocks__/mouse.png");
        const needlePath = path.resolve(__dirname, "./__mocks__/fat-needle.png");
        const haystack = await imageLoader.load(haystackPath);
        const minConfidence = 0.99;
        const searchRegion = new region_class_1.Region(0, 0, haystack.width, haystack.height);
        const matchRequest = new match_request_class_1.MatchRequest(haystack, needlePath, searchRegion, minConfidence);
        const expectedRejection = new Error("The provided image sample is larger than the provided search region");
        // WHEN
        const findMatchPromise = SUT.findMatch(matchRequest);
        // THEN
        await expect(findMatchPromise).rejects.toEqual(expectedRejection);
    });
});
//# sourceMappingURL=template-matching-finder.class.spec.js.map