/**
 * This file contains the API calls to the Googleapis.
 */

class CodeAssessClassroomAPI {
    constructor(API) {
        this.API = API;
    }

    async listClassrooms() {
        try {
            const response = await fetch('https://classroom.googleapis.com/v1/courses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.API.connectionAPI.access_token}`
                }
            });
            const data = await response.json();
            console.log("List of classrooms", data);
            if (data.courses) return data.courses;
            return [];
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

module.exports = {
    CodeAssessClassroomAPI: CodeAssessClassroomAPI
}