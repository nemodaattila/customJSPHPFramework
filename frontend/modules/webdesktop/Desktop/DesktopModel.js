class DesktopModel {
    _windows = {}
    _tabs = {}
    _activeWindow = undefined
    get activeWindow() {
        return this._activeWindow;
    }

    set activeWindow(value) {
        console.trace()
        console.log(value)
        this._activeWindow = value;
    }

    /**
     * az előző aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    _previousWindow = undefined
    get previousWindow() {
        return this._previousWindow;
    }

    set previousWindow(value) {
        this._previousWindow = value;
    }

    openNewWindow() {
        // this._windows.push(new Window());
    }

    searchForWindowById(id) {
        return this._windows[id] !== undefined;
    }

    addNewWindow(name, window, tab) {
        this._windows[name] = window
        this._tabs[name] = tab
        this.activeWindow = name
    }

    inActivateWindow(windowName) {
        this._windows[windowName].inActivateWindow()
    }

    activateWindow(windowName) {
        this._windows[windowName].activateWindow()
    }

    removeWindow(windowName) {
        console.log(windowName)
        delete this._windows[windowName];
        delete this._tabs[windowName];
    }
}
