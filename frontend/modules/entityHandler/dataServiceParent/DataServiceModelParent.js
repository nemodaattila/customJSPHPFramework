class DataServiceModelParent {
    _records = {}

    _tableHeaderAttributes = {}

    get tableHeaderAttributes() {
        return this._tableHeaderAttributes;
    }

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
        if (this._tableHeaderAttributes)
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

    getRecordByIdForListTable(id) {
        let record = {...this._records[id]}
        let recordData = this._tableHeaderAttributeOrder.map(param => {
            let filterType = this._tableHeaderAttributes[param].type ?? 'string'
            let tdContent
            if (filterType === 'select') {
                tdContent = this._tableHeaderAttributes[param].values[record[param]]
            } else {
                try {
                    tdContent = record[param] === null || record[param] === undefined ? '' : decodeURIComponent(record[param])
                } catch (e) {
                    tdContent = record[param]
                }
            }
            return [tdContent, filterType, param]
        })
        recordData = [record.id, recordData]
        return recordData
    }
}
