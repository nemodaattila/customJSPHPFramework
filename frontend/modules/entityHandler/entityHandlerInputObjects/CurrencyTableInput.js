class CurrencyTableInput extends NumberTableInput {
    // displayListerFilterSelect(domContainer ) {
    //     this._listerFilterSelectElement =
    //         HtmlElementCreator.createSelectWithOptions(domContainer, {}, {
    //             cont: 'Tartalmaz',
    //             notcont: 'Nem tartalmaz',
    //             start: 'Kezdődik',
    //             end: 'Végződik',
    //             eq: 'Egyenlő',
    //             neq: 'Nem egyenlő',
    //             sm: 'Kissebb mint',
    //             sme: 'Kissebb-egyenlő mint',
    //             gr: 'Nagyobb mint',
    //             gre: 'Nagyobb-egyenlő mint',
    //             null: 'Üres',
    //             notnull: 'Nem üres'
    //         }, true)
    //
    // }
    //
    // displayListerValueInput(domContainer,modelParams) {
    //     this._listerValueElement =
    //         HtmlElementCreator.createSimpleHtmlElement('input', domContainer, {
    //             type: "number",
    //             min: 0,
    //             size: 20,
    //         })
    //     if (modelParams.maxLength)
    //         this._listerValueElement.maxLength = Math.min(parseInt(modelParams.maxLength), 524288);
    //     if (modelParams.precision)
    //         this._listerValueElement.max = (10 ** modelParams.precision) - 1
    // }
    // displayTallTableValueInput(domContainer)
    // {
    //     this._tallTableValueInput = HtmlElementCreator.createHtmlElement('input', domContainer, {...{type: 'number'}, ...this._htmlParameters})
    // }
    //
    // formatListerTd(td)
    // {
    //     td.classList.add('rightAlign')
    // }
    //
    // getListerFilterInputValues()
    // {
    //     if (this._listerValueElement.value !== '' || this._listerFilterSelectElement.value === 'null' || this._listerFilterSelectElement.value === 'notnull')
    //         return [this.convertOperationString(this._listerFilterSelectElement.value), parseInt(this._listerValueElement.value)];
    // }
}
