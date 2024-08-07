Includer.setIncludableModuleSource(
    'desktop', [
        {
            directory: WEB_DESKTOP_MODULE_DIR,
            fileNames: ['WindowOpener.js', 'WindowMover.js','WindowContentControllerParent.js','WindowContentViewParent.js']
        }, {
            directory: WEB_DESKTOP_MODULE_DIR + 'Desktop',
            fileNames: ['DesktopController.js', 'DesktopView.js', 'DesktopModel.js', 'Desktop.css']
        }
    ])
Includer.setIncludableModuleSource(
    'desktopWindow', [
        {
            directory: WEB_DESKTOP_MODULE_DIR + 'DesktopWindow',
            fileNames: ['DesktopWindowController.js', 'DesktopWindowView.js', 'DesktopWindowModel.js', 'DesktopWindow.css']
        }
    ])
Includer.setIncludableModuleSource(
    'desktopWindowTab', [
        {
            directory: WEB_DESKTOP_MODULE_DIR + 'DesktopWindowTab',
            fileNames: ['DesktopWindowTabController.js', 'DesktopWindowTabView.js', 'DesktopWindowTab.css']
        }
    ])
