/**
 * controller a cégek kilistázására táblás formában
 */
class CompanyListerController extends EntityListerControllerParent {
    subscribeToEvents() {
        EventSubscriptionHandler.subscribe('companyHandlerEvent', this, 'onHandlerEvent')
    }
     _pageTurnerType = 'infinityScroller'
    //_pageTurnerType = 'pageTurner'
}
