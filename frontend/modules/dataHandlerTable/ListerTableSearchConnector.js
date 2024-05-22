class ListerTableSearchConnector {


    _defaultRowHeight

    set defaultRowHeight(value) {
        this._defaultRowHeight = value;
    }

    _orderAndLimitParameterObject
    set orderAndLimitParameterObject(value) {
        this._orderAndLimitParameterObject = value;
    }

    _orderSourceObject


    set orderSourceObject(value) {
        this._orderSourceObject = value;
        this._orderSourceObject._searchParamConnector=this
    }

    _offsetSourceObject

    set offsetSourceObject(value) {
        this._offsetSourceObject = value;
    }

    _controllerPointer

    set controllerPointer(value) {
        this._controllerPointer = value;
    }

    async createOffsetSourceObject(pageTurnerName, container, listerControllerPointer) {
        await Includer.loadFileSource(pageTurnerName)
        this.offsetSourceObject= new (eval(pageTurnerName[0].toUpperCase() + pageTurnerName.slice(1) + "Controller"))(container, listerControllerPointer,this)
        return this._offsetSourceObject
    }

    setOrdering(orderAttribute, orderDirection)
    {
        this._orderAndLimitParameterObject.setOrdering(orderAttribute, orderDirection);
    }

    _tableDOMElement
    set tableDOMElement(value) {
        this._tableDOMElement = value;
    }

    setAutoLimit()
    {
        this._orderAndLimitParameterObject.limit=Math.floor(parseInt(this._tableDOMElement.clientHeight) / this._defaultRowHeight)
    }

    getSearchParameters()
    {
        return this._orderAndLimitParameterObject.getSearchParameters()
    }

    changePage(pageNun) {
        this._orderAndLimitParameterObject.changePageParams(pageNun)
        this._controllerPointer.refreshTable()
    }

    resetOffset()
    {
        this._orderAndLimitParameterObject.offset=0
    }

    hidePageElementsAccordingToPageNum(pageNum, hasNext)
    {
        console.log(this)
        this._offsetSourceObject.hideElementsAccordingToPageNum(pageNum,hasNext)
    }

}
