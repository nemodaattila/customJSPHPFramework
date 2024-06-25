class EntityHandlerTableController {

    _view
    _controllerPointer
    _headerAttributeParams

    constructor(container, controllerPointer, type) {
        this._view = new EntityHandlerTableView(container, this)
        this._controllerPointer = controllerPointer

        this.displayTableElements()
    }


    increaseBackGroundColorOffset(colorObject,isGridRowEnd, inputPerRow)
    {
        colorObject.isEvenRow = !colorObject.isEvenRow
        if (isGridRowEnd) {
            colorObject.colorOffset += isGridRowEnd + 1;
            colorObject.isEvenRow = !colorObject.isEvenRow
        }
        if (colorObject.colorOffset > 0) {
            colorObject.colorKey++;
            colorObject.colorOffset--;
        }
        if (colorObject.colorKey % inputPerRow === 0)
            colorObject.isEvenRow = !colorObject.isEvenRow
    }

    checkAttributeVisibilityInModule(inputParameters, type)
    {
        console.log([inputParameters, type])
        if (inputParameters.inModule === undefined)
            return true
        if (type === 'editor' && this._controllerPointer.isMultiple)
        type = 'multipleEditor'

        console.log(type)
        return (inputParameters.inModule.findIndex(module => module === type) !== -1);

    }

    displayTableElements()
    {
        this._headerAttributeParams = this._controllerPointer.getHeaderAttributeParams()

        this._view.createTallTable()
        //TODO inputPerRow
        // let inputPerNums = this.windowContentPointer.content.inputPerRow ?? 1
        const inputPerRow = 1

        this._view.addGridTemplateStyle(inputPerRow)

        const rowColorParams=
            {
                isEvenRow : true,
                colorKey : -1,
                colorOffset : 0
            }
        const defaultTdParams = {class: 'tableCell'}

        Object.entries(this._headerAttributeParams).forEach(([attributeName, inputParameters],key) => {
            console.log(attributeName)

            console.log(inputParameters.inModule)
            console.log(this._controllerPointer.type)

            if (!this.checkAttributeVisibilityInModule(inputParameters, this._controllerPointer.type))
                return;

             this.increaseBackGroundColorOffset(rowColorParams,inputParameters.gridRowEnd, inputPerRow)

            let tr = this._view.addRowToTallTable(rowColorParams.isEvenRow, inputPerRow)

            this._view.createLabelTd(tr,{...defaultTdParams, ...{innerHTML: inputParameters.label ?? attributeName}},
                inputParameters.validations&&inputParameters.validations.findIndex(vType => vType ==='required') !==-1)
            const valueTd = this._view.createTd(tr,defaultTdParams)


            if (this._controllerPointer.isMultiple ?? false)
            {

                (this._view.createMultipleAttributeDeleterButton(valueTd)).addEventListener('click',()=>{
                    this._controllerPointer.multipleAttributeDelButtonClicked(attributeName)
                })

            }

            // if (!inputParameters._htmlParameters)
            //     inputParameters._htmlParameters = {}
            console.log(this._headerAttributeParams[attributeName])
            inputParameters.displayTallTableValueInput(valueTd,this._controllerPointer.isMultiple ?? false)
            if (key === 0)
                inputParameters.focusTallTableInput()

            // //TODO put types into individual classes
            // switch (type) {
            //     case 'float':
            //     case 'int':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {...{type: 'number'}, ...input.params})
            //         break;
            //     case 'string':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'text'})
            //         break;
            //     case 'currency':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'text'})
            //         this._inputs[id].addEventListener('focus', () => this._inputs[id].value = this._inputs[id].value.replaceAll(' ', ''))
            //         this._inputs[id].addEventListener('blur', () => this._inputs[id].value = this.formatValue(this._inputs[id].value))
            //         break;
            //     case 'tel':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'tel'})
            //         break;
            //     case 'email':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'email'})
            //         break;
            //     case 'date':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'date'})
            //         if (!isMultiple && !input.noDefault)
            //             this._inputs[id].value = (new Date()).toISOString().split('T')[0]
            //         break
            //     case 'datetime':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'datetime-local'})
            //         if (!isMultiple) {
            //             const now = new Date();
            //             now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            //             this._inputs[id].value = now.toISOString().slice(0, 16);
            //         }
            //         break
            //     case 'file':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {...{type: 'file'}, ...input.params})
            //         const delIcon = HtmlElementCreator.createSimpleHtmlElement('img', tdElem, {
            //             src: './image/icons/del_icon.png',
            //             class: 'columnMoveIcon',
            //             title: 'kép/fájl törlése',
            //             hidden: true
            //         })
            //         delIcon.addEventListener('click', () => {
            //             this._inputs[id].value = ''
            //             delIcon.hidden = true
            //         })
            //         this._inputs[id].addEventListener('change', () => {
            //             if (this._inputs[id].value !== '')
            //                 delIcon.hidden = false
            //         })
            //         break
            //     case 'select':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('select', tdElem, {})
            //         if (input.multiple)
            //             this._inputs[id].multiple = true
            //         if (isMultiple)
            //             HtmlElementCreator.addOptionToSelect(this._inputs[id], {'-1': 'Nincs változás'}, true)
            //         HtmlElementCreator.addOptionToSelect(this._inputs[id], {...input.values}, true)
            //         if (input.defaultValue)
            //             this._inputs[id].value = input.defaultValue
            //         break
            //     case 'customInput':
            //         this._inputs[id] = tdElem
            //         this.createEntitySelectorInputs(id)
            //         break
            //     case 'dataListSelect':
            //         this._inputs[id] = tdElem
            //         this.createCustomDatalistInput(id, input.params)
            //         break
            //     case 'textArea':
            //         this._inputs[id] = HtmlElementCreator.createHtmlElement('textarea', tdElem, input.params)
            //         break;
            //     default:
            //         this._inputs[id] = tdElem
            // }
            // this._inputs[id].addEventListener('click',(
            //     (input.type !== 'customInput' && input.type !== 'dataListSelect')?
            //         () => this.setFocusedCustomInput(this._inputs[id]):
            //         () => this.setFocusedCustomInput(this._inputs[id].firstChild)
            // ))


            // if (input.type !== 'customInput' && input.type !== 'dataListSelect') {
            //     this._inputs[id].addEventListener('click', () => this.setFocusedCustomInput(this._inputs[id]))
            // } else
            //     this._inputs[id].addEventListener('click', () => this.setFocusedCustomInput(this._inputs[id].firstChild))
        })



    }

    getInputValues(nonEmptyOnly=false)
    {
        let values = {}
        try{
        Object.entries(this._headerAttributeParams).forEach(([attributeName, inputParameters],key) => {
            if (!this.checkAttributeVisibilityInModule(inputParameters, this._controllerPointer.type))
                return;
            console.log(attributeName)
            let value = inputParameters.getTallTableValueInputValue(!nonEmptyOnly)
            if (!nonEmptyOnly || (nonEmptyOnly && value!==''))
            values[attributeName]= value
        })

       return values}
        catch (errorMessage)
        {
            Messenger.showAlert(errorMessage)
            return  false
        }
    }

    getNotEmptyInputValues()
    {
        // return this._view.getNotEmptyInputValues(this._headerAttributeParams)
        return this.getInputValues(true)
    }

    resetTable()
    {
        // this._view.resetTable(this._headerAttributeParams,this._type === 'multipleEditor', this._type)
        Object.entries(this._headerAttributeParams).forEach(([attributeName, inputParameters],key) => {
            if (!this.checkAttributeVisibilityInModule(inputParameters, this._controllerPointer.type))
                return;
            console.log(attributeName)
            inputParameters.resetTableValueInputValue()

        })
    }

    fillTable(record, headerAttributeParams)
    {
        // this._view.fillTable(record, headerAttributeParams, this._type)
        Object.entries(this._headerAttributeParams).forEach(([attributeName, inputParameters],key) => {
            if (!this.checkAttributeVisibilityInModule(inputParameters, this._controllerPointer.type))
                return;
            inputParameters.fillTallTableInput(record[attributeName])
        })
    }


}
