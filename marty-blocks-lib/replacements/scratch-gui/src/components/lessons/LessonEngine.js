import LessonUIHelper from "./LessonUIHelper";

export default class LessonEngine {
    static onNextStepHandler = null;

    static _handleActions(actions, onNextStep) {
        LessonUIHelper.clearUI();
        this.onNextStepHandler = onNextStep;
        if (!actions) return;
        actions.forEach(action => {
            setTimeout(() => {
                switch (action.type) {
                    case "HighlightBlocks":
                        LessonUIHelper.highlightBlocks(action.blocks);
                        break;
                    case "DragBlockToScriptArea":
                        LessonUIHelper.blockToScriptsAnimation(action.block);
                        break;
                    case "HighlightElement":
                        LessonUIHelper.highlightElement(
                            action.elementId,
                            colorToRGBA(action.hexColor, .5),
                            this._onHighlightedElementClickActionDecider(action.onClickAction, action.args)
                        );
                        break;
                    case "HighlightConnectionButtonElement":
                        const editingTargetId = vm.editingTarget.id;
                        const elementId = action.elementId.replace("{{dynamicId}}", editingTargetId);
                        LessonUIHelper.highlightElement(
                            elementId,
                            colorToRGBA(action.hexColor, .5),
                            this._onHighlightedElementClickActionDecider(action.onClickAction, action.args)
                        );
                        break;
                    case "HighlightDeviceImageElement":
                        const allTargets = vm.runtime.targets;
                        const target = allTargets.find(target => target.raftType === action.raftType);
                        const deviceImageId = action.elementId.replace("{{dynamicId}}", target.id);
                        LessonUIHelper.highlightElement(
                            deviceImageId,
                            colorToRGBA(action.hexColor, .5),
                            this._onHighlightedElementClickActionDecider(action.onClickAction, action.args)
                        );
                        break;
                    default:
                        break;
                }
            }, action.delay || 500);
        });
    }

    static _onHighlightedElementClickActionDecider(onClickAction, args) {
        switch (onClickAction) {
            case "NextStep":
                return this.onNextStepHandler;
            case "HighlightElement":
                return () => {
                    setTimeout(() => { // delay to allow UI to update in case there is a change in DOM
                        LessonUIHelper.highlightElement(
                            args.elementId,
                            colorToRGBA(args.hexColor, .5),
                            this._onHighlightedElementClickActionDecider(args.onClickAction, args.args)
                        );
                    }, 500);
                };
            case "HighlightBlocks":
                return () => {
                    setTimeout(() => {
                        LessonUIHelper.highlightBlocks(args.blocks);
                    }, 500);
                };
            default:
                break;
        }
    }

    static evaluateScriptsArea(expectedCode) {
        if (expectedCode && expectedCode.length > 0) {
            for (const expectedCodeCondition of expectedCode) {
                if (!LessonEngine._evaluateExpectedCode(expectedCodeCondition)) {
                    return false;
                }
            }
            // if we reach here, all expected code conditions are met
            // highlight the next step button
            LessonUIHelper.highlightElement("lesson-nextStep-btn", colorToRGBA("#855cd659", .5));
        }
    }

    static _evaluateExpectedCode(expectedCodeCondition) {
        // only real user blocks, no shadows/operators
        const topBlocks = window.workspace.getTopBlocks(false);

        // compile exactly one flat chain per top block
        const chains = topBlocks.map(b => this._compileOneChain(b));

        console.log(chains);
        return chains.includes(expectedCodeCondition);
    }

    static _compileOneChain(block) {
        let chain = block.type;

        // 1) Descend into the first nested “statement” input, if any
        const stmtInput = block.inputList.find(
            input =>
                input.type === 3 &&
                input.connection.targetBlock()
        );
        if (stmtInput) {
            const nested = stmtInput.connection.targetBlock();
            chain += `=>${this._compileOneChain(nested)}`;
            // once we’ve done nested to the bottom, we’ll come back out here
        }

        // 2) Then append exactly one next block
        const next = block.getNextBlock();
        if (next) {
            // chain += `=>${next.type}`;
            chain += `=>${this._compileOneChain(next)}`;
        }

        return chain;
    }

}


function colorToRGBA(color, opacity) {
    if (!color) return "";
    var val = parseInt("0x" + color.substr(1, color.length));
    return (
        "rgba(" +
        ((val >> 16) % 256) +
        "," +
        ((val >> 8) % 256) +
        "," +
        (val % 256) +
        "," +
        opacity +
        ")"
    );
}