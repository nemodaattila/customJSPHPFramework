class WindowMover {
    static _desktopContainer
    static _windowPointer = undefined
    static _moveParameters

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
        this._desktopContainer=container
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

        if (this._moveParameters !== undefined) {
            let newX = event.pageX || event.clientX;
            let newY = event.pageY || event.clientY;
            if (this._moveParameters !== undefined) {
                let leftPos = this._moveParameters.object.style.left !== '' ? this._moveParameters.object.style.left : this._moveParameters.objectPos.left
                let topPos = this._moveParameters.object.style.top !== '' ? this._moveParameters.object.style.top : this._moveParameters.objectPos.top
                if (leftPos === '50%')
                    leftPos = Desktop.desktopElement.clientWidth / 2
                if (topPos === '51%')
                    topPos = Desktop.desktopElement.clientHeight / 2
                let newLeftPos = parseInt(leftPos, 10) + (newX - this._moveParameters.mouseX)
                let newTopPos = parseInt(topPos, 10) + (newY - this._moveParameters.mouseY)
                newLeftPos = (newLeftPos >= this._desktopContainer.getBoundingClientRect().left ? newLeftPos : this._desktopContainer.getBoundingClientRect().left)
                newTopPos = (newTopPos >= this._desktopContainer.getBoundingClientRect().top ? newTopPos : this._desktopContainer.getBoundingClientRect().top)
                newLeftPos = (newLeftPos+this._moveParameters.object.getBoundingClientRect().width>this._desktopContainer.getBoundingClientRect().width)?
                    this._desktopContainer.getBoundingClientRect().width-this._moveParameters.object.getBoundingClientRect().width:newLeftPos

                newTopPos = (newTopPos+this._moveParameters.object.getBoundingClientRect().height>(this._desktopContainer.getBoundingClientRect().height+this._desktopContainer.getBoundingClientRect().top))?
                    this._desktopContainer.getBoundingClientRect().height+this._desktopContainer.getBoundingClientRect().top-this._moveParameters.object.getBoundingClientRect().height:newTopPos

                this._moveParameters.object.style.left = newLeftPos + 'px';
                this._moveParameters.object.style.top = newTopPos + 'px';
                this._moveParameters.mouseX = newX;
                this._moveParameters.mouseY = newY;
            }
            if (this.inMoveTh !== undefined) {
                if (this.inMoveTh.moveCbChecked === true) {
                    this.inMoveTh.object.style.left = parseInt(this.inMoveTh.object.style.left, 10) + ((newX - this.inMoveTh.mouseX) / this.inMoveTh.object.zoomVal) + 'px';
                    let swapCellIndex = 0;
                    let inMove = this.inMoveTh.object
                    Array.from(inMove.tableHeadPointer.firstElementChild.children).forEach((head, i) => {
                        head.style.borderLeft = ''
                        head.style.borderRight = ''
                        if (head.getBoundingClientRect().x * inMove.zoomVal < event.pageX &&
                            i !== inMove.actualCellIndex && head.style.display !== "none") {
                            swapCellIndex = i;
                            head.style.borderLeft = "";
                            head.style.borderRight = "";
                        }
                    })
                    if (swapCellIndex < inMove.actualCellIndex) {
                        inMove.tableHeadPointer.firstElementChild.children[swapCellIndex].style.borderLeft = "2px solid red";
                    } else
                        inMove.tableHeadPointer.firstElementChild.children[swapCellIndex].style.borderRight = "2px solid red";
                    this.inMoveTh.mouseX = newX;
                    this.inMoveTh.mouseY = newY;
                }
            }
        }
        if (this.reSizeObject !== undefined) {
            let newX = event.pageX || event.clientX;
            let newY = event.pageY || event.clientY;
            this.reSizeObject.resizeWidth = parseInt(this.reSizeObject.resizeWidth, 10) + ((newX - this.reSizeObject.mouseX) / this.reSizeObject.zoomVal);
            this.reSizeObject.object.style.width = this.reSizeObject.resizeWidth + "px";
            this.reSizeObject.mouseX = newX;
            this.reSizeObject.mouseY = newY;
        }
    }

    /**
     * ablak/fejléc mozgatás befejezése eseménye
     * @param event {MouseEvent}
     */
    static endMoveWindow(event) {
        if (this._moveParameters !== undefined) {
            this._moveParameters.object.parentElement.setAttribute("data-inmove", "0");
            //DO savwindowparams
            // this.saveWindowParams(this._moveParameters.object)
            this._moveParameters = undefined
        }
        if (this.inMoveTh !== undefined) {
            let inMove = this.inMoveTh.object
            let swapCellIndex = 0;
            Array.from(inMove.tableHeadPointer.firstElementChild.children).forEach((head, i) => {
                if (head.getBoundingClientRect().x * inMove.zoomVal < event.pageX &&
                    i !== inMove.actualCellIndex && head.style.display !== "none")
                    swapCellIndex = i;
                head.style.borderLeft = "";
                head.style.borderRight = "";
            })
            let headerRow = inMove.tableHeadPointer.firstElementChild
            headerRow.cells[inMove.actualCellIndex].style.display = "";
            let cell = headerRow.cells[inMove.actualCellIndex];
            headerRow.removeChild(cell);
            headerRow.insertBefore(cell, headerRow.cells[swapCellIndex]);
            if (inMove.tableHeadPointer.children[1] !== undefined) {
                let filterRow = inMove.tableHeadPointer.children[1]
                filterRow.cells[inMove.actualCellIndex].style.display = "";
                let cell = filterRow.cells[inMove.actualCellIndex];
                filterRow.removeChild(cell);
                filterRow.insertBefore(cell, filterRow.cells[swapCellIndex]);
            }
            Array.from(inMove.tableBodyPointer.children).forEach((row) => {
                if (row.cells && row.cells[inMove.actualCellIndex]) {
                    row.cells[inMove.actualCellIndex].style.display = "";
                    let cell = row.cells[inMove.actualCellIndex];
                    row.removeChild(cell);
                    row.insertBefore(cell, row.cells[swapCellIndex]);
                }
            })
            let spliced = this.inMoveTh.windowPointer.columnNames.splice(inMove.actualCellIndex, 1)[0]
            this.inMoveTh.windowPointer.columnNames.splice(swapCellIndex, 0, spliced)
            inMove.tableParent.removeChild(inMove);
            this.inMoveTh.windowPointer.saveHeaderParams()
            this.inMoveTh = undefined
        }
        if (this.reSizeObject !== undefined) {
            if (parseInt(this.reSizeObject.resizeWidth, 10) < 1) {
                let paramName = this.reSizeObject.windowPointer.columnNames[this.reSizeObject.object.cellIndex];
                document.getElementById('hcb-' + this.reSizeObject.windowPointer.id + '-' + paramName).click()
            }
            this.reSizeObject.windowPointer.saveHeaderParams()
            this.reSizeObject = undefined
        }
    }
}
