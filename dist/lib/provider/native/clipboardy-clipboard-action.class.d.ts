import { ClipboardActionProvider } from "./clipboard-action-provider.interface";
export default class implements ClipboardActionProvider {
    constructor();
    hasText(): Promise<boolean>;
    clear(): Promise<boolean>;
    copy(text: string): Promise<void>;
    paste(): Promise<string>;
}
//# sourceMappingURL=clipboardy-clipboard-action.class.d.ts.map