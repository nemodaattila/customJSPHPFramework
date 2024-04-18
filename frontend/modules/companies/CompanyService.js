
class CompanyService{ // extends ServiceParent {

    // static requiredFiles = {
    //     listAllCompany: 'MC',
    //     addNewCompany: 'MC',
    //     editMultipleCompany: 'MC',
    //     detailedCompany: 'MC',
    // }
    // static moduleGroups = {
    //     listAllCompany: ['listAllCompany'],
    //     addNewCompany: ['addNewCompany'],
    //     manageCompany: ['editCompany', 'companyContact', "companySystems", "companyBills", "companyWorksheets", "companyDeliveryNotes", 'companyEvents'],
    //     editMultipleCompany: ['editMultipleCompany']
    // }
    // static  sideMenuParams = {
    //     listAllCompany: {
    //         label: 'Cégek',
    //         openParams: {
    //             module: 'Company',
    //             task: 'listAllCompany',
    //         }
    //     },
    //     addNewCompany: {
    //         label: 'Cég felvétele',
    //         openParams: {
    //             module: 'Company',
    //             task: 'addNewCompany',
    //         }
    //     },
    //     editMultipleCompany: {
    //         label: 'Több cég együttes szerkesztése',
    //         openParams: {
    //             module: 'Company',
    //             task: 'editMultipleCompany',
    //         }
    //     },
    //     editCompany: {
    //         label: 'Cég szerkesztése',
    //         openParams: {
    //             module: 'Company',
    //             task: 'detailedCompany',
    //         }
    //     },
    //     companyContact: {
    //         label: 'Cég kontaktok',
    //         openParams: {
    //             module: 'Contact',
    //             task: 'listAllContact',
    //             params: {
    //                 tableSearchParams: [{
    //                     type: 'company',
    //                     value: 'connectedObjectId',
    //                     operator: 'eq'
    //                 }],
    //             }
    //         }
    //     },
    //     companySystems: {
    //         label: 'Céghez tartozó rendszerek',
    //         openParams: {
    //             module: 'System',
    //             task: 'listAllSystem',
    //             params: {
    //                 tableSearchParams: [{
    //                     type: 'company',
    //                     value: 'connectedObjectId',
    //                     operator: 'eq'
    //                 }],
    //             }
    //         }
    //     },
    //     companyBills: {
    //         label: 'Céghez tartozó számlák',
    //         openParams: {
    //             module: 'Bill',
    //             task: 'listAllBill',
    //             params: {
    //                 tableSearchParams: [{
    //                     type: 'company',
    //                     value: 'connectedObjectId',
    //                     operator: 'eq'
    //                 }],
    //             }
    //         }
    //     },
    //     companyWorksheets: {
    //         label: 'Céghez tartozó munkalapok',
    //         openParams: {
    //             module: 'Worksheet',
    //             task: 'listAllWorksheet',
    //             params: {
    //                 tableSearchParams: [{
    //                     type: 'company',
    //                     value: 'connectedObjectId',
    //                     operator: 'eq'
    //                 }],
    //             }
    //         }
    //     },
    //     companyDeliveryNotes: {
    //         label: 'Céghez tartozó Szállítólevelek',
    //         openParams: {
    //             module: 'DeliveryNote',
    //             task: 'listAllDeliveryNote',
    //             params: {
    //                 tableSearchParams: [{
    //                     type: 'company',
    //                     value: 'connectedObjectId',
    //                     operator: 'eq'
    //                 }],
    //             }
    //         }
    //     },
    //     companyEvents: {
    //         label: 'Cégesemények',
    //         openParams: {
    //             module: 'Event',
    //             task: 'listAllEvent',
    //             params: {
    //                 tableSearchParams: [{
    //                     type: 'elementGroup',
    //                     value: 1,
    //                     operator: 'eq'
    //                 }, {
    //                     type: 'element',
    //                     value: 'connectedObjectId',
    //                     operator: 'eq'
    //                 }],
    //             }
    //         }
    //     }
    // }
    // /**
    //  * cég-típusok pl: viszonteladó
    //  * @type {Object | null}
    //  */
    // static companyTypes = null;
    // /**
    //  * beszállító cég-típusok beszállitó / nem beszállító
    //  * @type {Object | null}
    //  */
    // static supplierCompanyTypes = null
    // /**
    //  * kiválasztott rekord
    //  * @type {Object|null}
    //  */
    // static selectedRecord = null
    // static getUrl = 'getCompanies'
    //
    // static async init() {
    //     return new Promise(async (resolve) => {
    //         if (this.tableAttributeParams !== undefined) {
    //             resolve(true)
    //             return
    //         }
    //         this.tableAttributeParams = await this.getTableAttributeParamsFromServer(['companies'])
    //         await this.getAttributeValuesFromServer()
    //         resolve(true)
    //     })
    // }
    //
    // /**
    //  * cégekkel kapcsolatos meta-paraméterek lekérése szerverről - típusok
    //  */
    // static async getAttributeValuesFromServer() {
    //     CompanyService.companyTypes = {0: 'Nem vevő'}
    //     CompanyService.supplierCompanyTypes = {0: 'Nem beszállító', 1: 'Beszállító'}
    //     Object.values(await this.createAndSendRequest('getCompanyMeta')).forEach(type =>
    //         CompanyService.companyTypes[type.id] = type.name)
    // }
    //
    // /**
    //  * új cég beküldése
    //  * @param data {Object} cégadatok
    //  */
    // static async sendNewRequest(data) {
    //     let value = await this.createAndSendRequest('insertCompany', JSON.stringify(data))
    //     if (value.success === true) {
    //         AlertPopup.showSuccess('Cég hozzáadása')
    //         EventSubscriptionHandler.triggerSubscriptionCall('companyEdited')
    //     }
    //     return value.success
    // }
    //
    // /**
    //  * cég módosítási adatok beküldése
    //  * @param data {Object} módosított adatok
    //  * @param multiple {boolean} egy vagy több cég van szerkesztve
    //  */
    // static async sendEditRequest(data, multiple = false) {
    //     let value = await this.createAndSendRequest(multiple ? 'editMultipleCompany' : 'editCompany', JSON.stringify(data))
    //     if (value.success === true) {
    //         AlertPopup.showSuccess('Cég módosítás')
    //         EventSubscriptionHandler.triggerSubscriptionCall('companyEdited')
    //     }
    //     return value.success
    // }
    //
    // /**
    //  * egy cég adatainak lekérése
    //  * @param companyId {number} cég azonosító
    //  * @param forced {boolean} kötelező lekérés
    //  */
    // static async getOne(companyId, forced = false) {
    //     if (this.selectedRecord === null || this.selectedRecord.id !== companyId || forced)
    //         this.selectedRecord = await this.createAndSendRequest('getCompany', companyId)
    //     return true
    // }
}
