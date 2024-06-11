/**
 * this file runs first
 */
class Main {
    static async init() {
        Includer.init()
        //TODO Auth
        await this.loadCoreFiles()
        await this.initComponents()
    }

    /**
     * initiating components - Desktop and WindowMover
     * @returns {Promise<void>}
     */
    static async initComponents() {
        DesktopController.init()
        WindowMover.init(DesktopController)
        await DesktopController.openWindow('companies', 'companyLister')
    }

    /**
     * loading necessary js and css files
     * @returns {Promise<void>}
     */
    static async loadCoreFiles() {
        Includer.addFilesToLoad([
            {
                directory: './core/css/',
                fileNames: ['global.css'],
            },
            {
                directory: CORE_FILE_DIR,
                fileNames: ['Messenger.js', 'HtmlElementCreator.js', 'EventSubscriptionHandler.js',
                    'ModuleLoader.js', 'ControllerParent.js', 'RESTHandler.js'],
            },
            {
                directory: WEB_DESKTOP_MODULE_DIR,
                fileNames: ['filesToInclude.js'],
            },
            {
                directory: MODULE_FILE_DIR + 'alertPopup',
                fileNames: ['filesToInclude.js']
            },
            {
                directory: MODULE_FILE_DIR + 'entityHandler',
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startFileLoad()
        await Includer.loadModuleSource('alertPopup')
        Messenger.setObject(new AlertPopup())
        await Includer.loadModuleSource('desktop')
        await Includer.loadModuleSource('desktopWindow')
        await Includer.loadModuleSource('desktopWindowTab')
        await Includer.loadModuleSource('listerTable')
        await Includer.loadModuleSource('listerTableSearchConnector')
        await Includer.loadModuleSource('entityHandlerTable')
        await Includer.loadModuleSource('entityServiceParent')
    }
}
