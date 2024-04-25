class ListerTable{

    _view

    _interval

    _intervalInSeconds = 60000;

    static _id = -1

    constructor(container) {
        ListerTable._id++
         this._view=new ListerTableView(ListerTable._id, container)

        this._view.displayTableElements()

        // this._interval = setInterval(() => this.refreshRows(), this._intervalInSeconds)
    }
    displayTableIcons(enabledOperations){
        this._view.displayOperationIcons(enabledOperations)
        this._view.addColumnMoveEnabler()
    }

    drawHeaders(tableAttributeOrder)
    {
        console.log(tableAttributeOrder)
    }

//     /**
//      * számláló WindowContentTable id megadásához
//      * @type {number}
//      */
//     static idNumCounter = -1
//     /**
//      * WindowContentTable id
//      * @type {number}
//      */
//     id
//     /**
//      * a táblát tartalmazó és a műveletikonokat tartalmazó div
//      * @type HTMLDivElement
//      */
//     tableDiv
//     /**
//      * a tábla dom elementje
//      * @type HTMLTableElement
//      */
//     dataTable
//     /**
//      * tábla fejléc DOM element
//      * @type {HTMLTableSectionElement}
//      */
//     tHead
//     /**
//      * rekordok DOM elementje
//      * @type {HTMLTableSectionElement}
//      */
//     tBody
//     /**
//      * a tábla oszlopmozgatását engedélyező checkbox DOM-ja
//      * @type {HTMLInputElement}
//      */
//     moveEnablerCB
//     /**
//      * megjelenített sorok DOM gyüjteménye
//      * @type {HTMLTableRowElement[]}
//      */
//     rows = []
//     /**
//      * kiválasztott sorok DOM gyüjteménye
//      * @type {HTMLTableRowElement[]}
//      */
//     selectedRows = []
//     /**
//      * szűrők gyüjteménye - input párok - művelet+érték
//      * @type {HTMLInputElement|HTMLSelectElement[][]}
//      */
//     filterInputs = []
//     /**
//      * szűrők értékei - művelet+érték
//      * @type {string[][]}
//      */
//     filters = []
//     /**
//      * attribútum/szűrő nevek
//      * @type {string[]}
//      */
//     columnNames = []
//     /**
//      * zoom
//      * @type {number|string}
//      */
//     zoom = 1;
//     /**
//      * adatlekérésnél az eltolás (offset) mennyisége
//      * @type {number}
//      */
//     offset = 0;
//     /**
//      * sorrendezési paraméterek
//      * @type {[string,number]} - 1 : ASC, -1 DESC
//      */
//     actualSort = ['', 1];
//     /**
//      * az aktív sorrendezési HTML elem (nem a fejléc, a nyíl)
//      * @type {null|HTMLDivElement}
//      */
//     actualSortElement = null
//     /**
//      * rekordkezelő ikonok - add,delete, modify, stb
//      * @type {{}}
//      */
//     entityHandlerIcons = {}
//     /**
//      * ikonokat tartalmazó container
//      * @type {HTMLDivElement}
//      */
//     windowIconContainer
//     /**
//      * tábla oszlop megjelenítő/elrejtő konténere
//      * @type {HTMLDivElement}
//      */
//     columnHiderDiv
//     /**
//      * automatikus header paraméter mentés altív-e?
//      * @type {boolean}
//      */
//     autoHeaderSetting = false
//     /**
//      * a táblát tartalmazó div
//      * @type HTMLDivElement
//      */
//     tableContainer
//     /**
//      * képet tartalmazó div pl: számlák sorra kattintva oldalt
//      * @type HTMLDivElement
//      */
//     imageContainer
//     /**
//      * kapcsolódó modul service
//      */
//     service
//     /**
//      * lefelé görgetésnél timer, akkor indul ha a göretés befejeződőtt, tábla alsó 80 %-ában
//      */
//     scrollTimer
//     /**
//      * timer a kép betöltéséhez, ne legyen minden kattintásra feleslegesen request
//      */
//     imageTimer
//     /**
//      * observer az ablak méretének figyeléséhez
//      */
//     observer
//     /**
//      * utoljára kattintott sor DOM elementje
//      * @type {HTMLTableRowElement| undefined}
//      */
//     lastClickedRow = undefined
//     /**
//      * duplakattintás kezelése - kétszer kattintott e a user
//      * @type {boolean|number}
//      */
//     dblClickTimer = false
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
//
//     /**
//      * DOM elemek létrehozása - konténer, tábla
//      * eventek, observer timoutok létrehozása
//      * további függvényhívások
//      */

//
//     /**
//      * rekord kezelő elemek/ikonok (add,del, modify, print) hozzáadása - tábla fölött, eventek hozzáadása
//      * @param operationDiv {HTMLDivElement } html DOM konténer
//      */

//
//     async refreshRows() {
//         let selectedIds = this.selectedRows.map(tr => tr.connectedObjectId)
//         this.selectedRows = []
//         let lastClickedId = this.lastClickedRow?.connectedObjectId
//         this.overlay.style.display = 'block'
//         await this.controllerPointer.collectSearchParamsForRequest('refresh')
//         this.scrollRows(this.pageScrollData.rowFrom)
//         this.overlay.style.display = 'none'
//         this.rows.filter(row => selectedIds.findIndex(id => id === row.connectedObjectId) !== -1).forEach(row => {
//             this.addRemoveSelectedRow(row)
//             if (row.connectedObjectId === lastClickedId)
//                 this.lastClickedRow = row
//         })
//     }
//
//     /**
//      * oszlopozgatást engedélyező checkbox (jobb felső sarok) megjelenítése, event hozzáadása
//      * @param operationDiv {HTMLDivElement} iconkonténer
//      */

//
//     /**
//      * tábla header sor újrarajzolása
//      */

//
//     /**
//      * tábla atribűtumnevek lekérés
//      */
//     collectHeaderNames() {
//         this.columnNames = Object.keys(this.content.headers)
//     }
//
//     /**
//      * tábla header-ök hozzáadása theadbe
//      */
//     displayHeaders() {
//         if (this.tHead.hasChildNodes())
//             HtmlElementCreator.emptyDOMElement(this.tHead)
//         this.headerRow = HtmlElementCreator.createHtmlElement('tr', this.tHead, {})
//         this.columnNames.forEach((id) => {
//             let modelParams = this.content.headers[id]
//             let serviceParams = this.service.tableAttributeParams[this.content.serviceTable][id]
//             let th = HtmlElementCreator.createHtmlElement('th', this.headerRow, {})
//             th.addEventListener('mousedown', (event) => DesktopEventHandlers.startMoveTh(event, th, this))
//             let orderDiv = HtmlElementCreator.createHtmlElement('div', th, {})
//             if ((modelParams !== undefined) && ((!('sortable' in modelParams)) || (modelParams['sortable'] === true))) {
//                 orderDiv.classList.add('order')
//                 orderDiv.addEventListener('click', () => {
//                     this.initSorting(id, orderDiv)
//                 })
//             }
//             HtmlElementCreator.createHtmlElement('div', th, {class: 'text', innerHTML: modelParams?.label ?? id})
//             let resizeElement = HtmlElementCreator.createHtmlElement('div', th, {class: 'resize'})
//             resizeElement.addEventListener('mousedown', (event) => {
//                 event.stopPropagation()
//                 DesktopEventHandlers.startResize(event, th, this.dataTable, this)
//             })
//             resizeElement.addEventListener('dblclick', (event) => {
//                 event.stopImmediatePropagation()
//                 DesktopEventHandlers.resizeOptimal(event, th, this.dataTable, this.getTableHeaderIndex(id))
//             })
//             let span = HtmlElementCreator.createSimpleHtmlElement('span', this.columnHiderDiv,)
//             let hcb = HtmlElementCreator.createSimpleHtmlElement('input', span, {
//                 type: 'checkbox',
//                 id: 'hcb-' + this.id + "-" + id,
//                 checked: 'checked'
//             })
//             HtmlElementCreator.createSimpleHtmlElement('label', span, {
//                 for: 'hcb-' + this.id + "-" + id,
//                 innerHTML: modelParams?.label ?? serviceParams['COLUMN_NAME']
//             })
//             hcb.addEventListener('click', (event) => {
//                 event.stopPropagation()
//                 if (hcb.checked) {
//                     DesktopEventHandlers.reDisplayColumn(th, this.dataTable)
//                     if (this.autoHeaderSetting === false)
//                         this.saveHeaderParams()
//                 } else {
//                     DesktopEventHandlers.hideColumn(th, this.dataTable, this, id)
//                     if (this.autoHeaderSetting === false)
//                         this.saveHeaderParams()
//                 }
//             })
//         })
//     }
//
//     /**
//      * sorrendezési paraméterek beállítása
//      * @param attr {string} paraméter
//      * @param dir {string|number} irány ASC/DESC
//      */
//     setOrdering(attr, dir) {
//         if (dir === 1)
//             dir = 'ASC'
//         if (dir === -1)
//             dir = 'DESC'
//         this.actualSort = [attr, (dir === 1 || dir.trim() === 'ASC' ? 1 : -1)]
//     }
//
//     /**
//      * szürőinputok hozzáadása - fejlécnevek alatt
//      */
//     displayFilters() {
//         this.filterRow = HtmlElementCreator.createSimpleHtmlElement('tr', this.tHead, {'class': 'filterRow'})
//         this.columnNames.forEach(id => {
//             let modelParams = this.content.headers[id]
//             let serviceParams = this.service.tableAttributeParams[this.content.serviceTable][id]
//             let td = HtmlElementCreator.createSimpleHtmlElement('td', this.filterRow)
//             let filter = modelParams?.filterType ?? serviceParams['DATA_TYPE']
//             switch (filter) {
//                 case 'number':
//                 case 'bigint':
//                 case 'decimal':
//                 case 'double':
//                 case 'float':
//                 case 'int':
//                 case 'smallint':
//                 case 'tinyint':
//                 case 'year':
//                 case 'string':
//                 case 'char':
//                 case 'longtext':
//                 case 'mediumtext':
//                 case 'text':
//                 case 'tinytext':
//                 case 'varchar':
//                     this.filterInputs[id] = [
//                         HtmlElementCreator.createSelectWithOptions(td, {}, {
//                             cont: 'Tartalmaz',
//                             start: 'Kezdődik',
//                             end: 'Végződik',
//                             eq: 'Egyenlő',
//                             neq: 'Nem egyenlő',
//                             sm: 'Kissebb mint',
//                             sme: 'Kissebb-egyenlő mint',
//                             gr: 'Nagyobb mint',
//                             gre: 'Nagyobb-egyenlő mint',
//                             null: 'Üres',
//                             notnull: 'Nem üres'
//                         }, true),
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {
//                             type: (['string', 'char', 'longtext', 'mediumtext', 'text', 'tinytext', 'varchar'].findIndex(
//                                 value => filter === value) === -1) ? "number" : 'text',
//                             min: 0,
//                             size: 20,
//                         })
//                     ]
//                     if (serviceParams && serviceParams['CHARACTER_MAXIMUM_LENGTH'] !== undefined && serviceParams['CHARACTER_MAXIMUM_LENGTH'] !== null)
//                         this.filterInputs[id][1].maxLength = Math.min(parseInt(serviceParams['CHARACTER_MAXIMUM_LENGTH']), 524288);
//                     if (serviceParams && serviceParams['NUMERIC_PRECISION'] !== undefined && serviceParams['NUMERIC_PRECISION'] !== null)
//                         this.filterInputs[id][1].max = filter === 'float' ?
//                             (10 ** serviceParams['NUMERIC_PRECISION']) - 1 : (10 ** serviceParams['COLUMN_TYPE'].replace(/[^0-9]/g, '')) - 1;
//                     break;
//                 case 'select':
//                 case 'array':
//                     this.filterInputs[id] = [
//                         HtmlElementCreator.createSelectWithOptions(td, {}, {
//                             eq: 'Egyenlő',
//                             neq: 'Nem egyenlő',
//                             null: 'Üres',
//                             notnull: 'Nem üres',
//                         }, true),
//                         HtmlElementCreator.createSelectWithOptions(td, {},
//                             this.content.headers[id].values, filter === 'select', true)
//                     ];
//                     break;
//                 case 'date':
//                     this.filterInputs[id] = [
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'date'}),
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'date'})
//                     ];
//                     break;
//                 case 'datetime':
//                     this.filterInputs[id] = [
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'datetime-local'}),
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'datetime-local'})
//                     ];
//                     break;
//                 case 'time':
//                     this.filterInputs[id] = [
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'time'}),
//                         HtmlElementCreator.createSimpleHtmlElement('input', td, {type: 'time'})
//                     ];
//                     break;
//                 case undefined:
//                 case 'none':
//                     break
//                 default:
//                     console.log('unkown filtertype: ' + filter)
//             }
//             if (modelParams !== undefined && modelParams['defaultValue'] !== undefined && modelParams.hidden !== true)
//                 this.filterInputs[id][1].value = modelParams['defaultValue']
//             if (modelParams !== undefined && modelParams['defaultOperator'] !== undefined && modelParams.hidden !== true)
//                 this.filterInputs[id][0].value = modelParams['defaultOperator']
//             if (modelParams !== undefined && modelParams['disabled'] === true) {
//                 this.filterInputs[id][0].disabled = true
//                 this.filterInputs[id][1].disabled = true
//             }
//             if (filter !== undefined && filter !== 'none')
//                 this.filters[id] = [this.filterInputs[id][0].value, this.filterInputs[id][1].value]
//         })
//     }
//
//     /**
//      * szűrőesemények hozzáadása
//      */
//     addFilterEvents() {
//         this.columnNames.forEach(id => {
//             let serviceParams = this.service.tableAttributeParams[this.content.serviceTable][id]
//             let filterType = this.content.headers[id]?.filterType ?? serviceParams['DATA_TYPE']
//             if (filterType === 'none')
//                 return
//             this.filterInputs[id][0].addEventListener('input', (event) => {
//                 clearTimeout(this.timeOut)
//                 this.timeOut = setTimeout(() => {
//                     this.filters[id] = [event.target.value.trim(), event.target.nextElementSibling.value.trim()];
//                     this.controllerPointer.collectSearchParamsForRequest('reset')
//                 }, 300);
//                 if (event.target.value === 'null' || event.target.value === 'notnull') {
//                     event.target.nextElementSibling.value = '';
//                     event.target.nextElementSibling.disabled = true;
//                 } else event.target.nextElementSibling.disabled = false;
//             })
//             this.filterInputs[id][1].addEventListener('input', (event) => {
//                 clearTimeout(this.timeOut)
//                 this.timeOut = setTimeout(() => {
//                     this.filters[id] = [event.target.previousElementSibling.value.trim(), event.target.value.trim()];
//                     this.controllerPointer.collectSearchParamsForRequest('reset')
//                 }, 300);
//             })
//         })
//     }
//
//     /**
//      * modelben rejtettként megadott táblák elrejtése
//      */
//     hideDefaultColumns() {
//         Object.values(this.service.tableAttributeParams[this.content.serviceTable]).forEach((serviceParams) => {
//             if (this.content.headers[serviceParams['COLUMN_NAME']]?.hidden === true)
//                 document.getElementById('hcb-' + this.id + "-" + serviceParams['COLUMN_NAME']).click()
//         })
//     }
//
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
//     collectAndConvertFilterParams() {
//         let finalFilterData = []
//         this.columnNames.forEach(id => {
//             let modelParams = this.content.headers[id]
//             let serviceParams = this.service.tableAttributeParams[this.content.serviceTable][id]
//             let filter = modelParams?.filterType ?? serviceParams['DATA_TYPE']
//             if (this.filterInputs[id] === undefined)
//                 return;
//             let values = ''
//             let inputs = this.filters[id]
//             switch (filter) {
//                 case 'number':
//                 case 'bigint':
//                 case 'decimal':
//                 case 'double':
//                 case 'float':
//                 case 'int':
//                 case 'smallint':
//                 case 'tinyint':
//                 case 'year':
//                     if (inputs[1] !== '' || inputs[0] === 'null' || inputs[0] === 'notnull')
//                         values = [this.convertOperationString(inputs[0]), parseInt(inputs[1])];
//                     break;
//                 case 'string':
//                 case 'char':
//                 case 'longtext':
//                 case 'mediumtext':
//                 case 'text':
//                 case 'tinytext':
//                 case 'varchar':
//                 case 'select':
//                 case 'array':
//                     if (inputs[1] !== '' || inputs[0] === 'null' || inputs[0] === 'notnull')
//                         values = [this.convertOperationString(inputs[0]), inputs[1].toString()];
//                     break;
//                 case 'time':
//                     let timeFrom = '';
//                     if (inputs[0] !== '') {
//                         let tf = inputs[0].split(':')
//                         timeFrom = new Date()
//                         timeFrom.setHours(tf[0])
//                         timeFrom.setMinutes(tf[1])
//                         timeFrom.setSeconds(0)
//                     }
//                     let timeTo = '';
//                     if (inputs[1] !== '') {
//                         let tt = inputs[1].split(':')
//                         timeTo = new Date()
//                         timeTo.setHours(tt[0])
//                         timeTo.setMinutes(tt[1])
//                         timeTo.setSeconds(0)
//                     }
//                     if (timeFrom !== '' || timeTo !== '')
//                         values = [timeFrom, timeTo, 1];
//                     if (values[0] > values[1]) {
//                         AlertPopup.showAlert('kezdő idő nem lehet nagyobb a végidőnél')
//                         return
//                     }
//                     break;
//                 case 'datetime':
//                     let temp = []
//                     if (inputs[0] !== '')
//                         temp[0] = inputs[0].toString().replace('T', ' ')
//                     if (inputs[1] !== '')
//                         temp[1] = inputs[1].toString().replace('T', ' ')
//                     if (inputs[0] !== '' || inputs[1] !== '') {
//                         if (inputs[0] !== '' && inputs[1] === '')
//                             temp[1] = '2286-11-20 23:59:59'
//                         if (inputs[0] === '' && inputs[1] !== '')
//                             temp[0] = '1970-01-01 00:00:00'
//                         values = temp
//                         values[2] = 1;
//                         if (values[0] > values[1]) {
//                             AlertPopup.showAlert('kezdő dátum-idő nem lehet nagyobb a végdátum idő-nél')
//                             return
//                         }
//                     }
//                     break;
//                 case 'date':
//                     let temp2 = []
//                     if (inputs[0] !== '')
//                         temp2[0] = inputs[0].toString().replace('T', ' ')
//                     if (inputs[1] !== '')
//                         temp2[1] = inputs[1].toString().replace('T', ' ')
//                     if (inputs[0] !== '' || inputs[1] !== '') {
//                         if (inputs[0] !== '' && inputs[1] === '')
//                             temp2[1] = '2286-11-20'
//                         if (inputs[0] === '' && inputs[1] !== '')
//                             temp2[0] = '1970-01-01'
//                         values = temp2
//                         values[2] = 1;
//                     }
//                     if (values[0] > values[1]) {
//                         AlertPopup.showAlert('kezdő dátum nem lehet nagyobb a végdátumnál')
//                         return
//                     }
//                     break;
//                 case 'hidden':
//                 case undefined:
//                     break
//                 default:
//                     if (inputs[0] !== '' || inputs[1] !== '')
//                         values = [this.convertOperationString(inputs[0]), inputs[1]];
//             }
//             if (values !== '')
//                 finalFilterData.push([id].concat(values))
//         })
//         let heads = this.content.headers
//         for (let key in heads)
//             if (heads[key].filterType === 'hidden' && heads[key].defaultOperator !== undefined)
//                 finalFilterData.push([key, this.convertOperationString(heads[key].defaultOperator), heads[key].defaultValue])
//         return finalFilterData
//     }
//
//     /**
//      * műveletek szövegből jellé konvertálása
//      * @param operation műveleto kód
//      * @returns {*|string} műveleti jel
//      */
//     convertOperationString(operation) {
//         switch (operation) {
//             case 'eq':
//                 return '=';
//             case 'neq':
//                 return '!=';
//             case 'sm':
//                 return '<';
//             case 'sme':
//                 return '<=';
//             case 'gr':
//                 return '>';
//             case 'gre':
//                 return '>=';
//             default:
//                 return operation;
//         }
//     }
//
//     /**
//      * tábla kiürítése és feltöltése, soresemények hozzáadása
//      * @param data { [{}] } adatrekordok
//      * @param append {boolean} ha append akkor nincs törlés, csak hozzáfűzés
//      */
//     displayData(data, append = false) {
//         if (!append) {
//             this.rows = []
//             HtmlElementCreator.emptyDOMElement(this.tBody)
//         }
//         data.forEach(record => {
//             let row = HtmlElementCreator.createHtmlElement('tr', this.tBody, {})
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
//             let tdContent
//             this.columnNames.forEach(id => {
//                 let serviceParams = this.service.tableAttributeParams[this.content.serviceTable][id]
//                 let modelParams = this.content.headers[id]
//                 let filter = modelParams?.filterType ?? serviceParams['DATA_TYPE']
//                 if (filter === 'select') {
//                     tdContent = modelParams.values[record[id]]
//                 } else {
//                     try {
//                         tdContent = record[id] === null || record[id] === undefined ? '' : decodeURIComponent(record[id])
//                     } catch (e) {
//                         tdContent = record[id]
//                     }
//                 }
//                 let td = HtmlElementCreator.createHtmlElement('td', row, {innerHTML: tdContent})
//                 if (['int', 'number', 'date', 'decimal'].findIndex(type => type === filter) !== -1)
//                     td.classList.add('rightAlign')
//                 if (['string', 'date', 'datetime', 'select', 'varchar', 'text'].findIndex(type => type === filter) !== -1)
//                     td.classList.add('leftAlign')
//                 if (!document.getElementById("hcb-" + this.id + "-" + id).checked)
//                     td.style.display = 'none'
//             })
//         })
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
//     changeCursor() {
//         Array.from(this.tHead.firstElementChild.children).forEach((head) =>
//             head.style.cursor = this.moveEnablerCB.checked === true ? 'move' : "")
//     }
}
