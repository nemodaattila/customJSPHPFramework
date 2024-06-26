class WindowOpener {
    static async openWindow(moduleGroupName, moduleName, windowName = undefined) {
        if (windowName === undefined)
            windowName = moduleName
        if (DesktopController.isWindowOpen(windowName)) {
        } else {
            // DesktopController.openWindow(moduleGroupName, moduleName,windowName)
            let controller = await ModuleLoader.loadModule(moduleGroupName, moduleName)
            console.log('controller')
            let tab = new DesktopWindowTabController(DesktopController.getTaskBarContainer())
            let window = new DesktopWindowController(DesktopController.getWindowContainer())
            window.setName(windowName)
            tab.windowPointer = window
            window.tabPointer = tab
            DesktopController.addNewWindow(windowName, window, tab)
            DesktopController.switchActiveWindow(windowName)
            // await controller.init()
            window.displayContent(controller)
            console.log('window')
            console.dir(window)
        }
    }
}
