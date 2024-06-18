class EntityHandlerControllerParent extends WindowContentControllerParent {
    /**
     * controller típusa - creator / edit / multiple
     */
    _type
    get type() {
        return this._type;
    }

    _serviceModelPointer

    destructor() {
        super.destructor?.()
        this._serviceModelPointer = undefined
        EventSubscriptionHandler.massUnSubscribe(this)
    }

    getHeaderAttributeParams() {
        return this._serviceModelPointer.tableHeaderAttributes
    }

    // onDesktopWindowResize() {}
    init() {
        this.subscribeToEvents?.()
        this._view = new EntityHandlerViewParent()
        this._serviceModelPointer = this.service.model
        console.log(this)
    }

    collectAndSaveRecord() {
        console.log(this._type)
        const match = item => new Map([
            ['creator', "collectAndCreateRecord"],
            ['editor', "collectAndEditRecord"],
            ['delete', "deleteRecord"],
        ]).get(item) ?? false
        console.log(match(this._type))
        this[match(this._type)]()
    }



    encodeStringParameters(collectedData) {
        let stringTypes = ['string', 'char',
            'longtext',
            'mediumtext',
            'text',
            'tinytext',
            'varchar'
        ]
        const tableHeaderAttributes = this.getHeaderAttributeParams()
        Object.entries(collectedData).forEach(([id, value]) => {
            if (tableHeaderAttributes[id].inModule !== undefined && tableHeaderAttributes[id].inModule.findIndex(module => module === handlerType) === -1)
                return
            if (stringTypes.findIndex(strType => strType === tableHeaderAttributes[id].type) !== -1)
                collectedData[id] = encodeURIComponent(value)
        })
    }

    // async sendDataHandlerRequest(collectedData) {
    //     console.log(this._type)
    //     if (!collectedData)
    //         return
    //     if (this._type === 'creator') {
    //         await this.service.sendCreateRequest(collectedData)
    //         this._view.getComponent('handlerTable').resetTable()
    //     } else {
    //         if (await this.service.sendEditRequest(collectedData, this.multiple))
    //             if (!this.multiple) {
    //                 await this.getOneEntity(false)
    //             } else
    //                 this.view.resetTallTable()
    //     }
    // }
    //
    // /**
    //  * egy rekord/entitás adatainak lekérése
    //  * @param init {boolean} kell-e kontroller inicializálás
    //  * @returns {Promise<void>}
    //  */
    // async getOneEntity(init = true) {
    //     let result = await this.service.getOne(this.connectedParams.connectedObjectId, !init)
    //     if (init)
    //         this.init(result)
    // }
    //
    // /**
    //  * tall tábla alapértelmezettre állítása
    //  */
    // resetTallTable() {
    //     this.view.resetTallTable()
    // }
    //
    // /**
    //  * kiválasztott rekord adataink helyi frissítése, adatmanipuláció után
    //  */
    // refreshSelectedRecord(modifiedData) {
    //     Object.entries(modifiedData).forEach(([id, value]) =>
    //         this.service.selectedRecord[id] = value)
    // }
    //
    // /**
    //  * cég-választó input kitöltése megadott értékkel - csak NonTableViewParent
    //  * @param id {number|string} cég id
    //  * @param name {string} cég név
    //  */
    // refreshCompanyData({id, name}) {
    //     if (this === Desktop.previousWindow.controllerPointer)
    //         this.view.setCustomDatalistValue('company', id, name)
    // }
    //
    // /**
    //  * rendszer-választó input kitöltése megadott értékkel - csak NonTableViewParent
    //  * @param id {number|string} rendszer id
    //  * @param name {string} rendszer név
    //  */
    // refreshSystemData({id, name}) {
    //     if (this === Desktop.previousWindow.controllerPointer)
    //         this.view.setCustomDatalistValue('system', id, name)
    // }
    //
    // /**
    //  * számla-választó input kitöltése megadott értékkel - csak NonTableViewParent
    //  * @param id {number|string} számla id
    //  * @param name {string} számla sorszám
    //  */
    // refreshBillData({id, serial}) {
    //     if (this === Desktop.previousWindow.controllerPointer)
    //         this.view.setCustomDatalistValue('bill', id, serial)
    // }
    //
    // /**
    //  * adatmanipulóciós request elküldése
    //  * @param {*} compData összegyüjtött adatok
    //  * @returns {Promise<void>}
    //  */
    //
    // /**
    //  * fájl előkészítése feltöltésre (fájlnév + base64 string)
    //  * @param compData {{}} record paraméterei
    //  * @param dir {string} fájl mentési útja
    //  * @returns {Promise<void>}
    //  */
    // async loadFilesForUploadAndSend(compData, dir) {
    //     let files = compData.file
    //     let fileData = await this.readAsDataURL(files)
    //     compData.file = []
    //     Array.from(files).forEach((file, key) =>
    //         compData.file.push([dir + file.name, fileData[key]]))
    //     await this.sendRequest(compData)
    // }
    //
    // /**
    //  * file base64 string kiszedése filr Url-ből
    //  * @param file {string|Blob} base64 string
    //  * @returns {Promise<unknown>}
    //  */
    // fileToDataURL(file) {
    //     let reader = new FileReader()
    //     return new Promise(function (resolve) {
    //         reader.onload = function (event) {
    //             resolve(event.target.result)
    //         }
    //         reader.readAsDataURL(file)
    //     })
    // }
    //
    // /**
    //  * base64 stringek lekérése több fájlból
    //  * @param files {[]} fájlok
    //  * @returns {Promise<Awaited<unknown>[]>}
    //  */
    // readAsDataURL(files) {
    //     return Promise.all(Array.prototype.slice.call(files).map(this.fileToDataURL))
    // }
}
