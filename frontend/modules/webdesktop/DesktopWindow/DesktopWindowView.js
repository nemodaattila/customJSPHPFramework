class DesktopWindowView {
    _windowDiv

    _windowBody

    _windowTitleDiv

    _titleDiv

    displayWindow(desktopContainer) {
        this._windowDiv = HtmlElementCreator.createHtmlElement('div', desktopContainer, {class: 'window'})
        // this._windowDiv
        //     ['windowObject'] = this
        this._windowDiv            .style.zIndex = "100"
        this._windowBody = HtmlElementCreator.createHtmlElement('div', this._windowDiv, {class: 'windowBody'})

        this._windowTitleDiv = HtmlElementCreator.createHtmlElement('div', this._windowDiv, {class: 'windowTitleDiv'})
        this.titleDiv = HtmlElementCreator.createHtmlElement('div', this._windowTitleDiv, {
            class: 'titleDiv'
        })
        this._windowDiv.addEventListener('click', () => Desktop.switchActiveWindow(this))
        this.titleDiv.addEventListener('mousedown', (event) => DesktopEventHandlers.startMoveDiv(event, this._windowDiv
        ))
        this.displayWindowIcons()
        // this.displayWindowTab()
        // this.displayMainElements(params, service)
    };

    setLeftAndTopParameters(left,top)
    {
            this._windowDiv.style.left = left
            this._windowDiv.style.top = top
    }
    displayWindowIcons() {
        this.zoomDiv = HtmlElementCreator.createHtmlElement('div', this._windowTitleDiv, {
            class: 'zoom', title: 'Nagyítás',
        })
        this.zoomDiv.addEventListener('mousedown', (event) => event.stopPropagation())
        let zoomChanger = HtmlElementCreator.createHtmlElement('input', this.zoomDiv, {
            type: 'range', step: "0.1", min: "0.5", max: "2", class: "zoomInput", value: "1"
        })
        zoomChanger.addEventListener('change', () => this._zoomWindow(zoomChanger.value))
        let zoomIconDiv = HtmlElementCreator.createHtmlElement('div', this.zoomDiv, {
            class: "zoomIcon"
        })
        zoomIconDiv.addEventListener('click', () => {
            zoomChanger.value = 1
            zoomChanger.dispatchEvent(new window.Event('change', {bubbles: true}))
        })
        let pinner = HtmlElementCreator.createHtmlElement('div', this._windowTitleDiv, {
            class: 'pin', title: 'Rögzítés mint legfelső ablak',
        })
        pinner.addEventListener('click', (event) => {
            event.stopPropagation()
            this.windowDiv.classList.toggle('pinned')
        })
        let miniaturizer = HtmlElementCreator.createHtmlElement('div', this._windowTitleDiv, {
            class: 'miniaturise', title: 'kis méret',
        })
        miniaturizer.addEventListener('click', (event) => {
            event.stopPropagation()
            this.miniaturiseWindow()
        })
        let maximalizer = HtmlElementCreator.createHtmlElement('div', this._windowTitleDiv, {
            class: 'maximize', title: 'Teljes méret',
        })
        maximalizer.addEventListener('click', () => this.maximizeWindow())
        let closer = HtmlElementCreator.createHtmlElement('div', this._windowTitleDiv, {
            class: 'close', title: 'Bezárás',
        })
        closer.addEventListener('click', (event) => {
            event.stopPropagation()
            this.closeWindow()
        })
    }

}
