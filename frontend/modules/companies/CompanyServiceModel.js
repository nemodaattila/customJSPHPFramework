/**
 * Service model for CompanyService
 */
class CompanyServiceModel extends EntityServiceModelParent {
    /**
     * types of companies
     * @type {Object.<number, string>}
     * @private
     */
    _companyTypes = {0: 'Nem vevő'}
    /**
     * default order attribute of the connected lister Table
     * @type {string}
     * @private
     */
    _defaultOrder = 'name'
    /**
     * the name of the event, which triggers when a company's parameter is changed, a company created or deleted
     * @type {string}
     * @private
     * @see EventSubscriptionHandler
     */
    _handlerEventTrigger = 'companyHandlerEvent'
    /**
     * name of the directory in which the module can be found (in modules map)
     * @type {string}
     * @private
     */
    _moduleDirName = "companies"
    /**
     * url parameter chunk for request to backend pl: GET -> <backendUrl>/company/23
     * @type {string}
     * @private
     */
    _restParameter = 'company'
    /**
     * success message when,
     * @type {{editor: string, creator: string, delete: string}}
     * @private
     */
    _successMessages = {creator: 'Cég létrehozva', editor: 'Cég(ek) módosítva', 'delete': 'Cég törölve'}
    //
    // _onClickEventAttribs = ['id', 'name']
    // get onClickEventAttribs() {
    //     return this._onClickEventAttribs;
    // }
    /***************************************************/
    get companyTypes() {
        return this._companyTypes;
    }

    get defaultOrder() {
        return this._defaultOrder;
    }

    /**
     * !!! not simple set - forEach
     * @param types
     */
    set companyTypes(types) {
        Object.values(types).forEach(type =>
            this._companyTypes[type.id] = type.name)
    }

    get moduleDirName() {
        return this._moduleDirName;
    }

    _moduleParams = {
        lister: {
            module: 'companyLister',
            title: 'Cégek'
        },
        editor: {
            module: 'companyEditor',
            title: 'Cég(ek) szerkesztése',
        },
        creator: {
            module: 'companyCreator',
            title: 'Cég felvétele'
        },
        deletable: true
    }
    get moduleParams() {
        return this._moduleParams;
    }

    _tableHeaderAttributes = {
        id: {label: 'Azonosító', type: new NumberTableInput(), inModule: ['lister']},
        name: {label: 'Név', type: 'string', required: true},
        address: {label: 'cím', type: 'string', required: true},
        vat_number: {label: 'Adószám', required: true},
        category: {
            label: 'Kapcsolat-típus', type: 'select',
            values: this._companyTypes
        },
        comment: {label: 'Megjegyzés'}
    }
    get tableHeaderAttributes() {
        return this._tableHeaderAttributes;
    }

    // _editSubMenuParams = {
    //     editCompany: {
    //         label: 'Cég szerkesztése',
    //         moduleGroupName: 'companies',
    //         task: 'companyEditor',
    //         windowName: 'companyEditor'
    //     },
    //     companyBills: {
    //         label: 'Céghez tartozó számlák',
    //         moduleGroupName: 'bills',
    //         task: 'billLister',
    //         windowName: 'companyEditor',
    //         tableSearchParams: [{
    //             type: 'company',
    //             value: this._selectedIds[0],
    //             operator: 'eq'
    //         }],
    //     },
    //     companyWorksheets: {
    //         label: 'Céghez tartozó munkalapok',
    //         windowName: 'companyEditor',
    //         module: 'worksheets',
    //         task: 'worksheetLister',
    //         tableSearchParams: [{
    //             type: 'company',
    //             value: this._selectedIds[0],
    //             operator: 'eq'
    //         }],
    //     },
    //     companyEvents: {
    //         label: 'Cégesemények',
    //         module: 'events',
    //         task: 'eventLister',
    //         tableSearchParams: [{
    //             type: 'elementGroup',
    //             value: 1,
    //             operator: 'eq'
    //         }, {
    //             type: 'element',
    //             value: this._selectedIds[0],
    //             operator: 'eq'
    //         }],
    //     }
    // }
    // get editSubMenuParams() {
    //     return this._editSubMenuParams;
    // }
    //
}
