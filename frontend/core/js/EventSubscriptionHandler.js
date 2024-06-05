/**
 * esemény-feliratkozás kezelő osztály
 * fel lehet iratkozni bizonyos eseményekre, bizonyos kulcsszavak alapján
 *  !! a lehetséges kulcsszavak nincsenek mentve !!
 */
class EventSubscriptionHandler {
    /**
     * feliratkozások kulcsszavak alapján
     * @type {{string : Array}}
     */
    static subscriptions = {};

    /**
     * feliratkozás eseményre
     * @param callWord {string} a kulcsszó (trigger-word), amire fel lehet iratkozni
     * @param objectPointer {Object} az osztályra mutató pointer, ami feliratkozik
     * @param functionName {string} a trigger kiváltásakor lefuttatandó function neve
     * @param prioritized {boolean} ha true (és több elem iratkozott fel ugyanarra az eventre) előre kerül a feliratkozó, előbb fut le
     */
    static subscribe(callWord, objectPointer, functionName, prioritized = false) {
        if (!this.subscriptions)
            this.subscriptions = {};
        if (!this.subscriptions[callWord])
            this.subscriptions[callWord] = [];
        if (this.checkIfAlreadySubscribed(callWord, objectPointer) !== -1)
            return
        prioritized?            this.subscriptions[callWord].unshift([objectPointer, functionName]):
        this.subscriptions[callWord].push([objectPointer, functionName]);
    }

    /**
     * ellenőrzi, hogy egy object feliratkozott-e már az eseményre
     * @param callWord {string} trigger-word
     * @param objectPointer {Object}  az osztályra mutató pointer, ami feliratkozik
     * @returns {number} ha az object már feliratkozott 0 vagy nagyobb, ha nem -1
     */
    static checkIfAlreadySubscribed(callWord, objectPointer) {
        return this.subscriptions[callWord].findIndex(sub => sub[0] === objectPointer)
    }

    /**
     * leiratkozás esemény
     * @param callWord {string} kulcsszó amiről leiratkozik
     * @param objectPointer {Object} az objektum ami leiratkozik
     */
    static unSubscribe(callWord, objectPointer) {
        if (!this.subscriptions[callWord])
            return
        const index = this.subscriptions[callWord].findIndex(([obj]) => obj === objectPointer)
        if (index !== -1) {
            this.subscriptions[callWord].splice(index, 1)
            if (this.subscriptions[callWord].length === 0)
                delete this.subscriptions[callWord]
            this.unSubscribe(callWord, objectPointer)
        }
    }

    /**
     * leiratkozás az összes eventről, amire az objektum feliratkozott
     * @param objectPointer {Object} az objektum, ami le akar iratkozni az eventekről
     */
    static massUnSubscribe(objectPointer) {
            Object.keys(this.subscriptions).forEach((word) => EventSubscriptionHandler.unSubscribe(word, objectPointer))
    }

    /**
     * event trigger kiváltása/meghívása, paraméterellenőrzések
     * @param callwords {string | Array} a kiváltandó (kulcsszó/szavak)
     * @param resultData {any} eseményhez kapcsolt/ kiváltott adat
     * @param interWindowParams
     */
    static triggerSubscriptionCall(callwords, resultData = null, interWindowParams = null) {
        // if (interWindowParams === null || interWindowParams.triggerInterWindowMessage !== false || interWindowParams.triggerInterWindowMessage === undefined)
        //     Main.channel.postMessage({
        //         event: callwords,
        //         resultData: interWindowParams?.sendData ? resultData : null,
        //     })
        if (!this.subscriptions) {
            alert('ERROR - SubscriptionHandler is empty');
            return;
        }
        if (!Array.isArray(callwords)) callwords = [callwords]
        this.callSubscribedFunctions(callwords, resultData);
    }

    /**
     * kiváltott eseményhez kapcsolt függvényeek meghívása
     * @param callWords {string | Array} a kiváltandó (kulcsszó/szavak)
     * @param resultData {any} eseményhez kapcsolt/ kiváltott adat
     */
    static callSubscribedFunctions(callWords, resultData) {
        for (const callWord of callWords) {
            if (!this.subscriptions[callWord])
                continue
            for (const [classPointer, functionName] of this.subscriptions[callWord]) {
                classPointer[functionName] ? classPointer[functionName](resultData) :
                    console.log(classPointer.constructor.name + ' - ' + functionName + '  not exists')
            }
        }
    }
}
