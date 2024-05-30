/**
 * controller a cégek kilistázására táblás formában
 */
class CompanyListerController extends ListerControllerParent {
    subscribeToEvents() {
        EventSubscriptionHandler.subscribe('companyHandlerEvent', this, 'refreshRows')
    }
     _pageTurnerType = 'infinityScroller'
    //_pageTurnerType = 'pageTurner'
}
