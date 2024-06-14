class EntityCreatorControllerParent extends EntityHandlerControllerParent {
    _type = 'creator'

    async displayView(windowBody) {
        this._view.addComponent('handlerTable', new EntityHandlerTableController(this.getWindowContentMainContainer(), this), this._type)
    }

    async collectAndCreateRecord() {
        const collectedData = this._view.getComponent('handlerTable').getInputValues()
        if (!this.validateRecord(collectedData))
            return
        this.encodeStringParameters(collectedData)
        await this.service.sendCreateRequest(collectedData)
        this._view.getComponent('handlerTable').resetTable()
    }
}
