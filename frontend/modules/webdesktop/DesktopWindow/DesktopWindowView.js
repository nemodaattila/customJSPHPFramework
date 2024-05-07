class DesktopWindowView {
    get windowDiv() {
        return this._windowDiv;
    }
    get windowBody() {
        return this._windowBody;
    }
    _windowDiv

    _windowBody

    _windowHeaderDiv

    _titleDiv

    _controllerPointer

    constructor(controllerPointer) {
        this._controllerPointer=controllerPointer;
    }

    displayWindow(desktopContainer) {

        this._windowDiv = HtmlElementCreator.createHtmlElement('div', desktopContainer, {class: 'window'})
        // this._windowDiv
        //     ['windowObject'] = this
        this._windowDiv            .style.zIndex = "100"
        this._windowHeaderDiv = HtmlElementCreator.createHtmlElement('div', this._windowDiv, {class: 'windowHeaderDiv'})
        this._titleDiv = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'titleDiv'
        })
        this._windowBody = HtmlElementCreator.createHtmlElement('div', this._windowDiv, {class: 'windowBody'})


        this._windowDiv.addEventListener('click', () => Desktop.switchActiveWindow(this))
        this._titleDiv.addEventListener('mousedown', (event) => DesktopEventHandlers.startMoveDiv(event, this._windowDiv
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
        this.zoomDiv = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'zoom', title: 'Nagyítás',
        })
        this.zoomDiv.addEventListener('mousedown', (event) => event.stopPropagation())
        let zoomChanger = HtmlElementCreator.createHtmlElement('input', this.zoomDiv, {
            type: 'range', step: "0.1", min: "0.5", max: "2", class: "zoomInput", value: "1"
        })
        zoomChanger.addEventListener('change', (event) => {
            event.stopPropagation()
            this.zoomWindow(zoomChanger.value)
        })
        let zoomIconDiv = HtmlElementCreator.createHtmlElement('div', this.zoomDiv, {
            class: "zoomIcon"
        })
        zoomIconDiv.addEventListener('click', () => {
            zoomChanger.value = 1
            zoomChanger.dispatchEvent(new window.Event('change', {bubbles: true}))
        })
        let pinner = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'pin', title: 'Rögzítés mint legfelső ablak',
        })
        pinner.addEventListener('click', (event) => {
            event.stopPropagation()
            this.windowDiv.classList.toggle('pinned')
        })
        let miniaturizer = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'miniaturise', title: 'kis méret',
        })
        miniaturizer.addEventListener('click', (event) => {
            event.stopPropagation()
            this.miniaturiseWindow()
        })
        let maximalizer = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'maximise', title: 'Teljes méret',
        })
        maximalizer.addEventListener('click', () => this.maximizeWindow())
        let closer = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'close', title: 'Bezárás',
        })
        closer.addEventListener('click', (event) => {
            event.stopPropagation()
            this.closeWindow()
        })
    }

    setTitle(title)
    {
        this._titleDiv.innerHTML=title
    }

    zoomWindow(zoomValue, save = true) {
        console.log(zoomValue)
    this._controllerPointer.zoomContent(zoomValue)
        //DO save window params
            // this.zoom = value
            // this.pageScrollData.zoom = value
            // this.tableContainer.style.zoom = value
            // if (save)
            //     DesktopEventHandlers.onWindowResize(this.container)
        }

}
