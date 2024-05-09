class ListerControllerParent extends ControllerParent {
    _type = 'list'
    _searchAndOrderParameters
    _pageTurnerType = 'infinity'
    _serviceModelPointer
    _rowHeight = 20

    init() {
        console.log(this)
        this._searchAndOrderParameters = new SearchAndOrderParameters()
    }

    destruct() {
        this._view.destruct(['pageTurner'])
        this._serviceModelPointer = null
        this._service = null
        this._searchAndOrderParameters = undefined
    }

    getTitle() {
        return this.service.getTitle(this._type)
    }

    async displayView(windowBody) {
        this._serviceModelPointer = this.service.model
        let listerTable = new ListerTable(windowBody, this)
        this._view.addComponent('listerTable', listerTable)
        listerTable.displayTableIcons(this._serviceModelPointer.getEnabledOperations())
        this._searchAndOrderParameters.setOrdering(this._serviceModelPointer?.defaultOrder ?? 'id', 'ASC')
        listerTable.drawHeaders(
            this._serviceModelPointer.tableHeaderAttributeOrder,
            this._serviceModelPointer.tableHeaderAttributes,
            this._serviceModelPointer.defaultOrder
        )
        let pageTurner
        if (this._pageTurnerType === 'pageTurner') {
            await Includer.loadFileSource('pageTurner')
            pageTurner = new PageTurnerController(listerTable.getTableFooter())
        }
        this._view.addComponent("pageTurner", pageTurner)
        console.dir(windowBody)
        this._searchAndOrderParameters.limit = Math.floor(parseInt(listerTable.getTBodyHeight()) / this._rowHeight)
        this.getRecordsFromServer("refresh")
    }

    async getRecordsFromServer(type) {
        await this.collectSearchParamsForRequest(type)
    }

    zoomContent(zoomValue) {
        this._view.getComponent('listerTable').zoomContent(zoomValue)
    }

    async collectSearchParamsForRequest(type) {
        if (this.service === undefined) {
            alert('please set controllor `service` property');
            return;
        }
        let searchParams = {}
        searchParams.additionalParams = null
        if (typeof this.getConnectedSearchParams === "function")
            searchParams.additionalParams = this.getConnectedSearchParams()
        searchParams.orderAndLimitParams = this._searchAndOrderParameters.getSearchParameters()
        let records = await this.service.getRecordsFromServer(searchParams)
        console.trace()
        if (records !== false) {
            console.log(records)
            if (type === 'reset' || type === 'refresh') {
                this._view.getComponent('listerTable').displayRecordsInTable(records)
                // this.windowContentPointer.entityHandlerIcons['refresh'].classList.remove('expiredBill')
            } else {
                this.appendTableData(records)
            }
        }
    }

    displayHideColumn(isDisplay, columnName) {
        if (isDisplay) {
            this._serviceModelPointer.addHeaderAttributeToOrder(columnName)
        } else
            this._serviceModelPointer.deleteHeaderAttributeFromOrder(columnName)
        this.refreshTable()
        console.log(this._serviceModelPointer)
    }

    moveColumn(moveCellFrom, moveCellTo) {
        this._serviceModelPointer.moveColumnInOrder(moveCellFrom, moveCellTo)
        this.refreshTable()
    }

    async refreshTable() {
        let recordIds = this._view.getComponent('listerTable').getDisplayRowIds()
        console.log(recordIds)
        console.log(this._serviceModelPointer.tableHeaderAttributeOrder)
        this._view.getComponent('listerTable').drawHeaders(
            this._serviceModelPointer.tableHeaderAttributeOrder,
            this._serviceModelPointer.tableHeaderAttributes,
            this._serviceModelPointer.defaultOrder,
            true
        )
        this._view.getComponent('listerTable').displayRecordsInTable(await this._service.getRecordsFromLocalDatabase(recordIds))
    }

   async refreshRows() {
        let recordIds = this._view.getComponent('listerTable').getDisplayRowIds()
        this._view.getComponent('listerTable').displayRecordsInTable(await this._service.getRecordsFromLocalDatabase(recordIds))
    }

    // getEnabledOperations() {   //DO rethink with AUTH in mind
    //     return this.service.getEnabledOperations()
    // }
    //
    // getTableHeaderOrder() {   //DO rethink with AUTH in mind
    //     return this.service.getTableHeaderOrder()
    // }
}
