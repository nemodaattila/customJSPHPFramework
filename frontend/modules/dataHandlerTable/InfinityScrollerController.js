class InfinityScrollerController {

    _overlay

    _listerControllerPointer

    _zoom = 1

    _scrollMockDiv

    _defaultScrollHeight = 50

    _searchConnector

    _scrollTimer

    _outerScrollTimer
    constructor(listerTable, controllerPointer,searchConnector) {
        console.log(controllerPointer)
        this._searchConnector=searchConnector
        this._listerControllerPointer = controllerPointer
        let tableContainerBody = listerTable.getTableContainerBody()
        tableContainerBody.classList.add('scrollContainer')
        let tableDOMContainer=tableContainerBody.firstChild
        tableDOMContainer.classList.add('scrollTableContainer')
        let tBody = tableDOMContainer.getElementsByTagName('tbody')[0]
        // tHead.style.position='sticky'
        // let tableDOM = tableDOMContainer.firstChild
        // tableDOM.classList.add('scrollTable')

        this._scrollMockDiv = HtmlElementCreator.createHtmlElement('div', tableContainerBody, {class: 'scrollHeight'})
        this._scrollMockDiv.style.height = this._defaultScrollHeight + "px"


        let lastScrollTop = 0;
        let newScrollTop
        tableContainerBody.addEventListener('scroll', async () => {
            clearTimeout(this._scrollTimer);
            this._scrollTimer = setTimeout(async () =>
            {
                newScrollTop = tableContainerBody.scrollTop
                if (newScrollTop === lastScrollTop)
                    return
                await this._searchConnector.setOffset()
                if (newScrollTop > lastScrollTop) {
                    let scrollPercent = this.getScrollPercent()
                    if (isNaN(scrollPercent))
                        scrollPercent = 100
                    if (scrollPercent > 80) {
                        clearTimeout(this._scrollTimer);
                        this._scrollTimer = setTimeout(async () => await this._searchConnector.setOffset(null, true), 100)
                    }
                }
                lastScrollTop = newScrollTop
            },50)
        })
        this.overlay = HtmlElementCreator.createSimpleHtmlElement('div', tableContainerBody.parentElement, {class: 'overlay'})

    }
    getScrollPercent() {
        return 100 * (this._scrollMockDiv.parentElement.scrollTop / (this._scrollMockDiv.parentElement.scrollHeight - this._scrollMockDiv.parentElement.clientHeight))
    }

    setScrollDivHeight(rowCount) {
        console.log(rowCount)
        if (this.zoom === '')
            this.zoom = 1
        this._scrollMockDiv.style.height = (this._defaultScrollHeight + (rowCount * this._searchConnector._defaultRowHeight)) / this._zoom + 'px'
        console.log((this._defaultScrollHeight + (rowCount * this._searchConnector._defaultRowHeight)) / this._zoom)
    }

    getNewOffsetForScroll(top = null) {
        if (top !== null)
            top = top * (this._searchConnector._defaultScrollHeight/ this._zoom)
        top = top ?? this._scrollMockDiv.parentElement.scrollTop
        console.log(top)
        return parseInt(parseInt(top, 10) / (this._searchConnector._defaultRowHeight / this._zoom), 10);

    }
    hideElementsAccordingToPageNum(){}

    resetScroll()
    {
        console.log('resetScroll')
        this.setScrollDivHeight(0)
        this._scrollMockDiv.parentElement.scrollTo(0,0);

    }

    countTableBodyRows(tableDOMElement, defaultRowHeight)
    {
        return Math.floor((tableDOMElement.parentElement.offsetHeight - tableDOMElement.firstChild.offsetHeight)
            / (defaultRowHeight)-1)
    }

    // scrollRows(top) {
    //     let [firstRow, lastRow] = this.pageScrollData.getFirstAndLastRowNumberForScroll(top, this.tableContainer.scrollTop)
    //     this.rows.forEach((row, key) => {
    //         row.style.display = key < firstRow || key > lastRow ? 'none' : 'table-row'
    //     })
    // }

    // /**
    //  * táblán látható sorok száma - görgetés nélkül
    //  * @type number
    //  */
    // rowCountShown
    // /**
    //  * aktuálisan látható első sor sorszáma
    //  * @type {number}
    //  */
    // rowFrom = 0
    // /**
    //  * aktuálisan látható utoló sor sorszáma
    //  * @type {number}
    //  */
    // rowTo
    // /**
    //  * tábla sor magasság pixelben
    //  * @type {number}
    //  */
    // defaultRowHeight = 20;
    // /**
    //  * tábla zoom mértéke
    //  * @type {string|number}
    //  */
    // zoom = 1;
    // /**
    //  * görgethető div - rejtetten a háttérben
    //  * @type HTMLDivElement
    //  */
    //
    // /**
    //  * scrollDiv alapértelmezett mérete pixel
    //  * @type {number}
    //  */
    // /**
    //  * görgetésnél hány új sort töltsön be
    //  * @type {number}
    //  */
    // nextRowCount = 10
    //
    // /**
    //  * táblában megjelenthető sorok számának kiszámítáda, az ablak méretétől függően
    //  * @param headerHeight {number} tábla fejléc magassága
    //  * @param fullHeight {number} tábla magassága
    //  * @param rowCount sorok száma
    //  */
    // calcTableRowNum(headerHeight, fullHeight, rowCount) {
    //     this.setRowPerPage(Math.floor((fullHeight - headerHeight) / (this.defaultRowHeight)) - 1)
    //     if (rowCount === 0) {
    //         this.scrollDiv.style.height = this.defaultScrollHeight + 'px'
    //     } else
    //         this.setScrollHeight(rowCount)
    // }
    //
    // /**
    //  * scrolldiv magasságának beállítása
    //  * @param {string|int} rowCount
    //  */
    // setScrollHeight(rowCount) {
    //     if (this.zoom === '')
    //         this.zoom = 1
    //     this.scrollDiv.style.height = (100 + (rowCount - this.rowCountShown) * this.defaultRowHeight) / this.zoom + 'px'
    // }
    //
    // /**
    //  * sor paaraméterek beállítdsa
    //  * @param rowNum {number} sorok
    //  */
    // setRowPerPage(rowNum) {
    //     this.rowCountShown = rowNum
    //     this.rowTo = (this.rowFrom + rowNum) - 1
    // }
    //
    // /**
    //  * görgetésnél az első és utolsó látható sor sorszámának lekérése
    //  * @param top sor sorszáma
    //  * @param containerScrollTop scrolldiv scroll paraméter
    //  * @returns {(number|number)[]} első és utolsó látható sor sorszáma
    //  */
    // getFirstAndLastRowNumberForScroll(top = null, containerScrollTop) {
    //     if (top !== null)
    //         top = top * (this.defaultRowHeight / this.zoom)
    //     top = top ?? containerScrollTop
    //     let firstRow = parseInt(parseInt(top, 10) / (this.defaultRowHeight / this.zoom), 10);
    //     let lastRow = firstRow + this.rowCountShown - 1
    //     this.rowTo = lastRow
    //     this.rowFrom = firstRow
    //     return [firstRow, lastRow]
    // }
    //
    // /**
    //  * éátható szorszámok száma valamint az utolsó sor sorszámának lekérése
    //  * @returns {number[]}
    //  */
    // getLimitOffset() {
    //     return [this.rowCountShown, this.rowFrom]
    // }
    //
    // /**
    //  * első látható sor sorszámának és a scrollDiv magasságának alapértelmezettre állítása, - 0 és 100
    //  */
    // resetOffset() {
    //     this.rowFrom = 0
    //     this.scrollDiv.style.height = this.defaultScrollHeight + 'px'
    // }
    //
    // /**
    //  * görgetés irányától függően a görgés utáni kezdő sor index visszaadása
    //  * @param dir {string} görgetés iránya - up/down
    //  * @param rowIndex aktuális első sor indexe
    //  * @returns {number} új sorindex
    //  */
    // getScrollCoord(dir, rowIndex) {
    //     if (dir === 'up')
    //         return (rowIndex - this.rowCountShown + 1) * (this.defaultRowHeight / this.zoom)
    //     if (dir === 'down')
    //         return rowIndex * (this.defaultRowHeight / this.zoom)
    // }
}
