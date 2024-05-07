/**
 * ablakkezelő háttér, valamint a fül-sáv létrehozása
 * ablakok közti váltás lekezelése
 */
class DesktopWindowTabController {
    _view

    constructor(container) {
        this._view = new DesktopWindowTabView()
        this._view.createElements(container)
    }

    _windowPointer

    set windowPointer(value) {
        this._windowPointer = value;
    }

    setTitle(title) {
        this._view.setTitle(title)
    }
}
