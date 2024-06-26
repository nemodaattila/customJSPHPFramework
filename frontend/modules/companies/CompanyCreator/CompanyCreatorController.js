/**
 * controller for creating companies
 */
class CompanyCreatorController extends EntityCreatorControllerParent {
    // subscribeToEvents() {
    //     // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
    // }
    async displayView(windowBody) {
        await super.displayView(windowBody)
        this._view.addButtonWithContainer(1, {value: 'Cég hozzáadása'}, () =>
            this.collectAndSaveRecord())
    }
}
