class SelectTableInput extends TableInputParent {
    displayListerFilterSelect(domContainer) {
        this._listerFilterSelectElement =
            HtmlElementCreator.createSelectWithOptions(domContainer, {}, {
                eq: 'Egyenlő',
                neq: 'Nem egyenlő',
                null: 'Üres',
                notnull: 'Nem üres',
            }, true)
    }

    displayListerValueInput(domContainer, modelParams) {
        this._listerValueElement =
            HtmlElementCreator.createSelectWithOptions(domContainer, {},
                modelParams.values, true, true)
    }
}
