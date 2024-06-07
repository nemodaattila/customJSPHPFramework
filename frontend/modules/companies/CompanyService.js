class CompanyService extends EntityServiceControllerParent {
    _restParameter = 'company'

    _handlerEventTrigger = 'companyHandlerEvent'

    _successMessages = {creator: 'Cég létrehozva', editor: 'Cég(ek) módosítva'}


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



    /**
     * új cég beküldése
     * @param data {Object} cégadatok
     */

    //
    // /**
    //  * cég módosítási adatok beküldése
    //  * @param data {Object} módosított adatok
    //  * @param multiple {boolean} egy vagy több cég van szerkesztve
    //  */

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
