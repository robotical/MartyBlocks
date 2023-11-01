const assess = require("automatic-assessments/lib").assess;
const CodeAssessObservable = require("./CodeAssessObservable").CodeAssessObservable;
const CodeAssessObserver = require("./CodeAssessObservable").CodeAssessObserver;
const CodeAssessAPI = require("./CodeAssessAPI").CodeAssessAPI;

class TypesOfPublishedEvents {}
TypesOfPublishedEvents.STUDENT_OR_TEACHER_CHANGED = "studentOrTeacherChanged";
TypesOfPublishedEvents.IS_USER_LOGGED_IN_CHANGED = "isUserLoggedInChanged";

class CodeAssess extends CodeAssessObservable {
    constructor() {
        super();
        this.assess = assess;
        this.API = new CodeAssessAPI(this);
        this.observers = [];
        this.studentOrTeacher = null;
        this.isUserLoggedIn = false;
        this.TypesOfPublishedEvents = TypesOfPublishedEvents;
    }

    setStudentOrTeacher(studentOrTeacher) {
        this.studentOrTeacher = studentOrTeacher;
        this.publish(TypesOfPublishedEvents.STUDENT_OR_TEACHER_CHANGED);
    }

    setIsUserLoggedIn(isUserLoggedIn) {
        this.isUserLoggedIn = isUserLoggedIn;
        this.publish(TypesOfPublishedEvents.IS_USER_LOGGED_IN_CHANGED);
    }

    /// OBERVABLE METHODS ///
    /**
     * Subscribe an observer to this observable.
     * @param {string} id
     * @param {Object.values(TypesOfPublishedEvents)} typeOfEvent
     * @param {function} cb
     */
    subscribe(id, typeOfEvent, cb) {
        // check if the type of event is valid
        if (!Object.values(TypesOfPublishedEvents).includes(typeOfEvent)) {
            throw new TypeError(`The type of event "${typeOfEvent}" is not valid. Valid types are: ${Object.values(TypesOfPublishedEvents).join(", ")}`);
        }
        const observer = new CodeAssessObserver(id, typeOfEvent, cb);
        // Check if the observer is already subscribed
        const index = this.observers.findIndex((o) => o.id === observer.id);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
        this.observers.push(observer);
    }

    /**
     * Unsubscribe an observer from this observable.
     * @param {string} observerId
     */
    unsubscribe(observerId) {
        const index = this.observers.findIndex((o) => o.id === observerId);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    /**
     * Notify all observers of updates.
     */
    publish(typeOfEvent) {
        this.observers.forEach((o) => o[Symbol.for('notify')](typeOfEvent));
    }
    /// END OF OBERVABLE METHODS ///
}

module.exports = CodeAssess;
