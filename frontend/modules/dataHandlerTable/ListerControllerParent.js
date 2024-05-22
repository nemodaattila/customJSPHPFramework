class ListerControllerParent extends ControllerParent {
    _type = 'list'
    // _searchAndOrderParameters
    _pageTurnerType = 'infinityScroller'
    _serviceModelPointer
    _rowHeight = 20
    
    _searchParamConnector

    init() {
        console.log(this)
        this._searchParamConnector = new ListerTableSearchConnector()
        this._searchParamConnector.orderAndLimitParameterObject= new SearchAndOrderParameters()
        this._searchParamConnector.defaultRowHeight=this._rowHeight
        this._searchParamConnector.controllerPointer=this;
    }

    destruct() {
        this._view.destruct(['pageTurner'])
        this._serviceModelPointer = null
        this._service = null
        this._searchParamConnector = undefined
    }

    getTitle() {
        return this.service.getTitle(this._type)
    }

//     getTableBody()
// {
//     return this._view.getComponent('listerTable').view.tBody
// }

    getHeaderAttributeParams() {
        return this._serviceModelPointer.tableHeaderAttributes
    }

    async displayView(windowBody) {
        this._serviceModelPointer = this.service.model
        let listerTable = new ListerTable(windowBody, this)
        this._view.addComponent('listerTable', listerTable)
        listerTable.displayTableIcons(this._serviceModelPointer.getEnabledOperations())
        this._searchParamConnector.setOrdering(this._serviceModelPointer?.defaultOrder ?? 'id', 'ASC')
        listerTable.drawHeaders(
            this._serviceModelPointer.tableHeaderAttributeOrder,
            this._serviceModelPointer.defaultOrder
        )
        this._searchParamConnector.orderSourceObject= listerTable.view
        this._view.addComponent("pageTurner", this._searchParamConnector.createOffsetSourceObject(this._pageTurnerType,listerTable,this))
        console.dir(windowBody)
        this._searchParamConnector.tableDOMElement=this._view.getComponent('listerTable').view.tBody
        this._searchParamConnector.setAutoLimit()
        // this.getRecordsFromServer("refresh")
    }

    //reset
    onTableFilterChange() {
        // this._view.getComponent('listerTable').flushTable()
        // this._searchAndOrderParameters.offset = 0;
        this._searchParamConnector.resetOffset()
        // this._searchAndOrderParameters.limit = Math.floor(parseInt(this._view.getComponent('listerTable').getTBodyHeight()) / this._rowHeight)
        this.getRecordsFromServer("reset", true)
    }

    onSortElementClick(parameterName, order) {
        console.log(parameterName)
        console.log(order)
        this._searchParamConnector.setOrdering(parameterName, order)
        // this._view.getComponent('listerTable').flushTable()
        this.getRecordsFromServer("reset", true)
    }

    refreshTable(type='soft')
    {
        if (type ==='soft')
            this.softRefreshTable()
        if (type ==='hard')
            this.softRefreshTable()
    }

    hardRefreshTable() {
        // this._view.getComponent('listerTable').flushTable()
        this.getRecordsFromServer("refresh", true)
    }

    softRefreshTable() {
        this.getRecordsFromServer("refresh")
    }

    async getRecordsFromServer(type, hardReset = false) {
        await this.collectSearchParamsForRequest(type, hardReset)
    }

    zoomContent(zoomValue) {
        this._view.getComponent('listerTable').zoomContent(zoomValue)
    }

    async collectSearchParamsForRequest(type, hardReset = false) {
        if (this.service === undefined) {
            alert('please set controllor `service` property');
            return;
        }
        this._view.getComponent('listerTable').flushTable()
        this._searchParamConnector.setAutoLimit()
        let searchParams = {}
        searchParams.orderAndLimitParams = this._searchParamConnector.getSearchParameters()

        searchParams.additionalParams = null
        if (typeof this.getConnectedSearchParams === "function")
            searchParams.additionalParams = this.getConnectedSearchParams()
        searchParams.filterParams = this._view.getComponent('listerTable').collectAndConvertFilterParams()
        let res = await this.service.getRecordsFromServer(searchParams, hardReset)
        console.log(res)
        let [records, hasNext] = res
        console.trace()
        if (records !== false) {
            console.log(records)
            console.log(type)

            if (type === 'reset' || type === 'refresh') {

                this._view.getComponent('listerTable').displayRecordsInTable(records)
                let pageNum = Math.floor(searchParams.orderAndLimitParams.offset / searchParams.orderAndLimitParams.limit) + 1
                console.log(pageNum)
                this._searchParamConnector.hidePageElementsAccordingToPageNum(pageNum, hasNext)
                // this._view.getComponent('pageTurner')?.hideElementsAccordingToPageNum?.(pageNum, hasNext)
                // this.windowContentPointer.entityHandlerIcons['refresh'].classList.remove('expiredBill')
            } else {
                this.appendTableData(records)
            }
        }
    }

    // changePage(pageNun) {
    //     this._searchAndOrderParameters.changePageParams(pageNun)
    //     this.getRecordsFromServer('refresh')
    // }

    displayHideColumn(isDisplay, columnName) {
        if (isDisplay) {
            this._serviceModelPointer.addHeaderAttributeToOrder(columnName)
        } else
            this._serviceModelPointer.deleteHeaderAttributeFromOrder(columnName)
        this.redrawTable()
        console.log(this._serviceModelPointer)
    }

    moveColumn(moveCellFrom, moveCellTo) {
        this._serviceModelPointer.moveColumnInOrder(moveCellFrom, moveCellTo)
        this.redrawTable()
    }

    async redrawTable() {
        let recordIds = this._view.getComponent('listerTable').getDisplayRowIds()
        console.log(recordIds)
        console.log(this._serviceModelPointer.tableHeaderAttributeOrder)
        this._view.getComponent('listerTable').flushTable()
        this._view.getComponent('listerTable').drawHeaders(
            this._serviceModelPointer.tableHeaderAttributeOrder,
            // this._serviceModelPointer.tableHeaderAttributes,
            this._serviceModelPointer.defaultOrder,
            true
        )
        this._view.getComponent('listerTable').displayRecordsInTable(await this._service.getRecordsFromLocalDatabase(recordIds))
    }

    async refreshRows() {
        let recordIds = this._view.getComponent('listerTable').getDisplayRowIds()
        this._view.getComponent('listerTable').flushTable()
        this._view.getComponent('listerTable').displayRecordsInTable(await this._service.getRecordsFromLocalDatabase(recordIds, true))
    }

    // getEnabledOperations() {   //DO rethink with AUTH in mind
    //     return this.service.getEnabledOperations()
    // }
    //
    // getTableHeaderOrder() {   //DO rethink with AUTH in mind
    //     return this.service.getTableHeaderOrder()
    // }
}
