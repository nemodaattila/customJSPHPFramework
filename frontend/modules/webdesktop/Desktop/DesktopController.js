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

    static openWindow(moduleGroupName, moduleName)
    {

    }

    // /**
    //  * aktív ablak beállítása
    //  * @param window DesktopWindow - beállítandó aktív ablak
    //  */
    // static switchActiveWindow(window) {
    //     if (DesktopController.activeWindow !== undefined) {
    //         if (window !== DesktopController.activeWindow)
    //             DesktopController.previousWindow = DesktopController.activeWindow
    //         DesktopController.activeWindow.setInactive()
    //     }
    //     if (window !== null) {
    //         DesktopController.activeWindow = window
    //         DesktopController.activeWindow.setActive()
    //     }
    //     Object.values(DesktopController.windows).forEach(actWindow =>
    //         actWindow.windowDiv.style.zIndex = actWindow === window ? '100' : (parseInt(actWindow.windowDiv.style.zIndex) - 1).toString())
    // }
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
    // static removeWindow(clWindow, windowTab) {
    //     let index = Object.keys(this.windows)[Object.values(this.windows).findIndex(window => window === clWindow)]
    //     if (DesktopController.windows[index] === this.activeWindow)
    //         this.setActiveNextWindow(clWindow)
    //     delete DesktopController.windows[index]
    //     this.tabsBarElement.removeChild(windowTab)
    // }
    //
    // /**
    //  * meg van e nyítva egy ablak
    //  * @param {string} windowId ablak megnevezése
    //  * @returns {boolean}
    //  */
    // static isWindowOpen(windowId) {
    //     return this.windows[windowId] !== undefined
    // }
}
