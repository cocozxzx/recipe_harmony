if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { LengthMetrics } from "@ohos:arkui.node";
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import type { AiMessage } from '../../../commons/model/Ai';
import { AppNavState } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { AiMessageItem } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/components/AiMessageItem";
import { AiViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/viewmodel/AiViewModel";
export class AiPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new AiViewModel();
        this.auth = AuthService.get();
        this.nav = AppNavState.get();
        this.scroller = new Scroller();
        this.samples = [
            { "id": 16777289, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
            { "id": 16777290, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
            { "id": 16777291, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
        ];
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new AiViewModel();
        this.auth = AuthService.get();
        this.nav = AppNavState.get();
        this.resetMonitorsOnReuse();
    }
    @Local
    vm: AiViewModel;
    @Local
    auth: AuthService;
    @Local
    nav: AppNavState;
    private scroller: Scroller;
    private readonly samples: ResourceStr[];
    aboutToAppear(): void {
        this.consumePrefill();
    }
    aboutToDisappear(): void {
        this.vm.dispose();
    }
    /** 首页 AI 卡片 / 搜索空结果跳过来时会带一句预填文案，消费后立刻清空 */
    @Monitor('nav.aiPrefill')
    onPrefillChanged(): void {
        this.consumePrefill();
    }
    @Monitor('vm.messages')
    onMessagesChanged(): void {
        this.scroller.scrollEdge(Edge.Bottom);
    }
    private consumePrefill(): void {
        const text: string = this.nav.aiPrefill;
        if (text.length > 0) {
            this.vm.prefill(text);
            this.nav.aiPrefill = '';
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(58:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(59:7)", "entry");
            Row.width('100%');
            Row.height({ "id": 16777421, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777296, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(60:9)", "entry");
            Text.fontSize({ "id": 16777430, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.auth.isLogin) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.loginGuide.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.chatView.bind(this)();
                    this.inputBar.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    loginGuide(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(84:5)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(85:7)", "entry");
            Image.width(72);
            Image.height(72);
            Image.fillColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777285, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(89:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777393, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(92:7)", "entry");
            Button.type(ButtonType.Normal);
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.constraintSize({ minWidth: 160 });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => this.auth.requireLogin(() => { }));
        }, Button);
        Button.pop();
        Column.pop();
    }
    chatView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(109:5)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.layoutWeight(1);
            Scroll.align(Alignment.Top);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(110:7)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.welcome.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const message = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AiMessageItem(this, {
                                message: message,
                                onRetry: () => this.vm.retryLast(),
                                onToggleFavorite: () => this.vm.toggleGeneratedFavorite(message)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/pages/AiPage.ets", line: 113, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    message: message,
                                    onRetry: () => this.vm.retryLast(),
                                    onToggleFavorite: () => this.vm.toggleGeneratedFavorite(message)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                message: message
                            });
                        }
                    }, { name: "AiMessageItem" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.vm.messages, forEachItemGenFunction, (message: AiMessage) => message.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    welcome(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.messages.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                        Column.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(131:7)", "entry");
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777297, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(132:9)", "entry");
                        Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.lineHeight(24);
                        Text.padding({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ wrap: FlexWrap.Wrap, space: { main: LengthMetrics.vp(8), cross: LengthMetrics.vp(8) } });
                        Flex.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(141:9)", "entry");
                        Flex.width('100%');
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const sample = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(sample);
                                Text.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(143:13)", "entry");
                                Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.padding({
                                    left: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    right: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    top: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    bottom: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                                Text.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.borderRadius({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.onClick(() => this.vm.send(Strings.get(sample as Resource)));
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.samples, forEachItemGenFunction, (sample: ResourceStr, index: number) => index.toString(), false, true);
                    }, ForEach);
                    ForEach.pop();
                    Flex.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    inputBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(165:5)", "entry");
            Row.width('100%');
            Row.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.vm.input, placeholder: { "id": 16777284, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(166:7)", "entry");
            TextInput.layoutWeight(1);
            TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.enterKeyType(EnterKeyType.Send);
            TextInput.onChange((value: string) => { this.vm.input = value; });
            TextInput.onSubmit(() => this.vm.send(this.vm.input));
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.vm.streaming ? { "id": 16777294, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777293, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/ai/pages/AiPage.ets(179:7)", "entry");
            Button.type(ButtonType.Normal);
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.constraintSize({ minWidth: 80 });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor(this.vm.streaming ? { "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor(this.vm.streaming ? { "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.enabled(this.vm.streaming || this.vm.canSend);
            Button.onClick(() => {
                if (this.vm.streaming) {
                    this.vm.stop();
                }
                else {
                    this.vm.send(this.vm.input);
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
