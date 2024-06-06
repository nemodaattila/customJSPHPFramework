class Main {
    static async init() {
        Includer.init()
        //TODO Auth
        await this.loadCoreFiles()
        this.initComponents()
    }

    static async loadCoreFiles() {
        Includer.addFilesToLoad(
            [{
                directory: './core/css/',
                fileNames: ['global.css'],
            },
                {
                    directory: CORE_FILE_DIR,
                    fileNames: ['Messenger.js', 'HtmlElementCreator.js','EventSubscriptionHandler.js',
                        'ModuleLoader.js', 'ControllerParent.js',  'RESTHandler.js'],
                },
                {
                    directory: WEB_DESKTOP_MODULE_DIR,
                    fileNames: ['filesToInclude.js'],
                }, {
                directory: MODULE_FILE_DIR + 'alertPopup',
                fileNames: ['filesToInclude.js']
            }, {
                directory: MODULE_FILE_DIR + 'entityHandler',
                fileNames: ['filesToInclude.js']
            }
            ]
        );
        await Includer.startLoad()
        await Includer.loadFileSource('alertPopup')
        Messenger.setObject(new AlertPopup())
        await Includer.loadFileSource('desktop')
        await Includer.loadFileSource('desktopWindow')
        await Includer.loadFileSource('desktopWindowTab')
        await Includer.loadFileSource('listerTable')
        // await Includer.loadFileSource('infinityScroller')
        await Includer.loadFileSource('listerTableSearchConnector')

        await Includer.loadFileSource('entityHandlerTable')
        await Includer.loadFileSource('entityServiceParent')

    }

    static async initComponents() {
        DesktopController.init()
        WindowMover.init(DesktopController)
        await DesktopController.openWindow('companies', 'companyLister')

    }
}
