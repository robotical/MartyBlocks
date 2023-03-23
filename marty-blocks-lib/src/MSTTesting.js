/**
 * @fileoverview
 * Interface for testing Mart Blocks in MST
 */

window.addEventListener("error", function (event) {
  const error = event.error;
  const errorObj = {
    message: error.message,
    name: error.name,
    stack: error.stack,
  };
  const errorString = JSON.stringify(errorObj);
  console.log("Stringified error:", errorString);
  try {
    mv2Interface.sendFeedbackToServer("Stringified error:" + errorString);
  } catch (e) {
    console.log("error sending feedback", e);
  }
});

window.addEventListener("unhandledrejection", function (event) {
  var error = event.reason;
  let msg;
  if (error && error instanceof Error) {
    var errorObj = {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
    var errorString = JSON.stringify(errorObj);
    msg = "Stringified error:" + errorString;
    console.log(msg);
  } else {
    msg = "Error object is not available or not an instance of Error.";
    console.log(msg);
  }
  try {
    mv2Interface.sendFeedbackToServer(msg);
  } catch (e) {
    console.log("error sending feedback", e);
  }
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
