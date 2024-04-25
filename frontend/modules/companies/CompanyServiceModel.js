class CompanyServiceModel extends ServiceModelParent {
    _companyTypes = {0: 'Nem vevő'}
    set companyTypes(types) {
        console.log(types)
        Object.values(types).forEach(type =>
            this._companyTypes[type.id] = type.name)
    }

    _selectedId

    selectedRecord = null

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
    _attributes = {
        id: {label: 'Azonosító', type: 'string'},
        name: {label: 'Név', type: 'string'},
        address: {label: 'cím', type: 'string'},
        vat_number: {label: 'Adószám'},
        category: {
            label: 'Kapcsolat-típus', filterType: 'select',
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
