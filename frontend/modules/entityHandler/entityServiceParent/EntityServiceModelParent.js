class EntityServiceModelParent {
    _records = {}

    _tableHeaderAttributes = {}

    _selectedIds = []

    /**
     * url parameter chunk for request to backend for, e.g.: GET -> <backendUrl>/company/23
     * @type {string|undefined}
     * @private
     */
    _restParameter = undefined

    /**
     * success message displayed, when an operation succeeded
     * @type {{editor: string, creator: string, delete: string}}
     * @private
     */
    _successMessages = {}

    _moduleParams = undefined

    /**
     * default order attribute of the connected lister Table
     * @type {string}
     * @private
     */
    _defaultOrder

    /**
     * the name of the event, which triggers when an entity's parameter is changed, an entity created or deleted
     * @type {string|undefined}
     * @private
     * @see EventSubscriptionHandler
     */
    _handlerEventTrigger = undefined

    /**
     * name of the directory in which the module can be found (in modules map)
     * @type {string}
     * @private
     */
    _moduleDirName

    _modulParams

    get defaultOrder() {
        return this._defaultOrder;
    }

    get restParameter() {
        return this._restParameter;
    }

    get handlerEventTrigger() {
        return this._handlerEventTrigger;
    }

    get successMessages() {
        return this._successMessages;
    }

    get moduleDirName() {
        return this._moduleDirName;
    }
    constructor() {
        // console.trace()
        console.log('modelInit')
    }
    get selectedIds() {
        return this._selectedIds;
    }

    set selectedIds(value) {
        this._selectedIds = value;
    }

    addSelectedId(value)
    {
        console.log(value)
        this._selectedIds.push(value)
        console.log(this._selectedIds)

    }

    removeSelectedId(index)
    {
        this._selectedIds.splice(index, 1)
    }

    set tableHeaderAttributes(value) {
        this._tableHeaderAttributes = value;
    }

    get tableHeaderAttributes() {
        return this._tableHeaderAttributes;
    }

    _loaded = false
    set loaded(value) {
        this._loaded = value;
    }

    get loaded() {
        return this._loaded;
    }

    get moduleParams() {
        return this._moduleParams;
    }

    _tableHeaderAttributeOrder = undefined
    get tableHeaderAttributeOrder() {
        return this._tableHeaderAttributeOrder
    }

    setTableHeaderAttributeOrder() {
        console.log('setTableHeaderAttributeOrder')
        console.log(this._tableHeaderAttributes)
        if (Object.keys(this._tableHeaderAttributes).length !== 0)
            this._tableHeaderAttributeOrder = Object.keys(this._tableHeaderAttributes)

        console.log(this)
    }

    // deleteHeaderAttributeFromOrder(headerName) {
    //     const index = this.tableHeaderAttributeOrder.indexOf(headerName);
    //     if (index > -1)  // only splice array when item is found
    //         this.tableHeaderAttributeOrder.splice(index, 1); // 2nd parameter means remove one item only
    // }

    // addHeaderAttributeToOrder(headerName) {
    //     this.tableHeaderAttributeOrder.unshift(headerName)
    // }
    //
    // moveColumnInOrder(moveCellFrom, moveCellTo) {
    //     let headerName = this.tableHeaderAttributeOrder.splice(moveCellFrom, 1)[0];
    //     this.tableHeaderAttributeOrder.splice(moveCellTo, 0, headerName);
    // }

    deleteRecord(id) {
        delete this._records[id];
    }

    isIdInRecords(id) {
        if (!this._records[id])
            return false;
        if (Math.abs(this._records[id]._queryed - Date.now()) > 600000) {
            delete this._records[id];
            return false
        }
        return true
    }

    addRecord(id, record) {
        this._records[id] = record
        record._queryed = Date.now()
    }

    getRecordByIdForListHandling(id)
    {
        return {...this._records[id]}
    }

    getRecordByIdForListTable(id) {
        const record = {...this._records[id]}
        let recordData = {}



        this._tableHeaderAttributeOrder.forEach(param  =>{
            recordData[param] = [record[param],this._tableHeaderAttributes[param]]
        })
        return recordData
    }

    /**
     * get enabled handler operations, NOT same as user privileges
     * @returns {{editor: boolean, lister: boolean, creator: boolean, deletable: boolean}}
     */
    getEnabledOperations() {
        return {
            lister: this._moduleParams.lister !== undefined ?? false,
            editor: this._moduleParams.editor !== undefined?? false,
            creator: this._moduleParams.creator !== undefined ?? false,
            deletable: this._moduleParams.deletable ?? false
        }
    }

    /**
     * get title (window label) of the module
     * @param moduleName {string}
     * @returns {string}
     */
    getTitle(moduleName) {
        console.log(moduleName)
        console.log(this._moduleParams)
        console.trace()
        return this._moduleParams[moduleName].title
    }
}
