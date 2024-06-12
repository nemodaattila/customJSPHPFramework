class TableInputParent {
    _listerFilterSelectElement
    _listerValueElement

    addInputEventToListerFilterSelectElement(event)
    {
        this._listerFilterSelectElement.addEventListener('input', event)
    }

    addInputEventToListerValueElement(event)
    {
        this._listerValueElement.addEventListener('input', event)
    }

}


