/**
 * szerverrel kapcsolatot tartó objektumok ősosztálya
 */
class ServiceParent {
    set model(value) {
        this._model = value;
    }

    static _instance

    _model

    constructor(){
        if(self._instance){
            self._instance = this;
        }
        return self._instance;
    }
    async init() {
        return new Promise(async (resolve) => {
            resolve(true)
        })
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
    // static async getRecordsFromServer(data, additionalParams = null) {
    //     if (data.offset < 0 || data.limit < 1)
    //         return false
    //     let ac = new AjaxCaller()
    //     ac.targetUrl = '?task=' + this.getUrl
    //     ac.postFields = {
    //         userId: Cookie.getCookie('userId'),
    //         filters: JSON.stringify(data.filters),
    //         orderLimit: JSON.stringify({
    //             offset: data.offset,
    //             limit: data.limit,
    //             order: data.order,
    //             orderDir: data.orderDir
    //         })
    //     }
    //     if (additionalParams !== null)
    //         ac.postFields.additionalParams = JSON.stringify(additionalParams)
    //     ac.addCustomHeader('Content-type', 'application/x-www-form-urlencoded');
    //     try {
    //         return await ac.send(false)
    //     } catch (e) {
    //         return false
    //     }
    // }
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
