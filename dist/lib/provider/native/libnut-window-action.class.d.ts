import { Region } from "../../region.class";
import { WindowActionProvider } from "./window-action-provider.interface";
export default class WindowAction implements WindowActionProvider {
    getWindows(): Promise<number[]>;
    getActiveWindow(): Promise<number>;
    getWindowRegion(windowHandle: number): Promise<Region>;
    getWindowTitle(windowHandle: number): Promise<string>;
}
//# sourceMappingURL=libnut-window-action.class.d.ts.map