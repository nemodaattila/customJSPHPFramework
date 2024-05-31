class ListerControllerParent extends ControllerParent {
    _type = 'lister'
    // _searchAndOrderParameters
    _pageTurnerType = 'infinityScroller'
    _serviceModelPointer
    _rowHeight = 20
    _searchParamConnector
    _tableHeaderAttributeOrder

    init() {
        //DO check zoom with search and scroll
        super.init()
        console.log(this)
        this._searchParamConnector = new ListerTableSearchConnector()
        this._searchParamConnector.orderAndLimitParameterObject = new SearchAndOrderParameters()
        this._searchParamConnector.defaultRowHeight = this._rowHeight
        this._searchParamConnector.controllerPointer = this;
    }

    setHeaderAttributeOrder() {
        let params = this.getHeaderAttributeParams()
        this._tableHeaderAttributeOrder = Object.keys(params).filter((name) => {
            if (!params[name].inModule || params[name].inModule.findIndex(module => module === 'lister') !== -1)
                return name
        })

    }

    destruct() {
        this._view.destruct(['pageTurner'])
        this._serviceModelPointer = null
        this._service = null
        this._searchParamConnector = undefined
    }

//     getTableBody()
// {
//     return this._view.getComponent('listerTable').view.tBody
// }
    getHeaderAttributeParams() {
        return this._serviceModelPointer.tableHeaderAttributes
    }

    async displayView() {
        this._serviceModelPointer = this.service.model
        this.setHeaderAttributeOrder()
        let listerTable = new ListerTable(this)
        this._view.addComponent('listerTable', listerTable)
        listerTable.displayTableIcons(this._serviceModelPointer.getEnabledOperations())
        this._searchParamConnector.setOrdering(this._serviceModelPointer?.defaultOrder ?? 'id', 'ASC')
        listerTable.drawHeaders(
            this._tableHeaderAttributeOrder,
            this._serviceModelPointer.defaultOrder
        )
        this._searchParamConnector.orderSourceObject = listerTable.view
        console.trace()
        this._view.addComponent("pageTurner", await this._searchParamConnector.createOffsetSourceObject(this._pageTurnerType, listerTable, this))
        this._searchParamConnector.tableDOMElement = this._view.getComponent('listerTable').view._dataTable
        // this._searchParamConnector.setAutoLimit()
        // this.getRecordsFromServer("refresh")
        this.openHandlerWindow('creator')
    }

    //reset
    onTableFilterChange() {
        // this._view.getComponent('listerTable').flushTable()
        // this._searchAndOrderParameters.offset = 0;
        // this._searchParamConnector.resetOffset()
        // this._searchAndOrderParameters.limit = Math.floor(parseInt(this._view.getComponent('listerTable').getTBodyHeight()) / this._rowHeight)
        this.refreshRows({resetOffset: true, reDrawHeader: false})
    }

    onSortElementClick(parameterName, order) {
        console.log(parameterName)
        console.log(order)
        this._searchParamConnector.setOrdering(parameterName, order)
        // this._view.getComponent('listerTable').flushTable()
        // this.getRecordsFromServer("reset", true)
        this.refreshRows({resetOffset: true, reDrawHeader: false})
    }

    // async getRecordsFromServer(type, hardReset = false) {
    //     await this.collectSearchParamsForRequest(type, hardReset)
    // }
    zoomContent(zoomValue) {
        this._view.getComponent('listerTable').zoomContent(zoomValue)
    }

    onDesktopWindowResize() {
        this.refreshRows({resetOffset: true})
    }

    async refreshRows(params = {}) {
        console.log(params)
        params = params ?? {}
        if (!this.service) {
            alert('please set controllor `service` property');
            return;
        }
        this._searchParamConnector.setAutoLimit(params.maxValueChange)
        if (params.resetOffset ?? false)
            this._searchParamConnector.resetOffset()
        let searchParams = await this.collectSearchParamsForRequest(params)
        let recordIds, hasNext
        if (params.ids) {
            recordIds = params.ids;
        } else {
            let res = await this.service.getRecordsFromServer(searchParams)
            recordIds = res.ids
            hasNext = res.hasNext
        }
        console.log(recordIds)
        console.log(hasNext)
        let records = await this.service.getRecordsFromLocalDatabase(recordIds, params.hardReset)
        this._view.getComponent('listerTable').flushTable()
        if (params.reDrawHeader)
            await this.redrawTable()

        if (records) {
            this._view.getComponent('listerTable').displayRecordsInTable(records,this._tableHeaderAttributeOrder)
            if (!params.reDrawHeader)
                this._searchParamConnector.hidePageElementsAccordingToPageNum(hasNext)
            // this._view.getComponent('pageTurner')?.hideElementsAccordingToPageNum?.(pageNum, hasNext)
            // this.windowContentPointer.entityHandlerIcons['refresh'].classList.remove('expiredBill')
        }
    }

    async collectSearchParamsForRequest({ redrawHeaders = false}) {

        let searchParams = {}
        searchParams.orderAndLimitParams = this._searchParamConnector.getSearchParameters()
        searchParams.additionalParams = null
        if (typeof this.getConnectedSearchParams === "function")
            searchParams.additionalParams = this.getConnectedSearchParams()
        searchParams.filterParams = this._view.getComponent('listerTable').collectAndConvertFilterParams()
        return searchParams
    }

    // changePage(pageNun) {
    //     this._searchAndOrderParameters.changePageParams(pageNun)
    //     this.getRecordsFromServer('refresh')
    // }
    displayHideColumn(isDisplay, columnName) {

        isDisplay?            this.addHeaderAttributeToOrder(columnName):this.deleteHeaderAttributeFromOrder(columnName)
        this.redrawTable()
    }

    deleteHeaderAttributeFromOrder(headerName) {
        const index = this._tableHeaderAttributeOrder.indexOf(headerName);
        if (index > -1)  // only splice array when item is found
            this._tableHeaderAttributeOrder.splice(index, 1); // 2nd parameter means remove one item only
    }

    addHeaderAttributeToOrder(headerName) {
        this._tableHeaderAttributeOrder.unshift(headerName)
    }

    moveColumnInOrder(moveCellFrom, moveCellTo) {
        let headerName = this._tableHeaderAttributeOrder.splice(moveCellFrom, 1)[0];
        this._tableHeaderAttributeOrder.splice(moveCellTo, 0, headerName);
    }

    moveColumn(moveCellFrom, moveCellTo) {
        this.moveColumnInOrder(moveCellFrom, moveCellTo)
        this.redrawTable()
    }

    async redrawTable() {
        let recordIds = this._view.getComponent('listerTable').getDisplayRowIds()
        console.log(recordIds)
        console.log(this._tableHeaderAttributeOrder)
        this._view.getComponent('listerTable').flushTable()
        this._view.getComponent('listerTable').drawHeaders(
            this._tableHeaderAttributeOrder,
            // this._serviceModelPointer.tableHeaderAttributes,
            this._serviceModelPointer.defaultOrder,
            true
        )
        this._view.getComponent('listerTable').displayRecordsInTable(await this._service.getRecordsFromLocalDatabase(recordIds),this._tableHeaderAttributeOrder)
    }

    async openHandlerWindow(operationType) {
        // await Includer.loadFileSource('dataHandlerTable')
        console.log(this)
        switch (operationType) {
            case 'creator':
                DesktopController.openWindow(this._serviceModelPointer.moduleDirName, this._serviceModelPointer.moduleParams.creator.module)
                break
            default:
                Messenger.showAlert('there is no operation type as ' + operationType)
        }
    }

    // async refreshRows() {
    //     let recordIds = this._view.getComponent('listerTable').getDisplayRowIds()
    //     this._view.getComponent('listerTable').flushTable()
    //     this._view.getComponent('listerTable').displayRecordsInTable(await this._service.getRecordsFromLocalDatabase(recordIds, true))
    // }
    // getEnabledOperations() {   //DO rethink with AUTH in mind
    //     return this.service.getEnabledOperations()
    // }
    //
    // getTableHeaderOrder() {   //DO rethink with AUTH in mind
    //     return this.service.getTableHeaderOrder()
    // }
}
