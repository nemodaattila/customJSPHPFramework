/**
 * controller for editing companies
 */
class BillEditorController extends EntityEditorControllerParent {
    subscribeToEvents() {
        // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
    }

    async displayView(windowBody) {
        await super.displayView(windowBody)
        //TODO del record button
        this._view.addButtonWithContainer(1, {value: 'Számla adatainak módosítása'}, () =>
            this.collectAndSaveRecord())
    }
}
