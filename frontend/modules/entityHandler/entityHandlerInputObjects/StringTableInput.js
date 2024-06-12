class StringTableInput extends TableInputParent {
    displayListerFilterSelect(domContainer, modelParams) {
        this._listerFilterSelectElement =
            HtmlElementCreator.createSelectWithOptions(domContainer, {}, {
                cont: 'Tartalmaz',
                notcont: 'Nem tartalmaz',
                start: 'Kezdődik',
                end: 'Végződik',
                eq: 'Egyenlő',
                neq: 'Nem egyenlő',
                sm: 'Kissebb mint',
                sme: 'Kissebb-egyenlő mint',
                gr: 'Nagyobb mint',
                gre: 'Nagyobb-egyenlő mint',
                null: 'Üres',
                notnull: 'Nem üres'
            }, true)
        if (modelParams.maxLength)
            this._listerFilterSelectElement.maxLength = Math.min(parseInt(modelParams.maxLength), 524288);
    }

    displayListerValueInput(domContainer) {
        this._listerValueElement =
            HtmlElementCreator.createSimpleHtmlElement('input', domContainer, {
                type: "string",
                min: 0,
                size: 20,
            })
    }
}
