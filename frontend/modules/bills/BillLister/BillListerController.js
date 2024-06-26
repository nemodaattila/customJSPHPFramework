/**
 * controller for listing bills
 */
class BillListerController extends EntityListerControllerParent {
    _eventsToSubscribe = [{
        triggerWord: 'billHandlerEvent',
        functionName: 'onHandlerEvent'
    }]

    createPageTurnerObject() {
        return new InfinityScrollerController()
        // this._pageTurner = new PageTurner()
    }
}
