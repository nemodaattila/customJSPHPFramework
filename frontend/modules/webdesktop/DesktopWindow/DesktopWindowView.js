class DesktopWindowView {
    _controllerPointer
    _zoomChanger


    constructor(controllerPointer) {
        this._controllerPointer = controllerPointer;
    }

    _windowHeaderDiv

    get windowHeaderDiv() {
        return this._windowHeaderDiv;
    }

    _titleDiv

    get titleDiv() {
        return this._titleDiv;
    }

    _windowDiv

    get windowDiv() {
        return this._windowDiv;
    }

    _windowBody

    get windowBody() {
        return this._windowBody;
    }

    destruct() {
        HtmlElementCreator.emptyDOMElement(this._windowDiv)
        this._windowDiv.remove()
    }

    displayWindow(desktopContainer) {
        this._windowDiv = HtmlElementCreator.createHtmlElement('div', desktopContainer, {class: 'window'})
        // this._windowDiv
        //     ['windowObject'] = this
        this._windowDiv.style.zIndex = "100"
        this._windowHeaderDiv = HtmlElementCreator.createHtmlElement('div', this._windowDiv, {class: 'windowHeaderDiv'})
        this._titleDiv = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'titleDiv'
        })
        this._windowBody = HtmlElementCreator.createHtmlElement('div', this._windowDiv, {class: 'windowBody'})
        // this._windowDiv.addEventListener('click', () => Desktop.switchActiveWindow(this))
        this.displayWindowIcons()
        // this.displayWindowTab()
        // this.displayMainElements(params, service)
    };

    setLeftAndTopParameters(left, top) {
        this._windowDiv.style.left = left
        this._windowDiv.style.top = top
    }

    displayWindowIcons() {
        this.zoomDiv = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'zoom', title: 'Nagyítás',
        })
        this.zoomDiv.addEventListener('mousedown', (event) => event.stopPropagation())
        const zoomChangerIcon = HtmlElementCreator.createHtmlElement('input', this.zoomDiv, {
            type: 'range', step: "0.1", min: "0.5", max: "2", class: "zoomInput", value: "1"
        })
        this._zoomChanger = zoomChangerIcon
        zoomChangerIcon.addEventListener('change', (event) => {
            event.stopPropagation()
            this.zoomWindow(zoomChangerIcon.value)
        })
        const zoomIconDiv = HtmlElementCreator.createHtmlElement('div', this.zoomDiv, {
            class: "zoomIcon"
        })
        zoomIconDiv.addEventListener('click', () => {
            zoomChangerIcon.value = 1
            zoomChangerIcon.dispatchEvent(new window.Event('change', {bubbles: true}))
        })
        const pinnerIcon = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'pin', title: 'Rögzítés mint legfelső ablak',
        })
        pinnerIcon.addEventListener('click', (event) => {
            event.stopPropagation()
            this.windowDiv.classList.toggle('pinned')
        })
        const miniaturizerIcon = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'miniaturise', title: 'kis méret',
        })
        miniaturizerIcon.addEventListener('click', (event) => {
            event.stopPropagation()
            this.miniaturizeWindow()
        })
        const maximalizerIcon = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'maximise', title: 'Teljes méret',
        })
        maximalizerIcon.addEventListener('click', () => this.maximizeWindow())
        const closerIcon = HtmlElementCreator.createHtmlElement('div', this._windowHeaderDiv, {
            class: 'close', title: 'Bezárás',
        })
        closerIcon.addEventListener('click', (event) => {
            event.stopPropagation()
            this._controllerPointer.close()
        })
    }

    setTitle(title) {
        this._titleDiv.innerHTML = title
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

    miniaturizeWindow() {
        this.windowDiv.style.display = "none"
        this._controllerPointer.setMinimized(true)
    }

    resetSize() {
        if (this.windowSize )
            this.maximizeWindow()
        this.windowDiv.style.left = '0'
        this.windowDiv.style.top = '25px'
        this.windowDiv.style.width = '500px'
        this.windowDiv.style.height = '250px'
        this._zoomChanger.value = 1
        this.zoomWindow('1')
    }

    maximizeWindow() {
        if (!this.windowSize) {
            this.windowSize = {}
            this.windowSize.left = this.windowDiv.style.left;
            this.windowSize.top = this.windowDiv.style.top;
            this.windowSize.width = this.windowDiv.style.width;
            this.windowSize.height = this.windowDiv.style.height;
            this.windowSize.border = this.windowDiv.style.border;
            this.windowSize.borderRadius = this.windowDiv.borderRadius;
            this.windowDiv.style.left = '0';
            this.windowDiv.style.top = "27px";
            this.windowDiv.style.width = "100%";
            this.windowDiv.style.height = "auto";
            this.windowDiv.style.bottom = '0';
            this.windowDiv.style.border = "0px";
            this.windowDiv.style.borderTopLeftRadius = "0px";
            this.windowDiv.style.borderTopRightRadius = "0px";
            this.windowDiv.style.borderBottomLeftRadius = "0px";
            this.windowDiv.style.resize = "none";
            this.windowDiv.firstElementChild.style.borderTopLeftRadius = "0px";
            this.windowDiv.firstElementChild.style.borderTopRightRadius = "0px";
            this.windowDiv.setAttribute("data-rooted", "1");
        } else {
            this.windowDiv.style.left = this.windowSize.left;
            this.windowDiv.style.top = this.windowSize.top;
            this.windowDiv.style.width = this.windowSize.width;
            this.windowDiv.style.height = this.windowSize.height;
            this.windowDiv.style.border = this.windowSize.border;
            this.windowDiv.style.borderTopLeftRadius = "10px";
            this.windowDiv.style.borderTopRightRadius = "10px";
            this.windowDiv.style.borderBottomLeftRadius = "10px";
            this.windowDiv.style.bottom = "auto";
            this.windowDiv.style.resize = "both";
            this.windowDiv.firstElementChild.style.borderTopLeftRadius = "10px";
            this.windowDiv.firstElementChild.style.borderTopRightRadius = "10px";
            this.windowDiv.setAttribute("data-rooted", "0");
            this.windowSize = undefined
        }
        this.minimized = false
        // DesktopEventHandlers.saveWindowParams(this.windowDiv)
    }
}
