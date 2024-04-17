class DesktopModel {
    openNewWindow() {
        this._windows.push(new Window());
    }

    get activeWindow() {
        return this._activeWindow;
    }

    set activeWindow(value) {
        this._activeWindow = value;
    }
    get previousWindow() {
        return this._previousWindow;
    }

    set previousWindow(value) {
        this._previousWindow = value;
    }

    /**
     * megjelenített ablakok objektumai
     * @type {{string: DesktopWindow}}
     */
    _windows = {}
    /**
     * aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    _activeWindow = undefined
    /**
     * az előző aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    _previousWindow = undefined
}
