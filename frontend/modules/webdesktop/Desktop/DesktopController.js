/**
 * ablakkezelő háttér, valamint a fül-sáv létrehozása
 * ablakok közti váltás lekezelése
 */
class DesktopController {
    static _model
    static _view

    static init() {
        this._model = new DesktopModel()
        this._view = new DesktopView()
        this._view.createMainDOMElements()
        console.dir(this)
    }

    static getWindowContainer() {
        return this._view.deskTopDOMElement
    }

    static getTaskBarContainer() {
        return this._view.tabsBarDOMElement
    }

    static async openWindow(moduleGroupName, moduleName, windowName = undefined) {
        await WindowOpener.openWindow(moduleGroupName, moduleName, windowName)
    }

    static isWindowOpen(windowId) {
        return this._model.searchForWindowById(windowId)
    }

    static addNewWindow(windowName, window, tab) {
        this._model.addNewWindow(windowName, window, tab);
        console.dir(this)
    }

    // /**
    //  * aktív ablak beállítása
    //  * @param window DesktopWindow - beállítandó aktív ablak
    //  */
    static switchActiveWindow(windowName = undefined) {
        if (windowName === this._model.activeWindow)
            return
        if (this._model.activeWindow) {
            this._model.previousWindow = this._model.activeWindow
            this._model.inActivateWindow(this._model.activeWindow)
            this._model.activeWindow = undefined
        }
        if (windowName) {
            this._model.activeWindow = windowName
            this._model.activateWindow(this._model.activeWindow)
        }
        Object.values(this._model._windows).forEach(actWindow => {
            actWindow._view.windowDiv.style.zIndex = actWindow ===
            this._model._windows[this._model.activeWindow] ? '100' : (parseInt(actWindow._view.windowDiv.style.zIndex) - 1).toString()

        })
    }

    static removeWindow(windowName) {
        this._model.removeWindow(windowName)
    }

    static getDesktopDOMElement() {
        return this._view._deskTopDOMElement
    }

    //
    // /**
    //  *  ha a user minimalizál egy ablakot, megkeresi a következő nem minimalizált ablakot, és aktívvá teszi azt
    //  * @param window DesktopWindow - a minimalizálandó ablak
    //  * @returns {DesktopWindow|null} kövezkező minimalizált ablak , vagy null ha nincs
    //  */
    // static getNextWindowId(window) {
    //     let windows = Object.values(this.windows)
    //     let count = windows.length
    //     if (count === 1)
    //         return null
    //     let index = windows.findIndex(windowItem => windowItem === window)
    //     let originalIndex = index
    //     do {
    //         index++;
    //         if (index === count)
    //             index = 0;
    //         if (index === originalIndex)
    //             return null
    //         let assIndex = Object.keys(this.windows)[index]
    //         if (this.windows[assIndex].minimized === false)
    //             return this.windows[assIndex]
    //     } while (1)
    // }
    //
    // /**
    //  * következő nem minimalizást ablak megkeresése és aktívvá tétele
    //  * @param window - DesktopWindow
    //  */
    // static setActiveNextWindow(window) {
    //     let index = -1;
    //     if (this.previousWindow !== undefined)
    //         index = Object.values(this.windows).findIndex(win => win.moduleGroupName === this.previousWindow.moduleGroupName)
    //     this.switchActiveWindow((index !== -1) ? this.windows[Object.keys(this.windows)[index]] : this.getNextWindowId(window))
    // }
    //
    // /**
    //  * ablak bezárása és a hozzátartozó fül bezárása, eltüntetése
    //  * @param clWindow DesktopWindow - bezárandó ablak
    //  * @param windowTab HTMLDivElement az ablakhoz tartozó fül
    //  */
    //
    // /**
    //  * meg van e nyítva egy ablak
    //  * @param {string} windowId ablak megnevezése
    //  * @returns {boolean}
    //  */
}
