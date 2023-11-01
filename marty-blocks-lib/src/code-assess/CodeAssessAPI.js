/**
 * This file contains the API calls to the Googleapis.
 */
const CodeAssessConnectionAPI = require("./CodeAssessConnectionAPI").CodeAssessConnectionAPI;
const CodeAssessClassroomAPI = require("./CodeAssessClassroomAPI").CodeAssessClassroomAPI;

class CodeAssessAPI {
    constructor(codeAssess) {
        this.connectionAPI = new CodeAssessConnectionAPI(this);
        this.classroomAPI = new CodeAssessClassroomAPI(this);
        this.codeAssess = codeAssess;
    }

   
}

module.exports = {
    CodeAssessAPI: CodeAssessAPI
}