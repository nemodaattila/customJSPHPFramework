/**
 * controller for listing companies
 */
class CompanyListerController extends EntityListerControllerParent {
    _eventsToSubscribe = [{
        triggerWord: 'companyHandlerEvent',
        functionName: 'onHandlerEvent'
    }]

    createPageTurnerObject() {
        return new InfinityScrollerController()
        // this._pageTurner = new PageTurner()
    }
}
