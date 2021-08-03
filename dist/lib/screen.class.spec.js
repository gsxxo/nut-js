"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const vision_adapter_class_1 = require("./adapter/vision.adapter.class");
const image_class_1 = require("./image.class");
const locationparameters_class_1 = require("./locationparameters.class");
const match_request_class_1 = require("./match-request.class");
const match_result_class_1 = require("./match-result.class");
const region_class_1 = require("./region.class");
const screen_class_1 = require("./screen.class");
const sneer_1 = require("sneer");
const file_type_enum_1 = require("./file-type.enum");
jest.mock("./adapter/native.adapter.class");
jest.mock("./adapter/vision.adapter.class");
const searchRegion = new region_class_1.Region(0, 0, 1000, 1000);
beforeAll(() => {
    vision_adapter_class_1.VisionAdapter.prototype.grabScreen = jest.fn(() => {
        return Promise.resolve(new image_class_1.Image(searchRegion.width, searchRegion.height, new ArrayBuffer(0), 3));
    });
    vision_adapter_class_1.VisionAdapter.prototype.screenSize = jest.fn(() => {
        return Promise.resolve(searchRegion);
    });
});
describe("Screen.", () => {
    describe("find", () => {
        it("should resolve with sufficient confidence.", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            // WHEN
            const resultRegion = SUT.find(imagePath);
            // THEN
            await expect(resultRegion).resolves.toEqual(matchResult.location);
            const matchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), path_1.join(process_1.cwd(), imagePath), searchRegion, SUT.config.confidence, true);
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
        });
        it("should call registered hook before resolve", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const imagePath = "test/path/to/image.png";
            SUT.on(imagePath, testCallback);
            // WHEN
            await SUT.find(imagePath);
            // THEN
            expect(testCallback).toBeCalledTimes(1);
            expect(testCallback).toBeCalledWith(matchResult);
        });
        it("should call multiple registered hooks before resolve", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const testCallback = jest.fn(() => Promise.resolve());
            const secondCallback = jest.fn(() => Promise.resolve());
            const imagePath = "test/path/to/image.png";
            SUT.on(imagePath, testCallback);
            SUT.on(imagePath, secondCallback);
            // WHEN
            await SUT.find(imagePath);
            // THEN
            for (const callback of [testCallback, secondCallback]) {
                expect(callback).toBeCalledTimes(1);
                expect(callback).toBeCalledWith(matchResult);
            }
        });
        it("should reject with insufficient confidence.", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.8, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            // WHEN
            const resultRegion = SUT.find(imagePath);
            // THEN
            await expect(resultRegion)
                .rejects
                .toEqual(`No match for ${imagePath}. Required: ${SUT.config.confidence}, given: ${matchResult.confidence}`);
        });
        it("should reject when search fails.", async () => {
            // GIVEN
            const rejectionReason = "Search failed.";
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.reject(rejectionReason);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            // WHEN
            const resultRegion = SUT.find(imagePath);
            // THEN
            await expect(resultRegion)
                .rejects
                .toEqual(`Searching for ${imagePath} failed. Reason: '${rejectionReason}'`);
        });
        it("should override default confidence value with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const matchResult = new match_result_class_1.MatchResult(minMatch, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new locationparameters_class_1.LocationParameters(undefined, minMatch);
            // WHEN
            const resultRegion = SUT.find(imagePath, parameters);
            // THEN
            await expect(resultRegion).resolves.toEqual(matchResult.location);
            const matchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), path_1.join(process_1.cwd(), imagePath), searchRegion, minMatch, true);
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(matchRequest);
        });
        it("should override default search region with parameter.", async () => {
            // GIVEN
            const customSearchRegion = new region_class_1.Region(10, 10, 90, 90);
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new locationparameters_class_1.LocationParameters(customSearchRegion);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), path_1.join(process_1.cwd(), imagePath), customSearchRegion, SUT.config.confidence, true);
            // WHEN
            await SUT.find(imagePath, parameters);
            // THEN
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should override searchMultipleScales with parameter.", async () => {
            // GIVEN
            const matchResult = new match_result_class_1.MatchResult(0.99, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new locationparameters_class_1.LocationParameters(searchRegion, undefined, false);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), path_1.join(process_1.cwd(), imagePath), searchRegion, SUT.config.confidence, false);
            // WHEN
            await SUT.find(imagePath, parameters);
            // THEN
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should override both confidence and search region with parameter.", async () => {
            // GIVEN
            const minMatch = 0.8;
            const customSearchRegion = new region_class_1.Region(10, 10, 90, 90);
            const matchResult = new match_result_class_1.MatchResult(minMatch, searchRegion);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imagePath = "test/path/to/image.png";
            const parameters = new locationparameters_class_1.LocationParameters(customSearchRegion, minMatch);
            const expectedMatchRequest = new match_request_class_1.MatchRequest(expect.any(image_class_1.Image), path_1.join(process_1.cwd(), imagePath), customSearchRegion, minMatch, true);
            // WHEN
            await SUT.find(imagePath, parameters);
            // THEN
            expect(visionAdapterMock.findOnScreenRegion).toHaveBeenCalledWith(expectedMatchRequest);
        });
        it("should add search region offset to result image location", async () => {
            // GIVEN
            const limitedSearchRegion = new region_class_1.Region(100, 200, 300, 400);
            const resultRegion = new region_class_1.Region(50, 100, 150, 200);
            const matchResult = new match_result_class_1.MatchResult(0.99, resultRegion);
            const expectedMatchRegion = new region_class_1.Region(limitedSearchRegion.left + resultRegion.left, limitedSearchRegion.top + resultRegion.top, resultRegion.width, resultRegion.height);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            const SUT = new screen_class_1.Screen(new vision_adapter_class_1.VisionAdapter());
            // WHEN
            const matchRegion = await SUT.find("test/path/to/image.png", {
                searchRegion: limitedSearchRegion
            });
            // THEN
            expect(matchRegion).toEqual(expectedMatchRegion);
        });
        it.each([
            ["with negative x coordinate", new region_class_1.Region(-1, 0, 100, 100)],
            ["with negative y coordinate", new region_class_1.Region(0, -1, 100, 100)],
            ["with negative width", new region_class_1.Region(0, 0, -100, 100)],
            ["with negative height", new region_class_1.Region(0, 0, 100, -100)],
            ["with region outside screen on x axis", new region_class_1.Region(1100, 0, 100, 100)],
            ["with region outside screen on y axis", new region_class_1.Region(0, 1100, 100, 100)],
            ["with region bigger than screen on x axis", new region_class_1.Region(0, 0, 1100, 100)],
            ["with region bigger than screen on y axis", new region_class_1.Region(0, 0, 1000, 1100)],
            ["with region of 1 px width", new region_class_1.Region(0, 0, 1, 1100)],
            ["with region of 1 px height", new region_class_1.Region(0, 0, 100, 1)],
            ["with region leaving screen on x axis", new region_class_1.Region(600, 0, 500, 100)],
            ["with region leaving screen on y axis", new region_class_1.Region(0, 500, 100, 600)],
            ["with NaN x coordinate", new region_class_1.Region("a", 0, 100, 100)],
            ["with NaN y coordinate", new region_class_1.Region(0, "a", 100, 600)],
            ["with NaN on width", new region_class_1.Region(0, 0, "a", 100)],
            ["with NaN on height", new region_class_1.Region(0, 0, 100, "a")],
        ])("should reject search regions %s", async (_, region) => {
            // GIVEN
            const imagePath = "test/path/to/image.png";
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const matchResult = new match_result_class_1.MatchResult(0.99, region);
            vision_adapter_class_1.VisionAdapter.prototype.findOnScreenRegion = jest.fn(() => {
                return Promise.resolve(matchResult);
            });
            // WHEN
            const findPromise = SUT.find(imagePath, {
                searchRegion: region
            });
            // THEN
            await expect(findPromise).rejects.toContain(`Searching for ${imagePath} failed. Reason:`);
        });
    });
    it("should return region to highlight for chaining", async () => {
        // GIVEN
        const highlightRegion = new region_class_1.Region(10, 20, 30, 40);
        vision_adapter_class_1.VisionAdapter.prototype.highlightScreenRegion = jest.fn();
        const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapterMock);
        // WHEN
        const result = await SUT.highlight(highlightRegion);
        // THEN
        expect(result).toEqual(highlightRegion);
    });
    it("should handle Promises and return region to highlight for chaining", async () => {
        // GIVEN
        const highlightRegion = new region_class_1.Region(10, 20, 30, 40);
        const highlightRegionPromise = new Promise(res => res(highlightRegion));
        vision_adapter_class_1.VisionAdapter.prototype.highlightScreenRegion = jest.fn();
        const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapterMock);
        // WHEN
        const result = await SUT.highlight(highlightRegionPromise);
        // THEN
        expect(result).toEqual(highlightRegion);
    });
    describe("capture", () => {
        it("should capture the whole screen and save image", async () => {
            // GIVEN
            const screenshot = sneer_1.mockPartial({ data: "pretty pretty image" });
            vision_adapter_class_1.VisionAdapter.prototype.grabScreen = jest.fn(() => Promise.resolve(screenshot));
            vision_adapter_class_1.VisionAdapter.prototype.saveImage = jest.fn();
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imageName = "foobar.png";
            const expectedImagePath = path_1.join(process_1.cwd(), imageName);
            // WHEN
            const imagePath = await SUT.capture(imageName);
            // THEN
            expect(imagePath).toBe(expectedImagePath);
            expect(vision_adapter_class_1.VisionAdapter.prototype.grabScreen).toHaveBeenCalled();
            expect(vision_adapter_class_1.VisionAdapter.prototype.saveImage).toHaveBeenCalledWith(screenshot, expectedImagePath);
        });
        it("should consider output configuration", async () => {
            // GIVEN
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imageName = "foobar";
            const filePath = "/path/to/file";
            const prefix = "answer_";
            const postfix = "_42";
            const expectedImagePath = path_1.join(filePath, `${prefix}${imageName}${postfix}${file_type_enum_1.FileType.JPG.toString()}`);
            // WHEN
            const imagePath = await SUT.capture(imageName, file_type_enum_1.FileType.JPG, filePath, prefix, postfix);
            // THEN
            expect(imagePath).toBe(expectedImagePath);
        });
    });
    describe("captureRegion", () => {
        it("should capture the specified region of the screen and save image", async () => {
            // GIVEN
            const screenshot = sneer_1.mockPartial({ data: "pretty partial image" });
            const regionToCapture = sneer_1.mockPartial({ top: 42, left: 9, height: 10, width: 3.14159265359 });
            vision_adapter_class_1.VisionAdapter.prototype.grabScreenRegion = jest.fn(() => Promise.resolve(screenshot));
            vision_adapter_class_1.VisionAdapter.prototype.saveImage = jest.fn();
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imageName = "foobar.png";
            const expectedImagePath = path_1.join(process_1.cwd(), imageName);
            // WHEN
            const imagePath = await SUT.captureRegion(imageName, regionToCapture);
            // THEN
            expect(imagePath).toBe(expectedImagePath);
            expect(vision_adapter_class_1.VisionAdapter.prototype.grabScreenRegion).toHaveBeenCalledWith(regionToCapture);
            expect(vision_adapter_class_1.VisionAdapter.prototype.saveImage).toHaveBeenCalledWith(screenshot, expectedImagePath);
        });
        it("should consider output configuration", async () => {
            // GIVEN
            const regionToCapture = sneer_1.mockPartial({ top: 42, left: 9, height: 10, width: 3.14159265359 });
            const visionAdapterMock = new vision_adapter_class_1.VisionAdapter();
            const SUT = new screen_class_1.Screen(visionAdapterMock);
            const imageName = "foobar";
            const filePath = "/path/to/file";
            const prefix = "answer_";
            const postfix = "_42";
            const expectedImagePath = path_1.join(filePath, `${prefix}${imageName}${postfix}${file_type_enum_1.FileType.JPG.toString()}`);
            // WHEN
            const imagePath = await SUT.captureRegion(imageName, regionToCapture, file_type_enum_1.FileType.JPG, filePath, prefix, postfix);
            // THEN
            expect(imagePath).toBe(expectedImagePath);
        });
    });
});
//# sourceMappingURL=screen.class.spec.js.map