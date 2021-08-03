"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboardy_clipboard_action_class_1 = __importDefault(require("./clipboardy-clipboard-action.class"));
beforeEach(() => {
    jest.resetAllMocks();
});
describe("clipboardy action", () => {
    describe("copy", () => {
        it("should resolve", async (done) => {
            // GIVEN
            const SUT = new clipboardy_clipboard_action_class_1.default();
            const testText = "test";
            // WHEN
            // THEN
            await SUT.copy(testText);
            done();
        });
    });
    describe("hasText", () => {
        it("should return true when text has been copied", async (done) => {
            // GIVEN
            const SUT = new clipboardy_clipboard_action_class_1.default();
            const testText = "test";
            // WHEN
            await SUT.copy(testText);
            // THEN
            await expect(SUT.hasText()).resolves.toBeTruthy();
            done();
        });
    });
});
//# sourceMappingURL=clipboardy-clipboard-action.class.spec.js.map