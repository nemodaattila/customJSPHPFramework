class ServiceModelParent {
    _tableHeaderAttributes = {}
    _records = {}

    _loaded = false

    set loaded(value) {
        this._loaded = value;
    }

    _tableHeaderAttributeOrder = undefined

    get tableHeaderAttributeOrder() {
        return this._tableHeaderAttributeOrder
    }

    setTableHeaderAttributeOrder() {
        console.log('setTableHeaderAttributeOrder')
        console.log(this._tableHeaderAttributes)
        if (this._tableHeaderAttributes !== undefined) {
            this._tableHeaderAttributeOrder = Object.keys(this._tableHeaderAttributes)
        }
        console.log(this)
    }

    isIdInRecords(id) {
        return Object.keys(this._records).findIndex(rId => rId === id) !== -1
    }

    addRecord(id, record) {
        this._records[id] = record
    }

    getRecordByIdForListTable(id) {
        console.log(id)
        let record = {...this._records[id]}
        let recordData = this._tableHeaderAttributeOrder.map(param => {
            console.log(param)
            let filterType = this._tableHeaderAttributes[param].type ?? 'string'
            let tdContent
            if (filterType === 'select') {
                console.log()
                tdContent = this._tableHeaderAttributes[param].values[record[param]]
            } else {
                try {
                    tdContent = record[param] === null || record[param] === undefined ? '' : decodeURIComponent(record[param])
                } catch (e) {
                    tdContent = record[param]
                }
            }
            console.log([tdContent, filterType])
            return [tdContent, filterType, param]
        })
        recordData = [record.id, recordData]
        console.log(recordData)
        return recordData
    }
}
