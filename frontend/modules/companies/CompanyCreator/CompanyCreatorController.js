class CompanyCreatorController extends HandlerControllerParent {

     constructor(module) {
          super('creator');
          // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
     }

     displayView(windowBody) {
          super.displayView(windowBody)

          this._view.addButtonToTallTable(1, {value: 'Cég hozzáadása'}, () =>
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
