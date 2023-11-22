const assess = require("@robotical/automatic-assessments/lib").assess;
const assessBadHabits = require("@robotical/automatic-assessments/lib").assessBadHabits;
const CodeAssessLib = require("@robotical/code-assess-lib").default;

class CodeAssess {
    constructor() {
        this.assess = assess;
        this.codeAssessLib = new CodeAssessLib();
        this.assessBadHabits = assessBadHabits;
    }
}

module.exports = CodeAssess;