class CompanyServiceModel extends EntityServiceModelParent {
    _companyTypes = {0: 'Nem vevő'}

    _moduleDirName = "companies"
    get companyTypes() {
        return this._companyTypes;
    }

    get moduleDirName() {
        return this._moduleDirName;
    }

    set companyTypes(types) {
        console.log(types)
        Object.values(types).forEach(type =>
            this._companyTypes[type.id] = type.name)
    }



    // _selectedRecord = null
    // get selectedRecord() {
    //     return this._selectedRecord;
    // }

    _moduleParams = {
        lister: {
            module: 'companyLister',
            title: 'Cégek'
        },
        editor: {
            module: 'companyEditor',
            title: 'Cég szerkesztése',
            windowName: 'companyEditor'
        },
        multipleEditor: {
            module: 'multipleCompanyEditor',
            title: 'Több cég szerkesztése'
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

    _restName = 'company'
    get restName() {
        return this._restName;
    }

    _entityTriggerName = 'company'
    get entityTriggerName() {
        return this._entityTriggerName;
    }

    _onClickEventAttribs = ['id', 'name']
    get onClickEventAttribs() {
        return this._onClickEventAttribs;
    }

    _defaultOrder = 'name'
    get defaultOrder() {
        return this._defaultOrder;
    }

    _tableHeaderAttributes = {
        id: {label: 'Azonosító', type: 'int', inModule: ['lister']},
        name: {label: 'Név', type: 'string',required: true},
        address: {label: 'cím', type: 'string',required: true},
        vat_number: {label: 'Adószám',required: true},
        category: {
            label: 'Kapcsolat-típus', type: 'select',
            values: this._companyTypes
        },
        comment: {label: 'Megjegyzés'}
    }
    get tableHeaderAttributes() {
        return this._tableHeaderAttributes;
    }

    _editSubMenuParams = {
        editCompany: {
            label: 'Cég szerkesztése',
            moduleGroupName: 'companies',
            task: 'companyEditor',
            windowName: 'companyEditor'
        },
        companyBills: {
            label: 'Céghez tartozó számlák',
            moduleGroupName: 'bills',
            task: 'billLister',
            windowName: 'companyEditor',
            tableSearchParams: [{
                type: 'company',
                value: this._selectedIds[0],
                operator: 'eq'
            }],
        },
        companyWorksheets: {
            label: 'Céghez tartozó munkalapok',
            windowName: 'companyEditor',
            module: 'worksheets',
            task: 'worksheetLister',
            tableSearchParams: [{
                type: 'company',
                value: this._selectedIds[0],
                operator: 'eq'
            }],
        },
        companyEvents: {
            label: 'Cégesemények',
            module: 'events',
            task: 'eventLister',
            tableSearchParams: [{
                type: 'elementGroup',
                value: 1,
                operator: 'eq'
            }, {
                type: 'element',
                value: this._selectedIds[0],
                operator: 'eq'
            }],
        }
    }
    get editSubMenuParams() {
        return this._editSubMenuParams;
    }

    getTitle(name) {
        console.log(name)
        return this._moduleParams[name].title
    }

    getEnabledOperations() {
        return {
            lister: this._moduleParams.lister !== undefined,
            editor: this._moduleParams.editor !== undefined,
            multiEditor: this._moduleParams.multipleEditor !== undefined,
            creator: this._moduleParams.creator !== undefined,
            deletable: this._moduleParams.deletable
        }
    }
}
