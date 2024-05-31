class ListerTable {

    static _id = -1
    _view
    _interval // refreshInterval
    _intervalInSeconds = 60000;
    _controllerPointer
    _headerAttributeParams
    _resizeTimeOut
    // autoHeaderSetting = false
    // dblClickTimer = false
    constructor( controllerPointer) {
        ListerTable._id++
        this._view = new ListerTableView(ListerTable._id, controllerPointer.getWindowContentMainContainer(), this)
        this._view.displayTableElements()
        this._controllerPointer = controllerPointer
        this._headerAttributeParams = this._controllerPointer.getHeaderAttributeParams()
        // this._interval = setInterval(() => this.refreshRows(), this._intervalInSeconds)
        // this.observer = new ResizeObserver(this.onWindowResize)
        // this.observer.observe(this._view._tableContainerBody);
    }

    // onWindowResize(object) {
    //     console.log(object)
    //     if (!(object instanceof Element))
    //         object = object[0].target
    //     clearTimeout(this.resizeTimeOut);
    //     this.resizeTimeOut = setTimeout(() => {
    //         object._controllerPointer._controllerPointer.softRefreshTable()
    //     }, 200);
    // }

    get view() {
        return this._view;
    }

    destruct() {
        // this.observer.unobserve(this._view.tBody);
        this._view.destruct()
        this._view = undefined
        //DO destruct interals
    }

    getTableContainerFooter() {
        return this._view.tableContainerFooter
    }

    getTableContainerBody() {
        return this._view.tableContainerBody
    }

    getTBodyHeight() {
        return this._view.getTBodyHeight()
    }

    displayTableIcons(enabledOperations) {
        this._view.displayOperationIcons(enabledOperations)
        this._view.addColumnMoveEnabler()
    }

    drawHeaders(tableAttributeOrder, defaultOrderParamName, isReDraw = false) {
        this._view.displayTableHeaders(tableAttributeOrder, this._headerAttributeParams,defaultOrderParamName, isReDraw)
        this._view.displayFilters(tableAttributeOrder, this._headerAttributeParams)
        this.addFilterEvents(tableAttributeOrder)
    }

    addFilterEvents(tableAttributeOrder) {
        tableAttributeOrder.forEach(attribName => {
            let type = this._headerAttributeParams[attribName]?.type
            if (type === 'none')
                return
            let filters = this._view.getFilterInput(attribName)
            filters[0].addEventListener('input', (event) => {
                event.stopPropagation()
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(() => {
                    this._controllerPointer.onTableFilterChange()
                }, 300);
                if (event.target.value === 'null' || event.target.value === 'notnull') {
                    event.target.nextElementSibling.value = '';
                    event.target.nextElementSibling.disabled = true;
                } else event.target.nextElementSibling.disabled = false;
            })
            filters[1].addEventListener('input', (event) => {
                clearTimeout(this.timeOut)
                this.timeOut = setTimeout(() => {
                    this._controllerPointer.onTableFilterChange()
                }, 300);
            })
            if (this._headerAttributeParams[attribName]?.hidden)
                document.getElementById('hcb-' + this._view.id + "-" + attribName).click()
        })
    }

    zoomContent(zoomValue) {
        this._view.zoomContent(zoomValue)
        //DO refresh
    }

    displayHideColumn(isDisplay, columnName) {
        this._controllerPointer.displayHideColumn(isDisplay, columnName)
    }

    getDisplayRowIds() {
        return this._view.getDisplayRowIds()
    }

    moveColumn(moveCellFrom, moveCellTo) {

        this._controllerPointer.moveColumn(moveCellFrom, moveCellTo)
    }

    refreshRows() {
        this._controllerPointer.refreshRows()
    }

    flushTable() {
        this._view.emptyBody()
    }

    collectAndConvertFilterParams() {
        let finalFilterData = []
        console.log(this)
        Object.entries(this._headerAttributeParams).forEach(([name, headerParams]) => {
            let filterType = headerParams.type ?? 'string'
            let inputs = this._view.getFilterInput(name)
            if (inputs === undefined)
                return;
            let inputValues = [inputs[0].value, inputs[1].value];
            let values = ''
            switch (filterType) {
                case 'number':
                case 'bigint':
                case 'decimal':
                case 'double':
                case 'float':
                case 'int':
                case 'smallint':
                case 'tinyint':
                case 'year':
                    if (inputValues[1] !== '' || inputValues[0] === 'null' || inputValues[0] === 'notnull')
                        values = [this.convertOperationString(inputValues[0]), parseInt(inputValues[1])];
                    break;
                case 'string':
                case 'char':
                case 'longtext':
                case 'mediumtext':
                case 'text':
                case 'tinytext':
                case 'varchar':
                case 'select':
                case 'array':
                    if (inputValues[1] !== '' || inputValues[0] === 'null' || inputValues[0] === 'notnull')
                        values = [this.convertOperationString(inputValues[0]), inputValues[1].toString()];
                    break;
                case 'time':
                    let timeFrom = '';
                    if (inputValues[0] !== '') {
                        let tf = inputValues[0].split(':')
                        timeFrom = new Date()
                        timeFrom.setHours(tf[0])
                        timeFrom.setMinutes(tf[1])
                        timeFrom.setSeconds(0)
                    }
                    let timeTo = '';
                    if (inputValues[1] !== '') {
                        let tt = inputValues[1].split(':')
                        timeTo = new Date()
                        timeTo.setHours(tt[0])
                        timeTo.setMinutes(tt[1])
                        timeTo.setSeconds(0)
                    }
                    if (timeFrom !== '' || timeTo !== '')
                        values = [timeFrom, timeTo, 1];
                    if (values[0] > values[1]) {
                        Messenger.showAlert('kezdő idő nem lehet nagyobb a végidőnél')
                        return
                    }
                    break;
                case 'datetime':
                    let temp = []
                    if (inputValues[0] !== '')
                        temp[0] = inputValues[0].toString().replace('T', ' ')
                    if (inputValues[1] !== '')
                        temp[1] = inputValues[1].toString().replace('T', ' ')
                    if (inputValues[0] !== '' || inputValues[1] !== '') {
                        if (inputValues[0] !== '' && inputValues[1] === '')
                            temp[1] = '2286-11-20 23:59:59'
                        if (inputValues[0] === '' && inputValues[1] !== '')
                            temp[0] = '1970-01-01 00:00:00'
                        values = temp
                        values[2] = 1;
                        if (values[0] > values[1]) {
                            Messenger.showAlert('kezdő dátum-idő nem lehet nagyobb a végdátum idő-nél')
                            return
                        }
                    }
                    break;
                case 'date':
                    let temp2 = []
                    if (inputValues[0] !== '')
                        temp2[0] = inputValues[0].toString().replace('T', ' ')
                    if (inputValues[1] !== '')
                        temp2[1] = inputValues[1].toString().replace('T', ' ')
                    if (inputValues[0] !== '' || inputValues[1] !== '') {
                        if (inputValues[0] !== '' && inputValues[1] === '')
                            temp2[1] = '2286-11-20'
                        if (inputValues[0] === '' && inputValues[1] !== '')
                            temp2[0] = '1970-01-01'
                        values = temp2
                        values[2] = 1;
                    }
                    if (values[0] > values[1]) {
                        Messenger.showAlert('kezdő dátum nem lehet nagyobb a végdátumnál')
                        return
                    }
                    break;
                case 'hidden':
                case undefined:
                    break
                default:
                    if (inputValues[0] !== '' || inputValues[1] !== '')
                        values = [this.convertOperationString(inputValues[0]), inputValues[1]];
            }
            if (values !== '')
                finalFilterData.push([name].concat(values))
        })
        Object.entries(this._headerAttributeParams).forEach(([name, headerParams]) => {
            if (headerParams.filterType === 'hidden' && headerParams.defaultOperator)
                finalFilterData.push([name, this.convertOperationString(headerParams.defaultOperator), headerParams.defaultValue])
        })
        console.log(finalFilterData)
        return finalFilterData
    }

    convertOperationString(operation) {
        switch (operation) {
            case 'eq':
                return '=';
            case 'neq':
                return '!=';
            case 'sm':
                return '<';
            case 'sme':
                return '<=';
            case 'gr':
                return '>';
            case 'gre':
                return '>=';
            default:
                return operation;
        }
    }

    onSortElementClick(parameterName, order) {
        this._controllerPointer.onSortElementClick(parameterName, order)
    }

    beforeRefresh() {
        // let selectedIds = this.selectedRows.map(tr => tr.connectedObjectId)
//         this.selectedRows = []
//         let lastClickedId = this.lastClickedRow?.connectedObjectId
//         this.overlay.style.display = 'block'
//         this.scrollRows(this.pageScrollData.rowFrom)
// //
    }

    afterRefresh() {
        // this.overlay.style.display = 'none'
//         this.rows.filter(row => selectedIds.findIndex(id => id === row.connectedObjectId) !== -1).forEach(row => {
//             this.addRemoveSelectedRow(row)
//             if (row.connectedObjectId === lastClickedId)
//                 this.lastClickedRow = row
//         })
    }

    displayRecordsInTable(records, order) {
            records.forEach(record => {
                let orderedAttributes = []
                let attribs = record[1]
                // console.log(attribs)

                order.forEach((orderAttrib)=>{
                    // console.log(orderAttrib)
                    orderedAttributes.push(attribs.find(attrib => {
                        // console.log(attrib[2])
                        return  attrib[2]=== orderAttrib
                    }))

                })

            let row = this._view.createRowWithRecord(orderedAttributes, record[0])
        })
//         data.forEach(record => {
//             row.connectedObjectId = record.id
//             this.rows.push(row)
//             row.addEventListener('click', (event) => {
//                 event.preventDefault()
//                 if (this.dblClickTimer) {
//                     clearTimeout(this.dblClickTimer);
//                     this.dblClickTimer = false;
//                 }
//                 switch (event.detail) {
//                     case 1:
//                         this.dblClickTimer = setTimeout(() => {
//                             this.selectRow(row, event, event.detail === 1)
//                             if (event.button === 1 || this.service.selectedRecord !== null)
//                                 this.showDetailed(false)
//                             this.showImage(record)
//                         }, 200);
//                         break;
//                     case 2:
//                         this.selectRow(row, event, event.detail === 1)
//                         this.showDetailed()
//                         break;
//                     default:
//                         break;
//                 }
//             })
//
//             })
//         })
    }

    openHandlerWindow(operationType)
    {
        this._controllerPointer.openHandlerWindow(operationType)
    }

//      * lefelé görgetésnél timer, akkor indul ha a göretés befejeződőtt, tábla alsó 80 %-ában
//      */
//     scrollTimer
//     /**
//      * szürke "fedél" ha a tábla frissít, megjelenik ilyemkor nem lehet kattintani
//      */
//     overlay
//     /**
//      * görgetést segítő objektum
//      * @type PageScrollHelper
//      */
//     pageScrollData
//     /**
//      * időköz a tábláa tartalmának frissítéséhez (1 perc)
//      */
//     interval
//
//     constructor(container, content, service) {
//         super(container, content)
//         this.pageScrollData = new PageScrollHelper()
//         this.init(service)
//     }
//
//     destruct() {
//         this.observer.unobserve(this.container.parentElement.parentElement)
//         clearInterval(this.interval)
//     }
//     async refreshRows() {
//
//     }
//     /**
//      * egyedi ikon hozzáadása az ikonsorhoz
//      * @param params {Object} az icon paraméterei
//      * @returns {HTMLImageElement} létrejött ikon kép
//      */
//     addUniqueHandlerIcon(params) {
//         this.entityHandlerIcons[params.id] = HtmlElementCreator.createHtmlElement('img', this.windowIconContainer, {
//             src: params.src, class: 'columnMoveIcon', title: params.title
//         })
//         return this.entityHandlerIcons[params.id]
//     }
//
//     /**
//      * header szélesség és sorrend beállítása adatbázisból
//      * @param params {[],{}} header paraméterek {name: width}
//      */
//     setHeaderParams(params) {
//         let {headerParams, order} = params
//         this.autoHeaderSetting = true
//         headerParams.forEach(([id, param]) => {
//             let cb = document.getElementById("hcb-" + this.id + "-" + id)
//             cb.click()
//             if (param !== '0px') {
//                 cb.click()
//                 if (param !== '') {
//                     let index = this.columnNames.findIndex(head => head === id)
//                     let table = this.dataTable
//                     Array.from(table.rows).forEach((row) => {
//                         row.children[index].style.width = param;
//                         row.children[index].style.display = "table-cell";
//                     })
//                 }
//             }
//         })
//         this.setOrdering(...order)
//         this.autoHeaderSetting = false
//     }
//
//     /**
//      * tábla tartalom zoom-jának állítása
//      * @param value {number} zoom mértéke
//      * @param save {boolean} változás mentődjön-e adatbázisba
//      */
//     setTableZoom(value, save = true) {
//         this.zoom = value
//         this.pageScrollData.zoom = value
//         this.tableContainer.style.zoom = value
//         if (save)
//             DesktopEventHandlers.onWindowResize(this.container)
//     }
//
//     /**
//      * megjelenítendő sorok számának számítása
//      */
//     calcTableRowNum() {
//         this.pageScrollData.calcTableRowNum(this.tHead.offsetHeight, parseInt(this.tableContainer.offsetHeight), this.rows.length)
//     }
//
//     /**
//      * scrollozás imitálása a sorok elrejtésével, megjelenítésével
//      * @param top legelső sor sorszáma
//      */
//     scrollRows(top) {
//         let [firstRow, lastRow] = this.pageScrollData.getFirstAndLastRowNumberForScroll(top, this.tableContainer.scrollTop)
//         this.rows.forEach((row, key) => {
//             row.style.display = key < firstRow || key > lastRow ? 'none' : 'table-row'
//         })
//     }
//
//     /**
//      * tábla zoom lekérése
//      * @returns {number|string}
//      */
//     getZoom() {
//         return this.zoom
//     }
//
//     /**
//      * szűrési paraméterek lekérése
//      * @param type művelet típus : reset - törli a táblát, next : új sorokat kér le, refresh az összes már lekért sort újra lekéri
//      * @returns {{offset: number, limit: number, filters: *[], orderDir: (string), order: string}}
//      */
//     getSearchParams(type) {
//         let limit, offset
//         if (type === 'reset') {
//             this.pageScrollData.resetOffset();
//             [limit, offset] = this.pageScrollData.getLimitOffset()
//         }
//         if (type === 'next')
//             [limit, offset] = [this.pageScrollData.nextRowCount, this.rows.length]
//         if (type === 'refresh')
//             [limit, offset] = [this.rows.length, 0]
//         let filters = this.collectAndConvertFilterParams()
//         return {
//             filters: filters,
//             limit: limit,
//             offset: offset,
//             order: this.actualSort[0],
//             orderDir: (this.actualSort[1] === 1 ? 'ASC' : 'DESC')
//         }
//     }
//
//     /**
//      * szűrőkből a keresési feltételek és értékek kinyerése, és megfelelő formátumba konvertálásq
//      * @returns {*[]}
//      */
//
//     /**
//      * műveletek szövegből jellé konvertálása
//      * @param operation műveleto kód
//      * @returns {*|string} műveleti jel
//      */
//
//     /**
//      * tábla kiürítése és feltöltése, soresemények hozzáadása
//      * @param data { [{}] } adatrekordok
//      * @param append {boolean} ha append akkor nincs törlés, csak hozzáfűzés
//      */
//     displayData(data, append = false) {
//
//     }
//
//     /**
//      * visszaadja,hogy a kért attribútum a tábla hányadik oszlopában van
//      * @param attribToFind {string} attribútumnév
//      * @returns {number} oszlopsorszám
//      */
//     getTableHeaderIndex(attribToFind) {
//         return this.columnNames.findIndex(attrib => attrib === attribToFind)
//     }
//
//     /**
//      * tábla scroll hány %-nál tart
//      * @returns {number}
//      */
//     getScrollPercent() {
//         return 100 * (this.tableContainer.scrollTop / (this.tableContainer.scrollHeight - this.tableContainer.clientHeight))
//     }
//
//     /**
//      * scrolldiv magasságának megnövelése
//      */
//     increaseScrollHeight() {
//         this.pageScrollData.setScrollHeight(this.rows.length)
//     }
//
//     /**
//      * bal gomb-ra kattintás esemény kiváltása, ctrl és shift gomb nyomásától függően
//      * @param row {HTMLTableRowElement} kattintott sor
//      * @param event {MouseEvent} mouse click event
//      * @param triggerDataSend {boolean}, vissza kell-e adni adatot a rekordról
//      */
//     selectRow(row, event, triggerDataSend = false) {
//         if (event.ctrlKey) {
//             this.addRemoveSelectedRow(row)
//         } else {
//             if (!event.shiftKey) {
//                 this.setSelectedRow(row, false, triggerDataSend)
//                 this.lastClickedRow = row
//             } else
//                 this.setSelectedRowWithShift(row)
//         }
//     }
//
//     /**
//      * sima bal click, egy sor kijelölése
//      * @param newRow {HTMLTableRowElement} kattintott sor
//      * @param index {number|boolean} kattintorr sor indexe
//      * @param triggerDataSend {boolean} ha true akkor a record bizonyos adatait elküldi egy feliratkozott ablaknak, entitás felételéhez például
//      */
//     setSelectedRow(newRow, index, triggerDataSend = false) {
//         this.selectedRows.forEach((row) => {
//             row.setAttribute("data-select", "0");
//         })
//         this.selectedRows = []
//         newRow.setAttribute("data-select", "1");
//         this.selectedRows.push(newRow)
//         this.lastClickedRow = newRow
//         if (triggerDataSend === true) {
//             let eventParams = {}
//             let index = this.controllerPointer.model.serverData.findIndex(entity => entity.id === newRow.connectedObjectId)
//             this.content.onClickEventAttribs?.forEach(attrib => eventParams[attrib] = this.controllerPointer.model.serverData[index][attrib])
//             setTimeout(() => EventSubscriptionHandler.triggerSubscriptionCall(this.content.entityTriggerName + "DataForEntity", eventParams, {sendData: true}), 200)
//         }
//         if (index === false)
//             return
//         if (index >= this.pageScrollData.rowTo)
//             this.tableContainer.scrollTo(0, this.pageScrollData.getScrollCoord('up', index));
//         if (index <= this.pageScrollData.rowFrom)
//             this.tableContainer.scrollTo(0, this.pageScrollData.getScrollCoord('down', index));
//         if (index === this.rows.length - 1) {
//             this.controllerPointer.collectSearchParamsForRequest('next')
//         }
//     }
//
//     /**
//      * kép megjelenítése sorra egyszeri kattintásra
//      * @param record {{}} adatrekord
//      */
//     showImage(record = null) {
//         if (this.content.hasFile) {
//             HtmlElementCreator.emptyDOMElement(this.imageContainer)
//             if (record !== null && record.imagePath !== '' && record.imagePath !== false) {
//                 this.tableContainer.style.width = "67%"
//                 this.imageContainer.style.width = "33%"
//                 if (record.imagePath.split('.')[1] !== 'pdf') {
//                     let img = HtmlElementCreator.createNestedHtmlElement(['div', 'img'], this.imageContainer, {
//                         src: App.backendImgUrl + record.imagePath
//                     })
//                     img.style.maxWidth = '100%'
//                 } else {
//                     let pdf = HtmlElementCreator.createSimpleHtmlElement('object', this.imageContainer, {
//                         type: "application/pdf",
//                         data: App.backendImgUrl + record.imagePath
//                     })
//                     pdf.style.width = '100%'
//                     pdf.style.height = '100%'
//                 }
//             } else {
//                 this.tableContainer.style.width = "100%"
//                 this.imageContainer.style.width = "0"
//             }
//         }
//     }
//
//     /**
//      * tábla egy sorára kattintás ,majd shift  és pageUp vagy pageDown gomb lenyomása (több sor kijelölése - két sor között az összes sort kijelöli)
//      * @param dir {number} irány 0: le , 1 fel
//      */
//     setSelectedRowWithPageJump(dir) {
//         let first, last
//         if (this.selectedRows.length === 1) {
//             last = dir === 0 ? this.pageScrollData.rowTo : this.pageScrollData.rowFrom
//             first = this.rows.indexOf(this.lastClickedRow)
//         } else {
//             let firstIndex = this.rows.indexOf(Array.from(document.querySelectorAll('[data-select="1"]')).shift())
//             let lastIndex = this.rows.indexOf(Array.from(document.querySelectorAll('[data-select="1"]')).pop())
//             if (this.lastClickedRow === this.rows[firstIndex]) {
//                 first = this.rows.indexOf(this.lastClickedRow)
//                 if (dir === 0) {
//                     last = Math.min(lastIndex + this.pageScrollData.rowCountShown, this.rows.length - 1)
//                     this.tableContainer.scroll(0, last * this.pageScrollData.defaultRowHeight)
//                 } else {
//                     last = Math.max(lastIndex - this.pageScrollData.rowCountShown, firstIndex)
//                     this.tableContainer.scroll(0, ((last - (this.pageScrollData.rowCountShown - 1)) * this.pageScrollData.defaultRowHeight))
//                 }
//             }
//             if (this.lastClickedRow === this.rows[lastIndex]) {
//                 last = this.rows.indexOf(this.lastClickedRow)
//                 if (dir === 0) {
//                     first = Math.min(firstIndex + this.pageScrollData.rowCountShown, lastIndex)
//                     this.tableContainer.scroll(0, first * this.pageScrollData.defaultRowHeight)
//                 } else {
//                     first = Math.max(firstIndex - this.pageScrollData.rowCountShown, 0)
//                     this.tableContainer.scroll(0, first * this.pageScrollData.defaultRowHeight)
//                 }
//             }
//         }
//         if (last < first)
//             [first, last] = [last, first]
//         this.selectedRows = []
//         this.rows.forEach((row, key) => {
//             row.setAttribute("data-select", "0");
//             if (key >= first && key <= last)
//                 this.addRemoveSelectedRow(row)
//         })
//     }
//
//     /**
//      * invertálja egy sor kijelölését, ctrl + egér bal gomb
//      * @param rowToCheck {HTMLTableRowElement} sor DOM elem
//      */
//     addRemoveSelectedRow(rowToCheck) {
//         let index = this.selectedRows.indexOf(rowToCheck)
//         if (index === -1) {
//             rowToCheck.setAttribute("data-select", "1");
//             this.selectedRows.push(rowToCheck)
//         } else {
//             rowToCheck.setAttribute("data-select", "0");
//             this.selectedRows.splice(index, 1)
//         }
//     }
//
//     /**
//      * kiválasztott sor/rekord részletes adataink/módosító táblájának megjelenítése, dupla kattintás
//      */
//     async showDetailed(setAsActive = true) {
//         if (this.selectedRows.length === 1) {
//             if (this.content.manageModule === undefined)
//                 return
//             await WindowHandler.createWindow(this.content.manageModule, this.content.manageModuleParams, {
//                 connectedObjectId: this.selectedRows[0].connectedObjectId,
//                 connectedService: this.service
//             }, setAsActive)
//         }
//         if (this.selectedRows.length > 1) {
//             if (this.content.manageMultiModule === undefined)
//                 return
//             await WindowHandler.createWindow(this.content.manageMultiModule, this.content.manageMultiModuleParams,
//                 {connectedObjectId: this.selectedRows.map(row => row.connectedObjectId)})
//         }
//     }
//
//     /**
//      * tábla egy sorára kattintás eseménye , shift gomb nyomva tartásával (több sor kijelölése - két sor között az összes sort kijelöli)
//      * @param newRow {HTMLTableRowElement} sor DOM elem
//      */
//     setSelectedRowWithShift(newRow) {
//         if (this.lastClickedRow === undefined)
//             return;
//         if (newRow === this.lastClickedRow)
//             return;
//         let last = this.rows.indexOf(newRow)
//         let first = this.rows.indexOf(this.lastClickedRow)
//         if (last < first)
//             [first, last] = [last, first]
//         this.selectedRows = []
//         this.rows.forEach((row, key) => {
//             row.setAttribute("data-select", "0");
//             if (key >= first && key <= last)
//                 this.addRemoveSelectedRow(row)
//         })
//     }
//
//     /**
//      * tábla tartalmának mentése csv-be
//      */
//     printTableContent() {
//         let content = [];
//         let headerRow = [];
//         [...this.tHead.firstChild.children].forEach((cell) => {
//             if (cell.style.display !== 'none')
//                 headerRow.push(cell.innerText)
//         });
//         headerRow = headerRow.join(";");
//         content.push(headerRow);
//         [...this.tBody.children].forEach(row => {
//             let rowContent = [];
//             [...row.children].forEach((cell) => {
//                 if (cell.style.display !== 'none')
//                     rowContent.push('"' + cell.innerText + '"')
//             })
//             rowContent = rowContent.join(";")
//             content.push(rowContent)
//         })
//         content = content.join("\n")
//         let blob = new Blob(["\uFEFF" + content], {type: 'text/csv;charset=utf-8;'});
//         let url = URL.createObjectURL(blob);
//         let pom = document.createElement('a');
//         pom.href = url;
//         pom.setAttribute('download', this.content.serviceTable + '.csv');
//         pom.click();
//     }
//
//     /**
//      * rekordkezelő ikon(ok) elrejtése
//      * @param icons {Array} ikon azonosítók
//      */
//     hideEntityHandlerIcons(icons) {
//         icons.forEach(icon => this.entityHandlerIcons[icon].style.display = 'none')
//     }
//
//     /**
//      * rekordkezelő ikon(ok) (újra)megjelenítése
//      * @param icons {Array} ikon azonosítók
//      */
//     showEntityHandlerIcons(icons) {
//         icons.forEach(icon => this.entityHandlerIcons[icon].style.display = 'initial')
//     }
//
//     /**
//      * header paraméterek (sorrend és szélesség mentése adatbázisba, visszatölthetően)
//      */
//     saveHeaderParams() {
//         let headerRow = this.tHead.firstChild
//         let headerStats = {}
//         headerStats.headerParams = []
//         this.columnNames.forEach((name, num) => {
//             headerStats.headerParams.push([name, headerRow.children[num].style.width])
//             headerStats.order = this.actualSort
//         })
//         ServiceParent.sendSaveTableHeaderParams(this.content.serviceTable, headerStats)
//     }
//
//     /**
//      * sorrendezési paraméter beállítása, rekordok (újra)lekérése
//      * @param paramId {string} rendezési paraméter
//      * @param orderDiv {HTMLDivElement} sorrendező DOM element
//      */
//     initSorting(paramId, orderDiv) {
//         if (this.actualSortElement !== null) {
//             this.actualSortElement.classList.remove('ordered')
//             this.actualSortElement.classList.remove('reversed')
//         }
//         this.actualSortElement = orderDiv
//         this.actualSortElement.classList.add('ordered')
//         if (this.actualSort[0] === undefined || this.actualSort[0] !== paramId) {
//             this.actualSort = [paramId, 1]
//         } else {
//             this.actualSort[1] = (this.actualSort[1] === 1) ? -1 : 1
//             if (this.actualSort[1] === -1)
//                 this.actualSortElement.classList.add('reversed')
//         }
//         this.saveHeaderParams()
//         this.controllerPointer.collectSearchParamsForRequest('reset')
//     }
//
//     /**
//      * header-ök a cursor 'move'-ra változik, ha a header mozgatás engedélyezve van
//      */
//
}
