"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const key_enum_1 = require("../../key.enum");
const libnut_keyboard_action_class_1 = __importDefault(require("./libnut-keyboard-action.class"));
jest.mock("@nut-tree/libnut");
beforeEach(() => {
    jest.resetAllMocks();
});
describe("libnut keyboard action", () => {
    describe("click", () => {
        it("should forward the keyTap call to libnut for a known key", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.click(key_enum_1.Key.A);
            // THEN
            expect(libnut.keyTap).toBeCalledTimes(1);
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            libnut.keyTap = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            expect(SUT.click(key_enum_1.Key.A)).rejects.toThrowError("Test error");
        });
        it("should not forward the keyTap call to libnut for an unknown key", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.click(key_enum_1.Key.Add);
            // THEN
            expect(libnut.keyTap).not.toBeCalled();
        });
    });
    describe("type", () => {
        it("should forward the type call to libnut", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            const payload = "testInput";
            // WHEN
            SUT.type(payload);
            // THEN
            expect(libnut.typeString).toBeCalledTimes(1);
            expect(libnut.typeString).toBeCalledWith(payload);
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            libnut.typeString = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            expect(SUT.type("foo")).rejects.toThrowError("Test error");
        });
    });
    describe("pressKey", () => {
        it("should forward the pressKey call to libnut for a known key", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.pressKey(key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith(libnut_keyboard_action_class_1.default.keyLookup(key_enum_1.Key.A), "down", []);
        });
        it("should treat a list of keys as modifiers + the actual key to press", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.pressKey(key_enum_1.Key.LeftControl, key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle)
                .toBeCalledWith(libnut_keyboard_action_class_1.default.keyLookup(key_enum_1.Key.A), "down", [libnut_keyboard_action_class_1.default.keyLookup(key_enum_1.Key.LeftControl)]);
        });
        it("should not forward the pressKey call to libnut for an unknown key", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.pressKey(key_enum_1.Key.Add);
            // THEN
            expect(libnut.keyToggle).not.toBeCalled();
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            libnut.keyToggle = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            expect(SUT.pressKey(key_enum_1.Key.A)).rejects.toThrowError("Test error");
        });
    });
    describe("releaseKey", () => {
        it("should forward the releaseKey call to libnut for a known key", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.releaseKey(key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle).toBeCalledWith(libnut_keyboard_action_class_1.default.keyLookup(key_enum_1.Key.A), "up", []);
        });
        it("should treat a list of keys as modifiers + the actual key to release", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.releaseKey(key_enum_1.Key.LeftControl, key_enum_1.Key.A);
            // THEN
            expect(libnut.keyToggle).toBeCalledTimes(1);
            expect(libnut.keyToggle)
                .toBeCalledWith(libnut_keyboard_action_class_1.default.keyLookup(key_enum_1.Key.A), "up", [libnut_keyboard_action_class_1.default.keyLookup(key_enum_1.Key.LeftControl)]);
        });
        it("should not forward the releaseKey call to libnut for an unknown key", () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            // WHEN
            SUT.releaseKey(key_enum_1.Key.Add);
            // THEN
            expect(libnut.keyToggle).not.toBeCalled();
        });
        it("should reject on libnut errors", async () => {
            // GIVEN
            const SUT = new libnut_keyboard_action_class_1.default();
            libnut.keyToggle = jest.fn(() => {
                throw new Error("Test error");
            });
            // WHEN
            // THEN
            expect(SUT.releaseKey(key_enum_1.Key.A)).rejects.toThrowError("Test error");
        });
    });
});
//# sourceMappingURL=libnut-keyboard.action.class.spec.js.map