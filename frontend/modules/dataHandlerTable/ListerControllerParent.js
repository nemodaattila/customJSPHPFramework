class ListerControllerParent extends ControllerParent {
    _type = 'list'
    _searchAndOrderParameters
    _pageTurnerType = 'infinity'
    _serviceModelPointer

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
        this._view.addComponent('listerTable', listerTable)
        listerTable.displayTableIcons(this._serviceModelPointer.getEnabledOperations())
        this._searchAndOrderParameters.setOrdering(this._serviceModelPointer.defaultOrder ?? 'id', 'ASC')
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
       this._searchAndOrderParameters.limit= listerTable.getTBodyHeight()

       await this.collectSearchParamsForRequest("refresh")
    }

    async collectSearchParamsForRequest(type) {
        if (this.service === undefined) {
            alert('please set controllor `service` property');
            return;
        }
        let additionalParams = null
        if (typeof this.getConnectedSearchParams === "function")
            additionalParams = this.getConnectedSearchParams()
        let res = await this.service.getRecordsFromServer(this.windowContentPointer.getSearchParams(type), additionalParams)
        if (res !== false) {
            if (type === 'reset' || type === 'refresh') {
                this.displayTableData(res)
                this.windowContentPointer.entityHandlerIcons['refresh'].classList.remove('expiredBill')
            } else {
                this.appendTableData(res)
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
