class PageTurnerController {
    _navElements = {}
    _lastPageNum = undefined
    _listerControllerPointer
    _searchConnector
    constructor(listerTable, controllerPointer,searchConnector) {
        this._searchConnector = searchConnector
        this._listerControllerPointer = controllerPointer
       const container =  listerTable.getTableContainerFooter()
        listerTable.getTableContainerBody().firstChild.style.height="calc(100% - 60px)";
        listerTable.getTableContainerBody().firstChild.style.overflow="auto";
        container.style.height =  "30px";
        const navContainer = HtmlElementCreator.createHtmlElement("div", container, {"class": "pagerNavContainer"});
        this._navElements['first'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Első"
        });
        this._navElements['first'].addEventListener("click", () => this.pageChangeSignal(0));
        this._navElements['previous'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Előző"
        });
        this._navElements['previous'].addEventListener("click", () => this.pageChangeSignal('-'));
        this._navElements['actual'] = HtmlElementCreator.createHtmlElement("input", navContainer, {
            type: 'number',
            value: 1
        });
        this._navElements['actual'].addEventListener("change", () => this.pageChangeSignal(this._navElements['actual'].value - 1));
        this._navElements['next'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Következő"
        });
        this._navElements['next'].addEventListener("click", () => this.pageChangeSignal('+'));
        this._navElements['last'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Utolsó"
        });
    }

    destructor() {
        const parent = this._navElements['first'].parentElement
        console.log(this._navElements)
        HtmlElementCreator.emptyDOMElement(parent);
        parent.parentElement.remove()
    }

    pageChangeSignal(value) {
        this._searchConnector.changePage(value)
    }

    hideElementsAccordingToPageNum(pageNum, hasNext) {
        console.log(pageNum)
        console.log(hasNext)
        this._navElements.actual.value = pageNum
        this._navElements.first.style.display = pageNum > 2 ? 'inline' : 'none'
        this._navElements.previous.style.display = pageNum > 1 ? 'inline' : 'none'
        this._navElements.actual.disabled = pageNum === 1 && hasNext === false
        this._navElements.next.style.display = hasNext ? 'inline' : 'none'
        this._navElements.last.style.display = 'none'
        //TODO last page - lastPageNum
    }

    resetScroll(){}

    countTableBodyRows(tableDOMElement, defaultRowHeight)
    {
       return Math.floor((tableDOMElement.parentElement.offsetHeight - tableDOMElement.firstChild.offsetHeight)
            / defaultRowHeight )-1
    }

}
