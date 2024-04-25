/**
 * controller a cégek kilistázására táblás formában
 */
class CompanyListerController extends ControllerParent {
    // subscribeToEvents() {
    //     EventSubscriptionHandler.subscribe('companyEdited', this, 'refresh')
    // }



    _type='list'

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

    displayView()
    {

    }
}
