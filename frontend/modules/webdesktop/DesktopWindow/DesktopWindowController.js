/**
 * grafikus (Windows-szerű) ablak objektuma
 */
class DesktopWindow {

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
    //     DesktopWindow.count++;
    //     this.id = id
    //     this.containerElement = Desktop.desktopElement;
    //     this.connectedParams = connectedParams
    //     this.moduleGroupName = moduleGroupName
    //     this.windowDiv = HtmlElementCreator.createHtmlElement('div', this.containerElement, {class: 'window'})
    //     this.windowDiv['windowObject'] = this
    //     this.windowDiv.style.zIndex = "100"
    //     this.windowBody = HtmlElementCreator.createHtmlElement('div', this.windowDiv, {class: 'windowBody'})
    //     let top, left
    //     switch (DesktopWindow.count % 4) {
    //         case 0:
    //             top = '25px'
    //             left = 0
    //             break
    //         case 1:
    //             top = '25px'
    //             left = '50%'
    //             break
    //         case 2:
    //             top = '51%'
    //             left = 0
    //             break
    //         case 3:
    //             top = '51%'
    //             left = '50%'
    //             break
    //     }
    //     this.windowDiv.style.left = left
    //     this.windowDiv.style.top = top
    //     this.windowTitleDiv = HtmlElementCreator.createHtmlElement('div', this.windowDiv, {class: 'windowTitle'})
    //     this.titleDiv = HtmlElementCreator.createHtmlElement('div', this.windowTitleDiv, {
    //         class: 'title'
    //     })
    //     this.windowDiv.addEventListener('click', () => Desktop.switchActiveWindow(this))
    //     this.titleDiv.addEventListener('mousedown', (event) => DesktopEventHandlers.startMoveDiv(event, this.windowDiv))
    //     this.displayWindowIcons()
    //     this.displayWindowTab()
    //     this.displayMainElements(params, service)
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
    // displayWindowIcons() {
    //     this.zoomDiv = HtmlElementCreator.createHtmlElement('div', this.windowTitleDiv, {
    //         class: 'zoom', title: 'Nagyítás',
    //     })
    //     this.zoomDiv.addEventListener('mousedown', (event) => event.stopPropagation())
    //     let zoomChanger = HtmlElementCreator.createHtmlElement('input', this.zoomDiv, {
    //         type: 'range', step: "0.1", min: "0.5", max: "2", class: "zoomInput", value: "1"
    //     })
    //     zoomChanger.addEventListener('change', () => this.zoomWindow(zoomChanger.value))
    //     let zoomIconDiv = HtmlElementCreator.createHtmlElement('div', this.zoomDiv, {
    //         class: "ico2"
    //     })
    //     zoomIconDiv.addEventListener('click', () => {
    //         zoomChanger.value = 1
    //         zoomChanger.dispatchEvent(new window.Event('change', {bubbles: true}))
    //     })
    //     let pinner = HtmlElementCreator.createHtmlElement('div', this.windowTitleDiv, {
    //         class: 'pinner', title: 'Rögzítés mint legfelső ablak',
    //     })
    //     pinner.addEventListener('click', (event) => {
    //         event.stopPropagation()
    //         this.windowDiv.classList.toggle('pinned')
    //     })
    //     let miniaturizer = HtmlElementCreator.createHtmlElement('div', this.windowTitleDiv, {
    //         class: 'miniaturize', title: 'kis méret',
    //     })
    //     miniaturizer.addEventListener('click', (event) => {
    //         event.stopPropagation()
    //         this.miniaturizeWindow()
    //     })
    //     let maximalizer = HtmlElementCreator.createHtmlElement('div', this.windowTitleDiv, {
    //         class: 'maximalize', title: 'Teljes méret',
    //     })
    //     maximalizer.addEventListener('click', () => this.maximalizeWindow())
    //     let closer = HtmlElementCreator.createHtmlElement('div', this.windowTitleDiv, {
    //         class: 'close', title: 'Bezárás',
    //     })
    //     closer.addEventListener('click', (event) => {
    //         event.stopPropagation()
    //         this.closeWindow()
    //     })
    // }
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
    // closeWindow() {
    //     DesktopEventHandlers.saveWindowParams(this.windowDiv, false)
    //     Desktop.setActiveNextWindow(this)
    //     if (this.connectedParams?.connectedService)
    //         this.connectedParams.connectedService.selectedRecord = null
    //     App.removeSubModule(this.controllerPointer.id)
    //     this.containerElement.removeChild(this.windowDiv);
    //     Desktop.removeWindow(this, this.windowTab)
    //     delete this
    // }
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
    // setActive() {
    //     this.windowTitleDiv.style.background = "rgb(86,101,117)";
    //     this.windowDiv.style.display = "";
    //     this.windowTab.style.background = "rgb(86,101,117)";
    //     this.minimized = false
    //     if (this.windowDiv.children.length > 1)
    //         this.windowDiv.children[1].classList.remove('inactiveWindow')
    // }
    //
    // /**
    //  * ablak inaktívvá tétele
    //  */
    // setInactive() {
    //     this.windowTitleDiv.style.background = "rgb(136, 151, 167)";
    //     this.windowTab.style.background = "rgb(136, 151, 167)";
    //     if (this.windowDiv.children.length > 1)
    //         this.windowDiv.children[1].classList.add('inactiveWindow')
    // }
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
    // miniaturizeWindow() {
    //     this.windowDiv.style.display = "none"
    //     this.minimized = true
    // }
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
    // maximalizeWindow() {
    //     if (this.windowSize === undefined) {
    //         this.windowSize = {}
    //         this.windowSize.left = this.windowDiv.style.left;
    //         this.windowSize.top = this.windowDiv.style.top;
    //         this.windowSize.width = this.windowDiv.style.width;
    //         this.windowSize.height = this.windowDiv.style.height;
    //         this.windowSize.border = this.windowDiv.style.border;
    //         this.windowSize.borderRadius = this.windowDiv.borderRadius;
    //         this.windowDiv.style.left = '0';
    //         this.windowDiv.style.top = "27px";
    //         this.windowDiv.style.width = "100%";
    //         this.windowDiv.style.height = "auto";
    //         this.windowDiv.style.bottom = '0';
    //         this.windowDiv.style.border = "0px";
    //         this.windowDiv.style.borderTopLeftRadius = "0px";
    //         this.windowDiv.style.borderTopRightRadius = "0px";
    //         this.windowDiv.style.borderBottomLeftRadius = "0px";
    //         this.windowDiv.style.resize = "none";
    //         this.windowDiv.firstElementChild.style.borderTopLeftRadius = "0px";
    //         this.windowDiv.firstElementChild.style.borderTopRightRadius = "0px";
    //         this.windowDiv.setAttribute("data-rooted", "1");
    //     } else {
    //         this.windowDiv.style.left = this.windowSize.left;
    //         this.windowDiv.style.top = this.windowSize.top;
    //         this.windowDiv.style.width = this.windowSize.width;
    //         this.windowDiv.style.height = this.windowSize.height;
    //         this.windowDiv.style.border = this.windowSize.border;
    //         this.windowDiv.style.borderTopLeftRadius = "10px";
    //         this.windowDiv.style.borderTopRightRadius = "10px";
    //         this.windowDiv.style.borderBottomLeftRadius = "10px";
    //         this.windowDiv.style.bottom = "auto";
    //         this.windowDiv.style.resize = "both";
    //         this.windowDiv.firstElementChild.style.borderTopLeftRadius = "10px";
    //         this.windowDiv.firstElementChild.style.borderTopRightRadius = "10px";
    //         this.windowDiv.setAttribute("data-rooted", "0");
    //         this.windowSize = undefined
    //     }
    //     this.minimized = false
    //     DesktopEventHandlers.saveWindowParams(this.windowDiv)
    // }
}
