class HandlerTable {

    _view
    _controllerPointer
    _headerAttributeParams
    _type

    constructor(container, controllerPointer, type) {
        this._view = new HandlerTableView(container, this)
        this._controllerPointer = controllerPointer
        this._headerAttributeParams = this._controllerPointer.getHeaderAttributeParams()
        this._view.displayTableElements(this._headerAttributeParams, type === 'multipleEditor')
        this._type=type
    }

    getInputValues()
    {
       return this._view.getInputValues(this._headerAttributeParams)
    }

    resetTable()
    {
        this._view.resetTable(this._headerAttributeParams,this._type === 'multipleEditor')
    }


}
