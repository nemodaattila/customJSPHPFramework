class EntityHandlerControllerParent extends WindowContentControllerParent{
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
        // if (this._type === 'editor') {
        //     this.getOneEntity()
        // }
        // else
        //     this.init()
    }

    destructor()
    {
        super.destructor?.()
        this._serviceModelPointer = undefined

    }

    getHeaderAttributeParams() {
        return this._serviceModelPointer.tableHeaderAttributes
    }

    onDesktopWindowResize() {}

    init(){
        this.subscribeToEvents?.()
        EventSubscriptionHandler.massUnSubscribe(this)
        this._view = new EntityHandlerViewParent()
    }


     async displayView(windowBody) {
         this._serviceModelPointer = this.service.model
         console.log({...this._serviceModelPointer})

         console.log(this._serviceModelPointer.selectedIds.length)
         if (this._serviceModelPointer.selectedIds.length !== 0) {
             let idLabel = this._serviceModelPointer.selectedIds.length === 1 ?
                 this._serviceModelPointer.selectedIds[0] :
                 this._serviceModelPointer.selectedIds.join(', ')
             this._view.addIdLabel(idLabel)
         }
         this._view.addComponent('handlerTable', new EntityHandlerTableController(this.getWindowContentMainContainer(), this), this._type)
         console.log(this._view.getComponent('handlerTable'))
         if (this._type === 'editor')
             this._view.getComponent('handlerTable').fillTable(await this.service.getSelectedDataFromLocalDatabase(), this.getHeaderAttributeParams())
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

    collectAndSaveRecord()
    {

            const match = item => new Map([
                ['creator', "collectAndCreateRecord"],
                ['editor', "collectAndEditRecord"],
                ['multipleEditor', "collectAndEditMultipleRecord"],
                ['delete', "deleteRecord"],
            ]).get(item) ?? false

        this[match(this._type)]()
    }

    async attributeMultipleDelButtonClicked(attributeName) {
        let collectedData = {}
        collectedData[attributeName] = ''
        collectedData.id=this._serviceModelPointer.selectedIds
            //DO validation
        await this.service.sendEditRequest(collectedData, this._multiple)
    }

     async collectAndCreateRecord() {
         const collectedData = this._view.getComponent('handlerTable').getInputValues()
         if (!this.validateRecord(collectedData))
             return
         this.encodeStringParameters(collectedData)
         await this.service.sendCreateRequest(collectedData)
         this._view.getComponent('handlerTable').resetTable()
     }

    async collectAndEditRecord() {
        const collectedData = this._view.getComponent('handlerTable').getInputValues()
        if (Object.keys(collectedData).length === 0)
            return;
        if (!this.validateRecord(collectedData))
            return
       const originalData = await this.service.getSelectedDataFromLocalDatabase()
        console.log(originalData)

        this.getDifferenceBetweenModifiedDataAndOriginal(collectedData, originalData)
        console.log(collectedData)


        this.encodeStringParameters(collectedData)
        collectedData.id = originalData.id
        console.log(collectedData)
        await this.service.sendEditRequest(collectedData)
        // this._view.getComponent('handlerTable').resetTable()
    }

    getDifferenceBetweenModifiedDataAndOriginal(collectedData, originalData)
    {
        Object.entries(collectedData).forEach(([key, value]) => {
            if (value === originalData[key])
                delete collectedData[key]
        })
    }

     validateRecord(collectedData)
     {
         const attributes = this.getHeaderAttributeParams()
          return Object.entries(collectedData).every(([key,value])=>{
             if (attributes[key]?.required)
             {
                 if (value === '')
                 {
                     Messenger.showAlert((attributes[key].label??key) + ' Kitöltése kötelező');
                     return false
                 }
             }
             return true
         })
     }

    encodeStringParameters(collectedData)
    {
        let stringTypes =    [ 'string',         'char',
         'longtext',
         'mediumtext',
            'text',
    'tinytext',
     'varchar'
]
        const tableHeaderAttributes = this.getHeaderAttributeParams()

        Object.entries(collectedData).forEach(([id, value]) => {
            if (tableHeaderAttributes[id].inModule !== undefined && tableHeaderAttributes[id].inModule.findIndex(module =>module === handlerType) === -1)
                return

            if (stringTypes.findIndex(strType => strType === tableHeaderAttributes[id].type) !== -1)
            collectedData[id] = encodeURIComponent(value)
        })
    }

    async collectAndEditMultipleRecord() {
        const collectedData = this._view.getComponent('handlerTable').getNotEmptyInputValues()
        if (Object.keys(collectedData).length === 0)
            return;

        if (!this.validateRecord(collectedData))
            return



        this.encodeStringParameters(collectedData)
        collectedData.id = this._serviceModelPointer.selectedIds
        console.log(collectedData)
        await this.service.sendEditRequest(collectedData, this._multiple)
        this._view.getComponent('handlerTable').resetTable()
    }

    async sendDataHandlerRequest(collectedData) {
        console.log(this._type)
        if (!collectedData)
            return
        if (this._type === 'creator') {
            await this.service.sendCreateRequest(collectedData)
            this._view.getComponent('handlerTable').resetTable()
        } else {
            if (await this.service.sendEditRequest(collectedData, this.multiple))
                if (!this.multiple) {
                    await this.getOneEntity(false)
                } else
                    this.view.resetTallTable()
        }
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
