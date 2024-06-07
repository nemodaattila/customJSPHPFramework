class CompanyEditorController extends EntityHandlerControllerParent {

     constructor() {
          super('editor');
          // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
     }

     displayView(windowBody) {
          super.displayView(windowBody)
          //TODO del record button
          this._view.addButtonContainer(1, {value: 'Cég adatainak módosítása'}, () =>
              this.collectAndSaveRecord())
     }
     //
     // /**
     //  *
     //  * @param {string|int} id
     //  * @param {string} name
     //  */
     // refreshCompanyData({id, name}) {
     //      if (this === Desktop.previousWindow.controllerPointer)
     //           this.view.setCustomDatalistValue('reseller_company', id, name)
     // }
     //
     // /**
     //  * adatok összegyűjtése elküldése
     //  */

}
