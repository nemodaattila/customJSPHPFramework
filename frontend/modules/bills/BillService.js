/**
 * service for bills
 */
class BillService extends EntityServiceControllerParent {
    /**
     * get meta parameters from server - currencies, payment methods and bill states
     * @returns {Promise<void>}
     */
    async getMetaParameters() {
        [this.model.currencies, this.model.paymentMethods, this.model.states] = await RESTHandler.sendHttpRequest({
            url: this._model.restParameter + '/meta',
            requestType: 'GET'
        })
    }
}
