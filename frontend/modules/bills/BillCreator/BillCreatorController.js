/**
 * controller for creating companies
 */
class BillCreatorController extends EntityCreatorControllerParent {
    subscribeToEvents() {
        // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
    }

   async displayView(windowBody) {
        await super.displayView(windowBody)
        this._view.addButtonWithContainer(1, {value: 'Számla hozzáadása'}, () =>
            this.collectAndSaveRecord())
    }
}
