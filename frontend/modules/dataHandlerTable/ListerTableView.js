class ListerTableView {

    _mainContainer

    _operationDiv

    _tableContainer

    _tableDiv

    _dataTable

    _tHead

    _tBody


    constructor(tableContainer) {
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

    }

}
