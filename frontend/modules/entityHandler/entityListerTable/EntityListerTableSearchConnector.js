class EntityListerTableSearchConnector {
    _defaultRowHeight
    set defaultRowHeight(value) {
        this._defaultRowHeight = value;
    }

    get defaultRowHeight() {
        return this._defaultRowHeight;
    }

    _orderAndLimitParameterObject
    set orderAndLimitParameterObject(value) {
        this._orderAndLimitParameterObject = value;
    }

    _orderSourceObject
    set orderSourceObject(value) {
        this._orderSourceObject = value;
        this._orderSourceObject._searchParamConnector = this
    }

    get offsetSourceObject() {
        return this._offsetSourceObject;
    }

    _offsetSourceObject
    set offsetSourceObject(value) {
        this._offsetSourceObject = value;
    }

    _controllerPointer
    set controllerPointer(value) {
        this._controllerPointer = value;
    }



    setOrdering(orderAttribute, orderDirection) {
        this._orderAndLimitParameterObject.setOrdering(orderAttribute, orderDirection);
    }

    _tableDOMElement
    set tableDOMElement(value) {
        this._tableDOMElement = value;
    }

    setAutoLimit(maxValueChange = false) {
        console.dir(this._tableDOMElement)
        console.dir({...this})
        console.trace()
        // this._orderAndLimitParameterObject.limit=Math.floor(parseInt(this._tableDOMElement.clientHeight) / this._defaultRowHeight)
        // this.pageScrollData.calcTableRowNum(this.tHead.offsetHeight, parseInt(this.tableContainer.offsetHeight), this.rows.length)
        // headerHeight, fullHeight, rowCount
        this._orderAndLimitParameterObject.limit =
            this._offsetSourceObject.countTableBodyRows(this._tableDOMElement, this._defaultRowHeight)

        console.dir(this._orderAndLimitParameterObject.offset)
        if (maxValueChange)
            this._offsetSourceObject.setScrollDivHeight(this._orderAndLimitParameterObject.offset, this.defaultRowHeight)
    }

    getSearchParameters(type) {
        return this._orderAndLimitParameterObject.getSearchParameters(type)
    }

    changePage(pageNun) {
        this._orderAndLimitParameterObject.changePageParams(pageNun)
        this._controllerPointer.refreshRows()
    }

    resetOffset(resetScroll = true) {
        this._orderAndLimitParameterObject.offset = 0

        if (resetScroll)
        this._offsetSourceObject?.resetScroll()

    }

    hidePageElementsAccordingToPageNum(hasNext) {
        const pageNum = Math.floor(this._orderAndLimitParameterObject.offset / this._orderAndLimitParameterObject.limit) + 1
        this._offsetSourceObject?.hideElementsAccordingToPageNum(pageNum, hasNext)
    }

    async increaseOffset(num) {
        this._orderAndLimitParameterObject.offset += num;
        await this._controllerPointer.refreshRows()
    }

    async setOffset(num, maxChange = false) {
        this._orderAndLimitParameterObject.offset = this._offsetSourceObject.getNewOffsetForScroll(num)
        await this._controllerPointer.refreshRows({maxValueChange: maxChange})
        // this.windowContentPointer.increaseScrollHeight()
    }

    getPageNum() {
    }

    // setOffsetToScrollTop(top)
    // {
    //     let firstRow = Math.floor(top/this._tableDOMElement.clientHeight*100)
    //     console.log(this._tableDOMElement.clientHeight)
    //     console.log(firstRow)
    //     console.log(Math.floor(100/this._orderAndLimitParameterObject.limit))
    //     firstRow/=Math.floor(100/this._orderAndLimitParameterObject.limit)
    //
    //     console.log(firstRow)
    //     if (top !== null)
    //         top = top * (this._defaultRowHeight / this.zoom)
    //     top = top ?? containerScrollTop
    //     // let firstRow = parseInt(parseInt(top, 10) / (this.defaultRowHeight / this.zoom), 10);
    // }
}
