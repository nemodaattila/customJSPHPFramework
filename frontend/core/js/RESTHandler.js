/**
 * elküld egy http requestet a szervernek, és fogadja is a választ,
 * meghívja a megfelelő függvényt, aminek átadja a responseban érkező adatokat
 * POST és GET
 */
class RESTHandler {
    static _customHeader = [];
    /**
     * backend szerver url-je
     * @type {string}
     * @private
     */
    static _targetUrl = '../backend/';
    static set targetUrl(value) {
        this._targetUrl += value;
    }

    /**
     * küldendő request tipusa (PUT, POST, ...)
     * @type {string}
     * @private
     */
    static _requestType = 'POST';
    static set requestType(value) {
        this._requestType = value.toUpperCase();
    }

    /**
     * request-el elküldött adat
     * @type {string | null}
     * @private
     */
    static _postFields;
    static get postFields() {
        return this._postFields
    }

    static set postFields(value) {
        this._postFields = value;
    }

    static addCustomHeader(name, value) {
        this._customHeader.push([name, value]);
    }

    /**
     * a request összeállítása, elküldése,
     * válasz fogadása,
     * callback metódus meghívása, hiba esetén hibaüzenet megjelenítése
     */
    static async send(params = {}) {
        console.log(params);
        this._customHeader = []
        this._targetUrl = '../backend/';
        if (params && params.url) {
            this.targetUrl = params.url
        } else Messenger.showAlert('RESTHandler target url missing')
        if (params && params.requestType)
            this.requestType = params.requestType

        if (params && params.customHeader)
            Object.entries(params.customHeader).forEach(([name, header]) =>
                this.addCustomHeader(name, header)            )
        if (params && params.values)

            this.postFields = params.values

        return new Promise(async (resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(this._requestType, this._targetUrl, true);
            if (this._customHeader !== [])
                for (let [name, value] of this._customHeader)
                    request.setRequestHeader(name, value);
            request.onreadystatechange = () => {
                let resultData
                if (request.readyState !== 4)
                    return;
                if (request.status !== 200 && request.status !== 304) {
                    try {
                        let resp = JSON.parse(request.response);
                        Messenger.showAlert(resp.errorMessage);
                        // if (resp.errorMessage === 'AUTHERROR') {
                        //     AuthService.onLogout()
                        //     window.location.reload()
                        // }
                        reject()
                    } catch (e) {
                        Messenger.showAlert(request.response === '' ? request.statusText : request.response);
                        reject()
                    }
                } else {
                    try {
                        resultData = JSON.parse(request.responseText);
                    } catch (e) {
                        resultData = request.responseText;
                    }
                    resolve(resultData);
                }
            };
            if (request.readyState === 4)
                return;
            if (this._postFields === null) {
                request.send()
            } else {
                let param = "";
                for (let key in this._postFields)
                    if (this._postFields.hasOwnProperty(key)) {
                        param += key + "=" + this._postFields[key];
                        param += "&"
                    }
                param = (param.substring(0, param.length - 1));
                await request.send(param);
            }
        })
    }
}
