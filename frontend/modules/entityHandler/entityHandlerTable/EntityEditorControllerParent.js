class EntityEditorControllerParent extends EntityHandlerControllerParent {
    _type = 'editor'
    /**
     * több adatot kezel?
     * @type {boolean}
     */
    _isMultiple = false

    constructor() {
        super();
        this._isMultiple = this._service.selectedIds.length > 1
    }

    async displayView(windowBody) {
        this._view.addIdLabel(this._serviceModelPointer.selectedIds.length === 1 ?
            this._serviceModelPointer.selectedIds[0] :
            this._serviceModelPointer.selectedIds.join(', '))
        this._view.addComponent('handlerTable', new EntityHandlerTableController(this.getWindowContentMainContainer(), this), this._type, this._isMultiple)
        if (!this._isMultiple)
            this._view.getComponent('handlerTable').fillTable(await this.service.getSelectedDataFromLocalDatabase(), this.getHeaderAttributeParams())
    }

    async multipleAttributeDelButtonClicked(attributeName) {
        let collectedData = {}
        collectedData[attributeName] = ''
        collectedData.id = this._serviceModelPointer.selectedIds
        //DO validation
        await this.service.sendEditRequest(collectedData, this._isMultiple)
    }

    async collectAndEditRecord(){
       this._isMultiple?await this.collectAndEditOneRecord(): await this.collectAndEditMultipleRecord()
    }

    async collectAndEditOneRecord() {
        const collectedData = this._view.getComponent('handlerTable').getInputValues()
        if (Object.keys(collectedData).length === 0)
            return;
        if (!this.validateRecord(collectedData))
            return
        const originalData = await this.service.getSelectedDataFromLocalDatabase()
        this.getDifferenceBetweenModifiedDataAndOriginal(collectedData, originalData)
        this.encodeStringParameters(collectedData)
        collectedData.id = originalData.id
        await this.service.sendEditRequest(collectedData)
    }

    async collectAndEditMultipleRecord() {
        const collectedData = this._view.getComponent('handlerTable').getNotEmptyInputValues()
        if (Object.keys(collectedData).length === 0)
            return;
        if (!this.validateRecord(collectedData))
            return
        this.encodeStringParameters(collectedData)
        collectedData.id = this._serviceModelPointer.selectedIds
        await this.service.sendEditRequest(collectedData, true)
        this._view.getComponent('handlerTable').resetTable()
    }

    getDifferenceBetweenModifiedDataAndOriginal(collectedData, originalData)
    {
        Object.entries(collectedData).forEach(([key, value]) => {
            if (value === originalData[key])
                delete collectedData[key]
        })
    }
}
