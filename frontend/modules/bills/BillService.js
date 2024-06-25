/**
 * service for Companies
 */
class BillService extends EntityServiceControllerParent {
    /**
     * gets company types from server
     * @see EntityServiceControllerParent.getMetaParameters
     * @returns {Promise<boolean>}
     */
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
    async getMetaParameters() {
        [this._currencies, this._paymentMethods, this._states] = await RESTHandler.sendHttpRequest({url: this._model.restParameter+'/meta', requestType: 'GET'})
        this._model.loaded = true

    }

}
