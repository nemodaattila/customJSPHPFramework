/**
 * controller a cégek kilistázására táblás formában
 */
class CompanyListerController extends ControllerParent {
    // subscribeToEvents() {
    //     EventSubscriptionHandler.subscribe('companyEdited', this, 'refresh')
    // }



    _type='list'

    // _pageTurnerType = 'infinity'
    _pageTurnerType = 'pageTurner'

    _tableConnector



    init() {
        console.log(this)
    //     this.parentInit(new ListAllCompanyModel())
    //     this.windowContentPointer.hideEntityHandlerIcons(['delete'])
    //     this._model=new CompanyListerModel();
    //     this._view=new CompanyListerView();
    }

    getTitle()
    {
        return this.service.getTitle(this._type)
    }

    displayView(windowBody)
    {
        this._tableConnector = new ListerTableConnector(this, windowBody)
    }

    getEnabledOperations()
    {   //DO rethink with AUTH in mind
        return this.service.getEnabledOperations()
    }

    getTableHeaderOrder()
    {   //DO rethink with AUTH in mind
        return this.service.getTableHeaderOrder()
    }

}
