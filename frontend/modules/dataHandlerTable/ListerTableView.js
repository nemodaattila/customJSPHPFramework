class ListerTableView {
    get id() {
        return this._id;
    }
    _columnMoveEnablerCB
    _mainContainer
    _operationDiv
    _tableContainer
    _tableDiv
    _dataTable
    _tHead
    _tBody
    _tableIconContainer
    _iconPath = "./modules/dataHandlerTable/"
    _id
    _headerRow
    _filterRow
    _filterInputs = {}
    _rows
    _selectedRows = []
    _lastClickedRow = undefined
    _actualSortElement = null



    getFilterInput(name)
    {
        return this._filterInputs[name]
    }

    constructor(id, tableContainer) {
        this._id = id
        this._mainContainer = tableContainer;
    }

    displayTableElements() {
        this._operationDiv = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'view_field'
        })
        this._tableContainer = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'tableContainer'
        })
        this._dataTable = HtmlElementCreator.createHtmlElement('table', this._tableContainer)
        this._tHead = HtmlElementCreator.createHtmlElement('thead', this._dataTable, {})
        this._tBody = HtmlElementCreator.createHtmlElement('tbody', this._dataTable)
        // this.pageScrollData.scrollDiv = HtmlElementCreator.createHtmlElement('div', this.tableContainer, {class: 'scrollHeight'})
        // this.pageScrollData.scrollDiv.style.height = this.defaultScrollHeight + "px"
        // this.redrawHeaders()
        // this.tBody.addEventListener('keydown', (event) => {
        //     this.showImage()
        //     clearTimeout(this.imageTimer)
        //     let index = this.rows.indexOf(this.selectedRows[0])
        //     if (event.key === 'ArrowUp')
        //         if (index !== 0) {
        //             index--;
        //             this.setSelectedRow(this.rows[index], index)
        //             this.imageTimer = setTimeout(() => this.showImage(this.controllerPointer.model.serverData[index]), 200)
        //         }
        //     if (event.key === 'ArrowDown')
        //         if (index !== this.rows.length - 1) {
        //             index++;
        //             this.setSelectedRow(this.rows[index], index)
        //             this.imageTimer = setTimeout(() => this.showImage(this.controllerPointer.model.serverData[index]), 200)
        //         }
        //     if (event.key === 'PageDown' && event.shiftKey)
        //         this.setSelectedRowWithPageJump(0)
        //     if (event.key === 'PageUp' && event.shiftKey)
        //         this.setSelectedRowWithPageJump(1)
        // })
        // let lastScrollTop = 0;
        // let newScrollTop
        // this.tableContainer.addEventListener('scroll', () => {
        //     newScrollTop = this.tableContainer.scrollTop
        //     if (newScrollTop === lastScrollTop)
        //         return
        //     this.scrollRows()
        //     if (newScrollTop > lastScrollTop) {
        //         let scrollPercent = this.getScrollPercent()
        //         if (isNaN(scrollPercent))
        //             scrollPercent = 100
        //         if (scrollPercent > 80) {
        //             clearTimeout(this.scrollTimer);
        //             this.scrollTimer = setTimeout(() => this.controllerPointer.collectSearchParamsForRequest('next'), 100)
        //         }
        //     }
        //     lastScrollTop = newScrollTop
        // })
        // this.overlay = HtmlElementCreator.createSimpleHtmlElement('div', this.container, {class: 'overlay'})
        //
    }

    displayOperationIcons(enabledOperations) {
        console.log(enabledOperations)
        this._tableIconContainer = HtmlElementCreator.createHtmlElement('div', this._operationDiv)
        let adder = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath + '/add_new_icon.png', class: 'tableIcon', title: 'Új rekord felvétele'
        })
        if (enabledOperations.add)
            adder.addEventListener('click', async (event) => {
                event.stopPropagation()
                await WindowHandler.createWindow(this.content.addModule, this.content.addModuleParams)
            })
        let editor = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath + 'edit_icon.png', class: 'tableIcon', title: 'Rekord kezelés'
        })
        if (enabledOperations.edit)
            editor.addEventListener('click', (event) => {
                event.stopPropagation()
                this.showDetailed()
            })
        let eraser = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath + 'del_icon.png', class: 'tableIcon', title: 'Kijelölt rekord(ok) törlése'
        })
        if (enabledOperations.deletable)
            eraser.addEventListener('click', (event) => {
                event.stopPropagation()
                this.service.sendDeleteRequest(this.selectedRows.map(row => row.connectedObjectId))
            })
        let printer = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath + 'print_icon.png',
            class: 'tableIcon',
            title: 'Megjelenített rekordok exportálása csv-be'
        })
        printer.addEventListener('click', (event) => {
            event.stopPropagation()
            this.printTableContent()
        })
        let refresher = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath + 'refresh_icon.png',
            class: 'tableIcon',
            title: 'Tábla tartalom frissítése'
        })
        refresher.addEventListener('click', (event) => {
            event.stopPropagation()
            this.refreshRows()
            clearInterval(this.interval)
            this.interval = setInterval(() => this.refreshRows(), 60000)
        })
    }

    addColumnMoveEnabler() {
        let columnMoveEnablerDiv = HtmlElementCreator.createHtmlElement('div', this._operationDiv)
        this._columnMoveEnablerCB = HtmlElementCreator.createHtmlElement('input', columnMoveEnablerDiv, {
            type: 'checkbox', id: "enableColumnMove" + this._id
        })
        let moveLabel = HtmlElementCreator.createHtmlElement('label', columnMoveEnablerDiv, {
            for: "enableColumnMove" + this._id
        })
        HtmlElementCreator.createHtmlElement('img', moveLabel, {
            src: this._iconPath + 'column_mover.png', class: 'tableIcon', title: 'Oszlop mozgatás engedélyezése'
        })
        this._columnMoveEnablerCB.addEventListener('change', () => this.changeCursor())
        let columnHiderParent = HtmlElementCreator.createHtmlElement('span', columnMoveEnablerDiv, {})
        let columnHider = HtmlElementCreator.createHtmlElement('img', columnHiderParent, {
            src: this._iconPath + 'column_editor.png',
            class: 'tableIcon',
            title: 'Oszlopok megjelenítése/elrejtése'
        })
        this.columnHiderDiv = HtmlElementCreator.createHtmlElement('span', columnHiderParent, {
            class: 'columnHiderDiv'
        })
        columnHider.addEventListener('click', () => this.columnHiderDiv.style.display = this.columnHiderDiv.style.display === 'block' ? 'none' : 'block')
    }

    displayTableHeaders(attributeOrder, attributeParams) {
        if (this._tHead.hasChildNodes())
            HtmlElementCreator.emptyDOMElement(this._tHead)
        this.headerRow = HtmlElementCreator.createHtmlElement('tr', this._tHead)
        attributeOrder.forEach((id) => {
            let modelParams = attributeParams[id]
            let th = HtmlElementCreator.createHtmlElement('th', this.headerRow, {})
            th.addEventListener('mousedown', (event) => DesktopEventHandlers.startMoveTh(event, th, this))
            let orderDiv = HtmlElementCreator.createHtmlElement('div', th, {})
            if ((modelParams !== undefined) && ((!('sortable' in modelParams)) || (modelParams['sortable'] === true))) {
                orderDiv.classList.add('order')
                orderDiv.addEventListener('click', () => {
                    this.initSorting(id, orderDiv)
                })
            }
            HtmlElementCreator.createHtmlElement('div', th, {class: 'text', innerHTML: modelParams?.label ?? id})
            let resizeElement = HtmlElementCreator.createHtmlElement('div', th, {class: 'resize'})
            resizeElement.addEventListener('mousedown', (event) => {
                event.stopPropagation()
                DesktopEventHandlers.startResize(event, th, this.dataTable, this)
            })
            resizeElement.addEventListener('dblclick', (event) => {
                event.stopImmediatePropagation()
                DesktopEventHandlers.resizeOptimal(event, th, this.dataTable, this.getTableHeaderIndex(id))
            })
            let span = HtmlElementCreator.createSimpleHtmlElement('span', this.columnHiderDiv,)
            let hcb = HtmlElementCreator.createSimpleHtmlElement('input', span, {
                type: 'checkbox',
                id: 'hcb-' + this._id + "-" + id,
                checked: 'checked'
            })
            HtmlElementCreator.createSimpleHtmlElement('label', span, {
                for: 'hcb-' + this._id + "-" + id,
                innerHTML: modelParams?.label
            })
            hcb.addEventListener('click', (event) => {
                event.stopPropagation()
                if (hcb.checked) {
                    DesktopEventHandlers.reDisplayColumn(th, this.dataTable)
                    if (this.autoHeaderSetting === false)
                        this.saveHeaderParams()
                } else {
                    DesktopEventHandlers.hideColumn(th, this.dataTable, this, id)
                    if (this.autoHeaderSetting === false)
                        this.saveHeaderParams()
                }
            })
        })
    }

    displayFilters(attributeOrder, attributeParams) {
        this._filterRow = HtmlElementCreator.createSimpleHtmlElement('tr', this._tHead, {'class': 'filterRow'})
        attributeOrder.forEach(id => {
            let modelParams = attributeParams[id]
            let td = HtmlElementCreator.createSimpleHtmlElement('td', this._filterRow)
            let filter = modelParams?.type ?? 'string'
            switch (filter) {
                case 'number':
                case 'bigint':
                case 'decimal':
                case 'double':
                case 'float':
                case 'int':
                case 'smallint':
                case 'tinyint':
                case 'year':
                case 'string':
                case 'char':
                case 'longtext':
                case 'mediumtext':
                case 'text':
                case 'tinytext':
                case 'varchar':
                    this._filterInputs[id] = [
                        HtmlElementCreator.createSelectWithOptions(td, {}, {
                            cont: 'Tartalmaz',
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
                        }, true),
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {
                            type: (['string', 'char', 'longtext', 'mediumtext', 'text', 'tinytext', 'varchar'].findIndex(
                                value => filter === value) === -1) ? "number" : 'text',
                            min: 0,
                            size: 20,
                        })
                    ]
                    if (modelParams.maxLength !== undefined)
                        this._filterInputs[id][1].maxLength = Math.min(parseInt(modelParams.maxLength), 524288);
                    if (modelParams.precision !== undefined)
                        this._filterInputs[id][1].max = (10 ** modelParams.precision) - 1
                    break;
                case 'select':
                case 'array':
                    this._filterInputs[id] = [
                        HtmlElementCreator.createSelectWithOptions(td, {}, {
                            eq: 'Egyenlő',
                            neq: 'Nem egyenlő',
                            null: 'Üres',
                            notnull: 'Nem üres',
                        }, true),
                        HtmlElementCreator.createSelectWithOptions(td, {},
                            modelParams.values, filter === 'select', true)
                    ];
                    break;
                case 'date':
                    this._filterInputs[id] = [
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'date'}),
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'date'})
                    ];
                    break;
                case 'datetime':
                    this._filterInputs[id] = [
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'datetime-local'}),
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'datetime-local'})
                    ];
                    break;
                case 'time':
                    this._filterInputs[id] = [
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'time'}),
                        HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'time'})
                    ];
                    break;
                case undefined:
                case 'none':
                    break
                default:
                    console.log('unkown filtertype: ' + filter)
            }
            if (modelParams !== undefined && modelParams['defaultValue'] !== undefined && modelParams.hidden !== true)
                this._filterInputs[id][1].value = modelParams['defaultValue']
            if (modelParams !== undefined && modelParams['defaultOperator'] !== undefined && modelParams.hidden !== true)
                this._filterInputs[id][0].value = modelParams['defaultOperator']
            if (modelParams !== undefined && modelParams['disabled'] === true) {
                this._filterInputs[id][0].disabled = true
                this._filterInputs[id][1].disabled = true
            }
            // if (filter !== undefined && filter !== 'none')
            //     this._filters[id] = [this.filterInputs[id][0].value, this.filterInputs[id][1].value]
        })
    }
}
