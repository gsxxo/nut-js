"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_enum_1 = require("../button.enum");
const key_enum_1 = require("../key.enum");
const point_class_1 = require("../point.class");
const native_adapter_class_1 = require("./native.adapter.class");
const clipboardy_clipboard_action_class_1 = __importDefault(require("../provider/native/clipboardy-clipboard-action.class"));
const libnut_keyboard_action_class_1 = __importDefault(require("../provider/native/libnut-keyboard-action.class"));
const libnut_mouse_action_class_1 = __importDefault(require("../provider/native/libnut-mouse-action.class"));
const libnut_window_action_class_1 = __importDefault(require("../provider/native/libnut-window-action.class"));
jest.mock("../provider/native/clipboardy-clipboard-action.class");
jest.mock("../provider/native/libnut-mouse-action.class");
jest.mock("../provider/native/libnut-keyboard-action.class");
jest.mock("../provider/native/libnut-window-action.class");
describe("NativeAdapter class", () => {
    describe("MouseAction", () => {
        it("should delegate calls to setMouseDelay", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const delay = 5;
            // WHEN
            SUT.setMouseDelay(delay);
            // THEN
            expect(mouseMock.setMouseDelay).toBeCalledTimes(1);
            expect(mouseMock.setMouseDelay).toBeCalledWith(delay);
        });
        it("should delegate calls to setMousePosition", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const newPosition = new point_class_1.Point(10, 10);
            // WHEN
            await SUT.setMousePosition(newPosition);
            // THEN
            expect(mouseMock.setMousePosition).toBeCalledTimes(1);
            expect(mouseMock.setMousePosition).toBeCalledWith(newPosition);
        });
        it("should delegate calls to currentMousePosition", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.currentMousePosition();
            // THEN
            expect(mouseMock.currentMousePosition).toBeCalledTimes(1);
        });
        it("should delegate calls to leftClick", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.leftClick();
            // THEN
            expect(mouseMock.leftClick).toBeCalledTimes(1);
        });
        it("should delegate calls to rightClick", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.rightClick();
            // THEN
            expect(mouseMock.rightClick).toBeCalledTimes(1);
        });
        it("should delegate calls to middleClick", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.middleClick();
            // THEN
            expect(mouseMock.middleClick).toBeCalledTimes(1);
        });
        it("should delegate calls to pressButton", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const buttonToPress = button_enum_1.Button.LEFT;
            // WHEN
            await SUT.pressButton(buttonToPress);
            // THEN
            expect(mouseMock.pressButton).toBeCalledTimes(1);
            expect(mouseMock.pressButton).toBeCalledWith(buttonToPress);
        });
        it("should delegate calls to releaseButton", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const buttonToRelease = button_enum_1.Button.LEFT;
            // WHEN
            await SUT.releaseButton(buttonToRelease);
            // THEN
            expect(mouseMock.releaseButton).toBeCalledTimes(1);
            expect(mouseMock.releaseButton).toBeCalledWith(buttonToRelease);
        });
    });
    describe("KeyboardAction", () => {
        it("should delegate calls to pressKey", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const keyToPress = key_enum_1.Key.A;
            // WHEN
            await SUT.pressKey(keyToPress);
            // THEN
            expect(keyboardMock.pressKey).toBeCalledTimes(1);
            expect(keyboardMock.pressKey).toBeCalledWith(keyToPress);
        });
        it("should delegate calls to releaseButton", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const keyToRelease = key_enum_1.Key.A;
            // WHEN
            await SUT.releaseKey(keyToRelease);
            // THEN
            expect(keyboardMock.releaseKey).toBeCalledTimes(1);
            expect(keyboardMock.releaseKey).toBeCalledWith(keyToRelease);
        });
        it("should delegate calls to click", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const keyToClick = key_enum_1.Key.A;
            // WHEN
            await SUT.click(keyToClick);
            // THEN
            expect(keyboardMock.click).toBeCalledTimes(1);
            expect(keyboardMock.click).toBeCalledWith(keyToClick);
        });
        it("should delegate calls to type", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const stringToType = "testString";
            // WHEN
            await SUT.type(stringToType);
            // THEN
            expect(keyboardMock.type).toBeCalledTimes(1);
            expect(keyboardMock.type).toBeCalledWith(stringToType);
        });
    });
    describe("ClipboardAction", () => {
        it("should delegate calls to copy", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const stringToCopy = "testString";
            // WHEN
            await SUT.copy(stringToCopy);
            // THEN
            expect(clipboardMock.copy).toBeCalledTimes(1);
            expect(clipboardMock.copy).toBeCalledWith(stringToCopy);
        });
        it("should delegate calls to paste", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.paste();
            // THEN
            expect(clipboardMock.paste).toBeCalledTimes(1);
        });
    });
    describe("WindowAction", () => {
        it("should delegate calls to getActiveWindow", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.getActiveWindow();
            // THEN
            expect(windowMock.getActiveWindow).toBeCalledTimes(1);
        });
        it("should delegate calls to getWindows", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            // WHEN
            await SUT.getWindows();
            // THEN
            expect(windowMock.getWindows).toBeCalledTimes(1);
        });
        it("should delegate calls to getWindowTitle", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const windowHandle = 123;
            // WHEN
            await SUT.getWindowTitle(windowHandle);
            // THEN
            expect(windowMock.getWindowTitle).toBeCalledTimes(1);
        });
        it("should delegate calls to getWindowRegion", async () => {
            // GIVEN
            const clipboardMock = new clipboardy_clipboard_action_class_1.default();
            const keyboardMock = new libnut_keyboard_action_class_1.default();
            const mouseMock = new libnut_mouse_action_class_1.default();
            const windowMock = new libnut_window_action_class_1.default();
            const SUT = new native_adapter_class_1.NativeAdapter(clipboardMock, keyboardMock, mouseMock, windowMock);
            const windowHandle = 123;
            // WHEN
            await SUT.getWindowRegion(windowHandle);
            // THEN
            expect(windowMock.getWindowRegion).toBeCalledTimes(1);
        });
    });
});
//# sourceMappingURL=native.adapter.class.spec.js.map