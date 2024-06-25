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

    _defaultOrder = 'name'

    _handlerEventTrigger = 'companyHandlerEvent'

    _moduleDirName = "companies"

    _restParameter = 'company'

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



    /**
     * !!! not simple set - forEach
     * @param types
     */
    set companyTypes(types) {
        Object.values(types).forEach(type =>
            this._companyTypes[type.id] = type.name)
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


    _tableHeaderAttributes = {
        id: {label: 'Azonosító', type: 'NumberTableInput', inModule: ['lister']},
        name: {label: 'Név', type: 'StringTableInput', validations : ['required'] },
        address: {label: 'cím', type: 'StringTableInput', validations : ['required']},
        vat_number: {label: 'Adószám', type: 'StringTableInput',validations : ['required'],inModule: ['lister','creator','editor']},
        category: {
            label: 'Kapcsolat-típus', type: 'SelectTableInput',
            values: this._companyTypes,
        },
        comment: {label: 'Megjegyzés',type: 'StringTableInput'}
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
