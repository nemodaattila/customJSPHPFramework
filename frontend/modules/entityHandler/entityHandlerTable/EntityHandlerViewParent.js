class EntityHandlerViewParent extends WindowContentViewParent{

    _buttonContainer

    addIdLabel(idLabelText)
    {
        HtmlElementCreator.createSimpleHtmlElement('caption', this._windowContentMainContainer, {
            innerHTML: 'Kiválasztott rekord(ok): ' + idLabelText,
            class: 'recordIdIndicator'
        })
    }

    addButtonWithContainer(columnNum, buttonParams, onclickEvent, sameLine = false) {
        if (!this._buttonContainer)
            this._buttonContainer = HtmlElementCreator.createSimpleHtmlElement('div', this._windowContentMainContainer, {class: 'buttonContainer'})
        //TODO columncount
        // let columnCount = (this.windowContentPointer.content.inputPerRow ?? 1) * 2
        const columnCount=2

        let cols = ''
        for (let i = 0; i < columnCount; i++)
            cols += ' 262px '
        let tds = [];
        let tr = sameLine === true && this._buttonContainer.childNodes.length !== 0 ? this._buttonContainer.lastChild : HtmlElementCreator.createSimpleHtmlElement('div', this._buttonContainer)
        if (!sameLine)
            tr.style.gridTemplateColumns += cols
        if (!sameLine) {
            tr.style.display = 'grid'
            for (let i = 0; i < columnCount; i++)
                tds.push(HtmlElementCreator.createSimpleHtmlElement('div', tr, {class: 'tableCell'}))
        } else tds = this._buttonContainer.lastChild.children
        buttonParams.type = 'button';
        console.log(tds);
        (HtmlElementCreator.createSimpleHtmlElement('input', tds[columnNum], buttonParams)).addEventListener('click', onclickEvent)
    }

}
