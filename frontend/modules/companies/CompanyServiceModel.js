class CompanyServiceModel extends ServiceModelParent {
    get companyTypes() {
        return this._companyTypes;
    }

    get selectedId() {
        return this._selectedId;
    }

    get selectedRecord() {
        return this._selectedRecord;
    }

    get moduleParams() {
        return this._moduleParams;
    }

    get restName() {
        return this._restName;
    }

    get entityTriggerName() {
        return this._entityTriggerName;
    }

    get onClickEventAttribs() {
        return this._onClickEventAttribs;
    }

    get defaultOrder() {
        return this._defaultOrder;
    }

    get tableHeaderAttributes() {
        return this._tableHeaderAttributes;
    }

    get editSubMenuParams() {
        return this._editSubMenuParams;
    }
    _companyTypes = {0: 'Nem vevő'}
    set companyTypes(types) {
        console.log(types)
        Object.values(types).forEach(type =>
            this._companyTypes[type.id] = type.name)
    }

    _selectedId

    _selectedRecord = null

    getTitle(name)
    {
        return this._moduleParams[name].title
    }

    _moduleParams = {
        list: {
            module: 'companyLister',
            title: 'Cégek'
        },
        edit: {
            module: 'companyEditor',
            title: 'Cég szerkesztése',
            windowName: 'companyEditor'
        },
        multiEdit: {
            module: 'multipleCompanyEditor',
            title: 'Cégek szerkesztése'
        },
        add: {
            module: 'companyAdder',
            title: 'Cég felvétele'
        },
        deletable: true
    }
    _restName = 'company'
    _entityTriggerName = 'company'
    _onClickEventAttribs = ['id', 'name']
    _defaultOrder = 'name'
    _tableHeaderAttributes = {
        id: {label: 'Azonosító', type: 'int'},
        name: {label: 'Név', type: 'string'},
        address: {label: 'cím', type: 'string'},
        vat_number: {label: 'Adószám'},
        category: {
            label: 'Kapcsolat-típus', type: 'select',
            values: this._companyTypes
        },
        comment: {label: 'Megjegyzés'}
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
                value: this._selectedId,
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
                value: this._selectedId,
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
                value: this._selectedId,
                operator: 'eq'
            }],
        }
    }

    getEnabledOperations()
    {
        return {
            list: this._moduleParams.list !== undefined,
            edit: this._moduleParams.edit !== undefined,
            multiEdit: this._moduleParams.multiEdit !== undefined,
            add: this._moduleParams.add !== undefined,
            deletable: this._moduleParams.deletable
        }
    }
}
