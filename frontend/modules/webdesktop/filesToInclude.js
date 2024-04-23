Includer.setIncludableFileSource(
    'desktop', [
        {
            directory: WEB_DESKTOP_DIR,
            fileNames: ['WindowOpener.js']
        }, {
            directory: WEB_DESKTOP_DIR + 'Desktop',
            fileNames: ['DesktopController.js', 'DesktopView.js', 'DesktopModel.js', 'Desktop.css']
        }
    ])
Includer.setIncludableFileSource(
    'desktopWindow', [
        {
            directory: WEB_DESKTOP_DIR + 'DesktopWindow',
            fileNames: ['DesktopWindowController.js', 'DesktopWindowView.js', 'DesktopWindowModel.js', 'DesktopWindow.css']
        }
    ])
