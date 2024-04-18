/**
 * elküld egy http requestet a szervernek, és fogadja is a választ,
 * meghívja a megfelelő függvényt, aminek átadja a responseban érkező adatokat
 * POST és GET
 */
class RESTHandler {
    /**
     * fejlesztő által generált egyedi header-ök, pl: auth hash
     * @type {[]}
     * @private
     */
    _customHeader = [];
    /**
     * ha true, akkor a http response-t JSON-ben várja, és vissza is alakítja azt
     * @type {boolean}
     * @private
     */
    _responseIsJSONEncoded = true;
    /**
     * backend szerver url-je
     * @type {string}
     * @private
     */
    _targetUrl = '../backend/ajaxHandler.php';
    set targetUrl(value) {
        this._targetUrl += value;
    }

    /**
     * küldendő request tipusa (PUT, POST, ...)
     * @type {string}
     * @private
     */
    _requestType = 'POST';
    set requestType(value) {
        this._requestType = value.toUpperCase();
    }

    /**
     * request-el elküldött adat
     * @type {string | null}
     * @private
     */
    _postFields;
    get postFields() {
        return this._postFields
    }

    set postFields(value) {
        this._postFields = value;
    }

    /**
     * 200-as válasz esetén meghívandó függvény
     * @type {function}
     * @private
     */
    _callbackFunction;
    set callbackFunction(value) {
        this._callbackFunction = value;
    }

    /**
     * egyedi header hozzáadása a requesthez
     * @param name header név
     * @param value header érték
     */
    addCustomHeader(name, value) {
        this._customHeader.push([name, value]);
    }

    /**
     * a request összeállítása, elküldése,
     * válasz fogadása,
     * callback metódus meghívása, hiba esetén hibaüzenet megjelenítése
     */
    send(refreshCountDown = true) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(this._requestType, this._targetUrl, true);
            if (this._customHeader !== [])
                for (let [name, value] of this._customHeader)
                    request.setRequestHeader(name, value);
            request.onreadystatechange = () => {
                let resultData
                if (request.readyState !== 4)
                    return;
                try {
                    if (this._responseIsJSONEncoded === true) {
                        resultData = JSON.parse(request.responseText);
                    } else
                        resultData = request.responseText;
                } catch (e) {
                    resultData = request.responseText;
                }
                if (request.status !== 200 && request.status !== 304) {
                    try {
                        let resp = JSON.parse(request.response);
                        AlertPopup.showAlert(resp.errorMessage);
                        if (resp.errorMessage === 'AUTHERROR') {
                            AuthService.onLogout()
                            window.location.reload()
                        }
                        reject(resp.errorMessage)
                    } catch (e) {
                        AlertPopup.showAlert(request.response === '' ? request.statusText : request.response);
                        reject(request.response)
                    }
                    return;
                }
                resolve(resultData);
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
                request.send(param);
            }
        })
    }
}
