class WindowOpener {
    static async openWindow(moduleGroupName, moduleName, windowName = undefined) {
        if (!windowName)
            windowName = moduleName
        if (DesktopController.isWindowOpen(windowName)) {
        } else {
            // DesktopController.openWindow(moduleGroupName, moduleName,windowName)
            const controller = await ModuleLoader.loadModule(moduleGroupName, moduleName)
            console.log('controller')
            const tab = new DesktopWindowTabController(DesktopController.getTaskBarContainer())
            const window = new DesktopWindowController(DesktopController.getWindowContainer())
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
