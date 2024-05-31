class HandlerViewParent extends ViewParent{

    _buttonContainer

    addButtonContainer(columnNum, buttonParams, onclickEvent, sameLine = false) {
        if (this._buttonContainer === undefined)
            this._buttonContainer = HtmlElementCreator.createSimpleHtmlElement('div', this._windowContentMainContainer, {class: 'buttonContainer'})
        //DO columncount
        // let columnCount = (this.windowContentPointer.content.inputPerRow ?? 1) * 2
        let columnCount=2

        let cols = ''
        for (let i = 0; i < columnCount; i++)
            cols += ' 262px '
        let tds = [];
        let tr = sameLine === true && this._buttonContainer.childNodes.length !== 0 ? this._buttonContainer.lastChild : HtmlElementCreator.createSimpleHtmlElement('div', this._buttonContainer)
        if (!sameLine)
            tr.style.gridTemplateColumns += cols
        if (sameLine === false) {
            tr.style.display = 'grid'
            for (let i = 0; i < columnCount; i++)
                tds.push(HtmlElementCreator.createSimpleHtmlElement('div', tr, {class: 'tableCell'}))
        } else tds = this._buttonContainer.lastChild.children
        buttonParams.type = 'button';
        console.log(tds);
        (HtmlElementCreator.createSimpleHtmlElement('input', tds[columnNum], buttonParams)).addEventListener('click', onclickEvent)
    }

}
