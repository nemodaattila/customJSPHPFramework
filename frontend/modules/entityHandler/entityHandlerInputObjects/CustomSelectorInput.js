class CustomSelectorInput extends TableInputParent {
    displayListerFilterSelect(domContainer) {
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
    }

    displayListerValueInput(domContainer, modelParams) {
        this._listerValueElement =
            HtmlElementCreator.createSimpleHtmlElement('input', domContainer, {
                type: "number",
                min: 0,
                size: 20,
            })
        if (modelParams.maxLength)
            this._listerValueElement.maxLength = Math.min(parseInt(modelParams.maxLength), 524288);
        if (modelParams.precision)
            this._listerValueElement.max = (10 ** modelParams.precision) - 1
    }

    displayTallTableValueInput(domContainer, isMultiple = false) {
        this._tallTableValueInput = HtmlElementCreator.createHtmlElement('input', domContainer, {...{type: 'date'}, ...this._htmlParameters})
        if (isMultiple === false && this._htmlParameters.noDefault !== true)
            this._tallTableValueInput.value = (new Date()).toISOString().split('T')[0]
    }

    getTallTableValueInputValue(withValidation = true) {
        return withValidation ? this.validateValue(this._tallTableValueInput.value.trim()) : this._tallTableValueInput.value.trim()
    }

    formatListerTd(td) {
        td.classList.add('rightAlign')
    }

    getListerFilterInputValues() {
        if (this._listerValueElement.value !== '' || this._listerFilterSelectElement.value === 'null' || this._listerFilterSelectElement.value === 'notnull')
            return [this.convertOperationString(this._listerFilterSelectElement.value), parseInt(this._listerValueElement.value)];
    }

    fillTallTableInput(value) {
        let pseudoElement = document.createElement('textarea');
        pseudoElement.innerHTML = value;
        this._tallTableValueInput.value = pseudoElement.value
    }
}
