"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_class_1 = require("../image.class");
const match_request_class_1 = require("../match-request.class");
const libnut_screen_action_class_1 = __importDefault(require("../provider/native/libnut-screen-action.class"));
const template_matching_finder_class_1 = __importDefault(require("../provider/opencv/template-matching-finder.class"));
const region_class_1 = require("../region.class");
const vision_adapter_class_1 = require("./vision.adapter.class");
jest.mock("../provider/opencv/template-matching-finder.class");
jest.mock("../provider/native/libnut-screen-action.class");
describe("VisionAdapter class", () => {
    it("should delegate calls to grabScreen", () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const screenMock = new libnut_screen_action_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock, screenMock);
        // WHEN
        SUT.grabScreen();
        // THEN
        expect(screenMock.grabScreen).toBeCalledTimes(1);
    });
    it("should delegate calls to grabScreenRegion", async () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const screenMock = new libnut_screen_action_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock, screenMock);
        const screenRegion = new region_class_1.Region(0, 0, 100, 100);
        // WHEN
        await SUT.grabScreenRegion(screenRegion);
        // THEN
        expect(screenMock.grabScreenRegion).toBeCalledTimes(1);
        expect(screenMock.grabScreenRegion).toBeCalledWith(screenRegion);
    });
    it("should delegate calls to highlightScreenRegion", async () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const screenMock = new libnut_screen_action_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock, screenMock);
        const screenRegion = new region_class_1.Region(0, 0, 100, 100);
        const opacity = 0.25;
        const duration = 1;
        // WHEN
        await SUT.highlightScreenRegion(screenRegion, duration, opacity);
        // THEN
        expect(screenMock.highlightScreenRegion).toBeCalledTimes(1);
        expect(screenMock.highlightScreenRegion).toBeCalledWith(screenRegion, duration, opacity);
    });
    it("should delegate calls to screenWidth", async () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const screenMock = new libnut_screen_action_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock, screenMock);
        // WHEN
        await SUT.screenWidth();
        // THEN
        expect(screenMock.screenWidth).toBeCalledTimes(1);
    });
    it("should delegate calls to screenHeight", async () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const screenMock = new libnut_screen_action_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock, screenMock);
        // WHEN
        await SUT.screenHeight();
        // THEN
        expect(screenMock.screenHeight).toBeCalledTimes(1);
    });
    it("should delegate calls to screenSize", async () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const screenMock = new libnut_screen_action_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock, screenMock);
        // WHEN
        await SUT.screenSize();
        // THEN
        expect(screenMock.screenSize).toBeCalledTimes(1);
    });
    it("should delegate calls to findImage", async () => {
        // GIVEN
        const finderMock = new template_matching_finder_class_1.default();
        const SUT = new vision_adapter_class_1.VisionAdapter(finderMock);
        const request = new match_request_class_1.MatchRequest(new image_class_1.Image(100, 100, new ArrayBuffer(0), 3), "foo", new region_class_1.Region(0, 0, 100, 100), 0.99, true);
        // WHEN
        await SUT.findOnScreenRegion(request);
        expect(finderMock.findMatch).toBeCalledTimes(1);
        expect(finderMock.findMatch).toBeCalledWith(request);
    });
});
//# sourceMappingURL=vision.adapter.class.spec.js.map