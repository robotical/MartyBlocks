/**
 * @fileoverview
 * Interface for testing Mart Blocks in MST
 */

class MSTTesting {
    constructor() {
        this.dance = this.dance.bind(this);
    }

    dance() {
        window.vm.runtime._primitives.mv2_dance();
    }

    vanillaJS(jsCode) {
        const results = JSON.stringify(eval(jsCode));
        mv2Interface.sendFeedbackToServer(results);
    }
}

module.exports = MSTTesting;