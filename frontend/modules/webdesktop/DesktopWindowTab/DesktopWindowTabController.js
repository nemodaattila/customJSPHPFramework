/**
 * ablakkezelő háttér, valamint a fül-sáv létrehozása
 * ablakok közti váltás lekezelése
 */
class DesktopWindowTabController {
    _view

    constructor(container) {
        this._view = new DesktopWindowTabView(this)
        this._view.createElements(container)
    }

    _windowPointer
    set windowPointer(value) {
        this._windowPointer = value;
    }

    setTitle(title) {
        this._view.setTitle(title)
    }

    setConnectedWindowAsActive() {
        DesktopController.switchActiveWindow(this._windowPointer.getName())
    }

    setInactive() {
        this._view.windowTab.classList.add('inactive')
    }

    setActive() {
        this._view.windowTab.classList.remove('inactive')
    }

    closeWindow() {
        this._windowPointer.close()
    }

    resetWindowSize() {
        this._windowPointer.resetSize()
    }

    destructor() {
        this._view.destructor()
        this._view = undefined
    }
}
