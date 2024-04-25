class ListerTableConnector{

    _controller

    _listerTable

    constructor(controller, container) {
       this._controller = container
        this._listerTable = new ListerTable(container)
        this._listerTable.displayTableIcons(controller.getEnabledOperations())
        this._listerTable.drawHeaders(controller.getTableHeaderOrder())
    }
}
