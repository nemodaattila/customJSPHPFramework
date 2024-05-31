class WindowMover {
    static _desktopContainer
    static _windowPointer = undefined
    static _moveParameters

    static _moveTime=0

    static init(desktopPointer) {
        this.addEventsToDesktop(desktopPointer)
    }

    static addMoveEventToWindow(window) {
        window._view.titleDiv.addEventListener('mousedown',
            (event) => WindowMover.startMoveWindow(event, window._view.windowDiv))
    }

    static addEventsToDesktop(desktopPointer) {
        let container = desktopPointer.getDesktopDOMElement();
        container.addEventListener('mouseup', (event) =>
            this.endMoveWindow(event))
        container.addEventListener('mousemove', (event) => {
            if (event.buttons === 1)
                this.moveWindow(event)
        })
        this._desktopContainer = container
    }

    static startMoveWindow(event, object = null) {
        object = object ?? event.target
        if (event.button === 0 && object.getAttribute("data-rooted") !== "1") {
            this._moveParameters = {}
            this._moveParameters.mouseX = event.pageX || event.clientX;
            this._moveParameters.object = object;
            this._moveParameters.object.parentElement.setAttribute("data-inmove", "1");
            // this._moveParameters.object.zoomVal = 1;
            this._moveParameters.mouseY = event.pageY || event.clientY;
            this._moveParameters.objectPos = object.getBoundingClientRect();
        }
    }

    static moveWindow(event) {
        if (!this._moveParameters)
            return
        let time = Date.now()
        if ((time - this._moveTime) < 11)
            return;
        this._moveTime = time
        let newX = event.pageX || event.clientX;
        let newY = event.pageY || event.clientY;
        let leftPos = this._moveParameters.object.style.left !== '' ? this._moveParameters.object.style.left : this._moveParameters.objectPos.left
        let topPos = this._moveParameters.object.style.top !== '' ? this._moveParameters.object.style.top : this._moveParameters.objectPos.top
        if (leftPos === '50%')
            leftPos = DesktopController.getWindowContainer().clientWidth / 2
        if (topPos === '51%')
            topPos = DesktopController.getWindowContainer().clientHeight / 2
        let newLeftPos = parseInt(leftPos, 10) + (newX - this._moveParameters.mouseX)
        let newTopPos = parseInt(topPos, 10) + (newY - this._moveParameters.mouseY)
        newLeftPos = (newLeftPos >= this._desktopContainer.getBoundingClientRect().left ? newLeftPos : this._desktopContainer.getBoundingClientRect().left)
        newTopPos = (newTopPos >= this._desktopContainer.getBoundingClientRect().top ? newTopPos : this._desktopContainer.getBoundingClientRect().top)
        newLeftPos = (newLeftPos + this._moveParameters.object.getBoundingClientRect().width > this._desktopContainer.getBoundingClientRect().width) ?
            this._desktopContainer.getBoundingClientRect().width - this._moveParameters.object.getBoundingClientRect().width : newLeftPos
        newTopPos = (newTopPos + this._moveParameters.object.getBoundingClientRect().height > (this._desktopContainer.getBoundingClientRect().height + this._desktopContainer.getBoundingClientRect().top)) ?
            this._desktopContainer.getBoundingClientRect().height + this._desktopContainer.getBoundingClientRect().top - this._moveParameters.object.getBoundingClientRect().height : newTopPos
        this._moveParameters.object.style.left = newLeftPos + 'px';
        this._moveParameters.object.style.top = newTopPos + 'px';
        this._moveParameters.mouseX = newX;
        this._moveParameters.mouseY = newY;
    }

    /**
     * ablak/fejléc mozgatás befejezése eseménye
     * @param event {MouseEvent}
     */
    static endMoveWindow(event) {
        if (!this._moveParameters)
            return
        this._moveTime = 0
        this._moveParameters.object.parentElement.setAttribute("data-inmove", "0");
        //DO savwindowparams
        // this.saveWindowParams(this._moveParameters.object)
        this._moveParameters = undefined
    }
}
