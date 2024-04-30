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

    displayView(windowBody) {
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
        if (this._pageTurnerType === 'pageTurner')
            let pageTurner = new PageTurnerController(windowBody)
    }

    // getEnabledOperations() {   //DO rethink with AUTH in mind
    //     return this.service.getEnabledOperations()
    // }
    //
    // getTableHeaderOrder() {   //DO rethink with AUTH in mind
    //     return this.service.getTableHeaderOrder()
    // }
}
