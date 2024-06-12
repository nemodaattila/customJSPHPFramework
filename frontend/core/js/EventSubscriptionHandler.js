/**
 * subscription handler class to events - communication between modules
 * a module can subscribe to an event for e.g. CompanyLister subscribes to 'userCreated' event
 * (when a user was created), when event triggers, CompanyLister refreshes its table
 * it works on a trigger word (keyword) basis (for e.g. userCreated), trigger words are not stored
 *
 */
class EventSubscriptionHandler {
    /**
     * existing subscriptions
     * @type {{string : Array}} [[objectPointer: Object, functionName: string][]]
     */
    static _subscriptions = {};

    /**
     * calling functions triggered by event
     * @param triggerWords {string | Array} trigger words to be triggered
     * @param eventData {any}  data sent with event - not Event object
     */
    static _callSubscribedFunctions(triggerWords, eventData) {
        for (const callWord of triggerWords) {
            if (!this._subscriptions[callWord])
                continue
            for (const [classPointer, functionName] of this._subscriptions[callWord]) {
                classPointer[functionName] ? classPointer[functionName](eventData) :
                    console.log(classPointer.constructor.name + ' - ' + functionName + '  not exists')
            }
        }
    }

    /**
     * checks if an object is already subscribed to an event
     * @param triggerWord {string} trigger-word
     * @param objectPointer {Object}  class pointer
     * @returns {boolean} true if subscribed, false if not
     */
    static _checkIfAlreadySubscribed(triggerWord, objectPointer) {
        return this._subscriptions[triggerWord].findIndex(sub => sub[0] === objectPointer) !== -1
    }

    /**
     * unsubscribing object from all subscribed event
     * @param objectPointer {Object} object which wants to unsubscribe from events
     */
    static massUnSubscribe(objectPointer) {
        Object.keys(this._subscriptions).forEach((word) => this.unSubscribe(word, objectPointer))
    }

    /**
     * subscription to events
     * @param triggerWord {string} trigger-word to witch the object can subscribe
     * @param objectPointer {Object} object's pointer, which is subscribing
     * @param functionName {string} name of the function, which will run when the event triggers
     * @param prioritized {boolean} if true this subscription will run first if the event triggers
     * */
    static subscribe(triggerWord, objectPointer, functionName, prioritized = false) {
        if (!this._subscriptions)
            this._subscriptions = {};
        if (!this._subscriptions[triggerWord])
            this._subscriptions[triggerWord] = [];
        if (this._checkIfAlreadySubscribed(triggerWord, objectPointer))
            return
        prioritized ? this._subscriptions[triggerWord].unshift([objectPointer, functionName]) :
            this._subscriptions[triggerWord].push([objectPointer, functionName]);
    }

    /**
     * triggering subscription event(s)
     * @param triggerWord {string | Array} trigger word(s) to be triggered
     * @param eventData {any} data sent with event - not Event object
     * @param interWindowParams data sent to another browser window //TODO implement
     */
    static triggerSubscriptionCall(triggerWord, eventData = null, interWindowParams = null) {
        // if (interWindowParams === null || interWindowParams.triggerInterWindowMessage !== false || interWindowParams.triggerInterWindowMessage === undefined)
        //     Main.channel.postMessage({
        //         event: callwords,
        //         resultData: interWindowParams?.sendData ? resultData : null,
        //     })
        if (!this._subscriptions) {
            alert('ERROR - SubscriptionHandler is empty');
            return;
        }
        if (!Array.isArray(triggerWord)) triggerWord = [triggerWord]
        this._callSubscribedFunctions(triggerWord, eventData);
    }

    /**
     * unsubscribing from event
     * @param triggerWord {string} trigger-word from witch the object wants to unsubscribe
     * @param objectPointer {Object} object which is
     */
    static unSubscribe(triggerWord, objectPointer) {
        if (!this._subscriptions[triggerWord])
            return
        const index = this._subscriptions[triggerWord].findIndex(([obj]) => obj === objectPointer)
        if (index === -1)
            return;
        this._subscriptions[triggerWord].splice(index, 1)
        if (this._subscriptions[triggerWord].length === 0)
            delete this._subscriptions[triggerWord]
    }
}
