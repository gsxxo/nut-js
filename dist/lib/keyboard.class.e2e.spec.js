"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
expect.extend(index_1.jestMatchers);
const run = async (cmd) => {
    await index_1.keyboard.type(index_1.Key.LeftAlt, index_1.Key.F2);
    await index_1.keyboard.type(cmd);
    await index_1.keyboard.type(index_1.Key.Enter);
};
const confirm = async () => {
    await index_1.keyboard.type(index_1.Key.Enter);
};
const close = async () => {
    await index_1.keyboard.type(index_1.Key.LeftAlt, index_1.Key.F4);
};
describe("Keyboard e2e class", () => {
    it("should open gnome calculator via keyboard.", async () => {
        // GIVEN
        jest.setTimeout(30000);
        index_1.screen.config.resourceDirectory = "./e2e/assets";
        index_1.screen.config.confidence = 0.97;
        await run("gnome-calculator");
        await confirm();
        // WHEN
        // THEN
        await expect(index_1.screen).toShow("calculator.png");
        await close();
    });
});
//# sourceMappingURL=keyboard.class.e2e.spec.js.map