/**
 * szerverrel kapcsolatot tartó objektumok ősosztálya
 */
class EntityServiceControllerParent  extends ControllerParent{
    static _instance = undefined



    constructor() {
        super();
        // if (self._instance) {
        //     self._instance = this;
        //     console.log({...self._instance})
        //
        //
        // }
        console.log(self._instance)
        // return self._instance;
        console.log(this.constructor.name)
        console.log(performance.now())
        console.trace()

        if(self._instance !== undefined)
            return self._instance;
        self._instance = this;
        console.log({...self._instance})
        // if(this.constructor.instance)
        //     return this.constructor.instance;
        // this.constructor.instance = this;

    }



    async init() {
        console.log('initSp')
        return new Promise(async (resolve) => {
            if (this._model.loaded === true)
                resolve(true)
            await this.getMetaParameters()
            this._model.loaded = true
            console.log('init')
            this._model.setTableHeaderAttributeOrder();
            await this.loadTableInputObjects()
            this.createTableInputObjects()
            resolve(true)
        })
    }

    async loadTableInputObjects()
    {
        console.log('input')
            await Includer.loadModuleSource('entityHandlerInputObjects')
    }

    createTableInputObjects(){

        const createdInputObjects={}

        let tableHeaderAttributes = this._model.tableHeaderAttributes



       Object.entries( tableHeaderAttributes).forEach(([attributeName,inputParameters]) => {
           console.log(inputParameters.type)
           if (inputParameters.type === 'none')
               inputParameters.type = 'NonTableInput'
           inputParameters.type = inputParameters.type??'StringTableInput'
           if (ENTITY_HANDLER_INPUT_TYPES.findIndex(type => type === inputParameters.type) ===-1) {

               Messenger.showAlert('there is no input object type such: '+inputParameters.type +" see globals.js => ENTITY_HANDLER_INPUT_TYPES")
               return
           }
           try {
               const inputObj = new (eval(inputParameters.type))()
               delete inputParameters.type
                Object.entries(inputParameters).forEach(([name, value])=> inputObj['_'+name]=value)
               createdInputObjects[attributeName] = inputObj
           }
           catch (e) {
               Messenger.showAlert(`${inputParameters.type}  class is missing, check modules/entityHandler/filesToInclude.js`)
           }
       })
        this._model.tableHeaderAttributes=createdInputObjects


    }

    getTitle(name) {
        return this._model.getTitle(name)
    }

    getEnabledOperations() {
        return this._model.getEnabledOperations()
    }

    getTableHeaderOrder() {
        return this._model.tableHeaderAttributeOrder
    }

    async getRecordsFromServer(searchAndOrderParams) {
        // if (data.offset < 0 || data.limit < 1)
        //     return false
        // if (additionalParams !== null)
        //     ac.postFields.additionalParams = JSON.stringify(additionalParams)
        try {
            console.log(searchAndOrderParams)
            return  await RESTHandler.sendHttpRequest({
                url: this._model.restParameter, requestType: 'GET',
                customHeader: {"Search-And-Order-Params": JSON.stringify(searchAndOrderParams)},
            })
        } catch (e) {
            return false
        }
    }




    async refreshLocalDatabase(ids, hardReset = false) {
        console.log(ids)
        for (const id of ids) {
            if (hardReset || !this._model.isIdInRecords(id) )
                await this.getOne(id)
        }
    }

    async getOne(id) {
        this._model.addRecord(id, await RESTHandler.sendHttpRequest({
            url: this._model.restParameter + "/" + id, requestType: 'GET',
        }))
    }

    getDataFromLocalDatabase(recordIds, ) {
        return recordIds.map(id => this._model.getRecordByIdForListTable(id))
    }

    async getRecordsFromLocalDatabase(recordIds, hardReset = false) {
        await this.refreshLocalDatabase(recordIds, hardReset)
        console.log(recordIds)
        return this.getDataFromLocalDatabase(recordIds);
    }

   async getSelectedDataFromLocalDatabase()
    {
        await this.refreshLocalDatabase([this._model.selectedIds], true)
        return  (await this._model.getRecordByIdForListHandling(this._model.selectedIds))
    }



    async sendDeleteRequest() {
        if (confirm("Biztos hogy törlöd a kijelölt rekordo(ka)t?") !== true)
            return;
        // if ((await this.createAndSendRequest('deleteBill', JSON.stringify(ids))).success === true) {
        //     AlertPopup.showSuccess('Számla törlése')
        //     EventSubscriptionHandler.triggerSubscriptionCall('refreshBill')
        // }
        console.log(this._model.selectedIds)
        for (const id of this._model.selectedIds) {
            await RESTHandler.sendHttpRequest({
                url: this._model.restParameter+'/'+id, requestType: 'DELETE',

            })
        }
        Messenger.showSuccess(this._model.successMessages['delete'])
        EventSubscriptionHandler.triggerSubscriptionCall(this._model.handlerEventTrigger)
    }

    async sendCreateRequest(record) {

        await RESTHandler.sendHttpRequest({
            url: this._model.restParameter, requestType: 'POST',
            customHeader: {"Content-type": 'application/x-www-form-urlencoded'},
            values : record
        })
        Messenger.showSuccess(this._model.successMessages['creator'])
        EventSubscriptionHandler.triggerSubscriptionCall(this._model.handlerEventTrigger)
    }

    async sendEditRequest(record, multiple = false) {

        console.log(record)

        if (!multiple)
            record.id = [record.id]
        const dataIds = record.id
        console.log(dataIds)
        for (const id of dataIds) {
            record.id = id
            console.log(record)
            await RESTHandler.sendHttpRequest({
                url: this._model.restParameter+'/'+id, requestType: 'PATCH',
                customHeader: {"Content-type": 'application/json-patch+json'},
                values : record
            })
        }
        Messenger.showSuccess(this._model.successMessages['editor'])
        EventSubscriptionHandler.triggerSubscriptionCall(this._model.handlerEventTrigger)
            // let value = await this.createAndSendRequest(multiple ? 'editMultipleCompany' : 'editCompany', JSON.stringify(data))
        // if (value.success === true) {
        //     Messenger.showSuccess(this._successMessages['editor'])
        //
        //     EventSubscriptionHandler.triggerSubscriptionCall('companyEdited')
        // }
        // return value.success
    }

    // /**
    //  * különböző modulokhoz tartozó betöltendő fájlok: C: controller, M: model, V:View
    //  * @type {{}}
    //  */
    // static requiredFiles = {}
    // /**
    //  * tábla headerek paraméterei - pl: column_name, data_type
    //  * @type {{}}
    //  */
    // static tableAttributeParams = undefined
    // /**
    //  * táblázatba listázáshoz rekordok lekéréséhez url-rész - pl: getBills
    //  * @type string
    //  */
    // static getUrl
    //
    // /**
    //  * rekordlekérő request - post
    //  * @param data {Object} szűrőparaméterek
    //  * @param additionalParams {Object} egyéb paraméterek
    //  */
    //
    // /**
    //  * http request gyors összeálítása
    //  * @param target target task
    //  * @param primaryParam {*} elsődleges paraméter , mint data lesz mentve
    //  * @param additionalParams {{}} plusz paraméterek
    //  * @returns {Promise<unknown>}
    //  */
    // static async createAndSendRequest(target, primaryParam = null, additionalParams = {}) {
    //     let ac = new AjaxCaller()
    //     ac.targetUrl = '?task=' + target
    //     let params = additionalParams
    //     if (primaryParam !== null)
    //         params.data = primaryParam
    //     params.userId = Cookie.getCookie('userId')
    //     ac.postFields = {...params}
    //     ac.addCustomHeader('Content-type', 'application/x-www-form-urlencoded');
    //     return await ac.send()
    // }
    //
    // /**
    //  * tábla header szélességek és sorrend mentése
    //  * @param serviceName {string} modul service neve
    //  * @param headerParams {{headerParams: [][], order: []}} header paraméterek
    //  * @returns {Promise<void>}
    //  */
    // static async sendSaveTableHeaderParams(serviceName, headerParams) {
    //     await this.createAndSendRequest('insertTableHeaderParams', serviceName, {
    //         params: JSON.stringify(headerParams),
    //     })
    // }
    //
    // /**
    //  * tábla header szélességek és sorrend lekérése szerverről
    //  * @param serviceName {string} modul service name
    //  * @returns {Promise<*>}
    //  */
    // static async sendGetTableHeaderParams(serviceName) {
    //     return (await this.createAndSendRequest('getTableHeaderParams', serviceName)).params
    // }
    //
    // /**
    //  * tábla header-okra vonatkozó database paraméterek pl: name, columntype, maxlength  - information_schema.columns táblából
    //  * @param tableNames {string[]} tábla neve(k)
    //  * @returns {Promise<*>}
    //  */
    // static async getTableAttributeParamsFromServer(tableNames) {
    //     return await this.createAndSendRequest('getTableAttributeParams', JSON.stringify(tableNames))
    // }
    //
    // /**
    //  * datalist-ekhez lista lekérése
    //  * @param params {{}} keresési paraméterek pl: table, attribute
    //  * @param value keresési érték (tartalmazás)
    //  * @returns {Promise<*>}
    //  */
    // static async sendGetAttribForDatalist(params, value) {
    //     return await this.createAndSendRequest('getAttribForDatalist', JSON.stringify(params), {
    //         searchValue: value
    //     })
    // }
    //
    // /**
    //  * alkalmazottnevek lekérése szerverről
    //  * @returns {Promise<*>}
    //  */
    // static async getEmployeeNamesFromServer() {
    //     return await this.createAndSendRequest('getEmployeeNames')
    // }
    //
    // /**
    //  * ablak paramétereink mentése, pl: szélesség, left, top, +  nyitási paraméterek moduladatok
    //  * @param serviceName {string} modul név
    //  * @param headerParams {{}} ablak paraméterek pl: szélesség, fullscreen
    //  * @param openParams {{}|false}ha meg van nyitva, az újranyitáshoz szükdséghes paraméterek
    //  * @returns {Promise<void>}
    //  */
    // static async sendSaveWindowParams(serviceName, headerParams, openParams) {
    //     await this.createAndSendRequest('insertWindowParams', serviceName, {
    //         params: JSON.stringify(headerParams),
    //         openParams: JSON.stringify(openParams),
    //     })
    // }
    //
    // /**
    //  * ablak paramétereinek lekérése szerverről
    //  * @param moduleGroupName modulcsoportnév
    //  * @returns {Promise<*>}
    //  */
    // static async sendGetWindowParams(moduleGroupName) {
    //     return (await this.createAndSendRequest('getWindowParams', moduleGroupName)).params
    // }
}
