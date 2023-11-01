/**
 * Abstract class representing an observable in code assessment context.
 * @abstract
 */
class CodeAssessObservable {
    // The use of Symbol.for() ensures that the method names are unique across different parts of the code. This reduces the likelihood of method name collision when the classes are extended.
    constructor() {
        if (this.constructor === CodeAssessObservable) {
            throw new TypeError('Abstract class "CodeAssessObservable" cannot be instantiated directly.');
        }
    }

    /**
     * Subscribe to this observable.
     * @throws {TypeError} If the method is not implemented by the subclass.
     */
    [Symbol.for('subscribe')]() {
        throw new TypeError('Method "subscribe()" must be implemented.');
    }

    /**
     * Unsubscribe from this observable.
     * @throws {TypeError} If the method is not implemented by the subclass.
     */
    [Symbol.for('unsubscribe')]() {
        throw new TypeError('Method "unsubscribe()" must be implemented.');
    }

    /**
     * Publish updates to all subscribers.
     * @throws {TypeError} If the method is not implemented by the subclass.
     */
    [Symbol.for('publish')]() {
        throw new TypeError('Method "publish()" must be implemented.');
    }
}

/**
 * Class representing an observer in code assessment context.
 * @param {string} id
 * @param {Object.values(TypesOfPublishedEvents)} typeOfEventToListenFor
 * @param {function} cb
 */
class CodeAssessObserver {
    constructor(id, typeOfEventToListenFor, cb) {
        this.id = id;
        this.typeOfEventToListenFor = typeOfEventToListenFor;
        this.cb = cb;
        // Checking if abstract properties are initialized
        if (!this.id || !this.cb || !this.typeOfEventToListenFor) {
            throw new TypeError('The subclass must define the "id", "typeOfEventToListenFor" and "cb" properties.');
        }

    }

    /**
     * Notify this observer of updates.
     * @param {Object.values(TypesOfPublishedEvents)} typeOfEvent
     */
    [Symbol.for('notify')](typeOfEvent) {
        if (typeOfEvent === this.typeOfEventToListenFor) {
            this.cb();
        }
    }
}

module.exports = {
    CodeAssessObservable,
    CodeAssessObserver
};