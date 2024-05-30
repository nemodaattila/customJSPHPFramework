class HandlerViewParent extends ViewParent{

    addButtonToTallTable(columnNum, buttonParams, onclickEvent, sameLine = false) {
        if (this.buttonTable === undefined)
            this.buttonTable = HtmlElementCreator.createSimpleHtmlElement('div', this._windowContentMainContainer, {class: 'buttonTable'})
        //DO columncount
        // let columnCount = (this.windowContentPointer.content.inputPerRow ?? 1) * 2
        let columnCount=2

        let cols = ''
        for (let i = 0; i < columnCount; i++)
            cols += ' 262px '
        let tds = [];
        let tr = sameLine === true && this.buttonTable.childNodes.length !== 0 ? this.buttonTable.lastChild : HtmlElementCreator.createSimpleHtmlElement('div', this.buttonTable)
        if (!sameLine)
            tr.style.gridTemplateColumns += cols
        if (sameLine === false) {
            tr.style.display = 'grid'
            for (let i = 0; i < columnCount; i++)
                tds.push(HtmlElementCreator.createSimpleHtmlElement('div', tr, {class: 'tableCell'}))
        } else tds = this.buttonTable.lastChild.children
        buttonParams.type = 'button';
        console.log(tds);
        (HtmlElementCreator.createSimpleHtmlElement('input', tds[columnNum], buttonParams)).addEventListener('click', onclickEvent)
    }

}
