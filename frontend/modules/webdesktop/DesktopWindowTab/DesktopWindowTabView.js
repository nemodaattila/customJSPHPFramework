class DesktopWindowTabView {



    _windowTab
    _labelDiv
    _controllerPointer

    get windowTab() {
        return this._windowTab;
    }

    constructor(controllerPointer) {
        this._controllerPointer = controllerPointer;
    }

    destruct()
    {
        HtmlElementCreator.emptyDOMElement(this._windowTab)
        this.windowTab.remove()
    }

    createElements(container) {
        this._windowTab = HtmlElementCreator.createHtmlElement('div', container, {
            class: 'windowTab',
        })
        this._windowTab.addEventListener('mousedown', () => this._controllerPointer.setConnectedWindowAsActive())
        this._labelDiv = HtmlElementCreator.createHtmlElement('div', this._windowTab, {
            class: 'titleDiv'
        })
        let resetIcon = HtmlElementCreator.createHtmlElement('div', this._windowTab, {
            title: 'Ablak alapméretre állítása', class: 'resetWindowIcon'
        })
        resetIcon.addEventListener('click', () => {
          this._controllerPointer.resetWindowSize()
        })
        let closeIcon = HtmlElementCreator.createHtmlElement('div', this._windowTab, {
            title: 'Bezárás', class: 'close'
        })
        closeIcon.addEventListener(     'click', () => this._controllerPointer.closeWindow())
        closeIcon.style.top = '0'
    }

    setTitle(title) {
        this._labelDiv.innerHTML = title
    }
}
