class EntityEditorControllerParent extends EntityHandlerControllerParent {
    _type = 'editor'
    /**
     * több adatot kezel?
     * @type {boolean}
     */
    _isMultiple = false
    get isMultiple() {
        return this._isMultiple;
    }



    async displayView(windowBody) {
        console.log(this)

        this._isMultiple = this._service.model.selectedIds.length > 1

        this._view.addIdLabel(!this._isMultiple ?
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
        await this.service.sendEditRequest(collectedData, this._isMultiple)
    }

    async collectAndEditRecord() {
        console.log(this._isMultiple)
        this._isMultiple ?  await this.collectAndEditMultipleRecord():await this.collectAndEditOneRecord()
    }

    async collectAndEditOneRecord() {
        const collectedData = this._view.getComponent('handlerTable').getInputValues()
        if (!collectedData)
            return
        const originalData = await this.service.getSelectedDataFromLocalDatabase()
        this.getDifferenceBetweenModifiedDataAndOriginal(collectedData, originalData)
        // this.encodeStringParameters(collectedData)
        collectedData.id = originalData.id
        await this.service.sendEditRequest(collectedData)
    }

    async collectAndEditMultipleRecord() {
        const collectedData = this._view.getComponent('handlerTable').getNotEmptyInputValues()
        console.log(collectedData)
        if (Object.keys(collectedData).length === 0)
            return;
        // this.encodeStringParameters(collectedData)
        collectedData.id = this._serviceModelPointer.selectedIds
        await this.service.sendEditRequest(collectedData, true)
        this._view.getComponent('handlerTable').resetTable()
    }

    getDifferenceBetweenModifiedDataAndOriginal(collectedData, originalData) {
        Object.entries(collectedData).forEach(([key, value]) => {
            if (value === originalData[key])
                delete collectedData[key]
        })
    }
}
