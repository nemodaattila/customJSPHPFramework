class ListerTableView {
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
    _headerRow
    _filterRow
    _filterInputs = {}
    _rows
    _selectedRows = []
    _lastClickedRow = undefined
    _actualSortElement = null
    _tableHeader
    _tableBody
    _controllerPointer
    _inMoveTh = undefined
    reSizeObject

    constructor(id, tableContainer, controllerPointer) {
        this._id = id
        this._mainContainer = tableContainer;
        this._mainContainer.style.display = 'table';
        this._mainContainer.style.tableLayout = 'fixed';
        this._controllerPointer = controllerPointer
    }

    destruct() {
        HtmlElementCreator.emptyDOMElement(this._mainContainer)
    }

    _id
    get id() {
        return this._id;
    }

    _tableFooter
    get tableFooter() {
        return this._tableFooter;
    }

    getFilterInput(name) {
        return this._filterInputs[name]
    }

    getTBodyHeight() {
        return this._tBody.clientHeight
    }

    displayTableElements() {
        this._tableHeader = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'listerTableHeader'
        })
        this._tableBody = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'listerTableBody'
        })
        this._tableFooter = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'listerTableFooter'
        })
        this._operationDiv = HtmlElementCreator.createHtmlElement('div', this._tableHeader, {
            class: 'view_field'
        })
        this._tableContainer = HtmlElementCreator.createHtmlElement('div', this._tableBody, {
            class: 'tableContainer'
        })
        this._dataTable = HtmlElementCreator.createHtmlElement('table', this._tableContainer, {class: 'listTable'})
        this._tHead = HtmlElementCreator.createHtmlElement('thead', this._dataTable, {})
        this._tBody = HtmlElementCreator.createHtmlElement('tbody', this._dataTable)
        this._mainContainer.addEventListener('mouseup', (event) => {
            this.endMoveTh(event)
            this.endResizeTh(event)
        })
        this._mainContainer.addEventListener('mousemove', (event) => {
            if (event.buttons === 1) {
                this.moveTh(event)
                this.moveResizeTh(event)
            }
        })
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
        columnHider.addEventListener('click', () => this.columnHiderDiv.style.display =
            this.columnHiderDiv.style.display === 'block' ? 'none' : 'block')
    }

    changeCursor() {
        Array.from(this._headerRow.children).forEach((head) =>
            head.style.cursor = this._columnMoveEnablerCB.checked === true ? 'grab' : "")
    }

    displayTableHeaders(attributeOrder, attributeParams, isReDraw = false) {
        if (this._tHead.hasChildNodes())
            HtmlElementCreator.emptyDOMElement(this._tHead)
        this._headerRow = HtmlElementCreator.createHtmlElement('tr', this._tHead)
        attributeOrder.forEach((columnName) => {
            let modelParams = attributeParams[columnName]
            let th = HtmlElementCreator.createHtmlElement('th', this._headerRow, {})
            th.setAttribute('moveCheckBoxName', 'hcb-' + this._id + "-" + columnName)
            th.addEventListener('mousedown', (event) =>
                this.startMoveTh(event, th))
            let orderDiv = HtmlElementCreator.createHtmlElement('div', th, {})
            if ((modelParams !== undefined) && ((!('sortable' in modelParams)) || (modelParams['sortable'] === true))) {
                orderDiv.classList.add('order')
                orderDiv.addEventListener('click', () => {
                    this.initSorting(columnName, orderDiv)
                })
            }
            HtmlElementCreator.createHtmlElement('div', th, {
                class: 'text',
                innerHTML: modelParams?.label ?? columnName
            })
            let resizeElement = HtmlElementCreator.createHtmlElement('div', th,
                {class: 'resize'})
            resizeElement.addEventListener('mousedown', (event) => {
                event.stopImmediatePropagation()
                this.startResizeTh(event, th)
            })
            resizeElement.addEventListener('dblclick', (event) => {
                event.stopImmediatePropagation()
                this.resizeThOptimal(event, th)
                // DesktopEventHandlers.resizeOptimal(event, th, this.dataTable, this.getTableHeaderIndex(columnName))
            })
            if (isReDraw)
                return
            let span = HtmlElementCreator.createSimpleHtmlElement('span', this.columnHiderDiv,)
            let hcb = HtmlElementCreator.createSimpleHtmlElement('input', span, {
                type: 'checkbox',
                id: 'hcb-' + this._id + "-" + columnName,
                checked: 'checked'
            })
            HtmlElementCreator.createSimpleHtmlElement('label', span, {
                for: 'hcb-' + this._id + "-" + columnName,
                innerHTML: modelParams?.label
            })
            hcb.addEventListener('click', (event) => {
                event.stopPropagation()
                this._controllerPointer.displayHideColumn(hcb.checked, columnName)
                //     DesktopEventHandlers.hideColumn(th, this.dataTable, this, id)
                //     if (this.autoHeaderSetting === false)
                //         this.saveHeaderParams()
                // }
            })
        })
    }

    resizeThOptimal(event, object) {
        let minAutoWidth = 128;
        let actWidth
        let num = object.cellIndex
        Object.values(this._rows).forEach(row => {
            actWidth = this.getTextWidth(row.children[num])
            minAutoWidth = Math.max(actWidth, minAutoWidth)
        })
        let columnWith = (minAutoWidth + 10) + "px"
        object.style.width = columnWith;
        this._filterRow.children[num].style.width = columnWith
        Object.values(this._rows).forEach(row => {
            row.children[num].style.width = columnWith
        })
    }

    getTextWidth(element) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let fontSize = window.getComputedStyle(element).getPropertyValue("font-size");
        let fontFamily = window.getComputedStyle(element).getPropertyValue("font-family");
        context.font = fontSize + " " + fontFamily
        return context.measureText(element.textContent).width;
    }

    startResizeTh(event, object) {
        if (event.button !== 0 || object.getAttribute("data-rooted") === "1")
            return
        this.reSizeObject = {}
        this.reSizeObject.mouseX = event.pageX || event.clientX;
        this.reSizeObject.objectPos = object.getBoundingClientRect();
        this.reSizeObject.zoomVal = this.getZoom()
        this.reSizeObject.object = object;
        this.reSizeObject.resizeWidth = object.getBoundingClientRect().width;
    }

    moveResizeTh(event) {
        if (this.reSizeObject === undefined)
            return
        let newX = event.pageX || event.clientX;
        let newY = event.pageY || event.clientY;
        this.reSizeObject.resizeWidth = parseInt(this.reSizeObject.resizeWidth, 10) + ((newX - this.reSizeObject.mouseX) / this.reSizeObject.zoomVal);
        this.reSizeObject.object.style.width = this.reSizeObject.resizeWidth + "px";
        this.reSizeObject.mouseX = newX;
        this.reSizeObject.mouseY = newY;
        let num = this.reSizeObject.object.cellIndex
        this._filterRow.children[num].style.width = this.reSizeObject.resizeWidth + "px"
        Object.values(this._rows).forEach(row => {
            row.children[num].style.width = this.reSizeObject.resizeWidth + "px";
        })
    }

    endResizeTh(event) {
        if (this.reSizeObject === undefined)
            return
        let num = this.reSizeObject.object.cellIndex
        this._filterRow.children[num].style.width = this.reSizeObject.resizeWidth + "px"
        Object.values(this._rows).forEach(row => {
            row.children[num].style.width = this.reSizeObject.resizeWidth + "px";
        })
        if (parseInt(this.reSizeObject.resizeWidth, 10) < 10) {
            document.getElementById(this.reSizeObject.object.getAttribute('moveCheckBoxName')).click()
        }
        this.reSizeObject = undefined
    }

    startMoveTh(event, headerObject) {
        if (!this._columnMoveEnablerCB.checked || event.button !== 0 || headerObject.getAttribute("data-rooted") === "")
            return
        this._inMoveTh = {}
        this._inMoveTh.mouseX = event.pageX || event.clientX;
        this._inMoveTh.objectPos = headerObject.getBoundingClientRect();
        // this.inMoveTh.moveCbChecked = tableObject.moveEnablerCB.checked;
        // let zoomVal = window.getComputedStyle(tableObject.tableDiv).zoom;
        let zoomVal = this.getZoom()
        if ((this._inMoveTh.objectPos.x + this._inMoveTh.objectPos.width - 10) * zoomVal > this._inMoveTh.mouseX) {
            let floatingHeader = HtmlElementCreator.createHtmlElement('div',
                this._headerRow)
            floatingHeader.style.background = "lightgray";
            floatingHeader.style.border = "2px solid rgb(0,0,0)";
            floatingHeader.style.textAlign = "center";
            floatingHeader.style.fontWeight = "bold";
            floatingHeader.style.position = "absolute";
            floatingHeader.style.top = "0px";
            floatingHeader.style.left = headerObject.getBoundingClientRect().x - this._headerRow.getBoundingClientRect().x + "px";
            floatingHeader.style.height = "20px";
            floatingHeader.style.width = headerObject.getBoundingClientRect().width + "px";
            floatingHeader.style.zIndex = '1010';
            floatingHeader.actualCellIndex = headerObject.cellIndex;
            floatingHeader.innerHTML = headerObject.innerHTML;
            // floatingHeader.tableParent = tableObject.tableDiv
            // floatingHeader.tableHeadPointer = tableObject.tHead
            // floatingHeader.tableBodyPointer = tableObject.tBody
            // for (let e in table.rows)
            //     if (table.rows[e].cells && table.rows[e].cells[headerObject.cellIndex])
            //         table.rows[e].cells[headerObject.cellIndex].style.display = "none";
            this._inMoveTh.object = floatingHeader;
            this._inMoveTh.object.zoomVal = zoomVal;
        }
    }

    moveTh(event) {
        if (this._inMoveTh === undefined)
            return
        let newX = event.pageX || event.clientX;
        let newY = event.pageY || event.clientY;
        this._inMoveTh.object.style.left =
            parseInt(this._inMoveTh.object.style.left, 10) +
            ((newX - this._inMoveTh.mouseX) / this._inMoveTh.object.zoomVal) + 'px';
        let swapCellIndex = 0;
        let inMove = this._inMoveTh.object
        Array.from(this._headerRow.children).forEach((head, i) => {
            if (head.nodeName === 'DIV')
                return
            head.style.borderLeft = ''
            head.style.borderRight = ''
            if (head.getBoundingClientRect().x * inMove.zoomVal < event.pageX &&
                i !== inMove.actualCellIndex && head.style.display !== "none") {
                swapCellIndex = i;
                head.style.borderLeft = "";
                head.style.borderRight = "";
            }
        })
        if (swapCellIndex < inMove.actualCellIndex) {
            this._headerRow.children[swapCellIndex].style.borderLeft = "2px solid red";
        } else
            this._headerRow.children[swapCellIndex].style.borderRight = "2px solid red";
        this._inMoveTh.mouseX = newX;
        this._inMoveTh.mouseY = newY;
    }

    endMoveTh(event) {
        if (this._inMoveTh === undefined)
            return
        let inMove = this._inMoveTh.object
        let swapCellIndex = 0;
        Array.from(this._headerRow.children).forEach((head, i) => {
            if (head.nodeName === 'DIV')
                return
            if (head.getBoundingClientRect().x * inMove.zoomVal < event.pageX &&
                i !== inMove.actualCellIndex && head.style.display !== "none")
                swapCellIndex = i;
            head.style.borderLeft = "";
            head.style.borderRight = "";
        })
        this._headerRow.removeChild(inMove);
        this._controllerPointer.moveColumn(inMove.actualCellIndex, swapCellIndex)
        this._inMoveTh = undefined
        // let headerRow = inMove.tableHeadPointer.firstElementChild
        // headerRow.cells[inMove.actualCellIndex].style.display = "";
        // let cell = headerRow.cells[inMove.actualCellIndex];
        // headerRow.removeChild(cell);
        // headerRow.insertBefore(cell, headerRow.cells[swapCellIndex]);
        // if (inMove.tableHeadPointer.children[1] !== undefined) {
        //     let filterRow = inMove.tableHeadPointer.children[1]
        //     filterRow.cells[inMove.actualCellIndex].style.display = "";
        //     let cell = filterRow.cells[inMove.actualCellIndex];
        //     filterRow.removeChild(cell);
        //     filterRow.insertBefore(cell, filterRow.cells[swapCellIndex]);
        // }
        // Array.from(inMove.tableBodyPointer.children).forEach((row) => {
        //     if (row.cells && row.cells[inMove.actualCellIndex]) {
        //         row.cells[inMove.actualCellIndex].style.display = "";
        //         let cell = row.cells[inMove.actualCellIndex];
        //         row.removeChild(cell);
        //         row.insertBefore(cell, row.cells[swapCellIndex]);
        //     }
        // })
        // let spliced = this.inMoveTh.windowPointer.columnNames.splice(inMove.actualCellIndex, 1)[0]
        // this.inMoveTh.windowPointer.columnNames.splice(swapCellIndex, 0, spliced)
    }

    getDisplayRowIds() {
        return this._rows.map(row => row.getAttribute('recordId'))
    }

    displayFilters(attributeOrder, attributeParams) {
        this._filterRow = HtmlElementCreator.createSimpleHtmlElement('tr', this._tHead, {'class': 'filterRow'})
        this._filterInputs = {}
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

    emptyBody() {
        this._rows = []
        HtmlElementCreator.emptyDOMElement(this._tBody)
    }

    zoomContent(zoomValue) {
        this._tableContainer.style.zoom = zoomValue
    }

    getZoom() {
        return this._tableContainer.style.zoom === '' ? 1 : this._tableContainer.style.zoom
    }

    createRowWithRecord(values, id) {
        let row = HtmlElementCreator.createHtmlElement('tr', this._tBody, {})
        row.setAttribute("recordId", id)
        this._rows.push(row)
        values.forEach(([value, type, paramName]) => {
            let td = HtmlElementCreator.createHtmlElement('td', row, {innerHTML: value})
            if (['int', 'number', 'date', 'decimal'].findIndex(dataType => dataType === type) !== -1)
                td.classList.add('rightAlign')
            if (['string', 'date', 'datetime', 'select', 'varchar', 'text'].findIndex(dataType => dataType === type) !== -1)
                td.classList.add('leftAlign')
            if (!document.getElementById("hcb-" + this.id + "-" + paramName).checked)
                td.style.display = 'none'
        })
        return row;
    }
}
