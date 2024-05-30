/**
 * controllerek ősosztálya
 */
class ControllerParent {
    _model
    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    _view
    set view(value) {
        this._view = value;
    }

    _service
    get service() {
        return this._service;
    }

    set service(value) {
        this._service = value;
    }

    getTitle() {
        return this.service.getTitle(this._type)
    }

    init()
    {
        this.subscribeToEvents()
    }

    setWindowMainContentContainer(container)
    {
        this._view.windowContentMainContainer=container
    }

    getWindowContentMainContainer()
    {
        return this._view.windowContentMainContainer
    }

// /**
    //  * sorszám kontroller azonosítójának megadásához
    //  * @type {number}
    //  */
    // static controllerNumCount = 0
    // /**
    //  * controllerhez tartozó MVC model
    //  * @type {Object | null}
    //  */
    // model
    // /**
    //  * controllerhez tartozó MVC view
    //  * @type {NonTableViewParent | FileHandlerViewParent |ViewParent | LoginView}
    //  */
    // view
    // /**
    //  * a controllerhez kapcsolódó ablakra mutató pointer
    //  * @type {WindowContentNonTable|WindowContentTable}
    //  */
    // windowPointer
    // /**
    //  * a controllerhez kapcsolódó ablak tartalmára mutató pointer
    //  * @type {WindowContentTable}
    //  */
    // windowContentPointer
    // /**
    //  * a controllerhez tartozó, parentObject által megadott paraméterek
    //  * @type {Object}
    //  */
    // moduleParams
    // /**
    //  * controllerhez tartozó service
    //  * @type {Object}
    //  */
    // service
    // /**
    //  * object id-je
    //  * @type {number}
    //  */
    // id
    // /**
    //  * a megnyitást inicializáló object által küldött paraméterek
    //  * @type {{}}
    //  */
    // connectedParams
    //
    // /**
    //  * betöltendő modul adatainak mentése
    //  * @param module {ModuleInitiator}
    //  */
    // constructor(module) {
    //     if (this.constructor === ControllerParent)
    //         throw new Error("Can't instantiate abstract class!");
    //     this.id = ControllerParent.controllerNumCount++;
    //     this.parentObject = module.parentObject
    //     this.moduleParams = module.params ?? {}
    //     this.connectedParams = module.connectedParams
    //     this.service = module.service
    //     this.windowPointer = module.windowPointer
    //     if (module.task !== 'listAll')
    //         window.scrollTo({top: 0, behavior: 'smooth'});
    // }
    //
    // /**
    //  * controller inicializálása, view, ablak megjelenítése, ha van oldalmenű annak létrehozása
    //  * @param modelObject {Object | null} controllerhez tartozó model
    //  * @param viewName {string | null} a controllerhez tartozó view neve - nem object!
    //  * @param noModelParams {Object} paraméterek, ha a controllerhez nem tartozik model
    //  */
    // parentInit(modelObject, viewName = null, noModelParams = {}) {
    //     this.model = modelObject
    //     this.windowPointer.initContent(this.model === null ? noModelParams : this.model.params, this)
    //     this.windowContentPointer = this.windowPointer.getWindowContentPointer()
    //     this.windowContentPointer.controllerPointer = this
    //     this.view = new (eval(viewName ?? 'NonTableViewParent'))(this.windowContentPointer, this.connectedParams?.connectedObjectId ?? undefined, this.service)
    // }
    //
    // /**
    //  * leiratkozás eseményről, view megszüntetése, pointerek nullázása
    //  */
    // destructor() {
    //     EventSubscriptionHandler.massUnSubscribe(this)
    //     this.model = null
    //     this.windowPointer = null
    //     this.windowContentPointer.destruct()
    //     this.windowContentPointer = null
    //     this.view?.destructor()
    // }
}
