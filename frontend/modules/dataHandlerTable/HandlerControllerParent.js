class HandlerControllerParent extends ControllerParent{
    /**
     * több adatot kezel?
     * @type {boolean}
     */
    _multiple = false
    /**
     * controller típusa - creator / edit / multiple
     */
    _type

    _serviceModelPointer

    constructor(type) {
        super();
        this._type = type
        this._multiple = this._type === 'multipleEditor'
        if (this._type === 'editor') {
            this.getOneEntity()
        }
        // else
        //     this.init()
    }

    getHeaderAttributeParams() {
        return this._serviceModelPointer.tableHeaderAttributes
    }

    onDesktopWindowResize() {}

    async displayView(windowBody) {
        this._serviceModelPointer = this.service.model
        let handlerTable = new HandlerTable(windowBody, this)
        this._view.addComponent('listerTable', handlerTable, this._type)
        // listerTable.displayTableIcons(this._serviceModelPointer.getEnabledOperations())
        //
        // this._searchParamConnector.setOrdering(this._serviceModelPointer?.defaultOrder ?? 'id', 'ASC')
        // listerTable.drawHeaders(
        //     this._serviceModelPointer.tableHeaderAttributeOrder,
        //     this._serviceModelPointer.defaultOrder
        // )
        // this._searchParamConnector.orderSourceObject = listerTable.view
        // console.trace()
        //
        // this._view.addComponent("pageTurner", this._searchParamConnector.createOffsetSourceObject(this._pageTurnerType, listerTable, this))
        // console.dir(windowBody)
        // this._searchParamConnector.tableDOMElement = this._view.getComponent('listerTable').view._dataTable
        // // this._searchParamConnector.setAutoLimit()
        // // this.getRecordsFromServer("refresh")
        // this.openHandlerWindow('creator')

    }

    createHandlerTable()
    {
        this._serviceModelPointer = this.service.model
        let listerTable = new ListerTable(windowBody, this)
        this._view.addComponent('listerTable', listerTable)
    }
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
    // async sendRequest(compData) {
    //     if (compData === undefined)
    //         return
    //     if (this.type === 'creator') {
    //         if (await this.service.sendNewRequest(compData))
    //             this.view.resetTallTable()
    //     } else {
    //         if (await this.service.sendEditRequest(compData, this.multiple))
    //             if (!this.multiple) {
    //                 await this.getOneEntity(false)
    //             } else
    //                 this.view.resetTallTable()
    //     }
    // }
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
