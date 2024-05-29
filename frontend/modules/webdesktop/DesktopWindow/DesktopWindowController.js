/**
 * grafikus (Windows-szerű) ablak objektuma
 */
class DesktopWindowController {
    _model
    _view
    _contentControllerPointer

    constructor(container) {
        //     this.parentInit(new ListAllCompanyModel())
        //     this.windowContentPointer.hideEntityHandlerIcons(['delete'])
        this._model = new DesktopWindowModel();
        this._view = new DesktopWindowView(this);
        this._model.increaseCount();
        this._model.setIdToCount()
        this._view.displayWindow(container)
        this.calcDefaultParameters()
        WindowMover?.addMoveEventToWindow(this)
        this._view.windowDiv.controllerPointer = this
        this.observer = new ResizeObserver(this.onWindowResize)
        this.observer.observe(this._view.windowDiv);
    }

    _tabPointer

    set tabPointer(value) {
        this._tabPointer = value;
    }

    setName(windowName) {
        this._model.name = windowName;
    }

    getName() {
        return this._model.name;
    }

    onWindowResize(object) {
        console.log(object)
        console.log(this)
        if (!(object instanceof Element))
            object = object[0].target
        let controller = object.controllerPointer
        console.log(controller)
        clearTimeout(this.resizeTimeOut);
        this.resizeTimeOut = setTimeout(async () => {
            if (object.style.width !== '100%' && parseInt(object.style.width) < 400)
                object.style.width = "400px"
            if (parseInt(object.style.height) < 200)
                object.style.height = "200px"
            await controller._contentControllerPointer.refreshRows({changeLimit: true, resetOffset: true})
            // object.windowObject.contentObject.rows = []
            // object.windowObject.controllerPointer.calcTableRowNum()
            // object.windowObject.contentObject.offset = 0
            // object.windowObject.contentObject.tableContainer.scrollTop = 0
            // object.windowObject.controllerPointer.collectSearchParamsForRequest('reset')
            // object.windowObject.contentObject.scrollRows(0)
            // DesktopEventHandlers.saveWindowParams(object)
        }, 200);
    }

    calcDefaultParameters() {
        let top, left
        let id = parseInt(this._model.id)
        console.log(id)
        switch (id % 4) {
            case 0:
                top = '25px'
                left = '25px'
                break
            case 1:
                top = '25px'
                left = '50%'
                break
            case 2:
                top = '51%'
                left = 0
                break
            case 3:
                top = '51%'
                left = '50%'
                break
        }
        this._view.setLeftAndTopParameters(left, top)
    }

    displayContent(controller) {
        this._view.setTitle(controller.getTitle())
        this._tabPointer.setTitle(controller.getTitle())
        controller.displayView(this._view.windowBody);
        this._contentControllerPointer = controller
    }

    zoomContent(zoomValue) {
        this._contentControllerPointer.zoomContent(zoomValue)
        // this.zoom = value
        // this.pageScrollData.zoom = value
        // this.tableContainer.style.zoom = value
        // if (save)
        //     DesktopEventHandlers.onWindowResize(this.container)
    }

    //bool
    setMinimized(minimized) {
        this._model.minimized = minimized
        if (minimized)
            DesktopController.switchActiveWindow()
    }

    resetSize() {
        this._view.resetSize()
    }

    activateWindow() {
        console.log(this)
        this._view.windowHeaderDiv.classList.remove('inactive');
        this._view.windowDiv.style.display = "";
        this._tabPointer.setActive()
        this.setMinimized(false)
        // if (this.windowDiv.children.length > 1)
        //     this.windowDiv.children[1].classList.remove('inactiveWindow')
    }

    /**
     * ablak inaktívvá tétele
     */
    inActivateWindow() {
        console.log(this._view.windowHeaderDiv)
        this._view.windowHeaderDiv.classList.add('inactive');
        this._tabPointer.setInactive()
        // if (this.windowDiv.children.length > 1)
        //     this.windowDiv.children[1].classList.add('inactiveWindow')
    }

    close() {
        //DO un observe
        this.observer.unobserve(this._view.windowDiv);
        DesktopController.switchActiveWindow()
        DesktopController.removeWindow(this._model.name)
        this._tabPointer.destruct()
        this._contentControllerPointer.destruct()
        this._view.destruct()
        delete this
        console.dir(DesktopController)
        // if (this.connectedParams?.connectedService)
        //     this.connectedParams.connectedService.selectedRecord = null
        // this.containerElement.removeChild(this.windowDiv);
        // Desktop.removeWindow(this, this.windowTab)
        // delete this
        // DesktopEventHandlers.saveWindowParams(this.windowDiv, false)
    }

    //
    // /**
    //  * ablak létrehozása, paraméterezése, keret létrehozása
    //  * @param id {string|number} ablak id
    //  * @param params {Object} ablak paraméterei, pl: címke, tartalomtípus, tábla attributumok stb...
    //  * @param service {{}} service
    //  * @param moduleGroupName {string} modulcsoportnév
    //  * @param connectedParams {{}} kapcsolt/meghívó object paraméterei
    //  */
    // constructor(id, params, service, moduleGroupName, connectedParams = null) {
    //     this.containerElement = Desktop.desktopElement;
    //     this.connectedParams = connectedParams
    //     this.moduleGroupName = moduleGroupName
    // }
    //
    // /**
    //  * tartalom betöltés megindítása
    //  * @param moduleGroup {[]}modulcsoport paraméterek
    //  * @param task {string} feladat/modulnév
    //  * @param service {{}} modul service
    //  * @returns {Promise<void>}
    //  */
    // async loadContent(moduleGroup, task, service) {
    //     await this.loadContentModule(task ?? moduleGroup[0], service)
    //     Desktop.switchActiveWindow(this)
    // }
    //
    // /**
    //  * ablak paramétereinek lekérése szerverről
    //  * @returns {Promise<void>}
    //  */
    // async checkWindowParamsFromServer() {
    //     let params = JSON.parse(await ServiceParent.sendGetWindowParams(this.moduleGroupName))
    //     if (params !== false)
    //         this.initWindowParams(params)
    // }
    //
    // /**
    //  * az ablak fő elemeinek legenerálása, eventel hozzáadása
    //  * @param moduleNames modulcsoportba tartozó modulok nevei
    //  * @param service modulhoz tartozó service
    //  */
    // displayMainElements(moduleNames, service) {
    //     if (moduleNames.length > 1) {
    //         let navDiv = HtmlElementCreator.createHtmlElement('div', this.windowBody, {class: 'asideNavContainer'})
    //         let aside = HtmlElementCreator.createHtmlElement('aside', navDiv)
    //         let ul = HtmlElementCreator.createHtmlElement('div', aside, {'class': 'asideList'})
    //         for (let mName of moduleNames) {
    //             let li = HtmlElementCreator.createHtmlElement('div', ul, {})
    //             let a = HtmlElementCreator.createHtmlElement('div', li, {
    //                 'class': 'asideAnchor',
    //                 innerHTML: service.sideMenuParams[mName].label,
    //                 href: '#0'
    //             })
    //             a.addEventListener('click', () => {
    //                 this.replaceMainWindowContent()
    //                 this.loadContentModule(mName, service)
    //             })
    //             HtmlElementCreator.createHtmlElement('div', li, {innerHTML: 'X', class: 'asideAnchorLabel'})
    //         }
    //         navDiv.addEventListener('mouseenter', () => {
    //             if (navDiv.classList.contains('fly'))
    //                 return
    //             navDiv.classList.add('fly')
    //             this.mainContainer.classList.add('fly')
    //         })
    //         navDiv.addEventListener('mouseleave', () => {
    //             navDiv.classList.remove('fly')
    //             this.mainContainer.classList.remove('fly')
    //         })
    //     }
    //     this.mainContainer = HtmlElementCreator.createHtmlElement('div', this.windowBody, {class: 'windowMainContainer'})
    //     if (moduleNames.length > 1)
    //         this.mainContainer.classList.add('withMenu')
    // }
    //
    // /**
    //  * ablak tartalmának frisstése
    //  * @param connectedParams {{}} kapcsolt/meghívó object paraméterei
    //  * @param setAsActive {boolean} aktív legyen az ablak
    //  */
    // reOpenWindowContent(connectedParams, setAsActive = true) {
    //     this.connectedParams = connectedParams
    //     this.replaceMainWindowContent()
    //     this.loadContentModule(...this.lastLoadedContentModule)
    //     if (setAsActive)
    //         Desktop.switchActiveWindow(this)
    // }
    //
    // /**
    //  * ablak tartalom betöltése, értékadások
    //  * @param moduleName {string} modul megnevezés azonosítója
    //  * @param service modulhoz tartozó service
    //  * @returns {Promise<void>}
    //  */
    // async loadContentModule(moduleName, service) {
    //     this.lastLoadedContentModule = [moduleName, service]
    //     if (this.connectedParams === null)
    //         this.connectedParams = {}
    //     this.connectedParams.connectedService = service
    //     this.setTitle(service.sideMenuParams[moduleName].label)
    //     let module = service.sideMenuParams[moduleName].openParams
    //     this.lastOpenedModuleParams = module
    //     await ModuleLoader.loadModule({
    //         module: module.module,
    //         window: this,
    //         task: module.task,
    //         params: module.params
    //     }, this.connectedParams)
    // }
    //
    // /**
    //  * ablak kiürítése, mentett paraméterek törlése
    //  */
    // replaceMainWindowContent() {
    //     App.removeSubModule(this.controllerPointer.id)
    //     HtmlElementCreator.emptyDOMElement(this.mainContainer)
    //     this.controllerPointer = null
    //     this.contentObject = null
    // }
    //
    // /**
    //  * ablak jobb felső sarkában lévő ikonok megjelenítése, eventek hozzáadása (zoom, miinimize, maximize, close)
    //  */
    //
    // /**
    //  * ablak fülének megjelenítése a fülsávon, záróesemény hozzáadása
    //  */
    // displayWindowTab() {
    //     this.windowTab = HtmlElementCreator.createHtmlElement('div', Desktop.tabsBarElement, {
    //         class: 'windowTab',
    //     })
    //     this.windowTab.addEventListener('mousedown', () => Desktop.switchActiveWindow(this))
    //     HtmlElementCreator.createHtmlElement('div', this.windowTab, {
    //         innerHTML: this.title, class: 'title'
    //     })
    //     let resetIcon = HtmlElementCreator.createHtmlElement('div', this.windowTab, {
    //         title: 'Ablak alapméretre állítása', class: 'resetWindowIcon'
    //     })
    //     resetIcon.addEventListener('click', () => {
    //         if (this.windowSize !== undefined)
    //             this.maximalizeWindow()
    //         this.windowDiv.style.left = '0'
    //         this.windowDiv.style.top = '25px'
    //         this.windowDiv.style.width = '500px'
    //         this.windowDiv.style.height = '250px'
    //         this.contentObject.setTableZoom('1', false)
    //         this.zoomWindow('1')
    //     })
    //     let closeIcon = HtmlElementCreator.createHtmlElement('div', this.windowTab, {
    //         title: 'Bezárás', class: 'close'
    //     })
    //     closeIcon.addEventListener('click', () => this.closeWindow())
    //     closeIcon.style.top = '0'
    // }
    //
    // /**
    //  * az ablak tartalmának inicializálása, megjelenítése
    //  */
    // initContent(params, controller) {
    //     this.controllerPointer = controller
    //     if (params.windowContentType === 'table') {
    //         this.contentObject = new WindowContentTable(this.mainContainer, params, this.controllerPointer.service)
    //     } else
    //         this.contentObject = new WindowContentNonTable(this.mainContainer, params, this.controllerPointer.service)
    // }
    //
    // /**
    //  * ablak paramétere k beállítása
    //  * @param params {{}} paraméterek
    //  */
    // initWindowParams(params) {
    //     if (params.width === '0px') params.width = '50vw'
    //     if (params.height === '0px') params.height = '50vh'
    //     this.windowDiv.style.left = params.left
    //     this.windowDiv.style.top = params.top
    //     this.windowDiv.style.width = params.width
    //     this.windowDiv.style.height = params.height
    //     this.windowDiv.style.zIndex = params.zIndex
    //     this.contentObject.setTableZoom(params.zoom, false)
    //     if (params.fullSize)
    //         this.maximalizeWindow()
    // }
    //
    // /**
    //  * ablak bezárása, modul eltávolítása, következő ablak aktívvá tétele
    //  */
    //
    // /**
    //  * ablak és ablak fül felratának beállítása
    //  * @param title {string} felirat/cím
    //  */
    // setTitle(title) {
    //     this.windowTab.firstChild.innerHTML = this.titleDiv.innerHTML = this.title = title
    // }
    //
    // /**
    //  * ablak aktívra állítása
    //  */
    //
    // /**
    //  * ablak zomm-jának változtatása
    //  * @param zoomValue {string} zoom mértéke
    //  */
    // zoomWindow(zoomValue) {
    //     this.contentObject.setTableZoom(zoomValue)
    //     this.titleDiv.innerHTML = this.title + ' ( ' + Math.floor(parseFloat(zoomValue) * 100) + ' % )'
    // }
    //
    // /**
    //  * ablak minimalizálása az "asztalra"
    //  */
    //
    // /**
    //  * az ablak tartalmára mutató pointer visszaadása
    //  * @returns {WindowContentTable|WindowContentNonTable}
    //  */
    // getWindowContentPointer() {
    //     return this.contentObject;
    // }
    //
    // /**
    //  * az ablak maximalizálása teljes méretre (és a korábbi ablak paraméterek mentése),
    //  * valamint az előző méretre visszaállítása
    //  */
}
