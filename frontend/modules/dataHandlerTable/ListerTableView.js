class ListerTableView {

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

    constructor(id,tableContainer) {
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




        // this.addEntityHandlerIcons(operationDiv)
        // this.addColumnMoveEnabler(operationDiv)
        // let tableInnerContainer = HtmlElementCreator.createHtmlElement('div', this.tableContainer, {class: 'dataTable'})
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

    displayOperationIcons(enabledOperations)
    {
        console.log(enabledOperations)

        this._tableIconContainer = HtmlElementCreator.createHtmlElement('div', this._operationDiv)
        let adder = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath+'/add_new_icon.png', class: 'tableIcon', title: 'Új rekord felvétele'
        })
        if (enabledOperations.add)
            adder.addEventListener('click', async (event) => {
                event.stopPropagation()
                await WindowHandler.createWindow(this.content.addModule, this.content.addModuleParams)
            })
        let editor = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath+'edit_icon.png', class: 'tableIcon', title: 'Rekord kezelés'
        })
        if (enabledOperations.edit)

        editor.addEventListener('click', (event) => {
            event.stopPropagation()
            this.showDetailed()
        })
        let eraser = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath+'del_icon.png', class: 'tableIcon', title: 'Kijelölt rekord(ok) törlése'
        })
        if (enabledOperations.deletable)

        eraser.addEventListener('click', (event) => {
            event.stopPropagation()
            this.service.sendDeleteRequest(this.selectedRows.map(row => row.connectedObjectId))
        })
        let printer = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath+'print_icon.png',
            class: 'tableIcon',
            title: 'Megjelenített rekordok exportálása csv-be'
        })
        printer.addEventListener('click', (event) => {
            event.stopPropagation()
            this.printTableContent()
        })
        let refresher = HtmlElementCreator.createHtmlElement('img', this._tableIconContainer, {
            src: this._iconPath+'refresh_icon.png',
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
        this.moveEnablerCB = HtmlElementCreator.createHtmlElement('input', columnMoveEnablerDiv, {
            type: 'checkbox', id: "enableColumnMove" + this._id
        })
        let moveLabel = HtmlElementCreator.createHtmlElement('label', columnMoveEnablerDiv, {
            for: "enableColumnMove" + this._id
        })
        HtmlElementCreator.createHtmlElement('img', moveLabel, {
            src: this._iconPath+'column_mover.png', class: 'tableIcon', title: 'Oszlop mozgatás engedélyezése'
        })
        this.moveEnablerCB.addEventListener('change', () => this.changeCursor())
        let columnHiderParent = HtmlElementCreator.createHtmlElement('span', columnMoveEnablerDiv, {})
        let columnHider = HtmlElementCreator.createHtmlElement('img', columnHiderParent, {
            src: this._iconPath+'column_editor.png',
            class: 'tableIcon',
            title: 'Oszlopok megjelenítése/elrejtése'
        })
        this.columnHiderDiv = HtmlElementCreator.createHtmlElement('span', columnHiderParent, {
            class: 'columnHiderDiv'
        })
        columnHider.addEventListener('click', () => this.columnHiderDiv.style.display = this.columnHiderDiv.style.display === 'block' ? 'none' : 'block')
    }

    drawHeaders(attributeOrder) {
        this.collectHeaderNames()
        this.displayHeaders()
        this.setOrdering(this.content.defaultOrder ?? 'id', this.content.defaultOrderDir ?? 'ASC')
        this.displayFilters()
        this.addFilterEvents()
        this.hideDefaultColumns()
    }

}
