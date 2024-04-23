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
        }
    }
}
