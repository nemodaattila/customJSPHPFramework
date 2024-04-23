class WindowOpener {
   static async openWindow(moduleGroupName, moduleName,windowName = undefined)
    {
        if (windowName === undefined)
            windowName=moduleName
        if (DesktopController.isWindowOpen(windowName))
        {

        }
        else
        {
            // DesktopController.openWindow(moduleGroupName, moduleName,windowName)
            let controller = await ModuleLoader.loadModule(moduleGroupName, moduleName)
            console.log('controller')
            let window = new DesktopWindowController(DesktopController.getWindowContainer())
            console.log('window')
            console.dir(window)
            this.createWindowTab(window)
        }
    }

    static createWindowTab(window)
    {
             this.windowTab = HtmlElementCreator.createHtmlElement('div', null, {
                class: 'windowTab',
            })
            this.windowTab.addEventListener('mousedown', () => Desktop.switchActiveWindow(this))
            HtmlElementCreator.createHtmlElement('div', this.windowTab, {
                innerHTML: this.title, class: 'title'
            })
            let resetIcon = HtmlElementCreator.createHtmlElement('div', this.windowTab, {
                title: 'Ablak alapméretre állítása', class: 'resetWindowIcon'
            })
            resetIcon.addEventListener('click', () => {
                if (this.windowSize !== undefined)
                    this.maximalizeWindow()
                this.windowDiv.style.left = '0'
                this.windowDiv.style.top = '25px'
                this.windowDiv.style.width = '500px'
                this.windowDiv.style.height = '250px'
                this.contentObject.setTableZoom('1', false)
                this.zoomWindow('1')
            })
            let closeIcon = HtmlElementCreator.createHtmlElement('div', this.windowTab, {
                title: 'Bezárás', class: 'close'
            })
            closeIcon.addEventListener('click', () => this.closeWindow())
            closeIcon.style.top = '0'
    }
}
