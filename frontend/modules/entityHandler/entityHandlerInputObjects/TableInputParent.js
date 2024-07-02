class TableInputParent {

    _listerFilterSelectElement
    _listerValueElement
    _tallTableValueInput
    _inModule
    _label
    _htmlParameters = {}
    _inputEvent
    _validations

    set inputEvent(value) {
        this._inputEvent = value;
    }

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

    addInputEventToListerFilterSelectElement()
    {
        this._listerFilterSelectElement?.addEventListener('input', (event)=>{
                event.stopPropagation()
                console.log(this)
                clearTimeout(this.timeOut)

                if (this._listerFilterSelectElement.value === 'null' || this._listerFilterSelectElement.value === 'notnull') {
                    this._listerValueElement.value = '';
                    this._listerValueElement.disabled = true;
                } else this._listerValueElement.disabled = false;
            this.timeOut = setTimeout(() => {
                this._inputEvent()
            }, 300);
        })
    }

    addInputEventToListerValueElement(event)
    {
        this._listerValueElement?.addEventListener('input', (event)=>{



                event.stopPropagation()
                console.log(this)
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(() => {
                    this._inputEvent()
                }, 300);

            }



            )
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
        if (this._listerFilterSelectElement === undefined)
            return
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

    fillTallTableInput(value = '')
    {
        this._tallTableValueInput.value = value
    }

    resetTableValueInputValue()
    {
        this._tallTableValueInput.value=''
    }

    // addInputEventToHeaderFilters(tableAttributeOrder) {
    //     console.log(this._headerAttributeParams)
    //     tableAttributeOrder.forEach(attribName => {
    //         if (!this._headerAttributeParams[attribName])
    //             return
    //         // let filters = this._view.getFilterInput(attribName)
    //         // console.log(filters)
    //         this._headerAttributeParams[attribName].addInputEventToListerFilterSelectElement(
    //
    //             (event) => {
    //                 event.stopPropagation()
    //                 console.log(this)
    //                 clearTimeout(this.timeOut)
    //                 this.timeOut = setTimeout(() => {
    //                     this._controllerPointer.onTableFilterChange()
    //                 }, 300);
    //                 if (event.target.value === 'null' || event.target.value === 'notnull') {
    //                     event.target.nextElementSibling.value = '';
    //                     event.target.nextElementSibling.disabled = true;
    //                 } else event.target.nextElementSibling.disabled = false;
    //             })
    //         this._headerAttributeParams[attribName].addInputEventToListerValueElement ((event) => {
    //             clearTimeout(this.timeOut)
    //             this.timeOut = setTimeout(() => {
    //                 this._controllerPointer.onTableFilterChange()
    //             }, 300);
    //         })
    //         // if (this._headerAttributeParams[attribName]?.hidden)
    //         //     document.getElementById('hcb-' + this._view.id + "-" + attribName).click()
    //     })
    // }
}


