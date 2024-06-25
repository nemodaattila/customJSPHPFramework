/**
 * controller for listing companies
 */
class BillListerController extends EntityListerControllerParent {
    subscribeToEvents() {
        EventSubscriptionHandler.subscribe('billHandlerEvent', this, 'onHandlerEvent')
    }

    createPageTurnerObject() {
        return new InfinityScrollerController()
        // this._pageTurner = new PageTurner()
    }
}
