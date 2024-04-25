class ListerTableConnector{

    _controller

    _listerTable

    serviceModelPointer

    constructor(controller, container) {
       this._controller = controller
        this.serviceModelPointer = controller.service.model
        this._listerTable = new ListerTable(container)

        this._listerTable.displayTableIcons(this.serviceModelPointer.getEnabledOperations())
        controller.        setOrdering(this.serviceModelPointer.defaultOrder ?? 'id', 'ASC')
        this._listerTable.drawHeaders(
            this.serviceModelPointer.tableHeaderAttributeOrder,
            this.serviceModelPointer.tableHeaderAttributes,
            this.serviceModelPointer.defaultOrder
            )
    }
}
