/**
 * service for bills
 */
class BillService extends EntityServiceControllerParent {
    async init() {
        return new Promise(async (resolve) => {
            if (this._model.loaded === true) {
                resolve(true)
                return
            }
            await this.getMetaParameters()
            this._model.loaded = true
            resolve(await super.init())
        })
    }

    /**
     * get meta parameters from server - currencies, payment methods and bill states
     * @returns {Promise<void>}
     */
    async getMetaParameters() {
        [this.model.currencies, this.model.paymentMethods, this.model.states] = await RESTHandler.sendHttpRequest({
            url: this._model.restParameter + '/meta',
            requestType: 'GET'
        })
        this._model.loaded = true
    }
}
