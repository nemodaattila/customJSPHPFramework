/**
 * controller a cégek kilistázására táblás formában
 */
class CompanyListerController extends ControllerParent {
    // subscribeToEvents() {
    //     EventSubscriptionHandler.subscribe('companyEdited', this, 'refresh')
    // }
    _type = 'list'
    // _pageTurnerType = 'infinity'
    _pageTurnerType = 'pageTurner'
    _tableConnector
    _searchAndOrderParameters


    serviceModelPointer
    init() {
        console.log(this)
        this._searchAndOrderParameters = new SearchAndOrderParameters()
        //     this.parentInit(new ListAllCompanyModel())
        //     this.windowContentPointer.hideEntityHandlerIcons(['delete'])
        //     this._model=new CompanyListerModel();
        //     this._view=new CompanyListerView();
    }



    getTitle() {
        return this.service.getTitle(this._type)
    }

    displayView(windowBody) {
        this.serviceModelPointer = this.service.model
        let listerTable = new ListerTable(windowBody)

        this._view.addComponent('listerTable', listerTable)

        listerTable.displayTableIcons(this.serviceModelPointer.getEnabledOperations())
        this._searchAndOrderParameters.setOrdering(this.serviceModelPointer.defaultOrder ?? 'id', 'ASC')

        listerTable.drawHeaders(
            this.serviceModelPointer.tableHeaderAttributeOrder,
            this.serviceModelPointer.tableHeaderAttributes,
            this.serviceModelPointer.defaultOrder
        )


    }
    //
    // getEnabledOperations() {   //DO rethink with AUTH in mind
    //     return this.service.getEnabledOperations()
    // }
    //
    // getTableHeaderOrder() {   //DO rethink with AUTH in mind
    //     return this.service.getTableHeaderOrder()
    // }
}
