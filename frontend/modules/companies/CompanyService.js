/**
 * service for Companies
 */
class CompanyService extends EntityServiceControllerParent {
    /**
     * gets company types from server
     * @see EntityServiceControllerParent.getMetaParameters
     * @returns {Promise<boolean>}
     */
    async init() {
        return new Promise(async (resolve) => {
            if (this._model.loaded)
                resolve(true)
            await this.getMetaParameters()
            resolve(await super.init())
        })
    }
}
