class CompanyCreatorController extends HandlerControllerParent {

     constructor(module) {
          super('creator');
          // EventSubscriptionHandler.subscribe('companyDataForEntity', this, 'refreshCompanyData')
     }

     displayView(windowBody) {
          super.displayView(windowBody)

          this._view.addButtonToTallTable(1, {value: 'Cég hozzáadása'}, () =>
              this.collectAndSendNewSystemData())
          // this.view.inputs['category'].addEventListener('change', () => {
          //      if (this.view.inputs['category'].value === '4')
          //           this.view.inputs['supplier_category'].value = '1'
          // })
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
     // collectAndSendNewSystemData() {
     //      let compData = this.view.getTallTableValues()
     //      if (compData.address === '' || compData.name === '') {
     //           AlertPopup.showAlert('Megnevezés és cím kitöltése közelező')
     //           return
     //      }
     //      this.sendRequest(compData)
     // }
}
