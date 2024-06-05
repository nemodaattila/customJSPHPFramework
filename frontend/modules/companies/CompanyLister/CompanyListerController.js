/**
 * controller a cégek kilistázására táblás formában
 */
class CompanyListerController extends EntityListerControllerParent {
    subscribeToEvents() {
        EventSubscriptionHandler.subscribe('companyHandlerEvent', this, 'refreshRows')
    }
     _pageTurnerType = 'infinityScroller'
    //_pageTurnerType = 'pageTurner'
}
