if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import util from "@ohos:util";
import type common from "@ohos:app.ability.common";
import { PageState } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import { DOC_PRIVACY } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { WebDocParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'WebDocPage';
export class WebDocPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("param", (params && "param" in params) ? params.param : { title: '', docKey: DOC_PRIVACY });
        this.content = '';
        this.state = new PageState();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("param", (params && "param" in params) ? params.param : { title: '', docKey: DOC_PRIVACY });
        this.content = '';
        this.state = new PageState();
    }
    @Param
    readonly param: WebDocParam;
    @Local
    content: string;
    @Local
    state: PageState;
    aboutToAppear(): void {
        this.load();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/WebDocPage.ets(28:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: this.param.title }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/WebDocPage.ets", line: 29, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.param.title
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.param.title
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.layoutWeight(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StateView(this, {
                        status: this.state.status,
                        errorMessage: this.state.errorMessage,
                        onRetry: () => this.load(),
                        content: () => { this.docView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/WebDocPage.ets", line: 31, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.state.status,
                            errorMessage: this.state.errorMessage,
                            onRetry: () => this.load(),
                            content: () => { this.docView(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        status: this.state.status,
                        errorMessage: this.state.errorMessage
                    });
                }
            }, { name: "StateView" });
        }
        __Common__.pop();
        Column.pop();
    }
    docView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/features/user/pages/WebDocPage.ets(46:5)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.align(Alignment.Top);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.content);
            Text.debugLine("entry/src/main/ets/features/user/pages/WebDocPage.ets(47:7)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.lineHeight(24);
            Text.width('100%');
            Text.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Scroll.pop();
    }
    private load(): void {
        this.state.loading();
        try {
            const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
            const bytes: Uint8Array = context.resourceManager.getRawFileContentSync(`${this.param.docKey}.txt`);
            const decoder: util.TextDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
            this.content = decoder.decodeToString(bytes);
            this.state.success(this.content.length > 0);
        }
        catch (e) {
            Logger.e(TAG, `load doc ${this.param.docKey} failed`, e as Object);
            this.state.error('');
        }
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("param" in params) {
            this.updateParam("param", params.param);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
