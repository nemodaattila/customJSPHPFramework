class DateTableInput extends TableInputParent {
    displayListerFilterSelect(domContainer, modelParams = {}) {
        this._listerFilterSelectElement =HtmlElementCreator.createSimpleHtmlElement('input', domContainer, {type: 'date'})
    }

    displayListerValueInput(domContainer) {
        this._listerValueElement =HtmlElementCreator.createSimpleHtmlElement('input', domContainer, {type: 'date'})

    }

    displayTallTableValueInput(domContainer, isMultiple = false)
    {

        this._tallTableValueInput = HtmlElementCreator.createHtmlElement('input', domContainer, {...{type: 'date'}, ...this._htmlParameters})
        if (isMultiple === false && this._htmlParameters.noDefault !== true)
            this._tallTableValueInput.value = (new Date()).toISOString().split('T')[0]
    }

        getTallTableValueInputValue(withValidation = true)
        {
            return withValidation?this.validateValue(this._tallTableValueInput.value.trim()):this._tallTableValueInput.value.trim()

        }



    formatListerTd(td)
    {
        td.classList.add('rightAlign')
    }

    getListerFilterInputValues()
    {
        let values = []
        if (this._listerFilterSelectElement.value !== '')
            values[0] = this._listerFilterSelectElement.value.toString().replace('T', ' ')
        if (this._listerValueElement.value !== '')
            values[1] = this._listerValueElement.value.toString().replace('T', ' ')
        if (this._listerFilterSelectElement.value !== '' || this._listerValueElement.value !== '') {
            if (this._listerFilterSelectElement.value !== '' && this._listerValueElement.value === '')
                values[1] = '2286-11-20'
            if (this._listerFilterSelectElement.value === '' && this._listerValueElement.value !== '')
                values[0] = '1970-01-01'
            values[2] = 1;
        }
        if (values[0] > values[1]) {
            Messenger.showAlert('kezdő dátum nem lehet nagyobb a végdátumnál')
            return
        }
        if (values.length === 0)
            values = undefined
        return values;


    //     if (this._listerValueElement.value !== '' || this._listerFilterSelectElement.value === 'null' || this._listerFilterSelectElement.value === 'notnull')
    //                     return [this.convertOperationString(this._listerFilterSelectElement.value), this._listerValueElement.value.toString()];
    }
    fillTallTableInput(value)
    {
        let pseudoElement = document.createElement('textarea');
                    pseudoElement.innerHTML = value;
        this._tallTableValueInput.value = pseudoElement.value
    }
}
