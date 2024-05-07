class ListerControllerParent extends ControllerParent {
    _type = 'list'
    _searchAndOrderParameters
    _pageTurnerType = 'infinity'
    _serviceModelPointer
    _rowHeight = 20
    _listerTable

    init() {
        console.log(this)
        this._searchAndOrderParameters = new SearchAndOrderParameters()
    }

    getTitle() {
        return this.service.getTitle(this._type)
    }

    async displayView(windowBody) {
        this._serviceModelPointer = this.service.model
        let listerTable = new ListerTable(windowBody)
        this._listerTable = listerTable
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
        this._view.addComponent(pageTurner)
        console.dir(windowBody)
        this._searchAndOrderParameters.limit = Math.floor(parseInt(listerTable.getTBodyHeight()) / this._rowHeight)
        this.getRecordsFromServer("refresh")
    }

    async getRecordsFromServer(type) {
        await this.collectSearchParamsForRequest(type)
    }

    zoomContent(zoomValue) {
        this._listerTable.zoomContent(zoomValue)
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

    // getEnabledOperations() {   //DO rethink with AUTH in mind
    //     return this.service.getEnabledOperations()
    // }
    //
    // getTableHeaderOrder() {   //DO rethink with AUTH in mind
    //     return this.service.getTableHeaderOrder()
    // }
}
