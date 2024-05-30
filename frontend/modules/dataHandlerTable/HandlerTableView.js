class HandlerTableView {
    _mainContainer
    _controllerPointer
    _inputs = {}
    focusedCustomInput

    constructor( tableContainer, controllerPointer) {
        this._mainContainer = tableContainer;

        this._controllerPointer = controllerPointer
        this._mainContainer.style.overflow = 'auto'
    }

    displayTableElements(tableHeaderAttributes, isMultiple)
    {
        console.log(this._mainContainer)
        console.log(tableHeaderAttributes)
        this.tallTable = HtmlElementCreator.createSimpleHtmlElement('div', this._mainContainer, {class: 'handlerTable'})
        //DO inputPerRow
        // let inputPerNums = this.windowContentPointer.content.inputPerRow ?? 1
        let inputPerRows = 1
        let tr
        let evenRow = true
        let cols = ''
        for (let i = 0; i < inputPerRows; i++)
            cols += ' 524px '
        this.tallTable.style.gridTemplateColumns += cols
        let key = -1
        let colorOffset = 0;
        Object.entries(tableHeaderAttributes).forEach(([id, input]) => {
            key++;
            if (input.gridRowEnd !== undefined)
                colorOffset += input.gridRowEnd + 1;
            if (colorOffset > 0) {
                key++;
                colorOffset--;
            }
            if (key % inputPerRows === 0)
                evenRow = !evenRow
            tr = HtmlElementCreator.createSimpleHtmlElement('div', this.tallTable, {
                class: 'tableRow'
            })
            if (evenRow)
                tr.classList.add('evenRow')
            if (input.gridRowEnd !== undefined) {
                tr.style.gridRowEnd = 'span ' + input.gridRowEnd
                evenRow = !evenRow
            }
            let defaultTdParams = {class: 'tableCell'}
            let tdParamForLabel = {...defaultTdParams, ...{innerHTML: input.label ?? id}}
            let label = HtmlElementCreator.createSimpleHtmlElement('div', tr, tdParamForLabel)
            if (input.required === true)
                HtmlElementCreator.createSimpleHtmlElement('span', label, {innerHTML: '*', class: 'requiredInput'})
            if (input.params === undefined)
                input.params = {}
            let type = input.type ?? 'string'
            let tdElem = HtmlElementCreator.createSimpleHtmlElement('div', tr, defaultTdParams)
            switch (type) {
                case 'number':
                case 'bigint':
                case 'decimal':
                case 'double':
                case 'float':
                case 'int':
                case 'smallint':
                case 'tinyint':
                case 'year':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {...{type: 'number'}, ...input.params})
                     break;
                case 'string':
                case 'char':
                case 'longtext':
                case 'mediumtext':
                case 'text':
                case 'tinytext':
                case 'varchar':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'text'})
                    break;
                case 'currency':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'text'})
                    this._inputs[id].addEventListener('focus', () => this._inputs[id].value = this._inputs[id].value.replaceAll(' ', ''))
                    this._inputs[id].addEventListener('blur', () => this._inputs[id].value = this.formatValue(this._inputs[id].value))
                    break;
                case 'tel':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'tel'})
                    break;
                case 'email':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'email'})
                    break;
                case 'date':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'date'})
                    if (isMultiple === false && input.noDefault !== true)
                        this._inputs[id].value = (new Date()).toISOString().split('T')[0]
                    break
                case 'datetime':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {type: 'datetime-local'})
                    if (isMultiple === false) {
                        let now = new Date();
                        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                        this._inputs[id].value = now.toISOString().slice(0, 16);
                    }
                    break
                case 'file':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('input', tdElem, {...{type: 'file'}, ...input.params})
                    let delIcon = HtmlElementCreator.createSimpleHtmlElement('img', tdElem, {
                        src: './image/icons/del_icon.png',
                        class: 'columnMoveIcon',
                        title: 'kép/fájl törlése',
                        hidden: true
                    })
                    delIcon.addEventListener('click', () => {
                        this._inputs[id].value = ''
                        delIcon.hidden = true
                    })
                    this._inputs[id].addEventListener('change', () => {
                        if (this._inputs[id].value !== '')
                            delIcon.hidden = false
                    })
                    break
                case 'select':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('select', tdElem, {})
                    if (input.multiple === true)
                        this._inputs[id].multiple = true
                    let options = {...input.values}
                    if (isMultiple === true)
                        HtmlElementCreator.addOptionToSelect(this._inputs[id], {'-1': 'Nincs változás'}, true)
                    HtmlElementCreator.addOptionToSelect(this._inputs[id], options, true)
                    if (input.defaultValue !== undefined)
                        this._inputs[id].value = input.defaultValue
                    break
                case 'customInput':
                    this._inputs[id] = tdElem
                    this.createEntitySelectorInputs(id)
                    break
                case 'dataListSelect':
                    this._inputs[id] = tdElem
                    this.createCustomDatalistInput(id, input.params)
                    break
                case 'textArea':
                    this._inputs[id] = HtmlElementCreator.createHtmlElement('textarea', tdElem, input.params)
                    break;
                default:
                    this._inputs[id] = tdElem
            }
            if (input.type !== 'customInput' && input.type !== 'dataListSelect') {
                this._inputs[id].addEventListener('click', () => this.setFocusedCustomInput(this._inputs[id]))
            } else
                this._inputs[id].addEventListener('click', () => this.setFocusedCustomInput(this._inputs[id].firstChild))
        })
        if (this._inputs[Object.keys(tableHeaderAttributes)[0]].tagName === 'DIV') {
            this._inputs[Object.keys(tableHeaderAttributes)[0]].firstChild.focus()
            this.setFocusedCustomInput(this._inputs[Object.keys(tableHeaderAttributes)[0]].firstChild)
        } else {
            this._inputs[Object.keys(tableHeaderAttributes)[0]].focus()
            this.setFocusedCustomInput(this._inputs[Object.keys(tableHeaderAttributes)[0]])
        }


    }

    setFocusedCustomInput(input) {
        if (this.focusedCustomInput !== undefined)
            this.focusedCustomInput.classList.remove('focusedInput')
        this.focusedCustomInput = input
        if (this.focusedCustomInput !== undefined)
            this.focusedCustomInput.classList.add('focusedInput')
    }

    // /**
    //  * magas tábla DOM elementje
    //  * @type {HTMLTableElement}
    //  */
    // tallTable
    // /**
    //  * bal oldali menü DOM element
    //  * @type {HTMLDivElement}
    //  */
    // sideMenu
    // /**
    //  * oldalmenü listaelemei
    //  * @type {{}}
    //  */
    // sideMenuElements = {}
    // /**
    //  * fő conténer DOM element
    //  * @type {HTMLDivElement}
    //  */
    // mainContentContainer
    // /**
    //  * multiple több elem egyszerre szerkesztésénél
    //  * @type {boolean}
    //  */
    // isMultiple = false
    // /**
    //  * aktív , fókuszban lévő input
    //  * @type HTMLInputElement
    //  */
    //
    // /**
    //  * kapcsolt szervice
    //  */
    // service
    // /**
    //  * timeout az input szerkesztéshez, ne minden gombnyomás váltson ki requestet
    //  */
    // dataListTimeOut
    // /**
    //  * gombok konténere
    //  * @type {HTMLDivElement | undefined}
    //  */
    // buttonTable = undefined
    //
    // constructor(contentPointer, recordIds, service) {
    //     console.log([contentPointer, recordIds, service])
    //     console.log(typeof recordIds)
    //     super(contentPointer);
    //     this.service = service
    //     this.contentContainer.addEventListener('click', (ev) => {
    //         if (!(ev.target instanceof HTMLInputElement))
    //             this.setFocusedCustomInput(undefined)
    //     })
    //     if (recordIds === undefined)
    //         return
    //     let idLabel = typeof recordIds === 'object' ?  recordIds.join(', ') : recordIds
    //     HtmlElementCreator.createSimpleHtmlElement('caption', this.contentContainer, {
    //         innerHTML: 'Kiválasztott rekordok: ' + idLabel,
    //         class: 'recordIdIndicator'
    //     })
    // }
    //
    // /**
    //  * magas tábla megjelenítése, inputok létrehozása
    //  * @param container {HTMLDivElement | null} a DOM elem amibe a tábla kerül
    //  * @param isMultiple {boolean} több elem egyszerre szerkesztésénél true
    //  */

    //
    // /**
    //  * gomb hozzáadása magas táblához
    //  * @param columnNum {number} tábla oszlopszáma
    //  * @param buttonParams {Object} gomb paraméterei
    //  * @param onclickEvent {function} gomb onclick eseményére lefutó függvény
    //  * @param sameLine {boolean} ha true, a tábla utolsó sorába hozza létre a gombot, egyébként új sort hoz létre
    //  */
    // addButtonToTallTable(columnNum, buttonParams, onclickEvent, sameLine = false) {
    //     if (this.buttonTable === undefined)
    //         this.buttonTable = HtmlElementCreator.createSimpleHtmlElement('div', this.tallTable.parentElement, {class: 'buttonTable'})
    //     let columnCount = (this.windowContentPointer.content.inputPerRow ?? 1) * 2
    //     let cols = ''
    //     for (let i = 0; i < columnCount; i++)
    //         cols += ' 262px '
    //     let tds = [];
    //     let tr = sameLine === true && this.buttonTable.childNodes.length !== 0 ? this.buttonTable.lastChild : HtmlElementCreator.createSimpleHtmlElement('div', this.buttonTable)
    //     if (!sameLine)
    //         tr.style.gridTemplateColumns += cols
    //     if (sameLine === false) {
    //         tr.style.display = 'grid'
    //         for (let i = 0; i < columnCount; i++)
    //             tds.push(HtmlElementCreator.createSimpleHtmlElement('div', tr, {class: 'tableCell'}))
    //     } else tds = this.buttonTable.lastChild.children
    //     buttonParams.type = 'button';
    //     (HtmlElementCreator.createSimpleHtmlElement('input', tds[columnNum], buttonParams)).addEventListener('click', onclickEvent)
    // }
    //
    // /**
    //  * visszaadja a magas tábla inputjainak értékeit
    //  * @returns {{}}
    //  */
    // getTallTableValues() {
    //     let _inputs = this.windowContentPointer.content._inputs
    //     let values = {}
    //     Object.entries(_inputs).forEach(([id, input]) => {
    //         switch (input.type) {
    //             case 'customInput':
    //                 values[id] = this._inputs[id].firstChild.value
    //                 if (values[id] === '') values[id] = null
    //                 break;
    //             case 'dataListSelect':
    //                 let index = Array.from(this._inputs[id].children[1].options).findIndex(opt => opt.value === this._inputs[id].firstChild.value)
    //                 if (index === -1) {
    //                     values[id] = null
    //                 } else
    //                     values[id] = this._inputs[id].children[1].options[index].getAttribute('data-value')
    //                 break
    //             case 'string':
    //             case 'char':
    //             case 'longtext':
    //             case 'mediumtext':
    //             case 'text':
    //             case 'tinytext':
    //             case 'varchar':
    //                 values[id] = encodeURIComponent(this._inputs[id].value.trim())
    //                 break
    //             case 'file':
    //                 values[id] = this._inputs[id].files
    //                 break
    //             case 'currency':
    //                 values[id] = this._inputs[id].value.replaceAll(' ', '')
    //                 break
    //             case 'datetime':
    //                 values[id] = this._inputs[id].value.toString().replace('T', ' ')
    //                 break
    //             default:
    //                 values[id] = this._inputs[id].value
    //         }
    //     })
    //     return values
    // }
    //
    // /**
    //  * magas tábla azon elemeinek visszadása ami nem üres pl: ''
    //  * @returns {{}}
    //  */
    // getTallTableNonNullValues() {
    //     let _inputs = this.windowContentPointer.content._inputs
    //     let values = {}
    //     Object.entries(_inputs).forEach(([id, input]) => {
    //         switch (input.type) {
    //             case 'customInput':
    //                 let val = this._inputs[id].firstChild.value
    //                 if (val !== '') values[id] = val
    //                 break;
    //             case 'dataListSelect':
    //                 let index = Array.from(this._inputs[id].children[1].options).findIndex(opt => opt.value === this._inputs[id].firstChild.value)
    //                 if (index !== -1)
    //                     values[id] = this._inputs[id].children[1].options[index].getAttribute('data-value')
    //                 break
    //             case 'string':
    //             case 'char':
    //             case 'longtext':
    //             case 'mediumtext':
    //             case 'text':
    //             case 'tinytext':
    //             case 'varchar':
    //                 if (this._inputs[id].value !== '')
    //                     values[id] = encodeURIComponent(this._inputs[id].value.trim())
    //                 break
    //             case 'select':
    //                 if (this._inputs[id].value !== "-1")
    //                     values[id] = this._inputs[id].value
    //                 break
    //             case 'currency':
    //                 if (this._inputs[id].value !== '')
    //                     values[id] = this._inputs[id].value.replaceAll(' ', '')
    //                 break
    //             case 'datetime':
    //                 if (this._inputs[id].value !== '')
    //                     values[id] = this._inputs[id].value.toString().replace('T', ' ')
    //                 break
    //             default:
    //                 if (this._inputs[id].value !== '')
    //                     values[id] = this._inputs[id].value
    //         }
    //     })
    //     return values
    // }
    //
    // /**
    //  * magas tábla feltöltése értékekkel
    //  * @param record {{}} értékek
    //  */
    // fillTallTable(record) {
    //     if (record === null)
    //         return
    //     let _inputs = this.windowContentPointer.content._inputs
    //     Object.entries(_inputs).forEach(([id, input]) => {
    //         if (record[id] === undefined)
    //             return
    //         if (input.type === 'customInput') {
    //             this._inputs[id].firstChild.value = record[id]
    //         } else if (input.type === 'dataListSelect') {
    //             if (this.service.selectedRecord[input.params.fillParam] !== undefined && this.service.selectedRecord[id] !== null) {
    //                 this._inputs[id].firstChild.value = this.service.selectedRecord[input.params.fillParam] ?? ''
    //                 let opt = HtmlElementCreator.createHtmlElement('option', this._inputs[id].children[1], {value: this.service.selectedRecord[input.params.fillParam]})
    //                 opt.setAttribute('data-value', this.service.selectedRecord[id])
    //             }
    //         } else if (input.type === 'currency') {
    //             this._inputs[id].value = this.formatValue(record[id])
    //         } else
    //             this._inputs[id].value = record[id]
    //     })
    // }
    //
    // /**
    //  * magas tábla értékeinek kiürítése
    //  */
    // resetTallTable() {
    //     let _inputs = this.windowContentPointer.content._inputs
    //     Object.entries(_inputs).forEach(([id, input]) => {
    //         if (input.type === 'customInput') {
    //             this._inputs[id].firstChild.value = ''
    //             this._inputs[id].children[1].innerHTML = ''
    //         } else if (input.type === 'dataListSelect') {
    //             this._inputs[id].firstChild.value = ''
    //             HtmlElementCreator.emptyDOMElement(this._inputs[id].children[1])
    //         } else if (input.type === 'select') {
    //             this._inputs[id].selectedIndex = 0;
    //         } else if (input.type === 'date') {
    //             if (this.isMultiple === false) {
    //                 this._inputs[id].value = (new Date()).toISOString().split('T')[0]
    //             } else this._inputs[id].value = ''
    //         } else {
    //             this._inputs[id].value = ''
    //             if (input.type === 'file')
    //                 this._inputs[id].nextElementSibling.hidden = true
    //         }
    //     })
    // }
    //
    // /**
    //  * entitásválasztó speciális input (input + label) megjelenítése
    //  * @param inputId {string} input azonosítója
    //  */
    // createEntitySelectorInputs(inputId) {
    //     let input = HtmlElementCreator.createHtmlElement('input', this._inputs[inputId], {
    //         type: 'number',
    //         class: 'customTableInput',
    //         min: 0
    //     })
    //     input.addEventListener('click', () => this.setFocusedCustomInput(input))
    //     let nameSpan = HtmlElementCreator.createHtmlElement('span', this._inputs[inputId])
    //     input.addEventListener('input', () => nameSpan.innerHTML = '')
    // }
    //
    // /**
    //  * entitásválasztó értékeinek beállítása
    //  * @param inputId {string} input azonosító
    //  * @param id {number} kiválasztott entitás azonosítója
    //  * @param value kiválasztott entitás megnevezése
    //  */
    // setEntitySelectorInputValue(inputId, id, value) {
    //     if (this._inputs[inputId].children[0] !== this.focusedCustomInput)
    //         return
    //     this._inputs[inputId].children[0].value = id
    //     this._inputs[inputId].children[1].innerHTML = value
    // }
    //
    // /**
    //  * option hozzáadása datalisthez, valamint értékként megadás inputba
    //  * @param inputId {id|string} input megnevezése
    //  * @param entityId {string} option id
    //  * @param entityValue{string} option megnevezés
    //  * @param forced{boolean}
    //  */
    // setCustomDatalistValue(inputId, entityId, entityValue, forced = false) {
    //     if (this._inputs[inputId].children[0] !== this.focusedCustomInput && !forced)
    //         return
    //     this._inputs[inputId].firstChild.value = entityValue
    //     HtmlElementCreator.emptyDOMElement(this._inputs[inputId].children[1]);
    //     (HtmlElementCreator.createHtmlElement('option', this._inputs[inputId].children[1], {value: entityValue})).setAttribute('data-value', entityId)
    // }
    //
    // /**
    //  * datalist létrehozása, eventek hozzáadása
    //  * @param inputId {string} input megnevezése
    //  * @param params {{}} paraméterek kereséshez
    //  */
    // createCustomDatalistInput(inputId, params) {
    //     let input = HtmlElementCreator.createHtmlElement('input', this._inputs[inputId], {
    //         list: 'dl-' + params.table + '-' + this.windowContentPointer.controllerPointer.id,
    //         type: 'string',
    //     })
    //     input.addEventListener('click', () => this.setFocusedCustomInput(input))
    //     let dl = HtmlElementCreator.createHtmlElement('datalist', this._inputs[inputId], {id: 'dl-' + params.table + '-' + this.windowContentPointer.controllerPointer.id})
    //     if (params.buttonService !== undefined) {
    //         (HtmlElementCreator.createHtmlElement('input', this._inputs[inputId], {
    //             type: 'button',
    //             value: 'Listáz'
    //         })).addEventListener('click', async () =>
    //             await WindowHandler.createWindow(this.contentContainer.id + '-' + params.buttonTask, {
    //                 service: params.buttonService,
    //                 moduleGroup: params.buttonTask
    //             })
    //         )
    //         if (params.newButtonTask !== undefined) {
    //             (HtmlElementCreator.createHtmlElement('input', this._inputs[inputId], {
    //                 type: 'button',
    //                 value: 'Új hozzáadás'
    //             })).addEventListener('click', async () =>
    //                 await WindowHandler.createWindow(this.contentContainer.id + '-' + params.newButtonTask, {
    //                     service: params.buttonService,
    //                     moduleGroup: params.newButtonTask
    //                 })
    //             )
    //         }
    //     }
    //     input.addEventListener('keyup', async (event) => {
    //         if (event.key === undefined)
    //             return
    //         clearTimeout(this.dataListTimeOut)
    //         let value = input.value
    //         HtmlElementCreator.emptyDOMElement(dl)
    //         if (value.length > 2) {
    //             this.dataListTimeOut = setTimeout(async () => {
    //                 if (params.conditionParameters !== undefined)
    //                     params.conditionParameters[3] = this.getDatalistConditionParameter(params.conditionParameters[0]);
    //                 (await this.service.sendGetAttribForDatalist(params, value)).forEach(([key, value]) => {
    //                     if (value === null)
    //                         return
    //                     (HtmlElementCreator.createHtmlElement('option', dl, {value: value})).setAttribute('data-value', key)
    //                 })
    //             }, 300)
    //         }
    //     })
    // }
    //
    // /**
    //  * datalist kiválasztott option id lekérése
    //  * @param id {string} input megnevezés
    //  * @returns {string}
    //  */
    // getDatalistConditionParameter(id) {
    //     let index = Array.from(this._inputs[id].children[1].options).findIndex(opt => opt.value === this._inputs[id].firstChild.value)
    //     if (index !== -1)
    //         return this._inputs[id].children[1].options[index].getAttribute('data-value')
    //     return ''
    // }
    //
    // /**
    //  * nem széles táblát tartalmazó layout kialakítása, baloldalt side-menü, mellette a fő tartalom konténere
    //  */
    // displayNonTableViewBase() {
    //     let mainDiv = HtmlElementCreator.createSimpleHtmlElement('div', this.contentContainer, {class: 'leftFloatedContainer'})
    //     this.sideMenu = HtmlElementCreator.createSimpleHtmlElement('div', mainDiv, {class: 'detailedSideMenu'})
    //     this.mainContentContainer = HtmlElementCreator.createSimpleHtmlElement('div', mainDiv, {})
    // }
    //
    // /**
    //  * bal oldali al-menühöz tartozó side-menü létrehozása
    //  */
    // displaySideMenu() {
    //     HtmlElementCreator.createSimpleHtmlElement('div', this.sideMenu, {innerHTML: "További adatok"})
    //     Object.entries(this.windowContentPointer.content.sideMenuItems).forEach(([id, item]) => {
    //         this.sideMenuElements[id] = HtmlElementCreator.createSimpleHtmlElement('div', this.sideMenu, {
    //             innerHTML: item.label,
    //             class: 'sideMenuItem'
    //         })
    //     })
    // }
    //
    // /**
    //  * fókuszban lévő input beállítása
    //  * @param input {HTMLInputElement}
    //  */

    //
    // /**
    //  * pénznem összegek megformázása pl: 100.01 Eur
    //  * @param n összeg
    //  * @returns {string}megformált összeg
    //  */
    // formatValue(n) {
    //     n = n.replaceAll(/[^0-9|.]/g, '')
    //     const parts = n.toString().split(".");
    //     const numberPart = parts[0];
    //     const decimalPart = parts[1];
    //     const thousands = /\B(?=(\d{3})+(?!\d))/g;
    //     return numberPart.replace(thousands, " ") + (decimalPart && decimalPart !== '00' ? "." + decimalPart : "");
    // }
}
