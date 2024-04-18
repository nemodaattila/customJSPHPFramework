/**
 * controller a cégek kilistázására táblás formában
 */
class ListAllCompanyController { // extends ListAllControllerParent {
    subscribeToEvents() {
        EventSubscriptionHandler.subscribe('companyEdited', this, 'refresh')
    }

    init() {
        this.parentInit(new ListAllCompanyModel())
        this.windowContentPointer.hideEntityHandlerIcons(['delete'])
    }
}
