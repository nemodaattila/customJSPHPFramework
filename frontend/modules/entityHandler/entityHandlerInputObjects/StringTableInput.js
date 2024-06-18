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

    displayTallTableValueInput(domContainer, inputParameters)
    {
        this._tallTableValueInput = HtmlElementCreator.createHtmlElement('input', domContainer,{...{type: 'string'}, ...this._htmlParameters})
        console.log(this)
    }

        getTallTableValueInputValue(withValidation = true)
        {
            return withValidation?this.validateValue(encodeURIComponent(this._tallTableValueInput.value.trim())):encodeURIComponent(this._tallTableValueInput.value.trim())

        }



    formatListerTd(td)
    {
        td.classList.add('leftAlign')
    }

    getListerFilterInputValues()
    {
        if (this._listerValueElement.value !== '' || this._listerFilterSelectElement.value === 'null' || this._listerFilterSelectElement.value === 'notnull')
                        return [this.convertOperationString(this._listerFilterSelectElement.value), this._listerValueElement.value.toString()];
    }
    fillTallTableInput(value)
    {
        let pseudoElement = document.createElement('textarea');
                    pseudoElement.innerHTML = value;
        this._tallTableValueInput.value = pseudoElement.value
    }
}
