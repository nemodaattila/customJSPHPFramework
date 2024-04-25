class ServiceModelParent {
    _loaded = false

    set loaded(value) {
        this._loaded = value;
    }

    _tableHeaderAttributeOrder = undefined

    setTableHeaderAttributeOrder() {
        console.log('setTableHeaderAttributeOrder')
        console.log(this._tableHeaderAttributes)
        if (this._tableHeaderAttributes !== undefined) {
            this._tableHeaderAttributeOrder = Object.keys(this._tableHeaderAttributes)
        }
        console.log(this)
    }

    get tableHeaderAttributeOrder() {
        return this._tableHeaderAttributeOrder
    }
}
