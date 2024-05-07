class DesktopModel {
    _windows = {}
    _tabs = {}
    /**
     * aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    _activeWindow = undefined
    get activeWindow() {
        return this._activeWindow;
    }

    set activeWindow(value) {
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
    }
}
