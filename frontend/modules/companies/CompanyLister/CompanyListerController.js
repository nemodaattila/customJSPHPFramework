/**
 * controller for listing companies
 */
class CompanyListerController extends EntityListerControllerParent {
    subscribeToEvents() {
        EventSubscriptionHandler.subscribe('companyHandlerEvent', this, 'onHandlerEvent')
    }

    createPageTurnerObject() {
        return new InfinityScrollerController()
        // this._pageTurner = new PageTurner()
    }
}
