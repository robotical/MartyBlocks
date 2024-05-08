/**
 * CodeAssess API
 */

const CodeAssessLib = require("@robotical/code-assess-lib");
const AssessmentLib = require("@robotical/automatic-assessments/lib");

class CodeAssess {

    constructor() {
        this.codeAssessLib = CodeAssessLib;
        this.assessmentLib = AssessmentLib;
    }


}


module.exports = CodeAssess;
