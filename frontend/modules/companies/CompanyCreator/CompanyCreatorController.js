class CompanyCreatorController extends EntityHandlerControllerParent {

     constructor(module) {
          super('creator');
          // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
     }

     displayView(windowBody) {
          super.displayView(windowBody)

          this._view.addButtonContainer(1, {value: 'Cég hozzáadása'}, () =>
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
