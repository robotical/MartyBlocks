const assess = require("automatic-assessments/lib").assess;
const CodeAssessLib = require("@robotical/code-assess-lib").default;

class CodeAssess {
    constructor() {
        this.assess = assess;
        this.codeAssessLib = new CodeAssessLib();
    }
}

module.exports = CodeAssess;