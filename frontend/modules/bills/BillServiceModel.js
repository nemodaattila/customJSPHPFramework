/**
 * Service model for CompanyService
 */
class BillServiceModel extends EntityServiceModelParent {

    _directions = {0: 'Bejövő', 1: 'Kimenő'}


    _tableHeaderAttributes = {
        warnings: {label: 'Figyelmeztetések', type: 'none', sortable: 'false'},

        id: {label: 'Azonosító', type: 'NumberTableInput', inModule: ['lister']},
            company: {label: 'Cégazonosító',type: 'CustomSelectorInput',},
            companyName: {label: 'Cégnév', type: 'StringTableInput', inModule: ['lister']},
        payment_method: {
            label: 'Fizetési mód', type: 'SelectTableInput',
            values: this._paymentMethods,
        },
            bill_creation_date: {label: 'Számla kelte',type: 'DateTableInput'},
            fulfillment_date: {label: 'Teljesítés ideje',type: 'DateTableInput'},
            expiration: {label: 'Fizetési határidő',type: 'DateTableInput'},
            pay_date: {label: 'Fizetve',type: 'DateTableInput'},
        serial: {label: 'Sorszám', type: 'StringTableInput',validations : ['required'],inModule: ['lister','creator','editor']},
        value: {label: 'Összeg', type: 'NumberTableInput'},
        currency: {label: 'Valuta', type: 'CurrencyTableInput', values: this.currencies},
            state: {
                label: 'Fizetési állapot',
                type: 'SelectTableInput',
                values: this.states,
                defaultOperator: 'neq',
                defaultValue: 6
            },
        direction: {label: 'Irány', type: 'SelectTableInput', values: this.directions},
            active: {
                label: 'Aktív',
                type: 'SelectTableInput',

                values: {0: 'Nem', 1: 'Igen'},
                defaultValue: 1,
                defaultOperator: 'eq'
            },
        creator: {label: 'Feltöltő azonosító',type: 'CustomSelectorInput'},
        creatorName: {label: 'Feltöltő neve',  type: 'SelectTableInput'},
        date: {label: 'Feltöltés ideje',type: 'DateTableInput'},
        comment: {label: 'Megjegyzés',type: 'StringTableInput'}
        //     system: {label: 'Rendszerazonosító'},
        //     systemName: {label: 'Rendszer', type: 'string'},
    }

    _defaultOrder = 'expiration'
    _defaultOrderDir = 'desc'


    _handlerEventTrigger = 'billHandlerEvent'

    _moduleDirName = "bills"

    _restParameter = 'bill'

    _successMessages = {creator: 'Számla létrehozva', editor: 'Számla(ák) módosítva', 'delete': 'Számla törölve'}
    //
    // _onClickEventAttribs = ['id', 'serial']
    // get onClickEventAttribs() {
    //     return this._onClickEventAttribs;
    // }
    /***************************************************/







    _moduleParams = {
        lister: {
            module: 'billLister',
            title: 'Számlák'
        },
        editor: {
            module: 'billEditor',
            title: 'Számla(ák) szerkesztése',
        },
        creator: {
            module: 'billCreator',
            title: 'Számla felvétele'
        },
        deletable: false
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
