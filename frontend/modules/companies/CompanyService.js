class CompanyService extends EntityServiceParent {
    _restParameter = 'company'

    async init() {
        console.log('init')
        console.log(this)
        return new Promise(async (resolve) => {
            if (this._model.loaded)
                resolve(true)
            await this.getMetaParameters()
            resolve(await super.init())
        })
    }

    async getMetaParameters() {
        this._model.companyTypes = await RESTHandler.send({url: 'company/meta', requestType: 'GET'})
        this._model.loaded = true
    }

    /**
     * új cég beküldése
     * @param data {Object} cégadatok
     */
    async sendCreateRequest(data) {

          await RESTHandler.send({
            url: this._restParameter, requestType: 'POST',
            customHeader: {"Content-type": 'application/x-www-form-urlencoded'},
            values : data
        })
        EventSubscriptionHandler.triggerSubscriptionCall('companyHandlerEvent')

    }
    //
    // /**
    //  * cég módosítási adatok beküldése
    //  * @param data {Object} módosított adatok
    //  * @param multiple {boolean} egy vagy több cég van szerkesztve
    //  */
    // static async sendEditRequest(data, multiple = false) {
    //     let value = await this.createAndSendRequest(multiple ? 'editMultipleCompany' : 'editCompany', JSON.stringify(data))
    //     if (value.success === true) {
    //         AlertPopup.showSuccess('Cég módosítás')
    //         EventSubscriptionHandler.triggerSubscriptionCall('companyEdited')
    //     }
    //     return value.success
    // }
    //
    // /**
    //  * egy cég adatainak lekérése
    //  * @param companyId {number} cég azonosító
    //  * @param forced {boolean} kötelező lekérés
    //  */
    // static async getOne(companyId, forced = false) {
    //     if (this.selectedRecord === null || this.selectedRecord.id !== companyId || forced)
    //         this.selectedRecord = await this.createAndSendRequest('getCompany', companyId)
    //     return true
    // }
}
