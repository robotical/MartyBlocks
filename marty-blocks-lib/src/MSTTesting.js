/**
 * @fileoverview
 * Interface for testing Mart Blocks in MST
 */

window.addEventListener("error", function (event) {
      mv2Interface.sendFeedbackToServer("MartyBlocks error occurred:", event.error);
});

window.addEventListener("unhandledrejection", function (event) {
    mv2Interface.sendFeedbackToServer("MartyBlocks unhandled promise rejection occurred: " + event.reason);
  console.error();
});

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
