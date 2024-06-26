/**
 * controller for creating bills
 */
class BillCreatorController extends EntityCreatorControllerParent {
    // _eventsToSubscribe = [{
    //     triggerWord: 'companyDataForEntity',
    //     functionName: 'refreshCompanyData'
    // }]

    async displayView(windowBody) {
        await super.displayView(windowBody)
        this._view.addButtonWithContainer(1, {value: 'Számla hozzáadása'}, () =>
            this.collectAndSaveRecord())
    }
}
