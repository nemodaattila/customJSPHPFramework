class DesktopView {
    /**
     * az ablakkezelő DOM elementje
     * @type {HTMLDivElement|HTMLBodyElement}
     */
    _mainContainer = document.getElementsByTagName('body')[0]
    _deskTopDOMElement
    /**
     * a fül sáv DOM elementje
     * @type HTMLDivElement
     */
    _tabsBarDOMElement

    get mainContainer() {
        return this._mainContainer;
    }

    set mainContainer(value) {
        this._mainContainer = value;
    }

    get deskTopDOMElement() {
        return this._deskTopDOMElement;
    }

    set deskTopDOMElement(value) {
        this._deskTopDOMElement = value;
    }

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

        this._deskTopDOMElement.addEventListener('mouseup', (event) =>
            DesktopEventHandlers.endMove(event))
        this._mainContainer.addEventListener('mousemove', (event) => {
            if (event.buttons === 1)
                DesktopEventHandlers.move(event)
        })
    }
}
