/**
 * service for Companies
 */
class CompanyService extends EntityServiceControllerParent {
    /**
     * gets company types from server
     * @returns {Promise<boolean>}
     */
    async getMetaParameters() {
        this._model.companyTypes = await RESTHandler.sendHttpRequest({
            url: this._model.restParameter + '/meta',
            requestType: 'GET'
        })
    }
}
