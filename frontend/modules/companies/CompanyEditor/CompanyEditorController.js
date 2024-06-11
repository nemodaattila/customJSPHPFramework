/**
 * controller for editing companies
 */
class CompanyEditorController extends EntityHandlerControllerParent {
    subscribeToEvents() {
        // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
    }

    async displayView(windowBody) {
        await super.displayView(windowBody)
        //TODO del record button
        this._view.addButtonWithContainer(1, {value: 'Cég adatainak módosítása'}, () =>
            this.collectAndSaveRecord())
    }
}
