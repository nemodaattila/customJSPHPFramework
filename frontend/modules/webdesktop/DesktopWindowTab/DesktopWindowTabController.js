/**
 * ablakkezelő háttér, valamint a fül-sáv létrehozása
 * ablakok közti váltás lekezelése
 */
class DesktopWindowTabController {
    set windowPointer(value) {
        this._windowPointer = value;
    }

    _view

    _windowPointer

    constructor(container) {
        this._view = new DesktopWindowTabView()
        this._view.createElements(container)
    }




}
