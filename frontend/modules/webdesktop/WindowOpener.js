class WindowOpener {
   static openWindow(moduleGroupName, moduleName,windowName = undefine)
    {
        if (windowName === undefined)
            windowName=moduleName
        if (DesktopController.isWindowOpen(windowName))
        {

        }
        else
        {
            DesktopController.openWindow(moduleGroupName, moduleName,windowName)
            let controller = ModuleLoader.loadModule(moduleGroupName, moduleName)

        }
    }
}
