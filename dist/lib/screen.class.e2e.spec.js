"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const vision_adapter_class_1 = require("./adapter/vision.adapter.class");
const file_type_enum_1 = require("./file-type.enum");
const screen_class_1 = require("./screen.class");
const sleep_function_1 = require("./sleep.function");
const node_abort_controller_1 = __importDefault(require("node-abort-controller"));
describe("Screen.", () => {
    it("should capture the screen", () => {
        // GIVEN
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        // WHEN
        SUT.capture("asdf", file_type_enum_1.FileType.PNG).then(filename => {
            // THEN
            expect(filename).not.toBeNull();
            sleep_function_1.sleep(1000).then(() => {
                expect(fs_1.existsSync(filename)).toBeTruthy();
            });
        });
    });
    it("should capture the screen and save to JPG", () => {
        // GIVEN
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        // WHEN
        SUT.capture("asdf", file_type_enum_1.FileType.JPG).then(filename => {
            // THEN
            expect(filename).not.toBeNull();
            sleep_function_1.sleep(1000).then(() => {
                expect(fs_1.existsSync(filename)).toBeTruthy();
            });
        });
    });
    it("should capture the screen and save file with prefix", () => {
        // GIVEN
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        const prefix = "foo_";
        // WHEN
        SUT.capture("asdf", file_type_enum_1.FileType.JPG, "./", prefix).then(filename => {
            // THEN
            expect(filename.includes(prefix)).toBeTruthy();
            expect(filename).not.toBeNull();
            sleep_function_1.sleep(1000).then(() => {
                expect(fs_1.existsSync(filename)).toBeTruthy();
            });
        });
    });
    it("should capture the screen and save file with postfix", () => {
        // GIVEN
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        const postfix = "_bar";
        // WHEN
        SUT.capture("asdf", file_type_enum_1.FileType.JPG, "./", "", postfix).then(filename => {
            // THEN
            expect(filename.includes(postfix)).toBeTruthy();
            expect(filename).not.toBeNull();
            sleep_function_1.sleep(1000).then(() => {
                expect(fs_1.existsSync(filename)).toBeTruthy();
            });
        });
    });
    it("should capture the screen and save file with pre- and postfix", () => {
        // GIVEN
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        const filename = "asdf";
        const prefix = "foo_";
        const postfix = "_bar";
        // WHEN
        SUT.capture("asdf", file_type_enum_1.FileType.JPG, "./", prefix, postfix).then(output => {
            // THEN
            expect(output.includes(`${prefix}${filename}${postfix}`)).toBeTruthy();
            expect(output).not.toBeNull();
            sleep_function_1.sleep(1000).then(() => {
                expect(fs_1.existsSync(output)).toBeTruthy();
            });
        });
    });
    it("should reject after timeout", async () => {
        // GIVEN
        jest.setTimeout(10000);
        const timeout = 5000;
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        SUT.config.resourceDirectory = "./e2e/assets";
        // WHEN
        const start = Date.now();
        try {
            await SUT.waitFor("calculator.png", timeout);
        }
        catch (e) {
            // THEN
            expect(e).toBe(`Action timed out after ${timeout} ms`);
        }
        const end = Date.now();
        // THEN
        expect(end - start).toBeGreaterThanOrEqual(timeout);
    });
    it("should abort via signal", (done) => {
        // GIVEN
        jest.setTimeout(10000);
        const timeout = 5000;
        const abortAfterMs = 1000;
        const controller = new node_abort_controller_1.default();
        const signal = controller.signal;
        const visionAdapter = new vision_adapter_class_1.VisionAdapter();
        const SUT = new screen_class_1.Screen(visionAdapter);
        SUT.config.resourceDirectory = "./e2e/assets";
        // WHEN
        const start = Date.now();
        SUT.waitFor("calculator.png", timeout, { abort: signal }).catch(e => {
            const end = Date.now();
            // THEN
            expect(e).toBe(`Action aborted by signal`);
            expect(end - start).toBeGreaterThanOrEqual(abortAfterMs);
            expect(end - start).toBeLessThan(timeout);
            done();
        });
        setTimeout(() => controller.abort(), abortAfterMs);
    });
});
//# sourceMappingURL=screen.class.e2e.spec.js.map