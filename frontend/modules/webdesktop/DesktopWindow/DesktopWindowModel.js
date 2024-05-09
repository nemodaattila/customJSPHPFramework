class DesktopWindowModel {

    /**
     * ablak sorszáma, elhelyezéshez kell
     * @type {number}
     */
    static _count = -1

    _id

    get id() {
        return this._id;
    }

    increaseCount() {
        DesktopWindowModel._count++;
    }

    setIdToCount() {
        this._id = DesktopWindowModel._count
    }

    _minimized = false

    get minimized() {
        return this._minimized;
    }

    set minimized(value) {
        this._minimized = value;
    }

    _name
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

// /**
//  * az ablakhoz tartozó modul controllere mutató pointer
//  * @type {ControllerParent}
//  */
// controllerPointer
// /**
//  * az ablakot tartalmazó div -> Desktop divje
//  * @type {HTMLDivElement}
//  */
// containerElement
// /**
//  * az ablak DOM elementje
//  * @type {HTMLDivElement}
//  */
// windowDiv
// windowBody
// /**
//  * az ablak fejlécét és ikonjait tartalmazó DOM elem
//  * @type {HTMLDivElement}
//  */
// windowTitleDiv
// /**
//  * az ablak címét tartalmazó DOm elem
//  * @type {HTMLDivElement}
//  */
// titleDiv
// /**
//  * a zoom scrollert tartalmazó DOM elem
//  * @type {HTMLDivElement}
//  */
// zoomDiv
// /**
//  * az ablak címe/megnevezése
//  * @type {string}
//  */
// title
// /**
//  * az ablak paraméterei
//  * @type {Object}
//  */
// connectedParams = null
// /**
//  * az ablak tartalma
//  * @type {WindowContentTable | WindowContentNonTable}
//  */
// contentObject = undefined
// /**
//  * az ablak tartozó fül DOM elementje
//  * @type {HTMLDivElement}
//  */
// windowTab
// /**
//  * az ablak eredeti méretei, teljes méretnél
//  * @type {Object | undefined}
//  */
// windowSize = undefined
// /**
//  * az ablak minimalizált-e
//  * @type {boolean}
//  */

// /**
//  * az ablak fő konténere
//  * @type HTMLDivElement
//  */
// mainContainer
// /**
//  * legutolsó ablakba betöltött modul
//  * @type [] modulnév, modul service osztály
//  */
// lastLoadedContentModule
// /**
//  * legutolsó ablakba betöltött modul paraméterei //DO összevonás
//  * @type {{}} modulnév, tasknév
//  */
// lastOpenedModuleParams
// /**
//  * modulcsoportnév
//  */
// moduleGroupName
}
