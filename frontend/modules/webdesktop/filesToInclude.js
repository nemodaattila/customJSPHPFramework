Includer.setIncludableFileSource(
    'desktop', [
        {
            directory: WEB_DESKTOP_DIR,
            fileNames: ['WindowOpener.js']
        }, {
            directory: WEB_DESKTOP_DIR + 'Desktop',
            fileNames: ['DesktopWindowTabController.js', 'DesktopWindowTabView.js', 'DesktopModel.js', 'DesktopWindowTab.css']
        }
    ])
Includer.setIncludableFileSource(
    'desktopWindow', [
        {
            directory: WEB_DESKTOP_DIR + 'DesktopWindow',
            fileNames: ['DesktopWindowController.js', 'DesktopWindowView.js', 'DesktopWindowModel.js', 'DesktopWindow.css']
        }
    ])
Includer.setIncludableFileSource(
    'desktopWindowTab', [
        {
            directory: WEB_DESKTOP_DIR + 'DesktopWindowTab',
            fileNames: ['DesktopWindowTabController.js', 'DesktopWindowView.js', 'DesktopWindow.css']
        }
    ])
