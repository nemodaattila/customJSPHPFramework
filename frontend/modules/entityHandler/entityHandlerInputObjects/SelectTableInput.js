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

    displayTallTableValueInput(domContainer, isMultiple = false)
    {
        console.log(this)
        this._tallTableValueInput = HtmlElementCreator.createHtmlElement('select', domContainer,this._htmlParameters)
                if (isMultiple)
                    HtmlElementCreator.addOptionToSelect(this._tallTableValueInput, {'-1': 'Nincs változás'}, true)
                HtmlElementCreator.addOptionToSelect(this._tallTableValueInput, this._values, true)
                if (this._defaultValue)
                    this._tallTableValueInput.value = this._defaultValue

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

    getTallTableValueInputValue(withValidation)
    {
        if (this._tallTableValueInput.value === '-1')
            return ''
        return this.validateValue(this._tallTableValueInput.value)
    }

    resetTableValueInputValue()
    {
        this._tallTableValueInput.value='-1'
    }
}
