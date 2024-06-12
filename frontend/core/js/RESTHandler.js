/**
 * compiles and send request to serves handles response, gives alert/errormessage when request failed
 */
class RESTHandler {
    /**
     * compiles and send request to serves handles response, gives alert/errormessage when request failed
     * @param url {string|false} target url - will be prefixed with BACKEND_URL
     * @param requestType {string} type of request (PUT, POST, ...)
     * @param customHeader {{}|[]} custom headers as key=>value object OR [] if empty
     * @param payload {{}|null} request payload data
     * @param values {{}|null} same as payload, for backwards compatibility
     * @returns {Promise<*>} response data
     */
    static async sendHttpRequest({
                                     url = '',
                                     requestType = 'GET',
                                     customHeader = [],
                                     payload = null,
                                     values = null
                                 } = {}) {
        if (!VariableHelper.isString(url)) {
            Messenger.showAlert('RESTHandler target url missing')
            return false
        }
        return new Promise(async (resolve, reject) => {
            const request = new XMLHttpRequest();
            await this._compileRequest(request, {
                url,
                requestType,
                customHeader,
            })
            request.send(this._compileRequestParameters(payload ?? values ?? null))
            request.onreadystatechange = () => {
                if (request.readyState !== 4)
                    return;
                if (request.status !== 200 && request.status !== 304) {
                    try {
                        Messenger.showAlert(JSON.parse(request.response).errorMessage);
                    } catch (e) {
                        Messenger.showAlert(request.response === '' ? request.statusText : request.response);
                    } finally {
                        reject()
                    }
                }
                try {
                    resolve(JSON.parse(request.responseText));
                } catch (e) {
                    resolve(request.responseText);
                }
            };
        })
    }

    static async _compileRequest(request, {
                                     url = '',
                                     requestType = 'GET',
                                     customHeader = [],
                                 } = {}
    ) {
        url = BACKEND_URL + url
        request.open(requestType, url, true);
        if (customHeader !== [])
            Object.entries(customHeader).forEach(([hName, hValue]) =>
                request.setRequestHeader(hName, hValue));
    }

    static _compileRequestParameters(payload) {
        if (payload === null)
            return null
        return Object.entries(payload).map(([key, value]) => (key + "=" + payload[key])).join('&')
        //  let parameters = [];
        //  for (const key in payload)
        //      parameters.push)
        // return parameters
        //  await request.send(parameters.join('&'));
    }
}
