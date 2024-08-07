class DesktopView {
    /**
     * az ablakkezelő DOM elementje
     * @type {HTMLDivElement|HTMLBodyElement}
     */
    _mainContainer = document.querySelector('body')
    get mainContainer() {
        return this._mainContainer;
    }

    set mainContainer(value) {
        this._mainContainer = value;
    }

    _deskTopDOMElement
    get deskTopDOMElement() {
        return this._deskTopDOMElement;
    }

    set deskTopDOMElement(value) {
        this._deskTopDOMElement = value;
    }

    /**
     * a fül sáv DOM elementje
     * @type HTMLDivElement
     */
    _tabsBarDOMElement
    get tabsBarDOMElement() {
        return this._tabsBarDOMElement;
    }

    set tabsBarDOMElement(value) {
        this._tabsBarDOMElement = value;
    }

    createMainDOMElements() {
        this._mainContainer.style.height = '100%'
        this._mainContainer.style.width = '100%'
        this._mainContainer.style.display = 'table'
        this._tabsBarDOMElement = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'tabsBar', id: 'tabsBar'
        })
        this._deskTopDOMElement = HtmlElementCreator.createHtmlElement('div', this._mainContainer, {
            class: 'desktop', id: 'desktop'
        })
    }
}
