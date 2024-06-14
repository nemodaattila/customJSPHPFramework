class SelectTableInput extends TableInputParent {

    _values
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

    displayTallTableValueInput(domContainer, inputParameters, isMultiple = false)
    {
        this._tallTableValueInput = HtmlElementCreator.createHtmlElement('select', domContainer,inputParameters.parameters)
                if (isMultiple)
                    HtmlElementCreator.addOptionToSelect(this._tallTableValueInput, {'-1': 'Nincs változás'}, true)
                HtmlElementCreator.addOptionToSelect(this._tallTableValueInput, {...inputParameters.values}, true)
                if (inputParameters.defaultValue)
                    this._tallTableValueInput = inputParameters.defaultValue

    }

    formatListerTd(td)
    {
        td.innerHTML=this._values[td.innerHTML.trim()]
        console.log(this)
        td.classList.add('leftAlign')
    }

    getListerFilterInputValues()
    {
        if (this._listerValueElement.value !== '' || this._listerFilterSelectElement.value === 'null' || this._listerFilterSelectElement.value === 'notnull')
            return [this.convertOperationString(this._listerFilterSelectElement.value), this._listerValueElement.value.toString()];
    }
}
