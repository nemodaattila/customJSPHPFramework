class TableInputParent {
    _listerFilterSelectElement
    _listerValueElement
    _tallTableValueInput
    _inModule
    _label
    _htmlParameters = {}

    get inModule() {
        return this._inModule;
    }

    set inModule(value) {
        this._inModule = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    addInputEventToListerFilterSelectElement(event)
    {
        this._listerFilterSelectElement.addEventListener('input', event)
    }

    addInputEventToListerValueElement(event)
    {
        this._listerValueElement.addEventListener('input', event)
    }

    focusTallTableInput()
    {
        this._tallTableValueInput.focus()
        // if (this._inputs[Object.keys(this._inputs)[0]].tagName === 'DIV') {
        //     this._inputs[Object.keys(this._inputs)[0]].firstChild.focus()
        //     this.setFocusedCustomInput(this._inputs[Object.keys(this._inputs)[0]].firstChild)
        // } else {
        //     this._inputs[Object.keys(this._inputs)[0]].focus()
        //     this.setFocusedCustomInput(this._inputs[Object.keys(this._inputs)[0]])
        // }
    }

    getTallTableValueInputValue(withValidation = true)
    {
        return withValidation?this.validateValue(this._tallTableValueInput.value):this._tallTableValueInput.value
    }

    convertOperationString(operation) {

        const match = item => new Map([
            ['eq', "="],
            ['neq', "!="],
            ['sm', "<"],
            ['sme', "<="],
            ['gr', ">"],
            ['gre', ">="],
        ]).get(item) ?? operation
       return match(operation)
    }

    getListerFilterInputValues()
    {
        if (this._listerFilterSelectElement.value !== '' || this._listerValueElement.value !== '')
                        return [this.convertOperationString(this._listerFilterSelectElement.value), this._listerValueElement.value[1]]
    }

    validateValue(value) {

            if (this._validations === undefined)
                return value

            if (this._validations.findIndex(validation =>validation === 'required') !== -1) {
                if (value === '') {
                    throw (this._label) + ' Kitöltése kötelező'

                }
            }
            return value

    }

    fillTallTableInput(value)
    {
        this._tallTableValueInput.value = value
    }

    resetTableValueInputValue()
    {
        this._tallTableValueInput.value=''
    }
}


