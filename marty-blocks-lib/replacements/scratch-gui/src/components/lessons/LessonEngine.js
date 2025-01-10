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
        // expectedCodeCondition eg: ["block1=>block2"] meaning block1 should be followed by block2 (next block)
        // actual blocks: {blocktype: "block1", next?: {blocktype: "block2", next?: {blocktype: "block3", next?: null}}}
        const actualBlocksObj = window.workspace.getTopBlocks();
        const actualBlocksThatArentShadow = Object.values(actualBlocksObj).filter(block => !block.isShadow_);
        if (Object.keys(actualBlocksThatArentShadow).length === 0) {
            return false;
        }
        const actualBlocks = Object.values(actualBlocksThatArentShadow);
        const compilations = [];
        for (const actualBlock of actualBlocks) {
            let actualBlocksCompiledCondition = "";
            let currentBlock = actualBlock;
            while (currentBlock) {
                actualBlocksCompiledCondition += `${currentBlock.type}`;
                let childBlocks = Object.values(currentBlock.childBlocks_);
                childBlocks = childBlocks.filter(block => !block.isShadow_);
                if (childBlocks.length > 0) {
                    actualBlocksCompiledCondition += "=>";
                }
                currentBlock = childBlocks[0];
            }
            compilations.push(actualBlocksCompiledCondition);
        }
        console.log(compilations);
        return compilations.includes(expectedCodeCondition);
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