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
    static async sendRequest({
                                 url = false,
                                 requestType = 'GET',
                                 customHeader = [],
                                 payload = null,
                                 values = null
                             } = {}) {
        if (url == false) {
            Messenger.showAlert('RESTHandler target url missing')
            return false
        }
        url = BACKEND_URL + url
        payload = payload ?? values ?? null
        return new Promise(async (resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(requestType, url, true);
            if (customHeader !== [])
                Object.entries(customHeader).forEach(([hName, hValue]) =>
                    request.setRequestHeader(hName, hValue));
            if (payload === null) {
                request.send()
            } else {
                let parameters = [];
                for (const key in payload)
                    parameters.push(key + "=" + payload[key])
                await request.send(parameters.join('&'));
            }
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
}
